# ToDo

- [ ] Validate if `/people/vorburger.ch.md` matches the spec described in AGENTS.md, and if not, fix it.

- [ ] Create a https://github.com/GoogleCloudPlatform/open-knowledge-format/issues suggesting a JSON Schema for OKF frontmatter (useable e.g. by a validator for it).

- [ ] Create a https://github.com/GoogleCloudPlatform/open-knowledge-format/issues suggesting https://docs.enola.dev/specs/markdown-magic-link support.

- [ ] Transform AGENTS.md into `docs/computer/ai/software/enola/wiki.md` (?), and keep it in sync #AI

- [ ] Try out https://github.com/GoogleCloudPlatform/open-knowledge-format#visualize

- [ ] Create a new small separate `okf-tools` repo, and use an existing Java MD parser to write an initial basic validator of MD and YAML frontmatter, including checking for the required `type:` field, using a JSON Schema.

- [ ] `okf generate index` command to auto-generate `index.md` files for all subdirectories, with a list of all `.md` files in that directory, and a link to the parent directory.

- [ ] Implement a Java MD parser extension plugin for https://docs.enola.dev/specs/markdown-magic-link, and write a generator that converts our MD to MD with the magic links resolved.

- [ ] `wiki generate broken` to auto-generate a `BROKEN.md` file with a list of all broken links in the repo, and a link to the source files.

- [ ] `todo generate` command to auto-generate a TODO.md file with `- [ ]` items from all `.md` files in the repo, and a link to the source file.

- [ ] Generate HTML site from Markdown, with Edit links to GitHub

- [ ] publish as `wiki.enola.dev`

- [ ] Have our MD parser serve as formatter - read and re-write, and run it as pre-commit

- [ ] Waz https://llm-wiki.net ?
