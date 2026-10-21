# diagnosing-bugs

> Fix a bug at its proven cause.

## What it does

`diagnosing-bugs` starts by establishing the reported symptom before explaining it. Its first product is a tight feedback loop: one command, already run, that checks the user's exact symptom, gives the same verdict each run and finishes quickly. A nearby failure is not a reproduction of the user's problem. When no failing test is at hand, a bundled reference lists ways to build one; intermittent failures get a raised reproduction rate instead of a wait for a clean repro, and slowness gets a recorded baseline and a bisect before any optimizing.

Diagnosis proceeds by ranking several competing explanations before touching code, each with the observation that would confirm or rule it out. The next probe is the one that separates those explanations, changing one variable at a time. The symptom's history is checked too: prior reports, shipped-then-reverted fixes, related work in flight — with each artifact confirmed against the current code, since a reverted fix marks where the last attempt failed.

A distinction runs through the whole skill: diagnosis-only work ends with evidence and a proposed repair, while code changes only when a fix was requested. An unproven hypothesis stays out of production code, and a fix is never called verified without observing the symptom resolve. An authorized repair targets the causal boundary the evidence supports, checks other occurrences of the proven pattern, removes all tagged temporary instrumentation, and re-runs the original reproduction plus the repository's required checks. If the bug cannot be fixed where it lives because no seam reaches it, that is itself a finding, and structure work becomes [codebase-improvement](codebase-improvement.md).

## When to reach for it

Say "this is broken", "why is this failing", or "it's slow".

| Your situation | Reach for |
| --- | --- |
| Something is broken or slow and the cause is unknown | `diagnosing-bugs` |
| New behavior needs to be built | [feature-development](feature-development.md) |
| The code works but is painful to change | [codebase-improvement](codebase-improvement.md) |
| The change exists and needs checking before merge | [code-review](code-review.md) |
| An agent says it's done and that claim needs proof | [critic](critic.md) |

## It's working if

- The loop reproduces the user's exact symptom, gives the same verdict each run and finishes quickly.
- Hypotheses come with predictions and are ruled out by observations, not by speculative edits.
- The fix targets a proven cause, and the report states the cause's certainty along with what was ruled out.
- When a meaningful regression seam exists, its check fails on the old behavior and passes on the repair, failing for the reported defect rather than a broken fixture or compilation error.
- No unproven theory is presented as confirmed, and no fix is called verified without an observed resolution.

## Common questions

**What if the bug can't be reproduced?**
Blocked reproduction doesn't stop the work. Investigation continues with what's available, the report names what's missing and what would settle it, and the smallest human action or observation needed is requested.

**Does it fix the bug or just find it?**
It matches the request. Diagnosis-only work ends with evidence and a proposed repair; when a fix is requested, the repair carries through verification without stopping to announce each next probe.

**How does it handle secrets during diagnosis?**
Credential stores stay out of reads, and secret values are redacted in traces, fixtures and reports.

**Where does the fix land?**
At the causal boundary the evidence supports, within the requested scope, with other occurrences of the proven pattern checked before declaring the bug resolved.

## Where it fits

A failing symptom is this skill's entry point, while a request for new behavior belongs to [feature-development](feature-development.md). If a proven cause reveals structure that should change, hand the friction to [codebase-improvement](codebase-improvement.md). The finished repair is a change like any other, so it can pass through [code-review](code-review.md), and the confirmed cause belongs in the commit message — which [close-out](../productivity/close-out.md) writes.

<!-- handoffs:start -->
## Handoffs

| When | Then |
| --- | --- |
| Nothing fails and the pain is structural, or no seam can reach the real pattern | runs [codebase-improvement](../engineering/codebase-improvement.md) |
| The cause turns on a fact outside the repo | runs [research](../productivity/research.md) |
| The code's behavior is unfamiliar before tracing it | runs [explain-code](../engineering/explain-code.md) |
| A fix is verified and the change is non-trivial | runs [critic](../engineering/critic.md) |
| A verified fix needs its commit message or PR body | suggests [close-out](../productivity/close-out.md) |

Reached from [motion-design](../design/motion-design.md), [code-review](../engineering/code-review.md), [codebase-improvement](../engineering/codebase-improvement.md), [critic](../engineering/critic.md), [explain-code](../engineering/explain-code.md), [feature-development](../engineering/feature-development.md), [write-swift](../engineering/write-swift.md), [research](../productivity/research.md).
<!-- handoffs:end -->

## Credits

Drawn from upstream skills (MIT, revisions pinned in [LINEAGE](../../LINEAGE.md)); the skill itself is a rewrite.

- "Diagnosis loop for hard bugs and performance regressions." — [Matt Pocock, diagnosing-bugs](https://github.com/mattpocock/skills/blob/d81f3a183412e71a5b1e84ca21bc1a35eea03a60/skills/engineering/diagnosing-bugs/SKILL.md)
- "When two or more fixes that share one premise have failed the same gate, suspect the premise, not the fixes." — [poteto, principle-attack-the-premise](https://github.com/cursor/plugins/blob/fae2c6ed95821bd85f614a73e4842e13229fa5e5/pstack/skills/principle-attack-the-premise/SKILL.md)
- "Trace each symptom to its root cause and fix it there; reproduce first, ask why until you reach it, resist nil-check guards that silence crashes." — [poteto, principle-fix-root-causes](https://github.com/cursor/plugins/blob/fae2c6ed95821bd85f614a73e4842e13229fa5e5/pstack/skills/principle-fix-root-causes/SKILL.md)
