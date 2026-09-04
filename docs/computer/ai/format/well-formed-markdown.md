---
type: specification
generated: { by: human/vorburger.ch, at: 2026-08-28 }
---

# Well formed Markdown

Well formed Markdown constrains [[markdown]] to common conventions.

## Example

```markdown
---
tags: [ example ]
---
# Example Conversation

This is an example of [the Conversation Markdown format](https://wiki.enola.dev/computer/ai/format/markdown-conversation.html).

## Sub-heading

It's cool.
```

## Rules

Well formed Markdown meets all of the following semantic rules.

These rules are not configurable; related tools don't have any related opt-in / opt-out flags.

* WFMD-1: Broken Links are not allowed in well formed markdown
* WFMD-2: It may have YAML front matter
* WFMD-3: Must start with a heading 1
* WFMD-4: Heading Levels must consistently increment, and be without any gaps

Well formed Markdown validation tools check (AKA [lint](<https://en.wikipedia.org/wiki/Lint_(software)>)) MD, and emit diagnostics about rule violations, which humans or AI tools must fix.

## Format

Well formed Markdown meets the following formatting rules:

* Hashtag instead of underline heading style
* Dash instead of asterisk or star unordered list style

These rules are not validated, like the above semantic rules are. Instead, formatters automatically re-write markdown to meet these rules.

## Unspecified

Well formed Markdown does not impose any maximum line length.

Bare URLs are allowed.

## References

* [`davidanson/markdownlint`](https://github.com/davidanson/markdownlint) is a highly configurable checker (lint) tool for Markdown

## ToDo

1. Complement above for all [`davidanson/markdownlint` rules](https://github.com/davidanson/markdownlint#rules--aliases)
2. Let AI compare this with and complement it from [https://github.com/enola-dev/wiki/blob/main/AGENTS.md](https://github.com/enola-dev/wiki/blob/main/AGENTS.md) and [https://github.com/GoogleCloudPlatform/open-knowledge-format/blob/main/SPEC.md](https://github.com/GoogleCloudPlatform/open-knowledge-format/blob/main/SPEC.md)
3. Review this by an AI, ask it for opinion, request clarification if any, and research for any similar existing prior art
4. Let AI deduct all Rules from Example
5. Code a `WellFormedMarkdownLinter.java`
6. Write a [`davidanson/markdownlint`](https://github.com/davidanson/markdownlint) rule set (see [enola's `.markdownlint.yaml`](https://github.com/enola-dev/enola/blob/main/.markdownlint.yaml))
