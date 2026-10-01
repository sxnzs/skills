---
name: critic
description: Verify finished work against its claims and required checks. Use when an agent reports completion or you want to know whether the work is done. For reviewing the change itself, use code-review.
---

Done means the repository's verify command passes and the promised artifact
exists. Check both yourself; a report, a transcript, or "tests pass" is a claim,
not evidence.

- Verify every claim in the report you were given. One false claim is enough to
  fail the work, even if the rest is true.
- The producer never grades its own work. When a second opinion is warranted,
  it comes from a different model family than the one that built it.
- Spend expensive review only on work that already passed the cheap checks, and
  only where judgment matters: design, security, money, anything public.
- A failing check stops the work. It is never a footnote.
- If you skip a check, say which one and why.

End with `VERDICT: PASS` or `VERDICT: FAIL`, then the evidence for each finding
(command and output, or file:line).
