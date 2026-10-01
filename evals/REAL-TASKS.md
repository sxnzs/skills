# Real-task screening

Status: **partial; no performance gain is claimed.** Each of the ten skills
received three tasks taken from real projects. Twelve of the thirty tasks have a
complete, valid pair of runs with and without the skill; a provider usage limit
stopped the other eighteen. Server/transport failures and usage-limit responses
are excluded from scores, even when the CLI exited zero.

Tasks came from five private application and tooling projects and a pinned
open-source WebGL scroll example. They are disposable extractions and seeded
regressions, not changes to the live projects. Every case has source provenance,
an ordinary prompt, scope, acceptance criteria and local checks. Raw evidence
stays outside this repository because it contains private source; this page
summarizes what it showed.

| Skill | Complete pairs | Observed added benefit | Disposition |
| --- | ---: | --- | --- |
| idea-development | 3/3 | Blind reviewer preferred its acceptance, privacy and evidence detail; no repeated correctness gain | Keep as is |
| ui-design | 1/3 | Both arms' import-review prototypes passed independent interaction checks; tie | Keep; pending remaining cases |
| visual-design | 0/3 | Runs blocked by usage limit | Unverified |
| next | 3/3 | Both arms found the real blockers; the skill added more explicit completion checks | Repeated routing list removed afterwards |
| diagnosing-bugs | 2/3 | Both arms passed independent timezone and LF/CRLF/lone-CR behavior checks | Tie |
| code-review | 0/3 | Runs blocked by usage limit | Unverified |
| critic | 1/3 | Both arms correctly rejected a broken persistence completion claim | Tie |
| codebase-improvement | 0/3 | No complete pair before the usage limit | Unverified |
| motion-design | 2/3 | One independently verified correctness win: without the skill, velocity 48 remained under reduced motion; with it, 0. Camera logic tied | Keep guidance and runnable examples; one win is not a general gain |
| write-swift | 0/3 | Comparison blocked; the compiled example passed independent review | Keep the verified optional example |

This measures added benefit when the skill is loaded deliberately. How often an
agent chooses a skill on its own was not measured and does not affect these
judgments.

## Controls and limits

Both arms used fresh Pi sessions reporting `openai-codex/gpt-6.1-sol`, medium
effort, and the same read/bash/edit/write tools. Ambient skills, extensions,
context files and prompt templates were disabled. The skill arm explicitly
loaded the frozen skill; both arms had identical local browser tooling.
Prompts, source/skill hashes, invocations, events, final files and tool results
were saved.

Independent arm-hidden grading completed the three idea cases, the import UI
case and the first motion case. Objective checks, run separately from the actor
sessions, then tested both debugging repairs, camera target/parallax/reduced-motion
behavior and the persistence verdict. They are reported separately from blind
judgments. Allocation performance, full WebGL feel, other models, physical
devices and invocation frequency remain unmeasured.

One idea case's rubric added a publication gate absent from the prompt; both arms
missed it, so it is not counted as a correctness advantage. The reviewer still
preferred the skill arm's explicit source-trace checks. Qualitative preferences
are not counted as proven correctness gains.

The original date control failed in Denver while both repairs passed Denver and
Tokyo with correct RSS dates. The original line-ending control failed independent
public line-boundary probes while both repairs passed. Both critics reported
FAIL for the seeded ordinary-save overwrite; fresh package runs reproduced the
stale-save assertions. These controls distinguish actual behavior from a
producer's completion summary.

There is one observation per task and arm. Provider retries, shared cache and
varying concurrency make latency unsuitable for efficiency claims. The import UI
tie used 17 tool calls without the skill and 24 with it; that is overhead to
investigate, not proof that UI guidance is generally harmful.

## Changes after screening

A broader prose expansion and a critic helper script were tried and retired.
Only the Swift and motion skills gained runnable examples, linked as optional
resources. **next** lost 55 words of duplicated routing guidance; the trials
used the earlier version, so the trim itself is not measured.

The examples pass 52 Node checks, a compiled Swift 6 strict-concurrency positive
and causal negative control, and an independent browser and code review. Normal
and reduced-motion browser checks observed reversal, pointer cancellation,
velocity units, pause reset and keyboard feedback. This shows the examples work;
it does not establish general skill performance.

## Remaining work

The eighteen incomplete pairs will run from the same frozen inputs, followed by
independent grading, before any skill is removed or its guidance changed. To
apply the same method to your own projects, use the
[model calibration procedure](MODELS.md) and the [behavioral cases](README.md).
