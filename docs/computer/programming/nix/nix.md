---
type: Software
resource: https://nixos.org
generated: { by: reference_agent/gemini-3.7-flash, at: 2026-08-25T20:11:05Z }
tags:
  - nix
  - direnv
  - build
  - tools
  - environment
sources:
  - resource: https://nixos.org
    title: "Nix & NixOS Official Site"
    author: NixOS
  - resource: https://nix.dev/concepts/flakes
    title: "Nix Flakes Guide"
    author: NixOS
  - resource: https://direnv.net
    title: "direnv - unclutter your .profile"
    author: direnv
updated: "2026-08-25"
---

# Nix Package Manager

Nix is a purely functional package manager and build system that provides reproducible, declarative, and isolated software environments across Linux distributions and macOS.

## Nix-Enabled Projects

A **Nix-enabled project** is a software repository structured to provide fully reproducible and automatic developer environments, defined by two key configuration files:

1. **`flake.nix`**: The declarative specification of the project's dependencies, development shells (`devShells.default`), build packages, and checks. Flakes provide locked input revisions via `flake.lock`, guaranteeing bit-for-bit reproducibility across workstations and CI runners.
2. **`.envrc` (for direnv)**: A lightweight environment integration file containing `use flake` (or `use flake ./nix`). Combined with [direnv](https://direnv.net), it automatically loads and unloads the Nix development shell, environment variables, and tool paths whenever a developer navigates into or out of the project directory.

## Core Advantages

- **Hermetic Toolchains**: Compilers, runtimes, and build tools (such as OpenJDK, Bun, and [[../bazel/bazel]]) are installed into the immutable Nix store (`/nix/store/`) without polluting global operating system paths.
- **Zero Host Prerequisites**: Developers and CI systems only require Nix and direnv installed; all project-specific tools, linters, and libraries are resolved automatically.
- **Declarative Development Shells**: Tools and environment variables are versioned alongside the code in Git, preventing "works on my machine" discrepancies.

## Nix and Build Tools

In Nix-enabled projects, external version launchers like [[../bazel/bazelisk]] are replaced by declaring native tool packages directly in the `flake.nix` `devShells` definition.

## Subprocess Execution and FHS Path Conventions

On NixOS systems, standard Filesystem Hierarchy Standard (FHS) locations (such as `/usr/bin/echo`, `/usr/bin/cat`, `/usr/bin/head`, or `/usr/bin/tty`) do not exist; only `/usr/bin/env` is present in `/usr/bin/`.

When implementing process launchers, pseudo-terminal handlers (e.g. `pty4j`), or unit tests:

1. **Avoid Hardcoded FHS Paths**: Refer to command names directly (e.g., `echo`, `cat`, `tty`) or use `env` rather than hardcoding `/usr/bin/*`.
2. **Propagate `PATH` in Custom Environments**: If a custom environment map is passed to subprocess builders without explicitly setting `PATH`, native process launchers will fail to locate binaries (often throwing generic `Exec_tty error` or logging `Unable to get $PATH`). Fall back to inheriting `System.getenv("PATH")` whenever a custom environment does not explicitly define `PATH`.

## Git Flake Inputs and Reference Storage Compatibility

When Nix evaluates flakes from a Git repository (such as `use flake` in `.envrc`), it relies on `libgit2` to parse the Git repository tree. Because `libgit2` does not yet implement Git's newer binary reference storage format (`reftable`), evaluating flakes in a repository with `extensions.refstorage = reftable` fails with:

```text
error: opening Git repository "...": unsupported extension name extensions.refstorage (libgit2 error code = 6)
```

See [[../git/reftable]] for details, diagnosis, and instructions for migrating the repository back to the standard `files` format using `git refs migrate --ref-format=files`.

## References

- [[https://nixos.org]]
- [[https://nix.dev/concepts/flakes]]
- [[https://direnv.net]]
- [[../bazel/bazel]]
- [[../bazel/bazelisk]]
- [[../git/reftable]]

