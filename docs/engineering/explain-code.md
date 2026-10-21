# explain-code

> Explain how code works and why it has that shape, with evidence.

## What it does

`explain-code` answers "how does this work", "why is it like this" and "where should this live" without touching the code. For "how", it traces one real path from trigger to result and names the files and functions on it, so you finish with a mental model you could start working from, not a tour of every file or a paraphrase of the source. It picks the smallest view that makes the point: pseudocode, a call tree, a file tree, a diagram or a diff of a shape.

For "why", it keeps what the code does apart from the forces behind it. It anchors on blame and history, follows them to pull requests, reviews, issues, comments, tests and docs, and consults chat, incident or analytics tools only when they're connected and the code looks like it was written in reaction to something. Every claim is placed on a ladder from *direct* (an author wrote the reason) down to *unknown* (it looked and found nothing), and it names where it searched. "No recorded reason" is a valid answer.

A large subsystem can be read in parallel slices when the host supports it. A narrow question needs no fan-out.

## When to reach for it

Say "how does the retry path work", "why do we do it this way", "walk me through this module" or "which package should own this".

| Your situation | Reach for |
| --- | --- |
| You need to understand code, or its history, before changing it | `explain-code` |
| The answer lives in external docs, standards or APIs | [research](../productivity/research.md) |
| You want to learn it well enough to do it yourself | [teach](../productivity/teach.md) |
| The code misbehaves and the cause is unknown | [diagnosing-bugs](diagnosing-bugs.md) |
| The structure is the problem, not your understanding of it | [codebase-improvement](codebase-improvement.md) |

## It's working if

- The answer follows one concrete path and cites files and symbols you can open.
- "Why" claims say how strongly the sources support them, and what was searched and not found.
- The explanation fits the question; it doesn't expand into a survey.
- Nothing is edited, and no rationale is invented to fill a gap.

## Common questions

**Will it explain the code to me or teach me?**
It explains. When you want to practice until you can do it yourself, [teach](../productivity/teach.md) takes over and can start from this explanation.

**What if the history has nothing?**
It says so, lists what it searched, and gives competing explanations marked as guesses rather than the neatest one.

**Does it need extra tools?**
No. Git and the repository are enough. Issue trackers, docs, chat and observability tools add evidence when they're connected.

## Where it fits

This is the skill to run before changing code you don't know. [feature-development](feature-development.md), [codebase-improvement](codebase-improvement.md) and [idea-development](../design/idea-development.md) hand off to it when the area is unfamiliar, and it hands back when the explanation turns into a plan.

<!-- handoffs:start -->
## Handoffs

| When | Then |
| --- | --- |
| The code misbehaves | suggests [diagnosing-bugs](../engineering/diagnosing-bugs.md) |
| The answer lives outside the repo | runs [research](../productivity/research.md) |
| The rationale decides an open choice | runs [idea-development](../design/idea-development.md) |
| A change is planned on what was explained | suggests [feature-development](../engineering/feature-development.md) |
| The structure, not the understanding, is the problem | suggests [codebase-improvement](../engineering/codebase-improvement.md) |
| The reader must learn it, not just read it | suggests [teach](../productivity/teach.md) |
| The explanation should be kept as documentation | suggests [writing](../productivity/writing.md) |

Reached from [idea-development](../design/idea-development.md), [code-review](../engineering/code-review.md), [codebase-improvement](../engineering/codebase-improvement.md), [diagnosing-bugs](../engineering/diagnosing-bugs.md), [feature-development](../engineering/feature-development.md), [research](../productivity/research.md), [teach](../productivity/teach.md), [writing](../productivity/writing.md).
<!-- handoffs:end -->

## Credits

Drawn from upstream skills (MIT, revisions pinned in [LINEAGE](../../LINEAGE.md)); the skill itself is a rewrite.

- "enough to build a working mental model, not so much that it reads like annotated source code" — [poteto, how](https://github.com/cursor/plugins/blob/fae2c6ed95821bd85f614a73e4842e13229fa5e5/pstack/skills/how/SKILL.md)
- "Document the null, don't skip the search." — [poteto, why](https://github.com/cursor/plugins/blob/fae2c6ed95821bd85f614a73e4842e13229fa5e5/pstack/skills/why/SKILL.md)
- "Pick the smallest view that makes the key point clear." — [HumanLayer, show-me](https://github.com/humanlayer/skills/blob/ca7c8088db69e315a8b2deea43820270457f8f3c/plugins/show-me/skills/show-me/SKILL.md)
