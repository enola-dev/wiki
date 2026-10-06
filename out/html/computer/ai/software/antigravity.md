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

| Scope                         | Location on Disk                                | Description                                                                                          |
| :---------------------------- | :---------------------------------------------- | :--------------------------------------------------------------------------------------------------- |
| **Project Permissions**       | `~/.gemini/config/projects/<project-uuid>.json` | Project-scoped permission grants and trusted settings, keyed to the local repository directory path. |
| **Global CLI Settings**       | `~/.gemini/antigravity-cli/settings.json`       | User-level global settings and global permission grants.                                             |
| **Shared Antigravity Config** | `~/.gemini/config/` / `~/.gemini/antigravity/`  | Cross-surface preferences and shared state.                                                          |

### Repository-Level vs. Local Security Isolation

Project permissions **cannot** be defined or committed directly within the Git repository folder itself (such as a checked-in `.antigravity/permissions.json`).

This design is a deliberate security boundary:

- **Preventing Repo-Level Privilege Escalation**: If repositories could declare their own permission bypasses or auto-approval rules in checked-in files, cloning an untrusted or malicious third-party repository could lead to arbitrary command execution, network exfiltration, or local file compromises without user consent.
- **Separation of Capabilities and Authorization**: Collaborative assets such as custom agent instructions, rules, workflows, and tools are shared via the repository (in `AGENTS.md`, `GEMINI.md`, and `.agents/`), while actual permission authorizations remain strictly under the developer's local user-level control.

## Antigravity Java SDK

The [Antigravity Java SDK](https://github.com/glaforge/antigravity-java-sdk) (`io.github.glaforge.antigravity:antigravity-sdk-wrapper`) provides a programmatic Java interface over the local Antigravity `localharness` binary via gRPC and Protocol Buffers.

### API Key Resolution (`GEMINI_API_KEY`)

When instantiating `io.github.glaforge.antigravity.Agent`, `Agent.resolveGeminiApiKey()` resolves the Gemini API key used for both the `localharness` child process environment and the gRPC `GeminiAPIEndpoint` configuration in the following order:

1. Java system property `System.getProperty("GEMINI_API_KEY")`
2. Process environment variable `System.getenv("GEMINI_API_KEY")`
3. A `.local.env` file in the current working directory (`GEMINI_API_KEY=...`)

Passing `GEMINI_API_KEY` only via `AgentConfig.builder().environmentVariables(Map.of("GEMINI_API_KEY", ...))` is **not** sufficient on its own, because `resolveGeminiApiKey()` does not inspect `config.getEnvironmentVariables()` when configuring `GeminiAPIEndpoint` (falling back to `"placeholder"`). When bridging from another environment variable (such as `TEST_GEMINI_API_KEY`), set `System.setProperty("GEMINI_API_KEY", apiKey)` before constructing `new Agent(config)`.

### Workspace & Project Context

- **Process Working Directory (`workspaceDir`)**: Defaults to `Path.of(System.getProperty("user.dir"))` (e.g., the Gradle subproject directory during test execution) and sets the `ProcessBuilder` working directory for `localharness`.
- **Harness Workspaces (`workspaces`)**: Defaults to an empty list (`List.of()`). To declare `FilesystemWorkspace` entries in `HarnessConfig` for built-in file/grep tools and workspace containment, call `.addWorkspace(String)` or `.workspaces(List<String>)` on `AgentConfig.Builder`.
- **Model Endpoint**: When using `GEMINI_API_KEY` (without a custom `baseUrl` or Vertex AI ADC), `localharness` connects directly to the Google AI Studio / Gemini Developer API via `GeminiAPIEndpoint`, billed/attributed to the project that owns the API key.

### Storage Isolation vs. Jetski UI

Conversations executed through `antigravity-java-sdk` do **not** appear in the local Jetski / Antigravity IDE UI because:

1. **Separate Process**: `Agent` spawns an isolated, headless `localharness` Go binary (`~/.antigravity/bin/<slice>/localharness`) over an ephemeral localhost WebSocket port rather than connecting to the running IDE daemon.
2. **Separate Storage Directory (`saveDir`)**: `AgentConfig.Builder` defaults `saveDir` to `${java.io.tmpdir}/antigravity-java` (e.g. `/tmp/antigravity-java/<cascadeId>.db`) and `appDataDir` to `""`, whereas the Jetski UI stores its state under `~/.gemini/jetski`.

### Conversation History & Streaming

While `localharness` persists multi-turn state on disk in `<saveDir>/<cascadeId>.db` (resumable via `.conversationId(id)`), neither `localharness.proto` nor `Agent` exposes a read-back API to list historical messages from a `.db` file after the fact. Instead, conversation history can be captured in real time during each turn via:

- `agent.streamChat(prompt)` (`AgentStream`), which provides `Flow.Publisher` streams for `chunks()` (`textDelta` and `thinkingDelta`), `thoughts()`, `toolCalls()`, and `result()` (`CompletableFuture<AgentResponse>` with `UsageMetadata`).
- Lifecycle hooks (`PreTurnHook`, `PostTurnHook`, `PreToolCallDecideHook`, `PostToolCallHook`, `OnToolErrorHook`, `OnCompactionHook`, `OnStopHook`) to capture tool calls, tool responses, and turn boundaries.

## Antigravity Managed Agent (Gemini Interactions API)

In addition to local execution via `localharness`, the [Antigravity Managed Agent](https://ai.google.dev/gemini-api/docs/antigravity-agent) (`antigravity-preview-09-2026`) can be invoked remotely through the [Gemini Interactions API](https://ai.google.dev/gemini-api/docs/interactions-overview) (`com.google.genai.gaos.models.interactions.CreateAgentInteraction` in `com.google.genai:google-genai`).

### Remote Sandbox Environments & Sources

Managed agent interactions execute inside isolated, Google-hosted Linux sandboxes ([Google Cloud Gemini Agent Environments](../../linux/sandbox/cloud/google-agent-environment.md)):

- **Provisioning a New Remote Environment**: Pass `CreateAgentInteractionEnvironment.of("remote")` for an empty sandbox, or `CreateAgentInteractionEnvironment.of(Environment)` to pre-mount sources and configure network egress.
- **Mounting Sources (`SourceType`)**: `Environment.builder().sources(List<Source>)` supports pre-populating the sandbox before the agent loop starts:
  - `SourceType.REPOSITORY`: Clones a Git repository from `source` URL into `target` (e.g., `/workspace/repo`, up to 500 MB).
  - `SourceType.GCS`: Copies a file or directory from a `gs://` Cloud Storage URI into `target` (up to 2 GB).
  - `SourceType.INLINE`: Writes inline text `content` directly to `target` (up to 1 MB per file, 2 MB total), useful for injecting `.agents/AGENTS.md` or `SKILL.md` files.
- **Environment Lifecycle & Cleanup**: The created `Interaction` returns `interaction.environmentId()`, which can be passed into subsequent `CreateAgentInteraction` calls (`CreateAgentInteractionEnvironment.of(environmentId)`) to reuse the persistent filesystem across turns, or explicitly deleted via `client.environments.deleteEnvironment(environmentId)` when finished.
