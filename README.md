# Skills

Fifteen agent skills for the work around code: deciding what to build, building
it in checked steps, finding out why it broke, proving it's done, and telling
people about it.

I started with dozens of skills from four different collections and kept hitting
the same problem: before doing the work, I had to work out which skill came
next. So I rewrote them into one library where each skill is named after the
work you say you're starting ("help me develop this idea", "fix this
regression", "write the PR"), and the techniques live inside it. Grilling,
prototypes, research and decision notes are things a skill reaches for when they
help, not steps you have to sequence.

They're plain `SKILL.md` folders. They work in Claude Code, Codex, OpenCode,
Cursor, pi and anything else that reads the Agent Skills format, and they're
written to stay portable across models. Read them, change them, make them yours.

## Install

Pick one route. Installing more than one gives you every skill twice.

<details>
<summary><strong>Claude Code plugin</strong></summary>

```bash
claude plugin marketplace add sxnzs/skills
claude plugin install sxnzs-skills@sxnzs
```

Or from inside a session: `/plugin marketplace add sxnzs/skills`, then
`/plugin install sxnzs-skills@sxnzs`. You get the whole set as a managed bundle.
New releases arrive when you run `claude plugin update sxnzs-skills@sxnzs`, or
automatically if you enable auto-update for `sxnzs` under `/plugin` →
Marketplaces.

</details>

<details>
<summary><strong>Codex plugin</strong></summary>

```bash
codex plugin marketplace add sxnzs/skills
codex plugin add sxnzs-skills@sxnzs
```

</details>

<details>
<summary><strong>Any agent, as files you own (skills.sh)</strong></summary>

```bash
npx skills@latest add sxnzs/skills
```

Pick the skills and agents you want. The files land in your project or home
directory, so you can edit them; run `npx skills update` when you want my
changes. One skill at a time:

```bash
npx skills@latest add sxnzs/skills --skill=code-review
```

</details>

There is no setup step. Each skill reads your repository's own conventions
(check commands, issue tracker, docs layout) when it needs them.

## The skills

| Skill | Say something like | Leaves behind |
| --- | --- | --- |
| **Engineering** | | |
| [feature-development](docs/engineering/feature-development.md) | "Build this feature." | Behavior delivered in verified, test-first slices |
| [diagnosing-bugs](docs/engineering/diagnosing-bugs.md) | "Fix this regression." | A proven cause and a fix with failing-before, passing-after evidence |
| [codebase-improvement](docs/engineering/codebase-improvement.md) | "This code is painful to change." | A justified structure and plan, implemented when you ask |
| [code-review](docs/engineering/code-review.md) | "Check the latest changes." | Findings against intent and your repository's standards |
| [critic](docs/engineering/critic.md) | "Is this actually done?" | A pass, fail or unverified verdict backed by evidence |
| [write-swift](docs/engineering/write-swift.md) | "Fix this SwiftUI lifecycle bug." | Swift checked against your real toolchain and isolation rules |
| **Design** | | |
| [idea-development](docs/design/idea-development.md) | "Help me develop this idea." | The decisions behind an idea, and a plan to build it |
| [ui-design](docs/design/ui-design.md) | "Help me design this flow." | Flows, states and interactions settled with working prototypes |
| [visual-design](docs/design/visual-design.md) | "Let's find the look." | A chosen direction, expressed as concrete values |
| [motion-design](docs/design/motion-design.md) | "Make this interaction feel right." | Purposeful, interruptible motion, checked in playback |
| **Productivity** | | |
| [research](docs/productivity/research.md) | "Find out how this API handles retries." | A cited, dated answer from primary sources |
| [writing](docs/productivity/writing.md) | "Tighten this README." | Plain prose, or an instruction file agents follow |
| [teach](docs/productivity/teach.md) | "Explain this; that didn't land." | Understanding you've checked by doing something |
| [close-out](docs/productivity/close-out.md) | "Write the PR." | A commit message, PR body, handoff or retro true to the evidence |
| [next](docs/productivity/next.md) | "What's next?" | One recommended step, and why |

[How the skills fit together](docs/README.md) shows the handoffs between them.

## Why these skills exist

Each one fixes a way I watched agents fail.

### The agent built the wrong thing

You describe a feature, the agent starts typing, and an hour later you find out
it understood something else. The gap was in the first five minutes.

**[idea-development](docs/design/idea-development.md)** closes it. The agent
reads what already exists, then asks the questions you can answer now, numbered,
each with its recommended answer, and holds back the ones that depend on them.
You disagree with concrete proposals instead of abstract questions, and you end
with decisions and a plan someone else could build from. Sometimes the outcome
is that the idea isn't worth building, which is a cheap thing to learn early.

### "Done", it says. It isn't.

Agents report success generously. A green test suite doesn't prove the feature
exists, and a test that calculates its expectation like the implementation can
reproduce the same bug and still pass.

**[feature-development](docs/engineering/feature-development.md)** builds in
thin slices: one failing test at a public seam, the least code that passes it,
then the project's real checks. **[critic](docs/engineering/critic.md)** checks
a finished claim against the actual files and check output, and answers PASS,
FAIL or UNVERIFIED. It never upgrades "probably" to "verified".

### Debugging by guessing

The agent sees an error, guesses a cause, edits, and repeats. Sometimes the
symptom moves and it calls that a fix.

**[diagnosing-bugs](docs/engineering/diagnosing-bugs.md)** starts by building a
loop: one command that checks your exact symptom, gives the same answer every
run, and runs fast. Then it ranks competing explanations, each with the
observation that would confirm or kill it, and changes one variable at a time.
The fix comes with evidence that it failed before and passes after.

### Refactoring for its own sake

"This file is big" is not a reason to restructure it.
**[codebase-improvement](docs/engineering/codebase-improvement.md)** starts from
a change that was actually hard to make, and picks the smallest structural move
that removes that friction. Leaving the code alone is a valid result.

### Reviews that don't ask what the change was for

**[code-review](docs/engineering/code-review.md)** checks a diff two ways: does
it do what the issue or spec asked, and does it follow how this repository
writes code. A change can pass one and fail the other, so you get both answers.

### Design by adjective

"Make it cleaner" and "avoid a generic look" give you a different default, not a
better design. **[ui-design](docs/design/ui-design.md)** and
**[visual-design](docs/design/visual-design.md)** compare real options on a
named axis, with realistic content and inside the real page, then record the
choice as values and behaviors a builder can apply.
**[motion-design](docs/design/motion-design.md)** tunes timing, gesture
continuity and interruption, then checks the result in playback.

### Confident facts with no source

**[research](docs/productivity/research.md)** answers from the sources that own
the claim (official docs, specs, source code), records the version or date each
claim applies to, and leaves a short note you can check without repeating the
work.

### Work nobody hears about

A verified change nobody knows about is unfinished.
**[close-out](docs/productivity/close-out.md)** writes the commit message, PR
body, handoff or retro from the evidence, keeps verified and unverified claims
apart, and lists what was dropped and why. **[writing](docs/productivity/writing.md)**
handles the rest of the prose, including instruction files for agents, and
**[teach](docs/productivity/teach.md)** is for when you want to understand
something, not just have it done.

### "Which skill now?"

**[next](docs/productivity/next.md)** reads where the work stands and recommends
one step, with the reason. It only recommends.

## Working with current models

The skills are written for models that follow instructions closely, such as
Claude Opus 5.5 and GPT-6. A planning request stops at the plan. Authorized work
carries on through its checks without stopping to ask for approval you already
gave, and pauses only for a decision that is yours to make or an action that
needs permission. Model-specific settings, such as reasoning effort, belong in
your harness. [Model notes](evals/MODELS.md) has what I've measured and two lines
worth adding to your own agent instructions.

## Contributing and local development

Issues and pull requests are welcome. The rules for editing skills are in
[AGENTS.md](AGENTS.md).

```sh
git clone https://github.com/sxnzs/skills && cd skills
scripts/link-skills.sh   # symlink every skill into ~/.claude/skills and ~/.agents/skills
npm run check            # Node 24+ and Python 3; no install step
```

The check validates skill metadata, sibling references, docs pages, plugin
manifests and links, and runs the motion and Swift examples. It can't prove how
an agent behaves; [evals](evals/README.md) covers that separately. Changes are
listed in the [changelog](CHANGELOG.md).

## Lineage

These skills were written after studying the skills of
[@mattpocock](https://github.com/mattpocock/skills),
[@poteto](https://github.com/cursor/plugins/tree/main/pstack),
[@dexhorthy](https://github.com/humanlayer/skills) and
[@emilkowalski](https://github.com/emilkowalski/skills). [LINEAGE.md](LINEAGE.md)
records what came from each. The text is rewritten; no source text is copied
beyond short attributed quotes.

## License

MIT
