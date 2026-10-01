---
name: idea-development
description: Turn an idea into decisions and a plan. Use when brainstorming or scoping. Refactors use codebase-improvement.
---

# Idea Development

Make the idea concrete enough to judge and the plan specific enough to build.
Preserve the user's goal while challenging assumptions that could undermine it.

## What done looks like

A shared outcome and intended user, the decisions and their reasons, consequential
unknowns, and a plan with observable acceptance checks. Deciding that the idea is
not worth building is also a useful outcome.

## How the conversation goes

- Read the relevant existing work before asking for facts you can find. Separate
  facts to inspect or measure from choices about users, outcomes and preferences.
  Explain unfamiliar concepts at the depth needed for the decision. When a term
  conflicts with the project's glossary or code, or is overloaded ("account":
  customer or user?), name the conflict and propose a precise term; probe its
  boundaries with concrete edge cases.
- Order questions by dependency. Settle an intended user or success criterion
  before choices that depend on it; ask about the currently answerable decisions,
  not a questionnaire for the entire project. Ask that set in one round, numbered,
  with your recommended answer for each; a question that depends on another one
  still open waits for the next round. Look up facts yourself, in parallel when
  possible, and hold back only the questions that depend on them. Prioritize an
  unknown that could invalidate the idea over polishing details.
- Bring concrete proposals and honest trade-offs for unresolved choices. Use
  the smallest useful representation: example usage for a capability, a flow
  for an interaction, a structural diff for a change, or a [logic
  prototype](references/logic-prototype.md) for a state model or rules.
  Compare real alternatives; do not invent a menu where constraints already
  determine the answer.
- Reuse the user's decisions. Choose reasonable reversible details within them,
  stating assumptions when they affect the result. Ask when an answer changes
  the outcome, scope or commitment; continue independent work while it is open.
- When an answer lives with someone else, write them a
  [questionnaire](references/questionnaire.md); ask the user only who it goes
  to and what they need back.
- Capture decisions and durable vocabulary in the handoff. When a saved plan
  is requested or part of the project's established workflow, use existing notes.
  Record rationale and material rejected alternatives rather than the transcript.
  Keep terms and decision records per [domain language](references/domain-language.md).
  Size the plan to the work: a paragraph can suffice; dependencies and checks
  belong in a graph when phases branch or rejoin. A requested spec follows
  [spec shape](references/spec.md), synthesized from what is already settled.
  When the way is too foggy for one session, chart a
  [multi-session map](references/multi-session-map.md) of decisions instead.

## Boundaries

The conversation is done when the currently answerable decisions are settled or
explicitly deferred, and nothing consequential is silently assumed. Brainstorming
and planning requests stop at the agreed direction or plan, with one recommended
next step; discussion alone does not authorize production edits.
When the user has also requested implementation and the material choices are
resolved, carry that context into **feature-development** instead of asking them
to approve the same work again. Facts outside the project that a decision waits
on belong to **research**.

Existing structural friction belongs to **codebase-improvement**; appearance to
**visual-design**; interface behavior to **ui-design**. Use an available helper
only when useful. The handoff must state goal, scope, decisions, meaningful open
questions, affected artifacts and acceptance checks; keep its references usable.
