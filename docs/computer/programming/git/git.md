---
type: Software
resource: https://git-scm.com
generated: { by: reference_agent/gemini-3.7-flash, at: 2026-09-04T13:30:00Z }
tags:
  - git
  - vcs
  - tools
sources:
  - resource: https://git-scm.com
    title: "Git Official Site"
---

# Git Version Control System

Git is a distributed version control system designed to track changes in source code with speed, data integrity, and support for distributed, non-linear workflows.

## Overview

Git tracks changes in a repository using a content-addressable object database (blobs, trees, commits, and tags) alongside a reference storage backend that maps human-readable branch names, tags, and `HEAD` to object IDs.

## Reference Storage Backends

Historically, Git stored references as individual loose files under `.git/refs/` and consolidated them into a `.git/packed-refs` file. Newer Git versions introduce alternative reference storage mechanisms:

- [[reftable]]: A binary, transactional reference storage format designed for high performance and atomic updates in repositories with large numbers of refs.

## Related Topics

- [[../nix/nix]]
