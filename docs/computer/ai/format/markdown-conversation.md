---
type: specification
generated: { by: human/vorburger.ch, at: 2026-08-28 }
---

# Conversation Markdown

Conversation Markdown is a convention how to format chat conversations in [[well-formed-markdown]]. 

It is useful to capture things such as:

* chats a human might have with an AI
* human-to-human e.g. over an Instant Messenger
* an email thread
* issue tracker

## Example

```markdown
# Example Conversation

This is an example of [the Conversation Markdown format](https://wiki.enola.dev/computer/ai/format/markdown-conversation.html).

## Joe requested an image

joe@ 2026-08-28T11:04:08Z

Turn this document into an image.

+[document.pdf](/files/zQmdceedY6vVreSBK18iJz2PjFf3964xH18w4541n2wZ)

## Gemini generated it

/ai/gemini-3.7-flash 2026-08-28T11:05:02Z
{ origin: trajectory1 }

Here is an illustration.

+[image.png](/files/zQmdfffeedY7vVreSBK19iJz2PjFf3Z)
```

## Rules

* Conversation Markdown must be [[well-formed-markdown]]

## Conventions

* The timestamp is an ISO 8601 datetime. Is it allowed to be "partial" (e.g. just date)

* The "actor" string may be an email address (as in a `mailto:` URI), just a partial local `user@`, relative path (`../user/tony`), absolute path to a "bundle" root (`/people/maria`), or any full URI

* AI models or agents use the same "actor" string format

* The "role" (`user` vs `agent`) is determined by what the actor string points to

## ToDo

1. Review this by an AI, ask it for opinion, request clarification if any, and research for any similar existing prior art
1. Let AI deduct Rules from Example
1. Write `Conversation.java` model
1. Write generator & parser code
