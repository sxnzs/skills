# A second layer of skills underneath the four workflows

Question: can the four workflows sit on top while supporting skills (building,
checking, handoffs, tools) stay available underneath, without bringing back
"which skill next?"

## What Pi offers

A skill is in one of three states. There is no settings switch for "loaded but hidden
from the model": that takes `disable-model-invocation: true` in the skill's own
frontmatter.

| State | How | Model sees it | `/skill:name` works |
| --- | --- | --- | --- |
| Listed | default | yes (name, description, path) | yes |
| Command-only | `disable-model-invocation: true` in frontmatter | no | yes |
| Off | settings `!pattern` / `-path`, package `skills: []` | no | no |

Other facts: no limit on how many skills are listed; each costs its description
(about 20–60 words) on every turn. Skills can't declare dependencies on each
other. Nested skills inside a skill folder are not discovered.

## How the source packs layer

| Pack | Hidden from the model | Pattern |
| --- | --- | --- |
| mattpocock | 22 of 37 | Hides the **top** layer (user-invoked orchestrators like `handoff`, `to-spec`, `implement`) and lists the primitives (`tdd`, `grilling`, `research`). Orchestrators call primitives by name, never other orchestrators. |
| pstack (@poteto) | 49 of 50 | One router the human starts; it loads playbooks by path. "Delegate to other skills by path. Don't restate." |
| humanlayer (@dexhorthy) | 1 of 6 | Slash-command skills; `visual-pr` embeds a copy of `show-me` instead of depending on it (and the copy has already drifted). |
| emilkowalski | 3 of 13 | Flat peers; every skill names its neighbours and says what it doesn't do. Side-effecting or harsh skills are command-only. |

The common point: the layer a person starts with is small and named for intent;
everything underneath has one owner and is reached by name.

## Experiment 1: routing

Same 19 requests in fresh sessions, run from this repo. Skills loaded with
`--no-skills --skill …`, so user settings were untouched. Probe scripts and
transcripts are kept locally, not in this repo.

- **Four workflows only:** 1 of 14 supporting requests reached a skill (and that
  one, "spec and tickets", went to idea-development). Email, calendar and drive
  requests didn't know the `gmcli`/`gccli`/`gdcli` CLIs exist.
- **Four workflows + 15 supporting skills listed:**

| Request | Skill loaded |
| --- | --- |
| test-first helper | tdd |
| debug a false broken link | diagnosing-bugs |
| review last commit | code-review |
| should this get independent review? | critic |
| write PR description | pr |
| email / calendar / drive | gmcli / gccli / gdcli |
| transcribe audio | transcribe |
| browser screenshot | computer-use |
| research with sources | research |
| develop an idea | idea-development |
| "grill me on my plan" | idea-development |
| improve painful code | codebase-improvement |
| find the look | visual-design |
| design an onboarding flow | ui-design |
| implement the agreed plan | none |
| write a handoff | none |
| spec + tickets | idea-development |

16 of 19 routed correctly. The five workflow requests still went to the four;
no supporting skill stole them. All three misses are Matt's command-only
skills (`implement`, `handoff`, `to-spec`, `to-tickets` carry
`disable-model-invocation: true`), so they were never listed; `/skill:handoff`
still works.

## Experiment 2: behavior

Routing isn't quality, so the second test ran whole chains. Two small
disposable repos (a link checker gaining `--json`; two formatters sharing
duplicated policy). A scripted human gives a request, a fixed choice ("record
the plan only"), asks "What's next?", then asks for a handoff; a fresh agent
implements from the handoff text alone. Two runs per fixture per setup, on
`gpt-5.6-sol` (medium). All 16 runs were graded blind by `gpt-6.1-sol` on
seven criteria, 0–2 each.

| Setup | "What's next?" | Handoff | Total |
| --- | --- | --- | --- |
| C0: `implement`, `handoff` command-only; each workflow names its own next step | 4/8 | 8/8 | 49/56 |
| C1: `implement`, `handoff` listed | 4/8 | 4/8 | 46/56 |
| C2: C1 plus **next** | 8/8 | 4/8 | 50/56 |
| C3: **next** and `implement` listed, `handoff` command-only | **8/8** | **8/8** | **54/56** |

- Every run followed the human's choice, made no production edits before
  implementation, and ended with passing tests. The setups differ at the seams.
- Without **next**, "What's next?" got a checklist instead of one step with a
  reason. With it, 8 of 8 answers were one grounded step.
- Listing the upstream `handoff` (C1, C2) made the agent use it, and it writes
  to a temporary directory: 4/8. Where it stayed command-only (C0, C3), the
  agent saved the handoff next to the plan in the repo: 8/8. So the handoff
  score tracks whether that skill is listed, not whether **next** is present.
- Only two of 16 runs scored 14/14, and both were C3.

Limits: two fixtures, two runs each, one subject model, one grader; the
fixtures are small and the human is scripted.

## Result

Three layers, using only what Pi already supports:

1. **Workflows (listed):** idea-development, codebase-improvement,
   visual-design, ui-design, and **next**, which holds the map of what usually
   follows what.
2. **Supporting skills (listed):** implement, tdd, diagnosing-bugs,
   code-review, critic, research, pr, codebase-design, domain-modeling, and
   tools (mail, calendar, drive, transcription, computer use). Workflows use
   them when installed and do the work directly when not.
3. **Commands (you type them):** handoff, to-spec, to-tickets.

Off: skills the workflows now own (grill-me, grill-with-docs, grilling,
prototype, design, improve-codebase-architecture, implement-spec) and niche or
harness skills until needed.
