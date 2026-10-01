# idea-development

> Turn an idea into decisions and a plan.

## What it does

`idea-development` makes an idea concrete enough to judge and the plan specific enough to build. It preserves the goal while challenging assumptions that could undermine it, and the output is a shared outcome and intended user, the decisions with their reasons, the consequential unknowns, and a plan with observable acceptance checks. Deciding the idea isn't worth building is also a useful outcome.

The conversation is ordered by dependency. It reads existing work before asking for facts it can find, separates facts to inspect or measure from choices about users, outcomes and preferences, and settles an intended user or success criterion before the choices that depend on it. Questions come in dependency-ordered rounds — one numbered set of currently answerable decisions, each with a recommended answer — while unknowns that could invalidate the idea outrank polishing details. Unresolved choices get concrete proposals and honest trade-offs in the smallest useful representation: example usage for a capability, a flow for an interaction, a structural diff for a change, or a logic prototype for a state model. Real alternatives are compared; no menu is invented where constraints already determine the answer.

The user's decisions are reused rather than re-litigated; reasonable reversible details get chosen within them, and questions are asked only when an answer changes outcome, scope or commitment. When an answer lives with someone else, a questionnaire is written for that person. The handoff captures decisions and durable vocabulary — rationale and rejected alternatives, not the transcript — with plan size matched to the work: a paragraph can suffice, while branching phases get a dependency graph. Bundled references cover questionnaires, logic prototypes, spec shape and multi-session maps.

## When to reach for it

Say "let's think through this idea", "help me scope this", or "what should we build".

| Your situation | Reach for |
| --- | --- |
| An idea needs decisions before anyone builds | `idea-development` |
| A decision waits on a fact outside the project | [research](../productivity/research.md) |
| The plan is settled and implementation starts | [feature-development](../engineering/feature-development.md) |
| Interface behavior needs designing | [ui-design](ui-design.md) |
| The look — type, color, theme — needs deciding | [visual-design](visual-design.md) |
| Existing structure causes friction, not the idea | [codebase-improvement](../engineering/codebase-improvement.md) |

## It's working if

- The currently answerable decisions are settled or explicitly deferred, and nothing consequential is silently assumed.
- Questions arrive in small numbered rounds with recommended answers, not one questionnaire covering the whole project.
- Unknowns that could invalidate the idea are prioritized over polishing details.
- Rejected alternatives and their reasons are recorded, not just the choice made.
- Discussion ends with one recommended next step — and does not authorize production edits on its own.

## Common questions

**Will it just start building?**
No. Brainstorming and planning requests stop at the agreed direction or plan. When the user has also requested implementation and the material choices are resolved, context carries into [feature-development](../engineering/feature-development.md) without asking for approval of the same work twice.

**What if the answers are with other people?**
It writes those people a questionnaire; the user is asked only who it goes to and what they need back.

**How big is the output?**
Sized to the work. A paragraph can suffice; dependencies and acceptance checks belong in a graph only when phases branch or rejoin. A requested spec follows the bundled spec shape.

**What about vocabulary that keeps shifting?**
Conflicting or overloaded terms are named and a precise term proposed, then probed with concrete edge cases and recorded as durable language in the handoff.

## Where it fits

This is the front door of the design set: ideas in, decisions out. Facts a decision waits on go to [research](../productivity/research.md); once the direction is agreed, [feature-development](../engineering/feature-development.md) builds it, [ui-design](ui-design.md) shapes the flows, and [visual-design](visual-design.md) settles the look. Structural friction in an existing codebase is [codebase-improvement](../engineering/codebase-improvement.md)'s territory instead.
