---
name: code-review
description: Review changes against their intended behavior and this repository's standards. Use when reviewing a diff, branch, PR, or work in progress. For checking whether finished work is done, use critic.
---

Review with two separate lenses and report them separately; a change can pass
one and fail the other.

- **Intent:** does it do what was asked? Find the spec in commit messages, a
  linked file, `specs/`, plans, or the conversation. Missing requirements,
  wrong behavior, and unasked-for scope all count. No spec: say so.
- **Standards:** does it follow this repository's written rules (`AGENTS.md`,
  contributing notes, its verify command)? Documented rules outrank general
  taste; label taste as taste.

Scope is everything that changed, including uncommitted and untracked files,
unless told otherwise. Run the repository's checks rather than assuming them.

Rank by consequence: data loss, security, fail-open paths, and anything that
publishes what should stay private come first. Cite file:line for each
finding, say how it fails, and separate must-fix from judgment calls. Do not
pad; a short list of real findings beats a long list with noise.

End with `FINDINGS:` and a numbered list: severity, file:line, one line each.
