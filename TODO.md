# ToDo

- [ ] Turn this into a SaaS? 🧓

- [ ] Store prompts and session trajectories alongside, and link to it from articles

- [ ] Figure out how to configure Antigravity, or use another Harness, to prompt Wiki updates - without constantly:
  - asking for permission to access each external website
  - skip proposing an Implementation plan
  - how to save this, and then permission to run `bin/wiki-lint` inside this repo

- [ ] Find, or write, a command line AI harness runner (`agy`, with policy?) which can run our`/wiki-maintenance` skill once a week or whatever (without prompts, yet safe)

- [ ] [JSON Schema for OKF frontmatter](https://github.com/GoogleCloudPlatform/open-knowledge-format/issues/8) (useable e.g. by a validator for it)

- [ ] [Permit MediaWiki-style internal links syntax ([[`concept`]]) in OKF Markdown](https://github.com/GoogleCloudPlatform/open-knowledge-format/issues/9).

- [ ] Transform AGENTS.md into `docs/computer/ai/software/enola/wiki.md` (?), and keep it in sync #AI

- [ ] Try out https://github.com/GoogleCloudPlatform/open-knowledge-format#visualize

- [ ] Create a new small separate `okf-tools` repo, and use an existing Java MD parser to write an initial basic validator of MD and YAML frontmatter, including checking for the required `type:` field, using a JSON Schema.

- [ ] `wiki generate broken` to auto-generate a `BROKEN.md` file with a list of all broken links in the repo, and a link to the source files.

- [ ] `todo generate` command to auto-generate a TODO.md file with `- [ ]` items from all `.md` files in the repo, and a link to the source file.

- [ ] Have our MD parser serve as formatter - read and re-write, and run it as pre-commit

- [ ] Waz https://llm-wiki.net ?
