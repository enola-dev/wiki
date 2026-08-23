---
name: wiki-maintenance
description: Validates and repairs Markdown documents in docs/ against AGENTS.md conventions (frontmatter, heading hierarchy, naming, magic links, parent index linking, and orphan elimination). Use when auditing wiki health, verifying markdown files, or fixing format inconsistencies.
---

# Wiki Maintenance Skill

This skill provides comprehensive validation and remediation procedures for maintaining the [Enola.dev](https://www.enola.dev) Knowledge Base in `docs/` according to [AGENTS.md](../../../AGENTS.md).

## Quick Start / Automated Execution

To audit or automatically repair all documents under `docs/`, use the bundled helper script:

```bash
# Check compliance (returns non-zero exit code if violations exist)
nix-shell -p python3 --run "python3 .agents/skills/wiki-maintenance/scripts/wiki_lint.py --check"

# Automatically fix violations (missing frontmatter keys, illegal magic links, missing index.md, orphans)
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
  - Category and directory index files MUST be named lowercase `index.md` (NEVER `INDEX.md`).

### 2. Document Frontmatter (OKF & YAML-LD)
Every `.md` file in `docs/` MUST start with a YAML frontmatter block enclosed by `---`:

```yaml
---
type: Concept # REQUIRED: The entity type (e.g. Concept, Software, schema:Person, Index)
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
- **`type:` (MANDATORY)**: Must always be specified on every document (including `index.md`).
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
- **Link Integrity**: All relative magic links MUST resolve to existing `.md` or `index.md` files.

### 5. Category Hierarchy & Orphan Prevention
- **Directory Index**: Every directory containing sub-directories or markdown files MUST contain an `index.md`.
- **Parent Index Links**: The `index.md` MUST list and link to all subcategories and sibling articles in that directory.
- **No Orphan Pages**: Every page in the wiki must be discoverable and reachable from its parent `index.md` or a category overview.

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

### Recipe C: Generate or Update Missing `index.md`
When adding a new directory `docs/domain/topic/`, create `docs/domain/topic/index.md`:
```markdown
---
type: Index
---

# Topic Name

Overview and index of topics and resources.

## Subcategories

- [[subtopic/index]]

## Articles

- [[article-one]]
- [[article-two]]
```
And add `[[topic/index]]` to `docs/domain/index.md`.
