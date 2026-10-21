# agent-setup

> Make a repo easy for agents to work in and prove changes in.

## What it does

`agent-setup` fixes the things that repeatedly slow or mislead agents in a repository, using the smallest durable change. It reads the repo first for the real install, build, test, lint and type commands, CI, existing instruction files and hooks, and it asks only about what it can't observe. Then it works from the failures you've actually seen: a guessed command, a skipped check, a crossed boundary, a "done" that never drove the app.

The preference is structure over text. A correction an agent needs twice becomes a lint rule, a test, a hook or a script; prose is for what can't be enforced. The instruction file stays lean: identity, map, stack and every real command up top, narrow triggers for guidance that applies to one kind of work, nothing a linter already enforces. Where agents need to prove behavior as a user sees it, it builds a verification loop (launch, doctor, drive, evidence, cleanup, a map of features) and runs it end to end once, because a loop that was never run is a draft.

It can also propose destructive-command guards, commit-time checks and, when you ask for recurring autonomous improvement, a designed control loop. Anything that changes what agents may run, or runs on a schedule, waits for your approval.

## When to reach for it

Say "make this repo agent-ready", "agents keep guessing the test command", "set up a way to verify the app", or "tighten my AGENTS.md".

| Your situation | Reach for |
| --- | --- |
| Sessions keep stumbling in the same repo | `agent-setup` |
| The instruction file only needs better prose | [writing](../productivity/writing.md) |
| A finished change needs checking against its claim | [critic](critic.md) |
| A retro found repeated friction | [close-out](../productivity/close-out.md), which hands it here |
| The code itself is painful to change | [codebase-improvement](codebase-improvement.md) |

## It's working if

- Each fixed failure has an owner that doesn't depend on an agent remembering: a check, a hook, a short rule or a verification loop.
- Check commands come from the repo, not memory, and every real command survives in the instruction file.
- The verification loop was run once, left evidence behind, and cleaned up without deleting it.
- Hooks, settings, CI and global config changed only with your explicit approval, and nothing was committed or pushed unasked.

## Common questions

**Does it write my AGENTS.md from scratch?**
It tightens or creates one when that's the failing piece, but a rule that can be a lint or a hook becomes one instead.

**Will it install hooks without asking?**
No. It proposes the exact change, asks whether it's for this project or all projects, and tests that a blocked command is blocked and a safe one isn't.

**Is the control loop always part of it?**
No. Only when you want some property of the codebase driven toward a target by small reviewable changes on a schedule.

## Where it fits

[close-out](../productivity/close-out.md)'s retro, [feature-development](feature-development.md), [codebase-improvement](codebase-improvement.md) and [writing](../productivity/writing.md) point here when the repo's setup, not one task, is the problem. It hands the prose to [writing](../productivity/writing.md) and a built loop to [critic](critic.md).

<!-- handoffs:start -->
## Handoffs

| When | Then |
| --- | --- |
| The instruction file's prose needs writing | runs [writing](../productivity/writing.md) |
| A tool or platform's behavior is unknown | runs [research](../productivity/research.md) |
| A verification loop or hook is built | runs [critic](../engineering/critic.md) |
| A required behavior needs building test-first | suggests [feature-development](../engineering/feature-development.md) |
| The setup is done and needs a PR | suggests [close-out](../productivity/close-out.md) |

Reached from [codebase-improvement](../engineering/codebase-improvement.md), [feature-development](../engineering/feature-development.md), [close-out](../productivity/close-out.md), [writing](../productivity/writing.md).
<!-- handoffs:end -->

## Credits

Drawn from upstream skills (MIT, revisions pinned in [LINEAGE](../../LINEAGE.md)); the skill itself is a rewrite.

- "A generated skill that was never executed is a draft, not a deliverable." — [poteto, create-verification-skill](https://github.com/cursor/plugins/blob/fae2c6ed95821bd85f614a73e4842e13229fa5e5/pstack/skills/create-verification-skill/SKILL.md)
- "Encode the rule as a lint, metadata flag, runtime check, or script instead of more text." — [poteto, principle-encode-lessons-in-structure](https://github.com/cursor/plugins/blob/fae2c6ed95821bd85f614a73e4842e13229fa5e5/pstack/skills/principle-encode-lessons-in-structure/SKILL.md)
- "improve a CLAUDE.md file using <important if> blocks to improve instruction adherence" — [HumanLayer, improve-claude-md](https://github.com/humanlayer/skills/blob/ca7c8088db69e315a8b2deea43820270457f8f3c/plugins/improve-claude-md/skills/improve-claude-md/SKILL.md)
- "sensor, controller, actuator under disturbances" — [HumanLayer, design-control-loop](https://github.com/humanlayer/skills/blob/ca7c8088db69e315a8b2deea43820270457f8f3c/plugins/design-control-loop/skills/design-control-loop/SKILL.md)
- "Set up Claude Code hooks to block dangerous git commands" — [Matt Pocock, git-guardrails-claude-code](https://github.com/mattpocock/skills/blob/d81f3a183412e71a5b1e84ca21bc1a35eea03a60/skills/misc/git-guardrails-claude-code/SKILL.md)
