# AI Agents Conventions

This repository contains the public Knowledge Base (KB) by & for [Enola.dev](https://www.enola.dev). It is designed to be browsed by humans and collaboratively curated, synthesized, and maintained by AI agents.

This `AGENTS.md` file specifies operational instructions, format conventions, and workflows that AI agents MUST follow when reading, writing, and organizing content in this repository.

---

## 1. Core Philosophy & Architecture

The architecture and operational model of this wiki are inspired by:

- **[Karpathy's LLM Wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)**: The wiki is a persistent, compounding knowledge base. Knowledge is extracted, structured, cross-referenced, and kept current rather than repeatedly re-derived via one-off RAG queries.
- **[Open Knowledge Format (OKF)](https://github.com/GoogleCloudPlatform/open-knowledge-format)**: Open, vendor-neutral Markdown documents with structured YAML frontmatter for discoverability, provenance, and trust. This repository is what OKF calls a _Knowledge Bundle_.
- **[Open Reasoning Format (ORF)](https://github.com/glaforge/open-reasoning-format)**: Structured procedural knowledge, playbooks, traps, and progressive disclosure for AI agent memory.

### Layered Separation

- **Raw Inputs & Sources**: External URLs, papers, transcripts, user inputs, and notes. Sources provide raw context and facts.
- **The Wiki (`docs/`)**: Persistent, curated Markdown articles owned and maintained by agents in collaboration with humans.
- **Schema & Agent Directives (`AGENTS.md`)**: Configuration, taxonomy, and conventions governing agent behavior.

---

## 2. Directory Layout & Taxonomy

All wiki articles reside under the [`docs/`](docs/) directory:

```text
docs/
├── <domain>/              # Top-level subject area (e.g., computer, science, philosophy)
│   ├── <subdomain>/       # Sub-topics (e.g., ai, systems, networks)
│   │   ├── <topic>/       # Specialized area (e.g., software, hardware)
│   │   │   └── <entity>.md
```

### File & Directory Naming Rules

- Use lowercase alphanumeric characters and hyphens for slugs (`kebab-case`).
- Name files descriptively after the core entity or concept (e.g., `vector-search.md`, `memory-architectures.md`).
- Avoid spaces and special characters in file/folder names.
- Do NOT create or check in `index.md` files in `docs/`. All category indexes are purely auto-generated build artifacts created by `bin/build`.

### Topic Lead Concepts, Source READMEs & Directory Indexing

When organizing and indexing categories in `docs/`:

1. **Source `README.md` (Optional GitHub Landing Page)**:
   - A directory MAY contain an optional `README.md` (e.g. `docs/README.md` for the Wiki About, or `docs/.../memory/README.md`) so that GitHub's web interface renders a rich landing page when browsing that folder.
   - **Mutual Exclusion**: A directory must NEVER contain both `index.md` and `README.md`.
   - `README.md` is never listed under `## Articles`. In the output bundle / HTML build, `README.md` is automatically converted to `index.md` / `index.html`.
2. **Lead Concept Document (`<dir>/<dir>.md`)**:
   - The directory MAY contain a concept document named identically to the directory itself (e.g., `docs/.../memory/memory.md`).
   - This document serves as the foundational **topic overview / architectural concept** (e.g. general principles, taxonomy, comparison tables) for that category, while sibling files describe specific implementations, libraries, or tools (e.g., `letta.md`, `graphiti.md`).
3. **Auto-Generated Index Presentation & Progressive Disclosure**:
   - In accordance with OKF §8, category indexes (`index.md` / `index.html`) are generated dynamically in memory during `bin/build` (via `md2md` or `md2html`).
   - When a source `README.md` exists, its H1 heading and intro text are used as the category title and preamble.
   - When a matching `<dir>/<dir>.md` exists, its link and summary are placed into the preamble (merged after any custom intro prose from `README.md`):
     ```markdown
     # Memory Systems

     Overview and catalog of persistent memory engines, context managers, and stateful architectures for AI agents.

     [[memory]] - LLM and Agent Memory refers to the software architectures, data structures, and algorithms...

     ## Articles

     - [[cmem]] - Claude-Mem is an open-source persistent memory system...
     - [[letta]] - Letta is an open-source framework...
     ```
   - The lead concept (`[[memory]]`) and `README.md` are automatically omitted from the `## Articles` list to avoid duplicate indexing.
   - If no matching `<dir>/<dir>.md` exists, all articles in that directory are listed under `## Articles`.

---

## 3. Formatting & Linking Syntax

### Markdown Standard

All documents MUST use standard [CommonMark](https://commonmark.org) syntax combined with [Markdown Magic Links](https://docs.enola.dev/specs/markdown-magic-link/).

### Markdown Magic Links Syntax

Use double square brackets `[[...]]` for inter-wiki references and external entity links:

1. **Automatic Title Extraction (`[[URI-Reference]]`)**:
   - `[[second]]` automatically resolves the title from `second.md` (e.g., `[Second Article Title](second.md)`).
   - Always omit the `.md` extension, so just: `[[vector-search]]` and never [[vector-search.md]].
2. **Explicit Label (`[[URI-Reference|Text]]`)** should never be used.
3. **Workspace Root Prefix (`[[¬/...]]`)**:
   - `[[¬/docs/computer/ai/memory]]` should never be used, always only use relative paths.
4. **Absolute Local Filesystem (`[[/...]]`)**:
   - `[[/docs/computer/ai/memory]]` should never be used, always only use relative paths.
5. **External URLs (`[[https://...]]`)**:
   - `[[https://www.enola.dev]]` resolves with automatic link text from the external page.

### Document Frontmatter (OKF-based)

Every article under `docs/` MUST include YAML frontmatter. The most minimal required frontmatter is simply e.g. `type: API Endpoint`, but a more complete example is:

```yaml
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
updated: "2026-08-23"
status: draft # draft | stable | deprecated; default (absent) status is stable
---

# Cognee AI Memory

Cognee is...

## Background

...
```

Required fields:

- `type:` is always required (!)
- `resource:` is technically optional, but highly recommended to be set to an existing external reference HTTP URI which uniquely identifies the underlying asset the concept describes on the Web - if one is available. It may be absent for concepts that describe abstract ideas rather than physical resources, although even for those it may be useful to set it e.g. to a Wikipedia article.
- `generated:` is technically optional, but highly recommended to be set to how the current content was produced; `generated.by:` is an actor such as `reference_agent/gemini-3.7-flash` for an LLM or `human:/people/vorburger.ch` for a person further described in `/people/vorburger.ch.md`, and `generated.at:` is the timestamp of generation in ISO 8601 datetime format.
- `verified:` is technically optional, but highly recommended to be set to a list of verification events, and same as `generated:` again each with `by:` and `at:`. Multiple entries capture independent checks, for example a human sign-off plus a nightly process. "How recently" is the latest at.

Optional fields:

- `tags:` A list of short strings for cross-cutting categorization.
- `sources:` is a list of records the materials a concept derives from, external or internal to the Wiki, with:
  - `resource:` REQUIRED within an entry, it's an URI a consumer can follow, either an an absolute URL, or a Wiki-relative path
  - `id:` Optional. A stable key used to attribute individual claims. SHOULD be present when the body cites the source.
  - `title:` Optional. Human-readable label for the source.
  - `author:` Who or what produced the source, in the actor convention used by `generated.by` and `verified.by`.
  - `last_modified:` When the source itself last changed. A recency signal of the source, distinct from `generated.at` (which records when the concept itself was written).
- `status:` Indicates the current status of the content:
  - `stable`: default; ready for consumption. For brevity, the `status:` field should always simply be omitted for stable content.
  - `draft`: not yet reviewed; possibly incomplete.
  - `deprecated`: kept for links and history; no longer current.

Omitted OKF fields:

- `title:` is always omitted, because it's simply inferred from the first heading.
- `description:` is always omitted, because it's simply inferred from the first paragraph.

### Linked Data (YAML-LD)

In addition to OKF, the YAML frontmatter may also contain _Linked Data_ in [YAML-LD](https://www.w3.org/TR/yaml-ld/) format, as outlined on the [Markdown YAML-LD Frontmatter spec](https://docs.enola.dev/specs/markdown-yamlld-frontmatter); for example:

```yaml
---
type: schema:Person
resource: https://vorburger.ch
generated: { by: human:/people/vorburger.ch, at: 2026-08-23T15:46:03Z}
tags: [enola.dev]

"@context":
  schema: https://schema.org/
  wikidata: https://www.wikidata.org/wiki/
schema:givenName: Michael
schema:familyName: Vorburger
schema:alumniOf: https://www.epfl.ch
schema:sameAs: https://github.com/vorburger

sources:
  - resource: wikidata:Q107570710
---

# Michael Vorburger.ch

Michael Vorburger is...

```

---

## 4. Agent Operations & Workflows

### A. Ingestion & Article Creation

When adding new information, research, or sources:

1. **Locate or Create Category**: Place the article in the relevant `docs/<domain>/...` path.
2. **Synthesize & Structure**: Extract clear conceptual definitions, architecture diagrams (Mermaid), tables, code snippets, and rationale.
3. **Cross-Link Aggressively**: Connect the new page to related existing concepts using Magic Links `[[...]]`. Never create orphan pages.
4. **No Index Maintenance Needed**: Category indexes (`index.md`) are automatically generated by the build pipeline (`bin/build`); agents do not need to create or edit them manually.

### B. Query & Compounding Synthesis

When answering user questions or conducting deep research:

- Read relevant `docs/` pages first.
- If a query leads to a valuable synthesis, comparison, or insight, **file it back into the wiki** under `docs/` as a new or updated document so the knowledge compounds.

### C. Linting & Health Maintenance

Periodically, or when touching related topics:

- **Run Linter**: Execute `bin/wiki-lint` to validate all documents under `docs/` against frontmatter, link resolution, and structural conventions.
- **Detect & Fix Dead Links**: Verify all `[[...]]` references resolve to valid files or URLs.
- **Reconcile Contradictions**: When newer sources supersede older notes, update the stale documentation or explicitly note the paradigm shift.
- **Eliminate Orphan Pages**: Ensure every page is reachable via category indexes and contextual cross-links.

---

## 5. Licensing & Documentation Integrity

- **License**: All content in this repository is licensed under [Creative Commons Zero (CC0) v1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/).
  - Contributions must be original or compatible with CC0 public domain dedication.
  - Do not commit proprietary, confidential, or non-permissive licensed material.
- **Documentation Integrity**:
  - Preserve author notes, inline comments, and existing context when editing.
  - Avoid unnecessary rewrites of well-formulated documents; prefer additive synthesis and targeted improvements.

---

## 6. Git Commits and Push

- **No Conventional Commit Prefixes**: There is NO need to use conventional commit prefixes (such as `docs:`, `docs(scope):`, `feat:`, `chore:`, etc.) in this repository. Write plain, clear, descriptive commit messages starting directly with a capital letter (e.g., `Document reftable format and Nix libgit2 compatibility`).
- **Do NOT push automatically**: Do NOT automatically run `git push` after `git commit`. Push must only be done if explicitly instructed by the user.

