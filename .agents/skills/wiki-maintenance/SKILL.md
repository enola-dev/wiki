---
name: wiki-maintenance
description: Validates and repairs Markdown documents in docs/ against AGENTS.md conventions (frontmatter, heading hierarchy, naming, and magic links). Use when auditing wiki health, verifying markdown files, or fixing format inconsistencies.
---

# Wiki Maintenance Skill

This skill provides comprehensive validation and remediation procedures for maintaining the [Enola.dev](https://www.enola.dev) Knowledge Base in `docs/` according to the [Enola Knowledge Format (EKF)](../../../docs/computer/ai/format/ekf.md) and [AGENTS.md](../../../AGENTS.md).

## Quick Start / Automated Execution

To audit or automatically repair all documents under `docs/`, use the bundled helper script or convenience wrapper:

```bash
# Check compliance (returns non-zero exit code if violations exist)
bin/wiki-lint

# Or directly via nix-shell:
nix-shell -p python3 --run "python3 .agents/skills/wiki-maintenance/scripts/wiki_lint.py --check"

# Automatically fix violations (missing frontmatter keys, illegal magic links, missing H1)
nix-shell -p python3 --run "python3 .agents/skills/wiki-maintenance/scripts/wiki_lint.py --fix"
```

---

## Validation Checklist & Specification Rules

When creating, editing, or reviewing documents under `docs/`, verify compliance against each of the following rules:

### 1. Directory Layout & Naming Conventions

- **Path**: All wiki articles MUST reside under `docs/<domain>/<subdomain>/<topic>/...`.
- **Slugs & Filenames**:
  - File and folder names MUST use lowercase alphanumeric characters and hyphens (`kebab-case`), or dot-separated domain/identity slugs (e.g., `vorburger.ch.md`).
  - Spaces, uppercase characters, and special characters are strictly forbidden.
  - Do NOT create or check in `index.md` files in `docs/`. Category indexes are auto-generated at build time (`bin/build`).

### 2. Document Frontmatter (EKF & YAML-LD)

Every `.md` file in `docs/` MUST start with a YAML frontmatter block enclosed by `---`:

```yaml
---
type: Concept # REQUIRED: The entity type (e.g. Concept, Software, schema:Person)
resource: https://example.org/resource # Highly recommended external HTTP/HTTPS URI
generated: { by: reference_agent/gemini-3.7-flash, at: 2026-08-23T15:41:05Z } # Recommended
verified: # Optional list of verification events
  - { by: human:/people/vorburger.ch, at: 2026-08-23T15:46:03Z }
tags: # Optional tags
  - ai
  - memory
sources: # Optional list of derivation sources
  - resource: https://example.org/docs
status: draft # Optional: draft | deprecated (omitted when stable)
---
```

#### Frontmatter Rules:

- **`type:` (MANDATORY)**: Must always be specified on all concept documents.
- **`title:` (FORBIDDEN)**: Do NOT include `title:` in frontmatter. The title is always inferred from the first `# ` H1 heading in the Markdown body.
- **`description:` (FORBIDDEN)**: Do NOT include `description:` in frontmatter. The description is always inferred from the first paragraph in the Markdown body.
- **`status:` (CONDITIONAL)**:
  - Default status is `stable`.
  - For brevity, `status:` MUST be omitted when the document is stable.
  - Only specify `status: draft` or `status: deprecated` when applicable.
- **`generated:` and `verified:`**: Use ISO 8601 UTC timestamps (e.g., `2026-08-23T15:41:05Z`).
- **YAML-LD**: Linked data fields (such as `@context`, `schema:givenName`, etc.) can be placed directly in frontmatter.

### 3. Headings & Body Structure

- **Title (H1)**: The first heading in the Markdown body MUST be a level-1 heading `# <Title>`.
- **Single H1**: Prefer exactly one H1 per document; use `##`, `###`, etc. for sub-sections.
- **Summary**: The first paragraph immediately following the H1 heading serves as the description/summary.

### 4. Markdown Magic Links Syntax (`[[...]]`)

Use double square brackets `[[...]]` for inter-wiki links and external entity links:

- **Automatic Title Extraction**: `[[vector-search]]` resolves the title from `vector-search.md`.
- **Omit `.md` Extension**: Always omit `.md`. Write `[[vector-search]]`, NEVER `[[vector-search.md]]`.
- **NO Explicit Labels (`|`)**: Explicit labels like `[[vector-search|Custom Label]]` MUST NEVER be used.
- **NO Root Prefixes**: Workspace root prefix `[[¬/...]]` MUST NEVER be used. Use relative paths.
- **NO Absolute Paths**: Absolute filesystem paths `[[/...]]` MUST NEVER be used. Use relative paths.
- **External URLs**: `[[https://www.enola.dev]]` or standard markdown links `[Label](https://...)`.
- **Link Integrity**: All relative magic links MUST resolve to existing `.md` files or subdirectories.

### 5. Category Hierarchy, Lead Concepts & Orphan Prevention

- **Topic Lead Concept (`<dir>/<dir>.md`)**: If a directory contains a concept document named identically to the directory itself (e.g., `memory/memory.md`), it serves as the overarching topic concept. In auto-generated indexes, it is placed as the preamble immediately under the `# <Category>` heading and omitted from `## Articles`.
- **Automatic Indexing**: Build tools (`bin/build`) automatically synthesize directory catalogs for every folder.
- **No Orphan Pages**: Every page in the wiki must be discoverable and cross-linked with relevant concepts.

---

## Violation Remediation Recipes

### Recipe A: Fix Frontmatter Keys

```diff
 ---
+type: Software
-title: My Software
-description: An awesome software tool.
-status: stable
 resource: https://example.com
 ---

+# My Software
+
+An awesome software tool.
```

### Recipe B: Fix Magic Link Syntax

```diff
-Refer to [[memory/cognee.md]] or [[memory/vector-search|Vector Search]] or [[¬/docs/computer/ai]].
+Refer to [[memory/cognee]] or [[memory/vector-search]] or [[computer/ai]].
```

### Recipe C: Auto-Generating Indexes

Run `bin/build` to build the complete site and regenerate all directory indexes into `out/`:

```bash
bin/build
```
