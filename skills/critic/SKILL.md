---
name: critic
description: Verify claimed work against evidence. Use when work is reported done. Diff review uses code-review.
---

Derive the completion contract from the user's request and repository requirements.
Check the delivered artifact and the evidence for material completion claims.
The producer's summary is a starting point for verification, not its conclusion.

- Inspect the actual files, result or rendered behavior. Run the relevant required
  checks where available; a passing test suite alone cannot prove a promised
  artifact exists or does the requested work. A test whose expected value is
  recomputed the way the code computes it cannot fail and is not evidence.
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
Verified work goes to **close-out** for its commit message, PR body or handoff.
If the requested format allows only pass/fail, leave the verdict pending and
explain the verification blocker rather than inventing a result.
