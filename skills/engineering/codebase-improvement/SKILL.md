---
name: codebase-improvement
description: Improve structure where it causes friction. Use when code is painful to change or you ask to refactor. Failing symptoms use diagnosing-bugs.
---

# Codebase Improvement

Find what makes a real change difficult, then choose the smallest structural
improvement that removes that friction. A large file or unfamiliar style alone
does not justify a refactor.

## What done looks like

A supported problem, an explicit behavior contract, the chosen structure and
its trade-offs, and increments that can each be checked. For a planning request,
the deliverable is the plan. For an authorized refactor, it is the verified change.

## How the work goes

- Inspect the relevant callers, data flow, tests and change history; weight
  areas that changed recently or repeatedly, where structure pays back. Separate
  observed friction from a plausible concern and recorded rationale from inferred
  intent. If no concrete friction emerges, ask for an example; unchanged code is
  a valid outcome. Measure factual questions rather than putting them to a vote.
- When asked to survey rather than to fix a named friction, present candidates
  before designing any: files involved, the friction, the proposed change, its
  payoff in locality, leverage and tests, and a strength of strong, worth
  exploring or speculative. Recommend one to tackle first; design interfaces
  only for the candidate the user picks. [Deepening](references/deepening.md)
  lists where friction shows.
- Compare genuinely different structures when the direction is unresolved.
  Show caller usage first, then the interface and what moves where, with when
  each wins and what it costs. Do not manufacture alternatives to an already
  chosen approach. A call tree, structural diff or before/after example is often
  enough to make the choice concrete. Draft each candidate under a different
  pressure, such as fewest entry points or simplest common call, then recommend
  one or a hybrid and say why.
- Prefer ownership that hides a substantial responsibility behind a small
  interface; the interface is all a caller must know, including
  invariants, ordering, errors and configuration. Apply the deletion test: if
  removing a module would only move its code, it is a pass-through; if complexity
  would reappear across callers, it earns its keep. Look for callers coordinating
  internal stages, shared storage or wire details. Delete redundant coordination
  before adding wrappers. When a new interface replaces an old one and no
  outside caller depends on it, migrate the callers and delete the old one in
  the same change rather than keeping a compatibility layer. A port needs two
  real adapters, usually production and
  test; one is indirection. [Deepening](references/deepening.md) maps dependency
  kinds to seams and tests.
- State which behavior must remain identical. Where a meaningful behavior check
  is missing, establishing it is the first implementation increment. Test the
  public contract rather than the new file layout or internal call sequence;
  delete tests of the merged pieces only where the public contract now asserts
  what they covered.
- Sequence independently verifiable changes; check each before continuing.
  For branchy work, record dependencies and acceptance checks in the project's
  existing plans. Keep vocabulary and difficult-to-reverse decisions only where
  they would otherwise be expensive to rediscover. Do not re-propose what a
  recorded decision rejected unless observed friction justifies reopening it;
  say so when it does. When the user rejects a candidate for a reason a future
  review would need, offer to record it.

## Boundaries

Preserve behavior unless the user agreed to change it. Resolve consequential
choices with the human; reuse decisions and authorization already given. If the
user asked to implement a settled refactor, carry it through the relevant checks,
continuing between increments rather than pausing to report or offer.
If they asked for options or a plan, stop there with one recommended next step.

Carry context across rather than restarting discovery.
Any handoff must identify the goal, scope, decisions, material open questions,
affected files and acceptance checks, with references that still exist.

## Handoffs

**run** continues into that skill with this context unless the request stops
short of it, then it is only suggested. **suggest** names it in one closing line
once the deliverable is final and never continues unasked. A missing skill never
blocks; do the work inline.

- Product intent is unsettled → run **idea-development**
- The friction is a bounded bug → run **diagnosing-bugs**
- The structure is not yet understood → run **explain-code**
- A chosen refactor needs behavior checks built first → run **feature-development**
- The refactor is implemented → run **critic**
- The friction comes from the repo's setup, not its code → suggest **agent-setup**
- Verified work needs its commit message or PR body → suggest **close-out**
