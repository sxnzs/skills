# Retro

Improve the environment the next agent works in, using what this session
actually did. Read the session's own record (transcript, tool calls, diffs)
rather than recalling it, then list candidates by severity.

## Where to look

- **Navigation:** time spent finding files or facts, or hidden coupling between
  files. A one-line pointer in the right place often fixes it.
- **Automated checks:** a mistake a linter, type check, test or file rule could
  have caught. Read the repository's existing check commands and CI first; an
  unwired or broken check is the finding, not a missing one. A repository with
  no pre-commit hook or CI running its checks is itself a finding.
- **Review rules:** a mistake review missed. Mechanical rules (a banned call, an
  import shape, a file location) become deterministic checks; only judgment
  calls belong in written standards that review applies.
- **Always-loaded instructions:** files injected into every session should hold
  pointers, not manuals. Move detail to docs read on demand, move enforceable
  rules into checks, and delete instructions that change no behavior.
- **Tool economy:** expensive calls or verbose tools that could be narrowed.
- **Information access:** a fact the agent needed but could not reach, such as
  server logs or read-only access to a service.

Implementation carries the most context pressure and review the least, so
standards belong with review and checks, not in the implementer's prompt.

## Output

Each candidate: what happened, the evidence, the proposed change and where it
lives. Propose; apply changes only when asked.
