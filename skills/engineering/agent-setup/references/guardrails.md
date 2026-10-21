# Guardrails and loops

Read when the ask is a destructive-command guard, commit-time checks or a
recurring agent-driven improvement loop. Each of these changes what runs on the
user's behalf; propose the exact change and get approval first.

## Destructive command guard

A pre-tool hook can block commands an agent should not run unasked: pushes
(including forced), hard resets, forced cleans of untracked files, forced branch
deletion, and whole-tree checkouts or restores that discard edits. The blocked
message should say the agent lacks authority for that command and name what to do
instead. Ask whether the guard applies to this project or every project, test
that a blocked command is blocked and a safe one is not, and keep the allow path
for the user to run themselves.

## Commit-time checks

Add checks the project already trusts (format staged files, typecheck, tests) to
the hook mechanism it already uses; do not introduce a second one. Keep them fast
enough that nobody skips them.

## Recurring improvement loop

Only when the user wants some property of the codebase driven toward a target by
small reviewable changes on a schedule. Design it with them, from the repo's own
tooling, using the control-loop parts:

- **Set point:** the target state of one property.
- **Sensor:** a command that measures the gap and runs locally.
- **Controller:** the rule that picks the next small, low-risk change.
- **Actuator:** an agent skill or workflow that applies it and opens a PR.
- **Feedback:** a file that carries standing corrections between runs, with a
  human steering from outside the loop.
- **Dampener (optional):** a gate that keeps the property from getting worse
  while the loop improves it.

Write the design down before building and let the user correct it. Make each
part runnable by hand before wiring it into CI. The workflow only orchestrates
parts that already work.
