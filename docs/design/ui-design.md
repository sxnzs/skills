# ui-design

> Design flows, states and interactions with prototypes.

## What it does

`ui-design` designs what the person sees, does and gets back while completing a real task. It settles behavior questions with working interaction evidence and leaves genuine preferences among viable options to human judgment. The output is the user and task, scoped flows and states, a clear information hierarchy, and interaction decisions a builder can apply — with task checks, trade-offs and reconstructable prototypes.

Prototypes answer questions, so each one covers the smallest surface that resolves the open question, varying a named axis such as inline editing versus a dialog, with realistic content and equally careful execution. A button question needs no new dashboard. Variants prefer living inside the real page, with its data, chrome and density, over an empty route. Each candidate is then tried at the actual task, at intended size and surroundings: keyboard and pointer paths, feedback, errors and repeat use, plus loading, empty and recovery states where the task reaches them — no fabricated screens to satisfy a checklist.

Observed task failures and accessibility barriers count as evidence: blocked options are repaired or excluded before anyone is asked for a preference. When a choice is still open, viable alternatives are presented with their trade-offs; if the user reserved the choice, the exploration is preserved and the wait is theirs. Boundaries are explicit — unsettled decisions get explored on an isolated surface, settled designs reach production code only when implementation is requested, prototype code is rewritten to production standards rather than promoted, and losing variants stay off the main line. A bundled reference describes a switchable in-place variant setup for comparing candidates.

## When to reach for it

Say "design this flow", "how should this interaction work", or "what happens on empty".

| Your situation | Reach for |
| --- | --- |
| A flow, its states or its interactions are unsettled | `ui-design` |
| The look — type, color, theme — is the open question | [visual-design](visual-design.md) |
| Gesture physics or animation timing need tuning | [motion-design](motion-design.md) |
| The audience or desired outcome is still unclear | [idea-development](idea-development.md) |
| Swift interaction code needs implementing | [write-swift](../engineering/write-swift.md) |

## It's working if

- When alternatives are needed, prototypes vary a named axis and answer a question that is actually open.
- The real task has been run in each candidate, including errors, repeat use and the states the task can reach.
- Accessibility barriers and observed task failures are repaired, or the affected options excluded, before a preference is requested.
- Reserved choices stayed reserved: exploration preserved, selection not claimed on the user's behalf.
- The handoff records chosen flows, state transitions, controls, exact behaviors and acceptance checks with stable artifact paths.

## Common questions

**Is it the same as visual design?**
No. [visual-design](visual-design.md) decides how things look — type, color, theme. This skill decides how things behave: flows, states, hierarchy and interaction, settled with prototypes a person can actually try.

**Why build variants inside the real page?**
An empty route hides density, chrome and data problems that decide the question. In-place variants, compared under real content, give evidence that survives contact with the actual task.

**What if a prototype can't be run?**
A usable artifact is provided and the interactions that remain untested are named, rather than presenting the design as verified.

**What happens to the prototype code?**
It isn't promoted. When implementation is requested, prototype code is rewritten to production standards, and the switchers and losing variants stay out of the main line.

## Where it fits

Within the design set, [idea-development](idea-development.md) settles who the design is for and what outcome counts, this skill settles the interaction, and [visual-design](visual-design.md) settles the aesthetic character. Substantial motion or direct manipulation hands off to [motion-design](motion-design.md). The settled design then becomes build input for engineering skills like [feature-development](../engineering/feature-development.md) or [write-swift](../engineering/write-swift.md).
