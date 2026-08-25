# Compounding Knowledge Base (Wiki)

This rule instructs AI agents to persist learnings and discoveries into the central knowledge base at [Enola.dev Wiki](https://www.enola.dev).

## When to Record Learnings

Whenever you diagnose and solve a non-obvious bug, resolve environment or toolchain incompatibilities (such as NixOS quirks, dynamic linker errors, Bazel/toolchain issues), design new architectures, or discover valuable technical insights across **any** repository:

1. **Synthesize & Document**: Proactively document the finding as a new or updated concept article under `/home/vorburger/git/github.com/enola-dev/wiki/docs/` following the conventions in [AGENTS.md](/home/vorburger/git/github.com/enola-dev/wiki/AGENTS.md).
   - Include symptom/error logs, root cause analysis, and concrete code/configuration resolutions.
   - Use standard frontmatter (`type:`, `sources:`, `tags:`) and Magic Links (`[[...]]`).
   - Use descriptive `kebab-case` filenames.
2. **Cross-Link**: Ensure the new or updated document is linked from related concept or topic overview pages.
3. **Validate & Build**: Execute `bin/wiki-lint` and `bin/build` from the `wiki/` repository root to verify frontmatter compliance, link integrity, and regenerate auto-generated indexes and build artifacts.
