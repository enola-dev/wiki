---
type: Software
resource: https://github.com/bazelbuild/bazelisk
generated: { by: reference_agent/gemini-3.7-flash, at: 2026-08-25T20:11:05Z }
tags:
  - bazel
  - bazelisk
  - build
  - nix
  - tools
sources:
  - resource: https://github.com/bazelbuild/bazelisk
    title: "Bazelisk Repository"
    author: bazelbuild
  - resource: https://nix.dev/permalink/stub-ld
    title: "NixOS Generic Linux Executables Documentation"
    author: NixOS
updated: "2026-08-25"
---

# Bazelisk Launcher

Bazelisk is a user-friendly launcher and wrapper for [Bazel Build System](bazel.md) that automatically downloads and executes the requested Bazel version based on project configuration files or environment variables.

## How Bazelisk Works

When executed, Bazelisk checks for the appropriate Bazel version in:

1. The `USE_BAZEL_VERSION` environment variable.
2. The `.bazelversion` file in the workspace directory.
3. The latest stable release available upstream.

Bazelisk then downloads the official pre-compiled upstream binary from GitHub Releases into the user cache directory (`~/.cache/bazelisk/downloads/...`) and executes it.

## Incompatibility with Nix-Enabled Projects

For [Nix Package Manager](../nix/nix.md) projects and systems running [NixOS](https://nixos.org), **Bazelisk is not recommended**.

### Dynamic Linker Mismatch

Official Bazel binary distributions downloaded by Bazelisk are compiled for generic Linux distributions and hardcode the standard ELF dynamic linker path (`/lib64/ld-linux-x86-64.so.2`). Because NixOS uses non-standard library paths in the Nix store without standard FHS locations, executing binaries downloaded by Bazelisk fails immediately with:

```text
Could not start dynamically linked executable: /home/.../.cache/bazelisk/downloads/.../bin/bazel
NixOS cannot run dynamically linked executables intended for generic linux environments out of the box.
For more information, see: https://nix.dev/permalink/stub-ld
```

### Recommended Approach: Direct DevShell Inclusion

In a Nix-enabled project (such as one with `flake.nix`), Bazelisk should not be used. Instead, the appropriate Bazel package (e.g. `pkgs.bazel_8`) should simply be placed directly on the development shell (`devShells.default`):

```nix
packages = with pkgs; [
  bazel_8
];
```

This ensures that:

- The `bazel` binary on `PATH` is natively built, patched with `patchelf` to link against Nix store libraries, and runs reliably on NixOS and non-NixOS Linux distributions alike.
- Reproducibility and version pinning are declared declaratively in `flake.nix` and locked via `flake.lock`, eliminating the need for a separate `.bazelversion` file.

## References

- [GitHub - bazelbuild/bazel: a fast, scalable, multi-language and extensible build system · GitHub](https://github.com/bazelbuild/bazel)
- [GitHub - bazelbuild/bazelisk: A user-friendly launcher for Bazel. · GitHub](https://github.com/bazelbuild/bazelisk)
- [https://nix.dev/permalink/stub-ld](https://nix.dev/permalink/stub-ld)
- [Bazel Build System](bazel.md)
- [Nix Package Manager](../nix/nix.md)
