---
type: Specification
resource: https://github.com/GoogleCloudPlatform/open-knowledge-format
generated: { by: reference_agent/gemini-3.7-flash, at: 2026-08-25T20:04:08Z }
tags:
  - formats
  - knowledge
  - ai
  - okf
sources:
  - resource: https://raw.githubusercontent.com/GoogleCloudPlatform/open-knowledge-format/main/SPEC.md
    id: okf-spec
    title: Open Knowledge Format (OKF) Specification v0.2
    author: GoogleCloudPlatform
    last_modified: 2026-07-01T00:00:00Z
updated: "2026-08-25"
---

# Open Knowledge Format (OKF)

The Open Knowledge Format (OKF) is an open, vendor-neutral specification for structuring persistent knowledge bases, metadata, and context for humans and AI agents.

## Overview

Originated by Google Cloud, OKF defines a minimal, file-based architecture where a **Knowledge Bundle** is represented as a directory hierarchy of standard CommonMark Markdown files with structured YAML frontmatter. It is designed to be authored by humans, maintained and synthesized by AI agents, and version-controlled via Git without requiring proprietary SDKs, databases, or runtime dependencies.

## Identifier Conventions

OKF relies on standard filesystem paths and string conventions rather than centralized ID registries:

### 1. Concept IDs

- **Definition**: The unique identifier of a concept within a bundle is its file path relative to the bundle root, with the `.md` extension removed (for example, `people/vorburger.ch.md` becomes `people/vorburger.ch`).
- **Dot (`.`) Support**: Concept IDs **can contain dots** (`.`). Dots are valid characters in filenames and slugs across standard filesystems, allowing concept identifiers to represent domain names (such as `people/vorburger.ch`), software versions (such as `standards/semver.2.0`), or dotted taxonomies.
- **Slug Hygiene**: Slugs should consist of lowercase alphanumeric characters, hyphens (`-`), and dots (`.`). Special path sequences like directory traversal (`.` or `..`) and hidden files (leading dots like `.hidden.md`) must be avoided to ensure cross-platform portability and clean URL resolution.

### 2. Source IDs (`sources[].id`)

- **Definition**: An optional key within a `sources` entry used for per-claim attribution and footnote citations in the document body.
- **Dot (`.`) Support**: Source IDs can contain dots (for example, `id: rfc.9110` or `id: bq.schema.v1`).

### 3. Actor IDs

- **Definition**: Strings identifying entities that created, edited, or verified content in the `generated` or `verified` frontmatter blocks.
- **Conventions**:
  - Agents: `<producer>/<version>` (e.g., `reference_agent/gemini-3.7-flash`).
  - Humans: `human:<id>` (e.g., `human:/people/vorburger.ch`).
  - Processes: `process:<id>` (e.g., `process:nightly-validator`).
- Dots are commonly used within actor identifiers and paths.

## Document Structure & Frontmatter

Every concept document consists of YAML frontmatter delimited by `---` and a Markdown body.

### Frontmatter Schema

- `type`: (**Required**) Short string identifying the kind of concept (e.g., `Specification`, `Software`, `Playbook`, `schema:Person`).
- `resource`: Canonical URI identifying the underlying asset on the Web.
- `generated`: Provenance object describing creation (`by: <actor>`, `at: <iso8601-timestamp>`).
- `verified`: List of verification events (`by: <actor>`, `at: <iso8601-timestamp>`) establishing trust tiers.
- `tags`: List of strings for cross-cutting categorization.
- `sources`: List of materials the concept derives from, including credibility signals (`author`, `usage_count`, `last_modified`).

## Reserved Files & Directory Layout

To support progressive disclosure and bundle management, the following filenames have special meaning:

| File        | Purpose                                                                | Frontmatter Required |
| ----------- | ---------------------------------------------------------------------- | -------------------- |
| `index.md`  | Auto-generated or static directory listing for progressive disclosure. | No                   |
| `log.md`    | Chronological ledger of bundle changes and agent updates.              | No                   |
| `README.md` | Human-facing landing page rendered by Git hosts.                       | No                   |

## References

- [okf.md site](https://okf.md)
- [GitHub - GoogleCloudPlatform/open-knowledge-format · GitHub](https://github.com/GoogleCloudPlatform/open-knowledge-format)
- [Markdown Magic Links - Enola.dev](https://docs.enola.dev/specs/markdown-magic-link/)
