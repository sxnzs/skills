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
| Matt diagnosing-bugs; pstack root-causes and behavior-testing principles | diagnosing-bugs | Build and tighten a fast, deterministic loop on the exact symptom; raise the rate of intermittent failures; rank falsifiable hypotheses before probing; tag temporary instrumentation; minimize without losing the failure; prove regression at the real seam, and treat a missing seam as a finding. |
| Matt code-review; pstack blast-radius | code-review | Separate intent from standards, in separate contexts when available; pin the merge-base comparison and find the spec before judging; check missing, unrequested and incorrect behavior; use Fowler's smells only as labelled judgment calls; check the actual implementation of the fact that makes consequential behavior safe. |
| Matt codebase-design, deepening, design-it-twice, improve-codebase-architecture and tdd; pstack architect | codebase-improvement | Start with caller usage and change hot spots; hide a substantial responsibility behind a small interface; apply the deletion test; let dependency kind decide the seam, with two real adapters before a port; replace shallow tests rather than layering them; draft alternatives under different pressures and recommend one. |
| Matt grilling, domain-modeling and prototype (logic); HumanLayer show-me and design-control-loop | idea-development | Ask the currently answerable decisions in numbered rounds with recommended answers, inspect facts before asking, challenge overloaded terms, and use the smallest representation that makes a choice concrete, including a single-file logic prototype. Record decisions, settled vocabulary and material rejected alternatives; reserve decision records for hard-to-reverse trade-offs. |
| pstack figure-it-out and evidence guidance; Matt tdd; the local critic workflow | codebase-improvement, critic | Use observable completion predicates, check increments, independently inspect completion claims, distinguish missing evidence from a demonstrated failure, and reject tests that recompute their expected value. |
| Emil prototype; Matt prototype (UI); HumanLayer show-me | ui-design, visual-design | Compare a named axis with realistic content and equally careful execution, in place on the real page where possible; inspect the interaction or rendering presented. Keep untested behavior explicit, artifacts usable and prototype code out of production. |
| Emil animate, review-animations, improve-animations and apple-design | motion-design | Gate movement by purpose and frequency, preserve interruption and gesture continuity, and verify feel in playback. |
| Emil write-swift; official Swift documentation | write-swift | Check effective isolation settings, actor reentrancy, task ownership and SwiftUI event/lifecycle boundaries against the actual toolchain. |

**next** responds to the friction of choosing among skills: inspect the current
artifacts, recommend the one step that resolves the consequential gap, and stop
at the recommendation. Its routing approach comes from pstack. It includes
specialist routes without imposing a sequence on other workflows.

## Deliberate boundaries

The user's request determines the deliverable. A discussion or planning request
stops at that result; an authorized implementation continues once its direction
is settled. Consequential product or taste choices remain with the user. Review
produces findings, completion verification a verdict, and next a recommendation;
those jobs do not need a decisions-and-rejected-options appendix.

No upstream model roster, tool names, issue-tracker setup, fixed question quota,
automatic maintenance loop or mandatory orchestration is distributed. How, why,
teach and show-me contribute methods rather than additional routers. Model
calibration belongs to the active harness and evaluation notes.

The skill bodies were rewritten. Upstream scripts are not distributed. Original
licenses remain with the vendored packs; this repository retains its MIT license.
