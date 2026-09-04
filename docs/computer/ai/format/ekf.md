---
type: Specification
resource: https://docs.enola.dev/specs/ekf/
generated: { by: reference_agent/gemini-2.5-pro, at: 2026-09-04T12:10:00Z }
tags:
  - formats
  - knowledge
  - ai
  - ekf
  - okf
sources:
  - resource: okf
    id: okf-spec
    title: Open Knowledge Format (OKF) Specification v0.2
  - resource: well-formed-markdown
    id: wfmd-spec
    title: Well formed Markdown
  - resource: https://docs.enola.dev/specs/markdown-magic-link/
    id: magic-links
    title: Markdown Magic Links
  - resource: https://docs.enola.dev/specs/markdown-yamlld-frontmatter/
    id: yamlld-frontmatter
    title: Markdown YAML-LD Frontmatter
  - resource: https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
    id: karpathy-llm-wiki
    title: LLM Wiki
  - resource: https://github.com/glaforge/open-reasoning-format
    id: orf-spec
    title: Open Reasoning Format (ORF)
updated: "2026-09-04"
---

# Enola Knowledge Format (EKF)

The Enola Knowledge Format (EKF) is an open specification for organizing, interlinking, and maintaining persistent knowledge bases for humans and AI agents.

## Overview

EKF defines a file-based architecture for **Knowledge Bundles**—hierarchical collections of Markdown documents with structured metadata designed to be collaboratively curated by AI agents and humans, version-controlled via Git, and browsed online.

The architecture and operational model of EKF are inspired by three foundational concepts:

- **Karpathy's LLM Wiki**: Knowledge is persistent, cumulative, and compounding rather than repeatedly re-derived via ephemeral retrieval-augmented generation (RAG) queries.
- **[[okf]]**: File-based knowledge bundles with YAML frontmatter capturing provenance, trust, and lifecycles without requiring proprietary databases or runtime dependencies.
- **Open Reasoning Format (ORF)**: Structured procedural knowledge, playbooks, traps, and progressive disclosure for agent memory.

## Relationship to OKF

While EKF adopts OKF's core vision of file-based, Git-friendly knowledge bundles and frontmatter-based provenance and trust, EKF differs technically and syntactically in several key aspects:

| Feature                           | Upstream OKF Specification (v0.2)                                                                      | Enola Knowledge Format (EKF)                                                                                                                                                     |
| :-------------------------------- | :----------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Links & References**            | Standard CommonMark links with explicit paths and file extensions: `[Customers](/tables/customers.md)` | **Markdown Magic Links**: `[[vector-search]]`, `[[https://...]]`. Forbids `.md` extensions and explicit labels (\`\[\[ref                                                        |
| **Frontmatter Metadata**          | Recommends `title:` and `description:` in YAML frontmatter                                             | **Inferred from Content**: `title:` and `description:` are omitted from frontmatter and derived directly from the first `# H1` and the first paragraph.                          |
| **Linked Data**                   | Arbitrary unstandardized frontmatter fields                                                            | Native **YAML-LD** (`@context`, Schema.org, Wikidata URIs) per the Markdown YAML-LD Frontmatter specification.                                                                   |
| **Directory Indexing**            | Requires or allows checked-in `index.md` files for progressive disclosure                              | **Strictly forbids checked-in `index.md`**. Category indexes are synthesized dynamically in memory during build.                                                                 |
| **Landing Pages & Lead Concepts** | Standard directory tree without concept-directory binding                                              | Optional source `README.md` (GitHub landing page) converted to `index.html`, and **Topic Lead Concepts** (`<dir>/<dir>.md`) whose summaries are hoisted into category preambles. |
| **Markdown Quality**              | Unconstrained CommonMark                                                                               | Constrained by **[[well-formed-markdown]]** (strict heading hierarchy, list formatting, no broken links).                                                                        |

## Bundle Architecture & Directory Taxonomy

An EKF Knowledge Bundle is a directory tree of Markdown files organized by domain taxonomy:

```text
bundle-root/
├── <domain>/              # Top-level subject area (e.g., computer, science, philosophy)
│   ├── <subdomain>/       # Sub-topics (e.g., ai, systems, networks)
│   │   ├── <topic>/       # Specialized area (e.g., software, hardware)
│   │   │   ├── <entity>.md
│   │   │   └── <topic>.md # Optional lead concept document
```

### File and Directory Naming Rules

- Slugs must use lowercase alphanumeric characters, hyphens, and dots (`kebab-case` or dotted identifiers, matching `^[a-z0-9]+([.-][a-z0-9]+)*$`).
- Name files descriptively after the core entity or concept (e.g., `vector-search.md`, `memory-architectures.md`).
- Avoid spaces and special characters.
- **Never check in `index.md` files**: Category indexes are purely auto-generated build artifacts.

### Topic Lead Concepts and Landing Pages

When organizing categories:

1. **Source `README.md` (Optional Landing Page)**:
   - A directory MAY contain an optional `README.md` so that Git repository hosts (such as GitHub) render a human-friendly landing page when browsing that folder.
   - `README.md` is never listed under `## Articles`. In the generated output bundle and HTML site, `README.md` is automatically converted to `index.md` / `index.html`.
   - A directory must NEVER contain both `index.md` and `README.md`.
2. **Lead Concept Document (`<dir>/<dir>.md`)**:
   - A directory MAY contain a concept document named identically to the directory itself (for example, `memory/memory.md`).
   - This document serves as the foundational **topic overview and architectural concept** for that category, while sibling files describe specific implementations or sub-components.
3. **Progressive Disclosure & Dynamic Index Presentation**:
   - In accordance with OKF §8, category indexes (`index.md` / `index.html`) are generated dynamically during the build pipeline.
   - When a source `README.md` exists, its H1 heading and intro text are used as the category title and preamble.
   - When a matching `<dir>/<dir>.md` exists, its link and summary are placed into the preamble (merged after any custom intro prose from `README.md`).
   - The lead concept (`[[memory]]`) and `README.md` are automatically omitted from the `## Articles` list to prevent duplicate indexing.
   - If no matching `<dir>/<dir>.md` exists, all articles in that directory are listed under `## Articles`.

## Markdown & Linking Syntax

### Well-formed Markdown Conformance

All documents must adhere to [[well-formed-markdown]] constraints:

- Must begin with a single Level 1 Heading (`# Title`).
- Heading levels must increment sequentially without gaps (`#` -> `##` -> `###`).
- Headings must use `#` hash notation (not underline style).
- Unordered lists must use `-` dashes (not asterisks or pluses).
- Broken internal links are strictly forbidden.

### Markdown Magic Links Syntax

Inter-document references and external entity links MUST use Markdown Magic Links syntax (`[[...]]`):

1. **Automatic Title Extraction (`[[URI-Reference]]`)**:
   - `[[second]]` automatically resolves the title from `second.md` (e.g., rendered as `[Second Article Title](second.md)`).
   - Omit the `.md` extension: write `[[vector-search]]`, never `[[vector-search.md]]`.
2. **Relative Paths**:
   - Always use relative paths for internal links. Do not use workspace-root prefixes (`[[¬/...]]`) or filesystem-root prefixes (`[[/...]]`).
3. **No Explicit Labels**:
   - Explicit labels (`[[URI-Reference|Text]]`) are forbidden; link text is always derived automatically from the target's title.
4. **External URLs**:
   - External URLs are written as `[[https://www.example.org]]` and resolve automatic link titles from the remote resource when supported by tooling.

## Document Frontmatter

Every concept document MUST include YAML frontmatter delimited by `---` at the beginning of the file.

### Schema Fields

- `type`: (**Required**) Short string identifying the kind of concept (e.g., `Specification`, `Software`, `Playbook`, `schema:Person`).
- `resource`: Canonical URI identifying the underlying asset on the Web. Omitted for purely abstract concepts.
- `generated`: Provenance mapping describing creation (`by: <actor>`, `at: <iso8601-timestamp>`).
- `verified`: List of verification events (`by: <actor>`, `at: <iso8601-timestamp>`).
- `tags`: YAML list of short strings for cross-cutting taxonomy.
- `sources`: List of materials the concept derives from, external or internal:
  - `resource`: (**Required**) URI or relative link to the source.
  - `id`: Stable key used for per-claim attribution.
  - `title`: Human-readable label for the source.
  - `author`: Entity that produced the source.
  - `last_modified`: When the source itself last changed.
- `status`: Lifecycle state (`draft`, `deprecated`). For stable documents, the `status` field is omitted.
- `updated`: Date of last significant update (`YYYY-MM-DD`).

### Omitted Frontmatter Fields (AST Inference)

Unlike standard OKF, EKF strictly omits the following keys from YAML frontmatter:

- `title:` Omitted because it is inferred directly from the first `# H1` heading in the Markdown AST.
- `description:` Omitted because it is inferred directly from the first non-empty paragraph following the H1 heading.

This eliminates synchronization errors between frontmatter and document body prose.

### Linked Data (YAML-LD)

EKF natively supports Linked Data in YAML-LD format within the YAML frontmatter:

- Use `@context` to declare RDF namespaces (such as `schema: https://schema.org/` or `wikidata: https://www.wikidata.org/wiki/`).
- Use prefixed properties (such as `schema:givenName`, `schema:alumniOf`, `schema:sameAs`) to structure semantic knowledge.

### Complete Example

```markdown
---
type: Software
resource: https://www.cognee.ai
generated: { by: reference_agent/gemini-3.7-flash, at: 2026-08-23T15:41:05Z }
verified:
  - { by: human:/people/vorburger.ch, at: 2026-08-23T15:46:03Z }
tags:
  - ai
  - memory
  - agents
sources:
  - resource: https://docs.cognee.ai/
    title: Cognee Documentation
updated: "2026-08-23"
---

# Cognee AI Memory

Cognee is an open-source framework for building persistent memory engines and knowledge graphs for AI agents.

## Architecture

Cognee structures unstructured data into knowledge graphs...
```

## References

- [[okf]]
- [[well-formed-markdown]]
- [[https://docs.enola.dev/specs/markdown-magic-link/]]
- [[https://docs.enola.dev/specs/markdown-yamlld-frontmatter/]]
- [[https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f]]
- [[https://github.com/glaforge/open-reasoning-format]]
- [[https://github.com/GoogleCloudPlatform/open-knowledge-format]]
