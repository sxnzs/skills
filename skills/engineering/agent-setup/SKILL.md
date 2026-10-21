---
name: agent-setup
description: Make a repo easy for agents to work in and prove changes in. Use when onboarding agents or when sessions keep stumbling. Instruction prose uses writing.
---

# Agent Setup

Fix what repeatedly slows or misleads agents in this repo, with the smallest
durable change: a command that works, a check that runs, a rule that is enforced.

## What done looks like

Each recurring failure has an owner that does not depend on an agent
remembering: a runnable check, a hook, a short instruction, or a verification
loop that has been run once and left evidence. Anything unproven is reported as
a draft.

## How the work goes

- Learn the repo before asking. Find the package manager, install, build, test,
  lint and type commands, CI, existing instruction files, hooks and how the app
  starts and is used. Ask only for what cannot be observed. If the checkout does
  not build or start as it is, report that first; setup written against a broken
  base teaches wrong steps.
- Name the failures to fix, from the user's complaints and the evidence:
  sessions that guessed a command, skipped a check, broke a boundary, or claimed
  done without driving the app. Fix those, not an imagined checklist.
- Prefer structure over text. A rule an agent keeps being told twice becomes a
  lint rule, a test, a hook or a script; prose is for what cannot be enforced.
- Keep the instruction file (`AGENTS.md`, `CLAUDE.md`) lean: project identity,
  map, stack and every real command stay bare; cut what a linter or formatter
  enforces and what the code already shows; point to files instead of pasting
  snippets that go stale. Give each rule that applies to one kind of work a
  narrow trigger. See [instruction file](references/instruction-file.md); write
  the prose with **writing**.
- Where agents need to prove behavior the way a user sees it, build a
  [verification loop](references/verification-loop.md): launch, doctor, drive,
  evidence, cleanup, seeded with a feature map. Run it end to end on one
  feature; one that was never run is a draft.
- For destructive-command guards, commit-time checks, or a recurring
  agent-driven improvement loop, read [guardrails](references/guardrails.md).
- Verify each piece by making it fail on purpose once, then pass.

## Boundaries

Hooks, settings, permissions, CI workflows and global config change what agents
may do or run on a schedule; propose the exact change and wait for explicit
approval, and ask whether it applies to this project or all projects. Keep
secrets out of every file written. Extend the repo's existing conventions
instead of adding a parallel system. Setup does not authorize committing,
pushing or enabling a workflow.

## Handoffs

**run** continues into that skill with this context unless the request stops
short of it, then it is only suggested. **suggest** names it in one closing line
once the deliverable is final and never continues unasked. A missing skill never
blocks; do the work inline.

- The instruction file's prose needs writing → run **writing**
- A tool or platform's behavior is unknown → run **research**
- A verification loop or hook is built → run **critic**
- A required behavior needs building test-first → suggest **feature-development**
- The setup is done and needs a PR → suggest **close-out**
