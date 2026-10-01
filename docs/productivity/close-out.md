# close-out

> Write the commit, PR, handoff or retro for finished work.

## What it does

`close-out` turns finished or paused work into the message its next reader needs — a reviewer, a future maintainer, another agent, or the people who should hear about it. Every artifact is true to the evidence: what changed, why, how it was checked, and what remains. Work found but not landed is listed as dropped or deferred with the reason, verified and unverified claims are kept apart, and existing artifacts are linked rather than restated.

It starts from evidence, not memory — the diff, check output, decisions and open questions — and if completion itself is in doubt, [critic](../engineering/critic.md) runs first and its verdict is reported. The artifacts are specific. A commit message has a subject that says what changed, then why; for a fix it names the confirmed cause, and for a change with a behavior contract it includes the check that proves it. A PR body follows a bundled reference: the smallest view that shows the change, before-and-after evidence, and how risky the merge is. A handoff, written for whoever picks the work up next, states the goal, current state, decisions with reasons, open questions, affected files, checks and results, and the next step, pointing to specs, plans and commits instead of copying them. An announcement is written only when the work earns attention, in a plain voice without hype — drafted, with the person deciding whether and where it ships. A retro proposes changes to the agent's environment that would have made the session faster or safer, per its own reference. Secrets, credentials and personal data are redacted throughout.

## When to reach for it

Say "write the commit message", "draft the PR body", or "write the handoff".

| Your situation | Reach for |
| --- | --- |
| Finished work needs its commit, PR, handoff or retro | `close-out` |
| The change itself still needs checking | [code-review](../engineering/code-review.md) |
| Whether the work is actually done is in doubt | [critic](../engineering/critic.md) |
| The prose is a doc or README, not a wrap-up artifact | [writing](writing.md) |
| What to do next needs a recommendation | [next](next.md) |

## It's working if

- The artifact matches the evidence: what changed, why, how it was checked, what remains.
- Dropped or deferred work is named with a reason, not silently omitted.
- Verified and unverified claims are visibly separate.
- Existing specs, plans and commits are linked, not copied.
- Secrets and personal data are redacted, and the text reads in one pass.

## Common questions

**Does it publish or push anything?**
No. Publishing, pushing, posting and sending follow the project's and user's authorization; the artifact gets prepared and external actions are left to them unless already approved.

**Can it write up work that isn't verified?**
It can, but it won't blur the line. If completion is in doubt, critic verifies first, and unverified claims are labelled rather than passed off as checked.

**What makes a handoff good?**
It's shaped by what the next session will actually do: goal, current state, decisions with reasons, open questions, affected files, check results and the next step — with references that point instead of copy.

**Is an announcement automatic?**
No. It's written only when the work earns attention, and the person decides whether and where it ships.

## Where it fits

Close-out is the last stop in a standard arc: [feature-development](../engineering/feature-development.md) or [diagnosing-bugs](../engineering/diagnosing-bugs.md) produce the change, [code-review](../engineering/code-review.md) and [critic](../engineering/critic.md) check it, and this skill writes it up for the next reader. It shares a craft with [writing](writing.md) — plain prose, author's facts intact — but its formats are fixed: commit, PR body, handoff, announcement, retro.
