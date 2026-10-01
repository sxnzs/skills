# Merge Conflicts

Read when a merge or rebase interrupts feature work.

- Inspect the current operation, conflicted paths, base and both sides' changes.
  Separate edits you own from unrelated work before touching a resolution.
- Trace each side's purpose to its commit message, spec, ticket or review
  discussion. Treat code proximity as evidence of overlap, not proof of intent.
  Distinguish documented intent from inference.
- Resolve each hunk to retain both intended outcomes where compatible. If they
  conflict, use the integration's stated goal and record the trade-off. Ask when
  that goal cannot settle a consequential behavior choice; preserve the current
  operation while resolving the question. Do not invent a third feature merely
  to make the text merge.
- Inspect the combined behavior beyond the marked hunks. Check for lost callers,
  obsolete tests and mismatched contracts; a marker-free file is not proof of a
  correct integration. Run focused acceptance tests and required project checks,
  and fix integration-caused failures.
- Continue the existing merge or rebase within the project's authorization,
  staging only resolved paths in scope. Recheck subsequent conflicts by the same
  method. Never abort the operation as a conflict-resolution shortcut, discard
  another contributor's changes or stage the whole working tree indiscriminately.

Report resolved intents, consequential trade-offs and verification results. If
authority or source evidence is missing, name the blocker without claiming the
integration is complete.
