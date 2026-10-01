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
| Matt diagnosing-bugs; pstack root-causes and behavior-testing principles | diagnosing-bugs | Establish the symptom, minimize without losing it, distinguish hypotheses with probes, and prove regression at the real seam. |
| Matt code-review; pstack blast-radius | code-review | Separate intent from standards; check the actual implementation of the fact that makes consequential behavior safe. |
| Matt codebase-design and deepening; pstack architect | codebase-improvement | Start with caller usage; hide a substantial responsibility behind a small interface, remove coordination and introduce adapters for actual dependencies. |
| Matt grilling and domain-modeling; HumanLayer show-me and design-control-loop | idea-development | Ask about decisions whose prerequisites are settled, inspect facts before asking, and use the smallest representation that makes a choice concrete. Record decisions and material rejected alternatives. |
| pstack figure-it-out and evidence guidance; the local critic workflow | codebase-improvement, critic | Use observable completion predicates, check increments, independently inspect completion claims, and distinguish missing evidence from a demonstrated failure. |
| Emil prototype; HumanLayer show-me | ui-design, visual-design | Compare a named axis with realistic content and equally careful execution; inspect the interaction or rendering presented. Keep untested behavior explicit and artifacts usable. |
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
