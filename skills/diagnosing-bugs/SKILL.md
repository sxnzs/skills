---
name: diagnosing-bugs
description: Find and fix the cause of a reported bug or regression with proof. Use when something is broken, failing, or unexpectedly slow. For improving structure without a failing symptom, use codebase-improvement.
---

Before theorizing, get one command that fails on the reported symptom: the
user's exact symptom, not a nearby failure. Everything after that consumes it;
without it you are guessing. If you cannot build one, stop and say what you
tried and what access or artifact would let you.

- The fix is done when that command passes, the repository's own checks pass,
  and a regression test fails on the old code and passes on the new. If no test
  seam can reproduce the real pattern, say so; that is a finding.
- Fix the cause, not the symptom. State the root cause in one or two sentences.
- Redact secrets in anything you show.
- Tag temporary debug output (e.g. `[DEBUG-a4f2]`) and remove it before you finish.
- If a human must drive the reproduction, give them a short sequence of actions
  and ask for observations rather than credentials.

End with `ROOT CAUSE:` and one or two sentences.
