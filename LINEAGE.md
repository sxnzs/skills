# Lineage

The four upstream packs were read from pinned, licensed copies.
These links identify the actual revisions studied, rather than a moving branch.

| Author / pack | Pinned source |
| --- | --- |
| @poteto / pstack | [cursor/plugins at fae2c6e](https://github.com/cursor/plugins/tree/fae2c6ed95821bd85f614a73e4842e13229fa5e5/pstack) |
| @dexhorthy / HumanLayer | [humanlayer/skills at ca7c808](https://github.com/humanlayer/skills/tree/ca7c8088db69e315a8b2deea43820270457f8f3c) |
| @emilkowalski | [emilkowalski/skills at d16ebe6](https://github.com/emilkowalski/skills/tree/d16ebe60d09a5ba2afcb7054ede9d0a10c9f6128) |
| @mattpocock | [mattpocock/skills at d81f3a1](https://github.com/mattpocock/skills/tree/d81f3a183412e71a5b1e84ca21bc1a35eea03a60) |

## Mechanisms retained

Each skill owns a job the user can name. Source techniques live inside that job
when they change a decision; they do not become a chain of prerequisite skills.

| Sources | Owning skill | What changes a decision |
| --- | --- | --- |
| Matt diagnosing-bugs; pstack root-causes and behavior-testing principles | diagnosing-bugs | Build and tighten a fast, deterministic loop on the exact symptom; raise the rate of intermittent failures; rank falsifiable hypotheses before probing; tag temporary instrumentation; minimize until every remaining element is load-bearing; prove regression at the real seam, and treat a missing seam as a finding; when two fixes sharing one premise fail the same check, write the premise down and question it before a third fix (pstack attack-the-premise). |
| Matt code-review; pstack blast-radius | code-review | Separate intent from standards, in separate contexts when available; pin the merge-base comparison and find the spec before judging; check missing, unrequested and incorrect behavior; use Fowler's smells only as labelled judgment calls; check the actual implementation of the fact that makes consequential behavior safe; close with a per-lens count and worst finding, never ranked across lenses. |
| Matt codebase-design, deepening, design-it-twice, improve-codebase-architecture and tdd; pstack architect | codebase-improvement | Start with caller usage and change hot spots; hide a substantial responsibility behind a small interface; apply the deletion test; let dependency kind decide the seam, with two real adapters before a port; replace shallow tests rather than layering them; survey candidates with a strength and a first pick before designing interfaces; draft alternatives under different pressures and recommend one; when a new interface replaces an old one and no outside caller depends on it, migrate callers and delete the old one together (pstack migrate-callers). |
| Matt grilling, domain-modeling, prototype (logic), to-spec, to-questionnaire, wayfinder and loop-me; HumanLayer show-me and design-control-loop | idea-development | Ask the currently answerable decisions in numbered rounds with recommended answers, inspect facts before asking, challenge overloaded terms, and use the smallest representation that makes a choice concrete, including a single-file logic prototype. Record decisions, settled vocabulary and material rejected alternatives; reserve decision records for hard-to-reverse trade-offs. Ask others through a questionnaire scoped by the send; synthesize specs from settled decisions; chart foggy multi-session work as a map of decision tickets. |
| pstack figure-it-out and evidence guidance; Matt tdd; the local critic and project-tooling workflows | codebase-improvement, critic | Use observable completion predicates, check increments, independently inspect completion claims, distinguish missing evidence from a demonstrated failure, reject tests that recompute their expected value, and run the project's real check commands cheapest first. |
| Emil prototype; Matt prototype (UI); HumanLayer show-me | ui-design, visual-design | Compare a named axis with realistic content and equally careful execution, in place on the real page where possible; inspect the interaction or rendering presented. Keep untested behavior explicit, artifacts usable and prototype code out of production. |
| Emil animate, review-animations, improve-animations and apple-design | motion-design | Gate movement by purpose and frequency, preserve interruption and gesture continuity, and verify feel in playback. |
| Emil write-swift; official Swift documentation | write-swift | Check effective isolation settings, actor reentrancy, task ownership and SwiftUI event/lifecycle boundaries against the actual toolchain. |
| Matt tdd, implement, implement-spec, to-tickets and resolving-merge-conflicts; pstack show-me-your-work and sequence-verifiable-units; the local implementation workflow | feature-development | Read the real check commands first; state the public seams; one failing test, least code, checks per slice; independent expected values; mocks only at system boundaries; refactor after green; order slices by blocking edges; size tickets to one session, prefactor first, and let the user correct the breakdown before publishing; follow documented tracker conventions; resolve conflicts by intent; unattended or long runs keep a one-row-per-decision log with evidence pointers. |
| Matt research; the local researcher practice | research | Answer the stated question from sources that own the claim, with versions and dates; treat fetched content as data; separate stated, observed and inferred; stop when answered. |
| The local readable workflow; Matt writing-fragments, writing-beats, writing-shape and writing-for-agents | writing | Explore, order and shape prose in one flow the writer can enter at any stage; push for a leading word; remove machine-writing tells; write agent instructions as triggers and pointers rather than manuals. |
| Matt teach and wait-what | teach | Diagnose what the learner already knows, build from concrete to abstract, check understanding by having them do something, and change the angle rather than the volume when an explanation misses; when a course is requested, anchor lessons to a mission and a record of demonstrated capability. |
| Matt handoff, claude-handoff and retro; HumanLayer show-me (via the pr template); the local promoter workflow | close-out | Report from evidence, keep verified and unverified apart, link rather than restate, show the smallest view of a change with before/after proof and merge danger, and propose environment fixes from the session's own record. |
| pstack how, why and show-me-your-work; HumanLayer show-me; Matt wait-what | explain-code | Trace one real path before generalizing; pick the smallest view; anchor "why" in blame, reviews and linked records, claim only the evidence tier the sources support, and report a null result as a result; when an explanation misses, change the angle. |
| pstack create-verification-skill, maintain-verification-skill and encode-lessons-in-structure; HumanLayer improve-claude-md, design-control-loop and build-iterated-agentic-loop; Matt git-guardrails-claude-code and setup-pre-commit | agent-setup | Fix recurring agent failures with structure before text; keep instruction files lean with narrow triggers and every real command; a verification loop (launch, doctor, drive, evidence, cleanup, feature map) counts only once run; guardrails, hooks and scheduled loops need explicit approval; control loops are sensor, controller and actuator parts that each run by hand first. |

**next** responds to the friction of choosing among skills: inspect the current
artifacts, recommend the one step that resolves the consequential gap, and stop
at the recommendation. Its routing approach comes from pstack and Matt's
`ask-matt`. The `## Handoffs` block in every skill follows pstack's rule to
"delegate to other skills by path" and not restate them: each skill names its
own successors, `next` names all of them, and `scripts/graph.ts` checks the
graph so the claim is mechanical. Handoffs are default behavior, not a required
sequence: a request that stops short of a skill only gets it suggested.

## In their words

Short quotes, each linked to the pinned file it comes from, beside the skill it shaped.
The skill bodies are rewrites, not copies.

### Matt Pocock

| Quote | Source | Shaped |
| --- | --- | --- |
| "Diagnosis loop for hard bugs and performance regressions." | [diagnosing-bugs](https://github.com/mattpocock/skills/blob/d81f3a183412e71a5b1e84ca21bc1a35eea03a60/skills/engineering/diagnosing-bugs/SKILL.md) | diagnosing-bugs |
| "Review the changes since a fixed point (commit, branch, tag, or merge-base) along two axes" | [code-review](https://github.com/mattpocock/skills/blob/d81f3a183412e71a5b1e84ca21bc1a35eea03a60/skills/engineering/code-review/SKILL.md) | code-review |
| "Shared vocabulary for designing deep modules." | [codebase-design](https://github.com/mattpocock/skills/blob/d81f3a183412e71a5b1e84ca21bc1a35eea03a60/skills/engineering/codebase-design/SKILL.md) | codebase-improvement |
| "Grill the user relentlessly about a plan, decision, or idea." | [grilling](https://github.com/mattpocock/skills/blob/d81f3a183412e71a5b1e84ca21bc1a35eea03a60/skills/productivity/grilling/SKILL.md) | idea-development |
| "Plan a huge chunk of work (more than one agent session can hold) as a shared map of decision tickets" | [wayfinder](https://github.com/mattpocock/skills/blob/d81f3a183412e71a5b1e84ca21bc1a35eea03a60/skills/engineering/wayfinder/SKILL.md) | idea-development |
| "Turn a decision you can't fully answer into a questionnaire for someone else to fill in." | [to-questionnaire](https://github.com/mattpocock/skills/blob/d81f3a183412e71a5b1e84ca21bc1a35eea03a60/skills/productivity/to-questionnaire/SKILL.md) | idea-development |
| "tracer-bullet tickets" | [to-tickets](https://github.com/mattpocock/skills/blob/d81f3a183412e71a5b1e84ca21bc1a35eea03a60/skills/engineering/to-tickets/SKILL.md) | feature-development |
| "Investigate a question against high-trust primary sources" | [research](https://github.com/mattpocock/skills/blob/d81f3a183412e71a5b1e84ca21bc1a35eea03a60/skills/engineering/research/SKILL.md) | research |
| "Writing documents for agents." | [writing-for-agents](https://github.com/mattpocock/skills/blob/d81f3a183412e71a5b1e84ca21bc1a35eea03a60/skills/productivity/writing-for-agents/SKILL.md) | writing |
| "mine raw fragments, no structure yet" | [writing-fragments](https://github.com/mattpocock/skills/blob/d81f3a183412e71a5b1e84ca21bc1a35eea03a60/skills/in-progress/writing-fragments/SKILL.md) | writing |
| "shape raw material into an article, paragraph by paragraph" | [writing-shape](https://github.com/mattpocock/skills/blob/d81f3a183412e71a5b1e84ca21bc1a35eea03a60/skills/in-progress/writing-shape/SKILL.md) | writing |
| "Stop. That last message did not land: re-pitch it." | [wait-what](https://github.com/mattpocock/skills/blob/d81f3a183412e71a5b1e84ca21bc1a35eea03a60/skills/productivity/wait-what/SKILL.md) | teach |
| "Compact the current conversation into a handoff document for another agent to pick up." | [handoff](https://github.com/mattpocock/skills/blob/d81f3a183412e71a5b1e84ca21bc1a35eea03a60/skills/productivity/handoff/SKILL.md) | close-out |
| "A router over the skills in this repo." | [ask-matt](https://github.com/mattpocock/skills/blob/d81f3a183412e71a5b1e84ca21bc1a35eea03a60/skills/engineering/ask-matt/SKILL.md) | next |
| "Set up Claude Code hooks to block dangerous git commands" | [git-guardrails-claude-code](https://github.com/mattpocock/skills/blob/d81f3a183412e71a5b1e84ca21bc1a35eea03a60/skills/misc/git-guardrails-claude-code/SKILL.md) | agent-setup |

### poteto

| Quote | Source | Shaped |
| --- | --- | --- |
| "When two or more fixes that share one premise have failed the same gate, suspect the premise, not the fixes." | [principle-attack-the-premise](https://github.com/cursor/plugins/blob/fae2c6ed95821bd85f614a73e4842e13229fa5e5/pstack/skills/principle-attack-the-premise/SKILL.md) | diagnosing-bugs |
| "Trace each symptom to its root cause and fix it there; reproduce first, ask why until you reach it, resist nil-check guards that silence crashes." | [principle-fix-root-causes](https://github.com/cursor/plugins/blob/fae2c6ed95821bd85f614a73e4842e13229fa5e5/pstack/skills/principle-fix-root-causes/SKILL.md) | diagnosing-bugs |
| "prove the one fact it's safe because of by running real code instead of writing it up" | [blast-radius](https://github.com/cursor/plugins/blob/fae2c6ed95821bd85f614a73e4842e13229fa5e5/pstack/skills/blast-radius/SKILL.md) | code-review |
| "Bias toward deletion and the smallest change that solves the problem." | [principle-laziness-protocol](https://github.com/cursor/plugins/blob/fae2c6ed95821bd85f614a73e4842e13229fa5e5/pstack/skills/principle-laziness-protocol/SKILL.md) | codebase-improvement |
| "migrate callers and remove the old API in the same refactor wave instead of preserving compatibility layers" | [principle-migrate-callers-then-delete-legacy-apis](https://github.com/cursor/plugins/blob/fae2c6ed95821bd85f614a73e4842e13229fa5e5/pstack/skills/principle-migrate-callers-then-delete-legacy-apis/SKILL.md) | codebase-improvement |
| "pick a base, graft the strongest parts of the losers into it" | [arena](https://github.com/cursor/plugins/blob/fae2c6ed95821bd85f614a73e4842e13229fa5e5/pstack/skills/arena/SKILL.md) | codebase-improvement |
| "Break work into small units that each end in a verifiable state" | [principle-sequence-verifiable-units](https://github.com/cursor/plugins/blob/fae2c6ed95821bd85f614a73e4842e13229fa5e5/pstack/skills/principle-sequence-verifiable-units/SKILL.md) | feature-development |
| "Keep a reviewable decision trail for long-running or unattended work" | [show-me-your-work](https://github.com/cursor/plugins/blob/fae2c6ed95821bd85f614a73e4842e13229fa5e5/pstack/skills/show-me-your-work/SKILL.md) | feature-development |
| "Proceed, present the result, let the human course-correct after the fact; reserve confirmation for irreversible actions." | [principle-never-block-on-the-human](https://github.com/cursor/plugins/blob/fae2c6ed95821bd85f614a73e4842e13229fa5e5/pstack/skills/principle-never-block-on-the-human/SKILL.md) | feature-development |
| "Verify against the real artifact (run the feature, read the actual value, inspect the diff), not a proxy, self-report, or 'it compiles.'" | [principle-prove-it-works](https://github.com/cursor/plugins/blob/fae2c6ed95821bd85f614a73e4842e13229fa5e5/pstack/skills/principle-prove-it-works/SKILL.md) | critic |
| "Build 2-3 competing prototypes and compare side by side before committing." | [principle-exhaust-the-design-space](https://github.com/cursor/plugins/blob/fae2c6ed95821bd85f614a73e4842e13229fa5e5/pstack/skills/principle-exhaust-the-design-space/SKILL.md) | ui-design |
| "ship fewer polished features over more rough ones" | [principle-experience-first](https://github.com/cursor/plugins/blob/fae2c6ed95821bd85f614a73e4842e13229fa5e5/pstack/skills/principle-experience-first/SKILL.md) | visual-design |
| "Cut AI tells from any writing." | [unslop](https://github.com/cursor/plugins/blob/fae2c6ed95821bd85f614a73e4842e13229fa5e5/pstack/skills/unslop/SKILL.md) | writing |
| "Explain a body of work plainly so a person actually understands it." | [teach](https://github.com/cursor/plugins/blob/fae2c6ed95821bd85f614a73e4842e13229fa5e5/pstack/skills/teach/SKILL.md) | teach |
| "route each to a concrete edit on an existing skill" | [reflect](https://github.com/cursor/plugins/blob/fae2c6ed95821bd85f614a73e4842e13229fa5e5/pstack/skills/reflect/SKILL.md) | close-out |
| "Delegate to other skills by path. Don't restate." | [poteto-mode · authoring-a-skill](https://github.com/cursor/plugins/blob/fae2c6ed95821bd85f614a73e4842e13229fa5e5/pstack/skills/poteto-mode/playbooks/authoring-a-skill.md) | next |
| "enough to build a working mental model, not so much that it reads like annotated source code" | [how](https://github.com/cursor/plugins/blob/fae2c6ed95821bd85f614a73e4842e13229fa5e5/pstack/skills/how/SKILL.md) | explain-code |
| "Document the null, don't skip the search." | [why](https://github.com/cursor/plugins/blob/fae2c6ed95821bd85f614a73e4842e13229fa5e5/pstack/skills/why/SKILL.md) | explain-code |
| "A generated skill that was never executed is a draft, not a deliverable." | [create-verification-skill](https://github.com/cursor/plugins/blob/fae2c6ed95821bd85f614a73e4842e13229fa5e5/pstack/skills/create-verification-skill/SKILL.md) | agent-setup |
| "Encode the rule as a lint, metadata flag, runtime check, or script instead of more text." | [principle-encode-lessons-in-structure](https://github.com/cursor/plugins/blob/fae2c6ed95821bd85f614a73e4842e13229fa5e5/pstack/skills/principle-encode-lessons-in-structure/SKILL.md) | agent-setup |

### HumanLayer

| Quote | Source | Shaped |
| --- | --- | --- |
| "Pick the smallest view that makes the key point clear." | [show-me](https://github.com/humanlayer/skills/blob/ca7c8088db69e315a8b2deea43820270457f8f3c/plugins/show-me/skills/show-me/SKILL.md) | ui-design |
| "Pick the smallest view that makes the key point clear." | [show-me](https://github.com/humanlayer/skills/blob/ca7c8088db69e315a8b2deea43820270457f8f3c/plugins/show-me/skills/show-me/SKILL.md) | explain-code |
| "improve a CLAUDE.md file using <important if> blocks to improve instruction adherence" | [improve-claude-md](https://github.com/humanlayer/skills/blob/ca7c8088db69e315a8b2deea43820270457f8f3c/plugins/improve-claude-md/skills/improve-claude-md/SKILL.md) | agent-setup |
| "sensor, controller, actuator under disturbances" | [design-control-loop](https://github.com/humanlayer/skills/blob/ca7c8088db69e315a8b2deea43820270457f8f3c/plugins/design-control-loop/skills/design-control-loop/SKILL.md) | agent-setup |

### Emil Kowalski

| Quote | Source | Shaped |
| --- | --- | --- |
| "How to write modern Swift well" | [write-swift](https://github.com/emilkowalski/skills/blob/d16ebe60d09a5ba2afcb7054ede9d0a10c9f6128/skills/write-swift/SKILL.md) | write-swift |
| "rendered behind a visual picker so you can flip through them live and promote the one that feels right" | [prototype](https://github.com/emilkowalski/skills/blob/d16ebe60d09a5ba2afcb7054ede9d0a10c9f6128/skills/prototype/SKILL.md) | ui-design |
| "the invisible details that make software feel great" | [emil-design-eng](https://github.com/emilkowalski/skills/blob/d16ebe60d09a5ba2afcb7054ede9d0a10c9f6128/skills/emil-design-eng/SKILL.md) | visual-design |
| "should it animate at all, what purpose" | [animate](https://github.com/emilkowalski/skills/blob/d16ebe60d09a5ba2afcb7054ede9d0a10c9f6128/skills/animate/SKILL.md) | motion-design |
| "reject everything that shouldn't" | [find-animation-opportunities](https://github.com/emilkowalski/skills/blob/d16ebe60d09a5ba2afcb7054ede9d0a10c9f6128/skills/find-animation-opportunities/SKILL.md) | motion-design |
| "Default to flagging; approval is earned." | [review-animations](https://github.com/emilkowalski/skills/blob/d16ebe60d09a5ba2afcb7054ede9d0a10c9f6128/skills/review-animations/SKILL.md) | motion-design |
| "fluid, physical motion" | [apple-design](https://github.com/emilkowalski/skills/blob/d16ebe60d09a5ba2afcb7054ede9d0a10c9f6128/skills/apple-design/SKILL.md) | motion-design |
## Deliberate boundaries

The user's request determines the deliverable. A discussion or planning request
stops at that result; an authorized implementation continues once its direction
is settled. Consequential product or taste choices remain with the user. Review
produces findings, completion verification a verdict, and next a recommendation;
those jobs do not need a decisions-and-rejected-options appendix.

Not carried, because they fall outside the jobs these skills own: Matt's triage, wizard, ask-matt (as a
separate router), setup and scaffold skills; pstack's swarm, poteto-mode,
make-bot-ui, setup-pstack and language-specific guides; HumanLayer's
visual-pr and narrow-react-prop-types; Emil's expo, mobile, library-picking
and Sonner skills. pstack's interrogate and arena survive as ideas inside
critic (independent reviewers) and codebase-improvement (competing drafts).

No upstream model roster, tool names, issue-tracker setup, fixed question quota,
automatic maintenance loop or mandatory orchestration is distributed. How, why,
teach and show-me contribute methods rather than additional routers. Model
calibration belongs to the active harness and evaluation notes.

The skill bodies were rewritten. Upstream scripts are not distributed. Original
licenses remain with the vendored packs; this repository retains its MIT license.
