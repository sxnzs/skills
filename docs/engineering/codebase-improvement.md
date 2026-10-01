# codebase-improvement

> Improve structure where it causes friction.

## What it does

`codebase-improvement` finds what makes a real change difficult, then chooses the smallest structural improvement that removes that friction. A large file or unfamiliar style alone does not justify a refactor; the skill separates observed friction from a plausible concern, and unchanged code is a valid outcome. When no concrete friction emerges, it asks for an example, and factual questions get measured rather than put to a vote.

Investigation starts with callers, data flow, tests and change history, weighting areas that changed recently or repeatedly — that's where structure pays back. When the direction is unresolved, the skill compares different structures rather than manufacturing alternatives to an approach already chosen. Each candidate is shown with caller usage, the interface, what moves where, when it wins and what it costs, often made concrete with a call tree, structural diff or before/after example.

The preferred shape is a deep module: a substantial responsibility hidden behind a small interface that is all a caller must know, including invariants, ordering, errors and configuration. The deletion test sorts real modules from pass-throughs — if removing a module would only move its code, it's indirection; if its complexity would reappear across callers, it earns its keep. Callers coordinating internal stages, shared storage or wire details are the smell to look for, and redundant coordination gets deleted before wrappers get added. Any behavior that must stay identical is stated up front; where no meaningful behavior check exists, establishing one is the first increment. Work then proceeds as independently verifiable changes, each checked before the next.

## When to reach for it

Say "refactor this", "this module is a mess", or "changes here take too long".

| Your situation | Reach for |
| --- | --- |
| The code works but structure slows every change | `codebase-improvement` |
| New behavior needs to be built | [feature-development](feature-development.md) |
| Something is broken and you don't know why | [diagnosing-bugs](diagnosing-bugs.md) |
| What the product should do is still unsettled | [idea-development](../design/idea-development.md) |
| The refactor is done and needs a check | [critic](critic.md) |

## It's working if

- The deliverable names a supported problem, an explicit behavior contract, the chosen structure and its trade-offs.
- Proposed modules pass the deletion test: removing one would make its hidden complexity reappear across callers, rather than simply relocate its code.
- Tests assert the public contract, not the new file layout or internal call sequence.
- Changes are sequenced so each can be verified on its own, and each is checked before continuing.
- Behavior is preserved unless the user agreed to change it.

## Common questions

**Does it refactor on request or plan first?**
It matches the request. A planning request stops at the plan; a request to implement a settled refactor carries through the relevant checks, continuing between increments rather than pausing to offer.

**How does it decide between structures?**
When direction is unresolved, each candidate is drafted under a different pressure, such as fewest entry points or simplest common call, then one or a hybrid is recommended with the reasoning stated.

**What if there's no test protecting the behavior being restructured?**
Establishing a meaningful behavior check becomes the first implementation increment, before any structure moves.

**Will it reopen settled decisions?**
Not by default. An alternative rejected by a recorded decision stays rejected unless observed friction justifies reopening it; if it does, the skill says so.

## Where it fits

Structure work sits between building and fixing: [feature-development](feature-development.md) hands over demonstrated friction when slices are blocked, and a bounded bug goes to [diagnosing-bugs](diagnosing-bugs.md) instead. Unsettled product intent belongs upstream with [idea-development](../design/idea-development.md). Once a refactor lands, [code-review](code-review.md) can check the change, and behavior-preserving claims are exactly what [critic](critic.md) is built to test.
