---
name: idea-development
description: Develop a loose idea into a shared vision, recorded decisions, and a buildable plan through two-way discussion. Use when someone says "help me develop this idea", "talk this through with me", or "is this worth building?", wants to brainstorm or spec something new, or has a hunch that isn't a plan yet. Stops at the plan. For restructuring existing code use codebase-improvement.
---

# Idea Development

Turn a half-formed idea into something both of you understand the same way, then into a plan someone could build from.

## What done looks like

- A short statement of the idea that the human agrees is theirs.
- The decisions made along the way, each with the reason and the options rejected.
- Open questions that remain, named rather than papered over.
- A plan sized to the work: a paragraph for a small idea, phased steps with a
  completion check per phase for a large one.

Stop earlier if the idea turns out not to be worth building. That is a result, not a failure.

## How the conversation goes

- **Look before you ask.** Read the code, docs, or prior notes the idea touches
  before asking the human anything they could have expected you to find.
- **Arrive with proposals, not a blank form.** Where a question has plausible
  answers, bring two or three grounded options and their trade-offs. The human
  chooses; you don't mandate.
- **Route questions by who can answer them.** If running something, reading
  something, or a quick experiment settles it, do that. Save the human's
  attention for preference, taste, and product calls.
- **Take the riskiest unknown first.** Settle what could sink the idea before
  polishing what couldn't.
- **Make the idea concrete enough to disagree with.** Show the smallest view
  that makes the point: example usage, a sketch of the interface, a before/after,
  a file tree, a throwaway prototype. Abstract agreement hides real disagreement.
- **Challenge, don't interrogate.** Push on assumptions that would change the
  plan. Skip ones that wouldn't.

## Boundaries

- Capture decisions, not the transcript. Record a decision when it would be
  expensive to rediscover. Write the result where the project already keeps
  plans or docs; ask once if there is no obvious place.
- The plan is a handoff, not the build. Implementation, tickets, and review are
  separate work; offer them, don't start them.
- If the idea is really "make this existing code better", switch to
  **codebase-improvement**. If it is about how something looks or behaves on
  screen, bring in **visual-design** or **ui-design**. Carry the context across;
  don't restart discovery.
