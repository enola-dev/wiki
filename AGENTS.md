# AI Agents Conventions

This repository contains the public Knowledge Base (KB) for [Enola.dev](https://www.enola.dev). It is designed to be browsed by humans and collaboratively curated, synthesized, and maintained by AI agents (e.g. Gemini CLI, Claude Code, GitHub Copilot, Codex, etc.).

This `AGENTS.md` file specifies operational instructions, format conventions, and workflows that AI agents MUST follow when reading, writing, and organizing content in this repository.

---

## 1. Core Philosophy & Architecture

The architecture and operational model of this wiki are inspired by:

- **[Karpathy's LLM Wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)**: The wiki is a persistent, compounding knowledge base. Knowledge is extracted, structured, cross-referenced, and kept current rather than repeatedly re-derived via one-off RAG queries.
- **[Open Knowledge Format (OKF)](https://github.com/GoogleCloudPlatform/open-knowledge-format)**: Open, vendor-neutral Markdown documents with structured YAML frontmatter for discoverability, provenance, and trust.
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
│   │   │   ├── <entity>.md
│   │   │   └── INDEX.md   # Category index and summary
```

### File & Directory Naming Rules

- Use lowercase alphanumeric characters and hyphens for slugs (`kebab-case`).
- Avoid spaces and special characters in file/folder names.
- Name files descriptively after the core entity or concept (e.g., `vector-search.md`, `memory-architectures.md`).

---

## 3. Formatting & Linking Syntax

### Markdown Standard

All documents MUST use standard [CommonMark](https://commonmark.org) syntax combined with [Markdown Magic Links](https://docs.enola.dev/specs/markdown-magic-link/).

### Markdown Magic Links Syntax

Use double square brackets `[[...]]` for inter-wiki references and external entity links:

1. **Automatic Title Extraction (`[[URI-Reference]]`)**:
   - `[[second.md]]` automatically resolves the title from `second.md` (e.g., `[Second Article Title](second.md)`).
   - Omit the `.md` extension where clean: `[[vector-search]]`.
2. **Explicit Label (`[[URI-Reference|Text]]`)**:
   - `[[../ai/memory.md|agent memory systems]]`
3. **Workspace Root Prefix (`[[¬/...]]`)**:
   - `[[¬/docs/computer/ai/memory]]` to link reliably across directories without fragile relative paths.
4. **External URLs (`[[https://...]]`)**:
   - `[[https://www.enola.dev]]` resolves with automatic link text from the external page.

### Document Frontmatter (YAML-LD / OKF Inspired)

Every substantive article under `docs/` SHOULD include YAML frontmatter when metadata is relevant:

```yaml
---
title: "Article Title"
description: "A concise 1-2 sentence summary of this concept or document."
tags:
  - ai
  - memory
  - agents
sources:
  - "https://example.com/source-article"
updated: "2026-08-23"
status: "active" # draft | active | deprecated
---
```

---

## 4. Agent Operations & Workflows

### A. Ingestion & Article Creation

When adding new information, research, or sources:

1. **Locate or Create Category**: Place the article in the relevant `docs/<domain>/...` path.
2. **Synthesize & Structure**: Extract clear conceptual definitions, architecture diagrams (Mermaid), tables, code snippets, and rationale.
3. **Cross-Link Aggressively**: Connect the new page to related existing concepts using Magic Links `[[...]]`. Never create orphan pages.
4. **Update Parent Indexes**: Add or update entries in the corresponding category `INDEX.md` or parent topic overview.

### B. Query & Compounding Synthesis

When answering user questions or conducting deep research:

- Read relevant `docs/` pages first.
- If a query leads to a valuable synthesis, comparison, or insight, **file it back into the wiki** under `docs/` as a new or updated document so the knowledge compounds.

### C. Linting & Health Maintenance

Periodically, or when touching related topics:

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
