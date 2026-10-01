# Ambiguous debugging comparison

All twelve runs repaired this synthetic asynchronous cache bug, added causal
regressions, preserved scope and supported their completion claims. The rewritten
`diagnosing-bugs` and no-skill arms each passed both repetitions on all three
models. This case demonstrates no improvement in correctness or scope from the
skill. No skill instructions were changed as a result.

## Case and frozen expectations

An account dashboard briefly displayed a refreshed report, then returned older
cached data without another transport request. Serial tests passed. Cache keys,
expiry, gateway retries and an overlapping background read were plausible
suspects; the worker prompt did not identify the cause.

The seed unconditionally published every completed request into the cache and
removed the pending lookup during cleanup. Invalidation removed that lookup,
but an old request could still overwrite refreshed data or detach a newer
pending request. Repairs guarded both mutations by current request ownership
while allowing already-returned promises to settle with their own result/error.

The task, fixture, skill, criteria and nine contract tests were captured before
calls. A separate reviewer verified that the seed passed all five existing tests
and failed seven of nine contract checks. Its corrected control passed all five
existing and all nine contract checks. Contract cases covered settlement order,
old rejection, lone invalidation, key independence, expiry and opaque payloads
whose revision number decreases. Expectations describe public behavior without
requiring one implementation. The injected transport makes overlap deterministic;
no live backend or sleep-based reproduction was needed.

## Matched comparisons

Each arm/model ran twice in fresh copies of the same dirty fixture, including a
pre-existing label-format edit and an untracked user note. Order was no skill →
rewrite for repetition one, and rewrite → no skill for repetition two. Each
model had one serial workstream; the three workstreams ran concurrently.

Configured and returned identities matched exactly:
`openai-codex/gpt-6.1-sol`, `foundry-anthropic/claude-opus-5-5` and
`foundry-anthropic/claude-sonnet-5-5`. The harness requested high effort for Sol
and medium for both Claude models. These settings were fixed within comparisons;
they do not imply equivalent effort or cost across providers. Ambient skills,
extensions, context files and prompt templates were disabled. Only the rewrite
arm received the captured skill, and its body was verified in the emitted user
context. The task itself was otherwise identical.

## Observed results

| Model / requested effort | Arm | Independent PASS | Mean reported output tokens | Mean elapsed seconds | Mean tool calls |
| --- | --- | --- | --- | --- | --- |
| GPT-6.1 Sol (high) | No skill | 2/2 | 3,477.5 | 128.85 | 18.5 |
| GPT-6.1 Sol (high) | Rewrite | 2/2 | 4,143.0 | 155.90 | 19.5 |
| Opus 5.5 (medium) | No skill | 2/2 | 3,774.5 | 37.85 | 6.5 |
| Opus 5.5 (medium) | Rewrite | 2/2 | 3,464.5 | 36.30 | 7.5 |
| Sonnet 5.5 (medium) | No skill | 2/2 | 1,739.0 | 16.75 | 4.0 |
| Sonnet 5.5 (medium) | Rewrite | 2/2 | 1,894.0 | 17.75 | 4.0 |

Every submission passed the nine frozen contract tests, the original five tests,
its repository-required check and whitespace check on disposable copies. Each
agent-owned regression passed the repair and failed against the unchanged seed
through a causal stale-value or request-ownership assertion. The reviewer also
confirmed recorded red reproduction, preserved unrelated work, and supported
completion claims for each submission. There were no setup-only red failures.

The rewrite produced 8.2% fewer reported output tokens for Opus, 8.9% more for
Sonnet and 19.1% more for Sol in this sample. This is mixed effort evidence, not
a reliable speed or cost estimate. Two repetitions, concurrent execution,
uncalibrated cache states and provider-specific usage accounting prevent such a
claim. The previous [debugging pilot](DEBUGGING-PILOT.md) used different tasks
and harness context; its absolute timing should not be compared to this batch.

## Independent review and integrity

The separate reviewer graded anonymized repositories, ordered task operations,
actual check output and final claims before seeing model/arm identities. Session,
provider, usage and instruction-loading metadata were excluded; local capture
paths were normalized. The blind judgments were saved before joining metrics.
Full raw captures remain available for auditing.

All captured inputs, protected source trees and twelve original submissions
verified unchanged after copied grading. Seven heuristic audit flags came from
`//` comments inside edit text being parsed as root-directory paths. Their actual
edit targets stayed inside the fixture; these are retained as false positives,
with no confirmed evaluator access. Tool-argument auditing covers literal paths,
ancestors and globs, but cannot establish isolation against computed reads. Worker
processes were not filesystem-sandboxed.

## Evidence and limits

Frozen inputs and provenance, per-run results and integrity, blind verdicts,
review evidence, raw events, original submissions, copied check logs and the
private model/arm mapping are kept outside this repository. A preflight bytecode-write issue was
repaired before any model call; the earlier preflight manifest was preserved.

This adds one async-lifecycle case on the three verified models. It does not
establish broad debugging superiority, validate the other skills or guarantee
future-model behavior. This evidence supports retaining the
concise portable skill, with no new model-specific instruction justified here.
Further improvements should address a reproduced baseline failure or a useful
workflow decision, rather than require this rewrite to win.
