---
type: Software
resource: https://github.com/bazelbuild/rules_java
generated: { by: reference_agent/gemini-3.7-flash, at: 2026-08-25T20:55:00Z }
tags:
  - bazel
  - java
  - nixos
  - build
  - tools
sources:
  - resource: https://github.com/bazelbuild/rules_java
    title: "Bazel Java Rules Repository"
  - resource: https://nix.dev/permalink/stub-ld
    title: "NixOS Dynamic Linker Stub"
  - resource: https://github.com/enola-dev/enola/commit/0ffbdcf1a320abeafc12576653dd35c9c500281f
    title: "Enola Fix for rules_java singlejar on NixOS"
updated: "2026-09-05"
---

# Bazel Java Rules (rules\_java)

`rules_java` is the official Bazel rule set for compiling, testing, and packaging Java software within Bazel workspaces.

## Overview

`rules_java` defines the core primitives for Java builds (`java_binary`, `java_library`, `java_test`, `java_toolchain`, `java_runtime`, etc.). By default, `rules_java` downloads and uses pre-compiled platform-specific helper binaries (`remote_java_tools_linux`, `remote_java_tools_darwin`, etc.) for packaging and bytecode manipulation tasks such as `singlejar` and `ijar`.

## NixOS Compatibility and Prebuilt Toolchain Pitfalls

When running Bazel builds on [Nix Package Manager](../nix/nix.md), builds using the default `rules_java` configuration will fail when packaging JARs or compiling source JARs because the pre-built `singlejar_local` or `ijar` C++ binaries are dynamically linked against standard FHS glibc paths (such as `/lib64/ld-linux-x86-64.so.2`).

### Error Symptom

```text
ERROR: ... Building source jar ... failed: (Exit 127): singlejar_local failed: error executing JavaSourceJar command external/rules_java++toolchains+remote_java_tools_linux/java_tools/src/tools/singlejar/singlejar_local @...
Could not start dynamically linked executable: external/rules_java++toolchains+remote_java_tools_linux/java_tools/src/tools/singlejar/singlejar_local
NixOS cannot run dynamically linked executables intended for generic linux environments out of the box. For more information, see:
https://nix.dev/permalink/stub-ld
```

### Resolution: Non-Prebuilt Toolchain Configuration

To resolve this hermetically on NixOS without requiring system-wide FHS workarounds (like `nix-ld` or `buildFHSEnv`), configure Bazel to:

1. Use the local host JDK provided by Nix on `PATH` / `JAVA_HOME`.
2. Build helper binaries (`singlejar`, `ijar`, etc.) from source using `NONPREBUILT_TOOLCHAIN_CONFIGURATION`.

#### Toolchain Definition (`tools/java_toolchain/BUILD`)

```python
load(
    "@bazel_tools//tools/jdk:default_java_toolchain.bzl",
    "NONPREBUILT_TOOLCHAIN_CONFIGURATION",
    "default_java_toolchain",
)

default_java_toolchain(
    name = "repository_default_java_toolchain",
    configuration = NONPREBUILT_TOOLCHAIN_CONFIGURATION,
    java_runtime = "@bazel_tools//tools/jdk:current_host_java_runtime",
    source_version = "21",
    target_version = "21",
)
```

#### Module Registration (`MODULE.bazel`)

```python
bazel_dep(name = "rules_java", version = "9.3.0")

register_toolchains("//tools/java_toolchain:repository_default_java_toolchain_definition")
```

#### Flag Configuration (`.bazelrc`)

```text
common --java_language_version=21
common --tool_java_language_version=21
common --java_runtime_version=local_jdk_21
common --tool_java_runtime_version=local_jdk_21
common --action_env=JAVA_HOME
```

### Pitfall: `java_single_jar` in `rules_jvm_external` Pinning

While `NONPREBUILT_TOOLCHAIN_CONFIGURATION` configures standard `java_binary` and `java_library` targets to build `singlejar` from source, `rules_jvm_external` uses the `java_single_jar` rule (from `@rules_java//java:java_single_jar.bzl`) to package resolver plugins (e.g. `plugin-single-jar`) when generating dependencies with `REPIN=1 bazel run @maven//:pin`.

`java_single_jar` hardcodes `_singlejar = Label("//toolchains:singlejar")` rather than obtaining `singlejar` from the active `java_toolchain`. In `@rules_java//toolchains/BUILD`, `:singlejar` unconditionally selects the prebuilt binary `@remote_java_tools_linux//:prebuilt_singlejar` (`singlejar_local`) on Linux x86\_64, which fails on NixOS with `Exit 127: stub-ld`.

#### Resolution

Patch `@rules_java` using Bzlmod `single_version_override` to direct `//toolchains:singlejar` to `@remote_java_tools//:singlejar_cc_bin`:

```starlark
single_version_override(
    module_name = "rules_java",
    patch_strip = 1,
    patches = [
        "//tools/patches:rules_java_singlejar.patch",
    ],
)
```

Where `rules_java_singlejar.patch` changes `@rules_java//toolchains/BUILD`:

```diff
--- a/toolchains/BUILD
+++ b/toolchains/BUILD
@@ -227,7 +227,7 @@

 alias(
     name = "singlejar",
-    actual = ":singlejar_prebuilt_or_cc_binary",
+    actual = "@remote_java_tools//:singlejar_cc_bin",
 )
```

See [dev: Fix &quot;REPIN=1 bazel run @maven//:pin&quot; on NixOS (see https://wiki.… · enola-dev/enola@0ffbdcf · GitHub](https://github.com/enola-dev/enola/commit/0ffbdcf1a320abeafc12576653dd35c9c500281f) for how this was implemented in Enola.

## Test Execution and Test Environment `PATH`

When executing `java_test` targets on [Nix Package Manager](../nix/nix.md) with `common --incompatible_strict_action_env` enabled, Bazel isolates the action environment with a stripped down `PATH` that does not include Nixpkgs' `bash`.

### Error Symptom

```text
ERROR: ...: Testing //java/dev/enola/common:tests failed: (Exit 127): generate-xml.sh failed: error executing TestRunner command (from target //java/dev/enola/common:tests) external/bazel_tools/tools/test/generate-xml.sh bazel-out/k8-fastbuild/testlogs/java/dev/enola/common/tests/test.log ...
```

Inspecting the test log (`bazel-testlogs/.../tests/test.log`) reveals:

```text
env: 'bash': No such file or directory
```

### Cause & Resolution

The test runner script generated by `rules_java` starts with `#!/usr/bin/env bash`. Because strict action environments strip `bash` from `PATH`, `/usr/bin/env` cannot locate the interpreter.

To resolve this, pass the host/shell `PATH` into the test execution environment in `.bazelrc`:

```text
# https://wiki.enola.dev/computer/programming/bazel/rules-java#test-execution-and-test-environment-path
test --test_env=PATH
```

## References

- [GitHub - bazelbuild/rules_java: Java rules for Bazel · GitHub](https://github.com/bazelbuild/rules_java)
- [dev: Fix &quot;REPIN=1 bazel run @maven//:pin&quot; on NixOS (see https://wiki.… · enola-dev/enola@0ffbdcf · GitHub](https://github.com/enola-dev/enola/commit/0ffbdcf1a320abeafc12576653dd35c9c500281f)
- [Bazel Build System](bazel.md)
- [Nix Package Manager](../nix/nix.md)
