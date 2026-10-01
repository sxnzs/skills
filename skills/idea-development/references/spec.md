# Spec shape

Use when a settled direction should become a document someone else can build
from. Synthesize from the conversation and codebase; do not reopen decisions
already made. Use the project's glossary terms and respect its recorded
decisions. Save a local draft using the project's spec conventions. Publish to
the project's spec store or update issues only when those writes are already
authorized; otherwise hand over the local draft.

- **Problem:** the situation from the user's side.
- **Solution:** the intended outcome from the user's side.
- **Scenarios:** numbered "as a <role>, I want <capability>, so that <benefit>"
  statements, or concrete usage examples, covering the main path, edge cases
  and refusals the decisions imply.
- **Decisions:** modules touched, interface changes, contracts, schema and
  interaction choices, with their reasons. Avoid file paths and code that will
  rot; a short snippet from a prototype is fine when it states a decision
  (a state machine, a type shape) more precisely than prose.
- **Testing:** the public seams where behavior will be checked, preferring
  existing and higher seams and as few as possible; what a good test asserts
  here; similar tests already in the codebase.
- **Out of scope:** what this work deliberately leaves alone.
- **Open questions:** anything still unsettled, with who can answer it.

Size it to the work. A small change needs a paragraph per heading at most.

## Recurring workflows

When the spec describes a repeated process rather than a feature, also name its
trigger (an event or a schedule; events are usually cheaper), any human
checkpoints, pushed as late as possible so the person decides once with
everything prepared, and the brief each checkpoint shows: what was produced,
why, and a link to it. Add none of these unless the process needs it. Done when
someone could build it without asking a question.
