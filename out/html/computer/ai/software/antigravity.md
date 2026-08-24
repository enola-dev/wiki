---
type: Software
resource: https://antigravity.google
generated: { by: reference_agent/gemini-3.7-flash, at: 2026-08-23T18:11:32Z }
tags:
  - ai
  - agents
  - developer-tools
  - security
---

# Google Antigravity

Google Antigravity is an AI-first software development platform and agentic coding environment comprising a desktop application, IDE extensions, and the `agy` command-line interface.

## Permissions & Security Architecture

Antigravity operates a unified, fine-grained permissions engine formatted as `action(target)` (such as `read_url(*)`, `command(git)`, or `write_file(src/)`). Operations are evaluated across three priority tiers: **Deny > Ask > Allow**.

### Configuration Scopes

When managing permissions (via the `/permissions` interactive TUI in `agy` or the settings panel), permissions are split into three distinct scopes:

1. **Project Scope**: Rules that apply exclusively when operating within a specific project/repository.
2. **Shared Scope**: Rules shared across all Antigravity surfaces on the machine (IDE, Desktop App, and CLI).
3. **Global Scope**: Rules applied across all sessions for the `agy` CLI.

### Storage Locations on Disk

| Scope | Location on Disk | Description |
| :--- | :--- | :--- |
| **Project Permissions** | `~/.gemini/config/projects/<project-uuid>.json` | Project-scoped permission grants and trusted settings, keyed to the local repository directory path. |
| **Global CLI Settings** | `~/.gemini/antigravity-cli/settings.json` | User-level global settings and global permission grants. |
| **Shared Antigravity Config** | `~/.gemini/config/` / `~/.gemini/antigravity/` | Cross-surface preferences and shared state. |

### Repository-Level vs. Local Security Isolation

Project permissions **cannot** be defined or committed directly within the Git repository folder itself (such as a checked-in `.antigravity/permissions.json`).

This design is a deliberate security boundary:
* **Preventing Repo-Level Privilege Escalation**: If repositories could declare their own permission bypasses or auto-approval rules in checked-in files, cloning an untrusted or malicious third-party repository could lead to arbitrary command execution, network exfiltration, or local file compromises without user consent.
* **Separation of Capabilities and Authorization**: Collaborative assets such as custom agent instructions, rules, workflows, and tools are shared via the repository (in `AGENTS.md`, `GEMINI.md`, and `.agents/`), while actual permission authorizations remain strictly under the developer's local user-level control.
