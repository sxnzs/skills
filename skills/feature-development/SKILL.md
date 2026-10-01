---
name: feature-development
description: Build behavior in test-first slices. Use when implementing a feature or spec. Bugs use diagnosing-bugs.
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
- For multiple slices, record each delivered behavior, acceptance check, affected
  files and blocking edges in the project's existing planning format. Start only
  slices whose blockers are satisfied. Each slice must exercise a narrow complete
  path and remain independently verifiable, not deliver a disconnected layer.
  Use [slicing and test discipline](references/slices-and-tests.md) when choosing
  increments or evaluating a test's value.
- Implement one slice as one failing test at a public seam, the least code that
  passes it, then the relevant checks. Observe failure for the missing behavior,
  not a broken fixture or compilation error. Derive expected values independently
  of the implementation. Mock only system boundaries. Do not write a batch of
  future tests followed by a batch of implementation.
- After green, consider a separate behavior-preserving refactor and re-run checks;
  do not mix restructuring into the red-to-green loop. If structure prevents a
  useful slice, use **codebase-improvement** with the demonstrated friction. When
  conflicts interrupt integration, follow [intent-based conflict resolution](references/merge-conflicts.md).
- Finish by checking the diff against acceptance criteria and unrelated work,
  running the required project checks, and reporting commands and outcomes.
  Recommend **code-review** for the finished change; use **critic** when the
  question is whether completion is proven, and **close-out** for the commit
  message, PR body or handoff. None of these replaces implementation evidence.

## Boundaries

A planning request stops at the slice plan. An authorized build continues through
checks without asking again for approval already given. Consequential unsettled
requirements belong to **idea-development**; a failing symptom belongs to
**diagnosing-bugs**. Preserve unrelated work and respect the project's authority
for external or destructive actions.
