---
type: Software
resource: https://bazel.build
generated: { by: reference_agent/gemini-3.7-flash, at: 2026-08-25T20:11:05Z }
tags:
  - bazel
  - build
  - programming
  - tools
sources:
  - resource: https://bazel.build/about/intro
    title: "Introduction to Bazel"
    author: Google
  - resource: https://github.com/bazelbuild/bazel
    title: "Bazel Source Repository"
    author: Google
updated: "2026-08-25"
---

# Bazel Build System

Bazel is an open-source, multi-language build and test tool designed for fast, reproducible, and hermetic software builds.

## Overview

Originally developed internally at Google as Blaze to support monorepos at planetary scale, Bazel constructs an explicit directed acyclic graph (DAG) of build actions. It ensures correctness by enforcing strict input isolation and sandboxing, guaranteeing that rebuilds only execute actions whose inputs or dependencies have changed.

## Key Features

- **Multi-Language Support**: Builds targets across Java, C++, Go, Python, Rust, JavaScript, and custom rules via Starlark.
- **Hermeticity & Reproducibility**: Build steps operate in isolated sandboxes with explicit dependency graphs, preventing undeclared host tools or environment leakage.
- **High-Performance Caching**: Supports local and distributed remote caching (`--remote_cache`) and distributed remote execution (RRE).
- **Dependency Management**: Uses modern Bzlmod (`MODULE.bazel`) for external dependency resolution, alongside legacy WORKSPACE rules.

## Development Workflows

In standard non-Nix environments, developers often manage Bazel versions using launcher tools like [[bazelisk]]. In [[../nix/nix]] projects, Bazel is provided directly via the development shell.

## References

- [[https://bazel.build]]
- [[https://github.com/bazelbuild/bazel]]
- [[bazelisk]]
- [[../nix/nix]]
