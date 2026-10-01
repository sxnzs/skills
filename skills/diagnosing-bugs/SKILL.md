---
name: diagnosing-bugs
description: Find and fix the cause of a reported bug or regression with proof. Use when something is broken, failing, or unexpectedly slow. For improving structure without a failing symptom, use codebase-improvement.
---

Establish the reported symptom before explaining it. Prefer a failing command
or a small reproducible case. For intermittent failures, UI problems or slowness,
use an observed trace, frequency or measurement against expected behavior.
A nearby failure is not a reproduction of the user's problem.

Match the request: diagnosis-only work ends with evidence and a proposed repair;
change code when a fix is requested. Keep credential stores out of reads and
redact secret values in traces, fixtures and reports.

- Trace the relevant input, state and output. Treat explanations as hypotheses
  until evidence distinguishes them; choose the next observation that separates
  competing causes instead of making several speculative edits. Minimize the
  reproduction one variable at a time while retaining the failure; for slowness,
  record a baseline before optimizing.
- If reproduction is blocked, inspect what is available and continue safe,
  useful investigation. State what is missing and what would settle it. Ask for
  the smallest human action or observation needed. Keep an unproven hypothesis
  out of production code; do not call a likely cause confirmed or claim a fix
  was verified without observing the symptom resolve.
- For an authorized repair, fix the causal boundary supported by the evidence
  within the requested scope. Check other occurrences
  of the proven pattern before declaring it resolved. Preserve unrelated work;
  remove temporary instrumentation you added before finishing.
- Re-run the original reproduction and the required repository checks. Use a
  regression check that fails on the old behavior and passes on the repair when
  a meaningful seam exists. Confirm it fails for the reported defect, rather
  than a broken fixture, compilation error or unrelated assertion. Assert the
  observable result independently of the implementation under test, then also
  re-run the original unminimized scenario.
- Match additional testing to the changed behavior. An existing check or a
  recorded manual interaction can be sufficient; if an automated regression
  cannot cover the real pattern, explain the remaining coverage gap.

Carry an authorized fix through verification. Report the cause and its certainty,
what changed, the relevant evidence and any remaining blocker. Follow the user's
requested output format.
