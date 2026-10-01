# Debugging pilot

The pilot ran two seeded bugs with three arms and two repetitions
per arm, for twelve runs. The configured and returned identity was
`openai-codex/gpt-6.1-sol`, at high effort. Model, task and fixture bytes were held
constant within each comparison. Each worker used a fresh copied repository.

The arms were no skill, the original skill, and the rewrite. The rewrite's
entrypoint exactly matched the maintained skill. This original snapshot differs from the shorter baseline
used in the earlier [smoke trials](RESULTS.md).

## Observed results

| Arm | Runs | Correct fixes | Causal regression checks | Required repo checks | Mean reported output tokens | Mean elapsed seconds |
| --- | --- | --- | --- | --- | --- | --- |
| No skill | 4 | 4/4 | 4/4 | 4/4 | 2,038 | 96 |
| Original snapshot | 4 | 4/4 | 4/4 | 4/4 | 4,048 | 192 |
| Rewrite | 4 | 4/4 | 4/4 | 4/4 | 2,620 | 122 |

All twelve runs passed the existing deterministic grader's three fields: fix,
repository checks and a regression that fails on the seed. Separate copied
submissions also passed each source project's full required checks: a static
site's generator check and Node tests, and a tool's gate including corpus/docs
checks.

The rewrite used 35.3% fewer reported output tokens than the original snapshot
in these runs. No skill also passed every case and had lower observed output and
elapsed time than the rewrite. There is no correctness advantage demonstrated
by these two bugs. Timing and token differences are sample observations, not
reliable speed or cost estimates: execution was concurrent, ordering was fixed,
and cache state was not controlled.

## What the independent critic checked

The date case rebuilt a static blog in Denver and shifted a date-only post to the
previous day. All repairs made the relevant formatters use UTC, regenerated the
affected pages, and added timezone checks. Candidate builds were checked under
Denver, Kiritimati and UTC. Tests copied onto the frozen seed failed on the
reported date assertion, rather than a compilation or fixture error.

The evidence case reported hash mismatches for CRLF files. Repairs normalized
the CR belonging to a CRLF terminator while retaining a lone carriage return.
The frozen hidden suite checked compatibility. Seeded regression failures were
ordinary content-hash mismatches on the intended line-ending cases. The critic
inspected raw diffs, test failure causes, scope and checks independently of the
workers' summaries.

An incidental scope finding remains in the captured evidence. The seed already
had stale documentation counts. One run in each arm updated README and the
parity diagram but left the old count in `docs/PORTS.md`; the other run updated
all three. The original arm's first repetition also added unrelated CLI coverage.
These are recorded separately from the causal bug fixes and required checks;
the submissions were preserved unchanged.

## Evidence and limits

Manifests, captured fixture/skill/grader bytes, raw events, submitted
repositories, independent check logs and grade provenance are kept outside this
repository. All twelve input captures
verified, all returned identities matched, and no evaluator access was flagged.
Submission fingerprints were unchanged by grading and copied postchecks.

Existing fixture build commits are unrecorded. Their frozen bytes make this
comparison traceable; they do not establish original upstream build provenance.
Contamination detection uses tool-argument heuristics, not enforced isolation.

This adds debugging coverage on GPT-6.1 Sol to the earlier two smoke workflows.
It does not cover ambiguous/intermittent bugs, Claude debugging performance,
motion playback, Swift builds or the remaining seven skills. Preserve all arms and repeat harder cases before
claiming that extra instructions improve capable models' repair quality.

The later [ambiguous debugging comparison](AMBIGUOUS-DEBUGGING.md) adds one
synthetic async cache case with two repetitions per arm across the three verified
models. Both arms passed; it demonstrates no correctness advantage for the
rewrite on that case either.
