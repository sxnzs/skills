# Initial smoke trials

Eleven disposable runs exercised two decisions. Each worker received one captured
skill, the case prompt and a fresh fixture, with `read,bash,edit,write` tools and
the harness effort setting `medium`. Ambient skills, extensions, context files
and prompt templates were disabled. The refactor rubric stayed outside the
worker fixture; blocked-evidence classification was reviewed against the critic's
stated contract. The baseline was the maintained skill before this synthesis;
the candidate was the rewritten skill.

Returned records confirmed these identities, not just catalog availability:

| Exact provider/model | Chosen refactor, baseline / candidate | Missing required validator, baseline / candidate |
| --- | --- | --- |
| `foundry-anthropic/claude-opus-5-5` | Implemented / implemented | FAIL / UNVERIFIED |
| `foundry-anthropic/claude-sonnet-5-5` | Implemented / implemented | FAIL / UNVERIFIED |
| `openai-codex/gpt-6.1-sol` | Implemented / implemented | Not run / UNVERIFIED |

## What was observed

For the [chosen refactor fixture](fixtures/approved-refactor/README.md), all six
runs made the two public functions call a shared private normalization helper.
The existing independent expected values still passed, and fixture checks were
run again after the worker. The prompt already chose the approach and requested
implementation. Both skill versions proceeded; this case establishes no
performance gain or baseline approval-loop failure.

For the [blocked verification fixture](fixtures/blocked-verification/README.md),
the artifact was correct and the mandated validator was unavailable. All five
runs recognized both facts and preserved the fixture. The baseline Claude runs
used FAIL; the candidate runs used UNVERIFIED and named the check needed to
resolve it. Opus's baseline explicitly treated an unavailable check as failing.
The observed improvement is this classification, not proof of better code
correctness or successful release verification.

The skill bytes tested matched the maintained candidate until the absorption
pass described in the [behavioral cases](README.md#absorption-pass). Captures,
input SHA-256 hashes, tool calls, final replies and postchecks are preserved
outside this repository. Observed token usage and elapsed time are recorded
there, but one run and different cache states do not support a
cost or speed claim.

## Reproduce and extend

Use the [refactor prompt](fixtures/approved-refactor.prompt.txt) or
[verification prompt](fixtures/blocked-verification.prompt.txt) verbatim. Copy
only its fixture directory into a disposable workspace; keep
[criteria](criteria.json) and evaluation records outside it. Capture the exact
skill and returned identity using the [model calibration procedure](MODELS.md).
The saved criteria cover the refactor case. Freeze a blocked-evidence rubric
before repeating or extending that comparison. Use matched fixtures and models
for comparisons and a separate reviewer for grading.

These smoke cases cover codebase-improvement and critic. They do not exercise
the other eight skills, motion playback, Swift builds or device behavior.
The separate [debugging pilot](DEBUGGING-PILOT.md) adds diagnosing-bugs coverage.
The [ambiguous debugging comparison](AMBIGUOUS-DEBUGGING.md) adds one async case
across all three verified models, with two repetitions per arm.
The remaining [behavioral matrix](README.md) is proposed coverage. These initial
smoke trials have no repeats, broad task suite or future-model guarantees.
