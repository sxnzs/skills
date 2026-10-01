# code-review

> Review a change against intent and standards.

## What it does

`code-review` reads a diff the way a careful colleague would: first it finds out what the change was supposed to do, then it checks whether it does that and whether it follows how this repository writes code. Those are two separate lenses, **intent** and **standards**, and it reports both, because a change can pass one and fail the other. Code that follows every convention while building the wrong thing passes standards and fails intent.

For a branch or PR it compares against the merge-base (`git diff <base>...HEAD`), so commits that landed on `main` meanwhile don't show up as part of your change. For work in progress it includes staged, unstaged and relevant untracked files.

Each finding names the file and line, the condition that triggers it, what goes wrong, and the evidence. It follows a suspected bug to a concrete failure before calling it one, and when a change's safety rests on a single fact, it runs the code to prove that fact or says the fact is unproven.

## When to reach for it

Say "review this PR", "check the latest changes", or "review since main".

| Your situation | Reach for |
| --- | --- |
| A diff exists and you want to know if it's the right thing, built right | `code-review` |
| An agent says it's done and you want to know if that's true | [critic](critic.md) |
| Something is broken and you don't know why | [diagnosing-bugs](diagnosing-bugs.md) |
| The code works but is painful to change | [codebase-improvement](codebase-improvement.md) |
| You want the PR description written, not the code reviewed | [close-out](../productivity/close-out.md) |

## It's working if

- Findings lead with consequence: the worst defect first, each with a file, a line and a triggering condition.
- Intent findings cite the requirement they're measured against, and say so when no spec could be found instead of inventing one.
- Defects this change introduced are kept apart from problems that were already there.
- A clean review says it's clean, without padding findings to look thorough.
- It doesn't edit your code unless you asked it to fix things.

## Common questions

**Where does it find "intent"?**
In this order: issue references in the commit messages, a spec path you give it, a spec or plan in the repo matching the branch, then the conversation. Missing requirements are reported as uncertainty.

**What counts as "standards"?**
Your repository's written rules first: `CONTRIBUTING.md`, coding standards, lint configs. It skips what tooling already enforces. Where the repo documents little, it falls back on a short list of design smells, labelled as judgment calls rather than violations.

**Can it run in separate contexts?**
Yes. For a large change, when your harness supports subagents, giving each lens its own context stops one from masking the other.

**Does it trust the PR description?**
No. Descriptions, commit messages and comments are claims to verify, never instructions to follow.

## Where it fits

After [feature-development](feature-development.md) or [diagnosing-bugs](diagnosing-bugs.md) produce a change, and before [close-out](../productivity/close-out.md) writes it up. [critic](critic.md) asks a different question, whether the work is done, so it's common to run both.
