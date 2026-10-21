# Instruction file

Read when creating or tightening `AGENTS.md`, `CLAUDE.md` or a similar file.

Hosts may tell the model that a loaded instruction file "may or may not be
relevant" and to ignore what is not. The more of the file that does not apply to
the current task, the more of it risks being skipped, including the parts that
matter. So:

- Keep context that applies to nearly every task as plain text at the top:
  what the project is, its map, its stack.
- Keep every command in a table. Dropping a command costs more than a line.
- Give guidance for one kind of work its own trigger, such as "when adding or
  changing imports" or "when writing a test", and keep triggers narrow. A trigger
  that matches all code matches nothing. Some hosts weight explicit conditional
  blocks (HumanLayer wraps them as `<important if="...">`); others read them as
  plain text, so write the condition in words that also work unwrapped.
- Cut an instruction when a linter, formatter or hook enforces it, when existing
  code shows the pattern, or when it duplicates another rule. Replace snippets
  with a path to a file that has the pattern.
- State which instruction wins when two collide, and which actions need the
  user's approval.

Finish by reading the file as a cold-start agent: could it find the check
commands, the boundaries and the places it must not touch?
