---
name: critic
description: Verify finished work against its claims and required checks. Use when an agent reports completion or you want to know whether the work is done. For reviewing the change itself, use code-review.
---

Derive the completion contract from the user's request and repository requirements.
Check the delivered artifact and the evidence for material completion claims.
The producer's summary is a starting point for verification, not its conclusion.

- Inspect the actual files, result or rendered behavior. Run the relevant required
  checks where available; a passing test suite alone cannot prove a promised
  artifact exists or does the requested work.
- Distinguish a demonstrated defect, missing evidence and an unrelated baseline
  failure. Attribute failures before deciding whether the requested work is done.
  Correct incidental inaccuracies without expanding the acceptance contract.
- Use the cheapest checks that can settle the claim. Seek independent judgment
  when consequential uncertainty remains; give that reviewer the request and raw
  artifacts rather than the producer's preferred answer. An independent verdict
  requires an actual separate reviewer; never relabel self-review as independent.
- Do not fix or expand the implementation during verification unless asked.
  Identify the smallest repair or missing check that would resolve a blocker.

Report **PASS** when the completion contract is satisfied, **FAIL** for a proven
material miss, or **UNVERIFIED** when required evidence cannot be obtained.
State what was checked, the observed results, and what remains blocked or skipped.
If the requested format allows only pass/fail, leave the verdict pending and
explain the verification blocker rather than inventing a result.
