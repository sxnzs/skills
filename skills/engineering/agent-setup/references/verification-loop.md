# Verification loop

Read when agents need a scripted way to drive the real app and prove behavior.
Write it for the next agent, who will read it cold in the middle of a task and
has never seen the app. Prefer the repo's own harness (browser tests, PTY or
tmux scripts, curl-able endpoints) over a generic one.

## Learn the app, not the user

- **Surface:** what a user actually touches: web UI, CLI or TUI, desktop app,
  API, library. Pick the primary surface; note the others.
- **Run:** the documented start command, ports, environment, seed data and auth.
- **Drive:** how a program can use it. Existing harnesses first.
- **Observe:** screenshots, terminal transcripts, response bodies, logs, exit
  codes, database state.
- **Isolate:** whether two instances can run side by side. If not, the loop
  must refuse to drive a shared instance rather than corrupt a running session.

## Write a project-local skill or script with these parts

- **Launch:** the exact command and how to tell it is ready; include teardown.
- **Doctor:** one read-only check that answers "is this instance worth
  driving?" (process up, right build, port owned by us, auth valid).
- **Drive:** real commands or selectors from this repo, preferring stable
  handles (labels, data attributes, prompt strings, routes) over coordinates.
- **Evidence:** exercise the real user path, not internal setters or test-only
  endpoints; capture the action and the resulting state; check side effects
  such as files, rows and messages as well as what is visible. A dry-run mode
  proves only what you observe it skipping.
- **Cleanup:** stop what the run started, never by process name. Remove
  instances and scratch state, never the evidence.
- **Helpers:** any script it ships is executable and its invocation is shown.

## Feature map

Seed one short file per user-facing feature, starting with the top three to
five: what it is, how a user reaches it, how the harness drives it, what
observable end state proves it works, and gotchas. A proof that drives one
convenient entry point is incomplete when the map lists others.

## Prove it

Run launch, doctor, one feature, evidence capture and cleanup. Confirm the
evidence survived cleanup. Fix what failed and clean up after each failed
attempt. Revisit the map when features change.
