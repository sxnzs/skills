---
name: critic
description: Verify claimed work against evidence. Use when asked if it's really done, to prove it, or to check an agent's work. Diff review uses code-review.
---

Derive the completion contract from the user's request and repository requirements.
Check the delivered artifact and the evidence for material completion claims.
The producer's summary is a starting point for verification, not its conclusion.

- Inspect the actual files, result or rendered behavior. Run the relevant required
  checks where available; a passing test suite alone cannot prove a promised
  artifact exists or does the requested work. An assertion against the same
  result is tautological; a duplicated algorithm can share the implementation's
  defects and needs independent expected outcomes.
- Distinguish a demonstrated defect, missing evidence and an unrelated baseline
  failure. Attribute failures before deciding whether the requested work is done.
  Correct incidental inaccuracies without expanding the acceptance contract.
- Find the project's real check commands before running anything: a curated
  tooling note, package scripts, a Makefile or task runner. Prefer them over
  ad-hoc equivalents and never invent one that does not exist.
- Use the cheapest checks that can settle the claim: tests, lint and types before
  builds or log inspection. Once the checks that settle a claim pass, do not
  broaden or repeat them without a new concern. Run checks within existing authorization; deployment
  and other external writes require authorization for those actions. Seek
  independent judgment
  when consequential uncertainty remains; give every reviewer the same request,
  completion contract and raw artifacts rather than the producer's preferred
  answer. Weigh a finding raised independently by more than one reviewer above
  a lone one, and report disagreements instead of averaging them away. An
  independent verdict requires an actual separate reviewer; never relabel
  self-review as independent.
- Do not fix or expand the implementation during verification unless asked.
  Identify the smallest repair or missing check that would resolve a blocker.

Report **PASS** when the completion contract is satisfied, **FAIL** for a proven
material miss, or **UNVERIFIED** when required evidence cannot be obtained.
State what was checked, the observed results, and what remains blocked or skipped.

If the requested format allows only pass/fail, leave the verdict pending and
explain the verification blocker rather than inventing a result.

## Handoffs

**run** continues into that skill with this context unless the request stops
short of it, then it is only suggested. **suggest** names it in one closing line
once the deliverable is final and never continues unasked. A missing skill never
blocks; do the work inline.

- The change itself needs reading line by line → suggest **code-review**
- The verdict is FAIL and the cause is unknown → run **diagnosing-bugs**
- The verdict is FAIL because requested behavior is missing → suggest **feature-development**
- Verification needs a fact from outside the repo → run **research**
- The verdict is PASS and the work needs its commit message, PR body or handoff → suggest **close-out**
