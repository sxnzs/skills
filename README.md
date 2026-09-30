# skills

Four agent skills for the work that happens before code is written or changed:
turning ideas, messy code, and unsettled screens into shared decisions and plans.

| Skill | Say something like | Leaves behind |
| --- | --- | --- |
| [**idea-development**](skills/idea-development/SKILL.md) | "Help me develop this idea." | A shared vision, the decisions behind it, and a plan |
| [**codebase-improvement**](skills/codebase-improvement/SKILL.md) | "Help me improve this codebase." | A justified better structure and a step-by-step plan |
| [**visual-design**](skills/visual-design/SKILL.md) | "Let's find the visual direction." | A chosen look, expressed as concrete values |
| [**ui-design**](skills/ui-design/SKILL.md) | "Help me design this interface." | Agreed flows, states, and interactions |

## Why these four

Collections of small skills make you ask "which skill is next?". These are named
after the work you already know you're starting, not after the techniques inside
it. Questioning, research, prototypes, and decision notes are tools each skill
reaches for when they help, not steps you have to sequence.

They share one shape:

- **Look before asking.** The agent reads what it can find before spending your
  attention.
- **Something concrete to disagree with.** Usage examples, before/after
  structure, working prototypes, not abstract questions.
- **Real options, honest costs.** Genuinely different alternatives, each with
  when it wins and what it costs. You choose.
- **A handoff, not a transcript.** Decisions and plans someone else can build
  from without replaying the conversation.

Visual design and UI design are separate skills because "how it looks" and "how
it works" are different questions, but they share context and hand off to each
other mid-conversation.

## Install

Each skill is a folder with a `SKILL.md`, the format used by Claude Code, Codex,
Cursor, pi, and other agent harnesses. Copy or symlink the folders you want into
your harness's skills directory, for example:

```sh
git clone https://github.com/sxnzs/skills
mkdir -p ~/.claude/skills
for s in "$PWD"/skills/skills/*; do ln -s "$s" ~/.claude/skills/; done
```

The skills stop at a decision or plan; building it is a separate request.

## Lineage

These skills were written after studying first-party skills by
[@poteto](https://github.com/cursor/plugins/tree/main/pstack),
[@dexhorthy](https://github.com/humanlayer/skills), and
[@emilkowalski](https://github.com/emilkowalski/skills), and the collection by
[@mattpocock](https://github.com/mattpocock/skills). What we took from each is
in [LINEAGE.md](LINEAGE.md). No source text is copied beyond short attributed
quotes.

## License

MIT
