---
type: Software
resource: https://gradle.org
tags:
  - gradle
  - java
  - build
  - programming
  - tools
  - troubleshooting
sources:
  - resource: https://docs.gradle.org/current/userguide/gradle_daemon.html
    title: "The Gradle Daemon"
  - resource: https://docs.gradle.org/current/userguide/configuration_cache.html
    title: "Gradle Configuration Cache"
  - resource: https://docs.gradle.org/current/userguide/directory_layout.html
    title: "Gradle User Home and Project Directory Layout"
updated: "2026-10-04"
---

# Gradle Build System

Gradle is an open-source build automation tool primarily used for JVM projects (Java, Kotlin, Scala) with declarative Kotlin DSL (`build.gradle.kts`) and Groovy DSL support, incremental compilation, build caching, and configuration caching.

## Caching Architecture

Gradle splits its persistent state across two directory trees:

1. **Global User Home (`~/.gradle/`)**:
   - `~/.gradle/caches/modules-2/`: Downloaded external Maven/Ivy artifacts and metadata (`files-2.1/`).
   - `~/.gradle/caches/<version>/jars-9/`: Instrumented and transformed plugin and buildscript JARs loaded by Gradle's classloader hierarchy.
   - `~/.gradle/caches/<version>/kotlin-dsl/`: Compiled Kotlin DSL buildscript classes (`build.gradle.kts`, `settings.gradle.kts`).
   - `~/.gradle/caches/build-cache-1/`: Local task output build cache (`org.gradle.caching=true`).
   - `~/.gradle/daemon/<version>/`: Long-lived background **Gradle Daemon** JVM processes and lock registries.
2. **Project-Local Directory (`<project>/.gradle/`)**:
   - `<project>/.gradle/configuration-cache/`: Serialized task graphs and classloader scopes (`org.gradle.configuration-cache=true`).
   - `<project>/.gradle/<version>/`: Project-scoped incremental build state and file hashes.

## Troubleshooting: Deleting `~/.gradle/caches/` While a Daemon is Running

Manually deleting `$HOME/.gradle/caches/` while a background **Gradle Daemon** is still running — or while `<project>/.gradle/configuration-cache/` retains serialized state — causes subsequent builds to fail with `ClassNotFoundException` or `PluginInstantiationException` even after Gradle re-downloads the dependency JARs.

### Error Symptoms

1. **Missing Plugin Implementation Class (`PluginInstantiationException`)**:

```text
* What went wrong:
An exception occurred applying plugin request [id: 'org.graalvm.buildtools.native', version: '1.1.12']
> Could not find implementation class 'org.graalvm.buildtools.gradle.NativeImagePlugin' for plugin 'org.graalvm.buildtools.native' specified in jar:file:/home/.../.gradle/caches/modules-2/files-2.1/org.graalvm.buildtools/native-gradle-plugin/1.1.12/.../native-gradle-plugin-1.1.12.jar!/META-INF/gradle-plugins/org.graalvm.buildtools.native.properties.
```

2. **Missing Compiled Buildscript Task Class in `VisitableURLClassLoader`**:

```text
* What went wrong:
Error while reading task graph
> Exception while loading configuration for :common: Class 'Build_gradle$GenerateVersionTask' not found in class loader 'VisitableURLClassLoader(...)' of type 'org.gradle.internal.classloader.VisitableURLClassLoader'.
```

### Root Cause

- Gradle does **not** load plugin classes directly from the raw artifact in `~/.gradle/caches/modules-2/files-2.1/.../*.jar`. Instead, `InstrumentingClasspathFileTransformer` instruments plugin JARs into `~/.gradle/caches/<version>/jars-9/<hash>/*.jar`.
- The long-lived **Gradle Daemon** JVM caches both the JAR instrumentation mapping and the `VisitableURLClassLoader` instances in memory (`DefaultClassLoaderCache`) across builds.
- When `rm -r $HOME/.gradle/caches/` is executed while a daemon is alive:
  1. On the next invocation, Gradle re-downloads the raw artifact into `~/.gradle/caches/modules-2/files-2.1/` and reads `META-INF/gradle-plugins/<id>.properties` to identify the plugin's implementation class name.
  2. However, the running daemon reuses its in-memory cached `ClassLoader` (or skips regenerating `~/.gradle/caches/<version>/jars-9/` because its in-memory cache believes the JAR was already instrumented), attempting to load classes from unlinked files in the deleted `jars-9/` or `kotlin-dsl/` directories.
  3. Additionally, if `org.gradle.configuration-cache=true` is enabled, `<project>/.gradle/configuration-cache/` stores references to those deleted `jars-9/` and `kotlin-dsl/` entries (and can even persist a broken configuration cache entry after a failed build).

### Resolution

Whenever clearing `~/.gradle/caches/`, always stop all running Gradle Daemons and remove the project-local `.gradle/` directory (especially `.gradle/configuration-cache/`):

```bash
gradle --stop
rm -rf ~/.gradle/caches/ .gradle/
```

If using Nix and `direnv`:

```bash
direnv exec . gradle --stop
rm -rf ~/.gradle/caches/ .gradle/
```

## Related Topics

- [[../nix/nix]]
- [[../bazel/bazel]]
