---
name: feature-development
description: Build behavior in test-first slices. Use when implementing a feature, spec or tickets, or you say build this. Bugs use diagnosing-bugs.
---

# Feature Development

Turn requested behavior into a working path callers can exercise. Let each small
implementation teach you what to build next, rather than committing to layers of
speculative code or tests.

## What done looks like

The requested behavior works at stated public seams, with failing-before and
passing-after evidence where automated testing is meaningful. Required project
checks have run; the report names changed files, observed results, remaining
coverage gaps and blockers. A slice plan is the result when only planning was
requested.

## How the work goes

- Read the spec or tickets, relevant project guidance, callers and existing tests.
  Find the project's actual test, type, build and other required check commands
  before changing code; do not substitute remembered commands. Reuse settled
  decisions and distinguish explicit acceptance criteria from inferred ones.
- State the public seams under test: the caller-facing operation or interaction,
  its inputs and observable outcomes. Infer them from the request and existing
  interfaces when clear. Ask only if an ambiguity materially changes behavior or
  the contract. If no meaningful automated seam exists, state the gap and use an
  observable manual check; do not manufacture an internal test to claim coverage.
- For multiple slices, record each delivered behavior, acceptance check,
  affected files and blocking edges in the project's existing planning or ticket
  format. Start only slices whose blockers are satisfied; when parallel workers
  are already authorized, independent ones may run in isolated worktrees,
  integrated one at a time with checks after each. Each slice must exercise a
  narrow complete path and remain independently verifiable, not deliver a
  disconnected layer. Use [slicing, tickets and test
  discipline](references/slices-and-tests.md) when choosing increments, writing
  tickets or evaluating a test's value.
- Implement one slice as one failing test at a public seam, the least code that
  passes it, then the relevant checks. Observe failure for the missing behavior,
  not a broken fixture or compilation error. Derive expected values independently
  of the implementation. Mock only system boundaries. Do not write a batch of
  future tests followed by a batch of implementation. An existing check serves
  as the failing test when it fails for the missing behavior. For a reversible,
  low-impact change where no meaningful test exists, skip a test that would only
  mirror the code and report that red-before-green was not observed. Once the
  required checks pass, broaden or repeat testing only for a
  new change, failure or concern.
- For unattended or long-running work, keep a log with one row per decision (what, why, an evidence
  pointer, result) that a reviewer can read cold; commit it only when they need it to trust the result.
- After green, consider a separate behavior-preserving refactor and re-run checks;
  do not mix restructuring into the red-to-green loop. If structure prevents a
  useful slice, use **codebase-improvement** with the demonstrated friction. When
  conflicts interrupt integration, follow [intent-based conflict resolution](references/merge-conflicts.md).
- Finish by checking the diff against acceptance criteria and unrelated work,
  running the required project checks, and reporting commands and outcomes.
  Handoffs below never replace this evidence.

## Boundaries

A planning request stops at the slice plan. An authorized build continues through
checks without asking again for approval already given. Between slices, report
status beside the next action rather than ending the turn to announce it or
offer to continue; non-blocking questions travel with continued work. Stop when
nothing can advance without the user. Preserve unrelated work and respect the
project's authority for external or destructive actions.

## Handoffs

**run** continues into that skill with this context unless the request stops
short of it, then it is only suggested. **suggest** names it in one closing line
once the deliverable is final and never continues unasked. A missing skill never
blocks; do the work inline.

- An unsettled requirement would change the behavior → run **idea-development**
- A failing symptom or unexpected behavior appears → run **diagnosing-bugs**
- Structure blocks a useful slice → run **codebase-improvement**
- The code to change is unfamiliar or its reasons are unknown → run **explain-code**
- A non-trivial change is built and its checks pass → run **critic**
- The finished change needs a second reader → suggest **code-review**
- Verified work needs its commit message or PR body → suggest **close-out**
- The repo has no runnable checks to build against → suggest **agent-setup**
