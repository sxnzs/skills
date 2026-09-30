---
name: codebase-improvement
description: Find what makes existing code hard to change, agree on a better structure among genuinely different alternatives, and plan the change in verifiable steps. Use when someone says "help me improve this codebase", asks to refactor, restructure, or pay down tech debt, code is painful to change, or a module's shape is fighting the work. Not for a single bug fix or feature. Plans before editing.
---

# Codebase Improvement

Work out, together, what is actually making this code hard to work with and what a better shape would be, before anyone changes it.

## What done looks like

- The friction, stated concretely: which change was hard, where, and why.
- Two or three structurally different alternatives. If one reads as a tweak of
  another, they are one alternative.
- For each: the caller's usage first, then the interface, then what moves where,
  and an honest "when it wins / what it costs".
- The chosen direction, the alternatives rejected and why.
- An implementation plan with steps small enough to verify one at a time, and
  what check proves each step didn't break behavior.

"Leave it as it is" is a valid alternative and sometimes the right answer.

## How the work goes

- **Ground it in real friction.** Start from a change someone tried to make, a
  bug that kept recurring, or code nobody wants to touch. If the human hasn't
  named one, ask for it before proposing anything. Improvements without a felt
  problem are taste, not engineering.
- **Read before proposing.** Trace how the code is actually called and changed.
  Git history often shows where the pain is.
- **Show the shape, not the essay.** Usage examples, call trees, and before/after
  structure let the human disagree with something specific.
- **Prefer deleting to adding.** Removing a layer beats wrapping it.
- **Settle what can be measured by measuring it.** Test coverage, call counts,
  and build times don't need the human's opinion.

## Boundaries

- Plan before editing. The human picks the direction; the plan is the handoff.
  Write it where the project already keeps plans or docs.
- Keep behavior identical unless a behavior change was explicitly agreed. If
  there is no check that would catch a behavior change, adding one is step one.
- If the real question is "what should this product do", switch to
  **idea-development**, carrying what you learned.
