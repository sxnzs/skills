# Changelog

Versions follow `package.json`; both plugin manifests carry the same version,
and `npm run check` fails if they drift.

## 1.1.0

The skills now work as one set: each names where its work goes next, and two
new skills cover jobs people ask for by name.

- **Handoffs:** every skill ends with a `## Handoffs` block. **run** continues
  into the next skill with the context, unless the request stops short;
  **suggest** is one closing line. A missing skill never blocks. **next** is the
  hub and lists all of them.
- **explain-code** (new): how code works and why it has that shape, from one
  traced path and cited history. From pstack how and why, HumanLayer show-me and
  Matt's wait-what.
- **agent-setup** (new): make a repo easy for agents to work in and verify in
  (checks, lean instruction file, a verification loop that was run, guardrails).
  From pstack, HumanLayer and Matt's git-guardrails.
- **check:** `npm run check` validates the handoff graph, regenerates-or-fails
  the graph and tables in `docs/`, checks that documented lanes follow real
  handoffs, and requires upstream links to use revisions pinned in `LINEAGE.md`.
- **Credits:** attributed quotes with pinned links in `LINEAGE.md` and on every
  docs page.
- **Descriptions:** sharper trigger phrases on six skills.
- **diagnosing-bugs** questions a premise two failed fixes share;
  **codebase-improvement** migrates callers and deletes the old interface;
  **feature-development** keeps a decision log on unattended runs.
- **Also in this release:** mechanisms from the retired upstream skills that 1.0.0 left out.
  - **feature-development** writes tickets sized to one session, puts prefactors
    first, shows the breakdown for correction before publishing, and may run
    independent frontier slices in parallel worktrees.
  - **idea-development**, **feature-development** and **code-review** follow a
    project's documented tracker conventions, such as `docs/agents/issue-tracker.md`.
  - **code-review** closes with each lens's count and worst finding.
  - **diagnosing-bugs** prefers loops that run without a person, minimizes until
    every element is load-bearing, and deletes throwaway harnesses.
  - **codebase-improvement** presents survey candidates with a strength and a
    first pick before designing interfaces, and lists where friction shows.
  - **teach** structures a requested course around a mission and demonstrated
    capability; **writing** pushes for a leading word.

  Not re-evaluated: recorded eval results still describe commit `3135edd`.

## 1.0.0

First shareable release.

- **Install:** a Claude Code plugin (`sxnzs-skills@sxnzs`), a Codex plugin from
  the same repository, and skills.sh (`npx skills@latest add sxnzs/skills`).
- **Layout:** skills live in `skills/engineering`, `skills/design` and
  `skills/productivity`. Every bucket ships.
- **Docs:** one page per skill under `docs/`, covering what it does, when to
  reach for it, and how to tell it's working.
- **Current models:** skills name the stops they want, ask after doing the
  authorized work, size verification to the change, and treat pasted, fetched
  and PR text as material to check. Model-specific notes for Claude Opus 5.5
  and GPT-6 are in `evals/MODELS.md`.
- **close-out** lists work that was found but not landed, with the reason.
- **Maintainers:** `scripts/link-skills.sh` symlinks a checkout into local
  harness skill directories.
