# critic

> Verify claimed work against evidence.

## What it does

`critic` takes a claim that work is done and tests it. It derives the completion contract from the user's request and the repository's requirements, then inspects the delivered artifact and the evidence for material completion claims. The producer's summary is a starting point for verification, not its conclusion — so it reads the actual files, result or rendered behavior, and runs the relevant required checks. A passing test suite alone cannot prove a promised artifact exists or does the requested work, and a test whose expected value is recomputed the way the code computes it cannot fail, so it counts as no evidence at all.

Findings are sorted into a demonstrated defect, missing evidence, or an unrelated baseline failure, and failures are attributed before any done-or-not decision. The skill finds the project's real check commands — package scripts, a Makefile, a task runner — before running anything, preferring them over ad-hoc equivalents and never inventing one that doesn't exist. Checks are kept cheap: tests, lint and types before builds or log inspection, with broader or repeated checks requiring a new concern once the existing checks settle a claim.

When consequential uncertainty remains, the skill seeks independent judgment: every reviewer gets the same request, completion contract and raw artifacts rather than the producer's preferred answer. A finding raised independently by more than one reviewer outweighs a lone one, disagreements are reported rather than averaged away, and self-review is never relabeled as independent. Verification doesn't fix the implementation unless asked; it names the smallest repair or missing check that would resolve a blocker.

## When to reach for it

Say "is this actually done", "verify the agent's work", or "prove it before we merge".

| Your situation | Reach for |
| --- | --- |
| Work is reported done and the claim needs testing | `critic` |
| A diff needs review against intent and standards | [code-review](code-review.md) |
| Verified work needs its commit message or PR body | [close-out](../productivity/close-out.md) |
| Something is broken and the cause is unknown | [diagnosing-bugs](diagnosing-bugs.md) |
| New behavior still needs to be built | [feature-development](feature-development.md) |

## It's working if

- The verdict is one of three: **PASS** when the completion contract is satisfied, **FAIL** for a proven material miss, **UNVERIFIED** when required evidence can't be obtained.
- Reports state what was checked, the observed results, and what remains blocked or skipped.
- Real project check commands are used, not invented ones.
- Failures are attributed — the work's defect, missing evidence, or a pre-existing baseline failure — before deciding done or not.
- Verification stays verification: no fixing or expanding the implementation unless asked.

## Common questions

**Is it the same as code review?**
No. [code-review](code-review.md) reads a diff against intent and standards; critic asks whether the work is complete and proven. The two are commonly run one after the other.

**What if a test suite passes?**
That's one input, not proof. The artifact is inspected and the checks that could actually falsify the completion claim are run — a suite that recomputes expected values from the code can't fail and proves nothing.

**What if the requested format only allows pass or fail?**
If required evidence cannot be obtained, the verdict is left pending and the verification blocker is explained rather than inventing a pass or fail.

**Does it deploy or run external actions to verify?**
No. Checks run within existing authorization; deployment and other external writes require authorization for those actions.

## Where it fits

Critic is the check between "the work says it's done" and the work being done. It runs after [feature-development](feature-development.md), [diagnosing-bugs](diagnosing-bugs.md) or [codebase-improvement](codebase-improvement.md) produce a change, alongside or after [code-review](code-review.md). Work that passes goes to [close-out](../productivity/close-out.md) for the commit message, PR body or handoff.
