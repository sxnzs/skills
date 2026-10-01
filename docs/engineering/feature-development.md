# feature-development

> Build behavior in test-first slices.

## What it does

`feature-development` turns a spec or ticket into working code by walking a narrow path through the system first, then widening it. Rather than building layers of speculative code, each slice delivers a caller-visible behavior and leaves evidence that it works: a test that failed before the change and passes after, plus the project's required checks.

The work starts by reading. The skill looks up the project's real test, type and build commands rather than trusting remembered ones, and separates acceptance criteria the spec states from ones it inferred. It then picks public seams to test through — caller-facing operations with observable outcomes — and asks only when an ambiguity would change behavior.

Each cycle is one slice: a failing test at a public seam, the least code that passes it, then the checks. The expected values come from the spec or an independently worked example, never from running the implementation against itself. Mocks are limited to system boundaries like third-party services, the clock or the filesystem; internal modules are exercised together. After green, any restructuring happens as a separate, behavior-preserving change. For multi-slice features, slices are recorded with blockers and started only when prerequisites are met, so every slice stays independently verifiable. Two bundled references cover the hard parts: choosing slices and judging test quality, and resolving merge conflicts by intent rather than by text.

## When to reach for it

Say "implement this feature", "build out this spec", or "add this behavior".

| Your situation | Reach for |
| --- | --- |
| A spec or feature request needs working code | `feature-development` |
| Something is broken and you don't know why | [diagnosing-bugs](diagnosing-bugs.md) |
| The code works but is painful to change | [codebase-improvement](codebase-improvement.md) |
| Requirements are unsettled and need decisions first | [idea-development](../design/idea-development.md) |
| The change exists and you want it checked before merge | [code-review](code-review.md) |
| It's done and you need the commit or PR written | [close-out](../productivity/close-out.md) |

## It's working if

- Delivered behavior is exercised at public seams, with failing-before and passing-after evidence where automated testing is meaningful.
- Tests would survive a refactor: they assert caller-visible outcomes, not that a private validator ran or that database rows look a certain way.
- Expected values trace to the spec or an independent example, not to the production code's own formula.
- Refactoring stays out of the red-to-green loop and runs as its own change.
- The finish report names changed files, commands run with outcomes, remaining coverage gaps and blockers — and says when no meaningful automated seam existed instead of manufacturing an internal test.

## Common questions

**What if the feature has no sensible automated test?**
The gap is stated and an observable manual check is used instead. For a reversible, low-impact change, a test that would only mirror the code is skipped and the missing red-before-green evidence is reported.

**Why slices instead of building the layers first?**
A schema-only task followed by an API-only task postpones the evidence that the pieces cooperate. A first slice crosses the necessary layers with the smallest useful case; richer cases come after that path works.

**Does it plan or build?**
Both, depending on the request. A planning request stops at a slice plan; an authorized build continues through the checks without asking again.

**What happens when a merge conflict interrupts the work?**
Each side's intent is traced to its commit, spec or ticket, both outcomes are preserved where compatible, and no third feature is invented just to make the text merge.

## Where it fits

This is the implementation skill for new behavior. Unsettled requirements belong upstream with [idea-development](../design/idea-development.md), a failing symptom with [diagnosing-bugs](diagnosing-bugs.md). When structure blocks a useful slice, [codebase-improvement](codebase-improvement.md) takes over with the demonstrated friction. The finished change goes to [code-review](code-review.md), and [critic](critic.md) or [close-out](../productivity/close-out.md) handle the question of whether it's done and how it gets written up.
