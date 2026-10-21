# next

> Recommend one next step and why.

## What it does

`next` answers "what's next?" with a single recommendation. It reads the current conversation, decisions, plans, diff and check results to establish where the work stands, reusing what is already known instead of restarting discovery or interviewing the user for facts the project already contains.

The recommendation is the smallest useful step that resolves the most consequential gap. That ordering matters: a missing acceptance check can matter more than adding features, and an approved direction calls for execution rather than another options exercise. The answer has three parts — the one recommendation, the concrete artifact or gap that makes it next, and the observable result that would complete it — with explanation kept proportional to the decision. If the user explicitly reserved a decision, that decision stays next. If nothing remains, the skill says the work is complete.

## When to reach for it

Say "what's next", "which skill now", or "where should this go".

| Your situation | Reach for |
| --- | --- |
| You want one recommendation and its reason | `next` |
| A planned slice needs executing | [feature-development](../engineering/feature-development.md) |
| A missing fact blocks the decision | [research](research.md) |
| Verified work is waiting to be reported | [close-out](close-out.md) |
| Work claims to be done and needs a verdict | [critic](../engineering/critic.md) |

## It's working if

- Exactly one step is recommended, with the gap that makes it next named.
- The step is the smallest one that resolves the most consequential gap.
- The completion condition is observable.
- The skill recommends only — it doesn't execute the step.
- A completed body of work is called complete instead of inventing more work.

## Common questions

**Will it do the step for me?**
No. When asked "what's next?", it recommends. Executing belongs to the skill that fits the step, which it names when that skill is available.

**Why one recommendation instead of options?**
Because the question asked for a direction. The output is the recommendation, the concrete artifact or gap behind it, and the result that would complete it — no menu.

**What if it doesn't know where the work stands?**
It reads what the project already holds — plans, diffs, check results, decisions — rather than asking for facts already available.

## Where it fits

`next` recommends which available skill fits the next step. Slices go to [feature-development](../engineering/feature-development.md), facts to [research](research.md), done-ness questions to [critic](../engineering/critic.md), and reporting to [close-out](close-out.md).

<!-- handoffs:start -->
## Handoffs

| When | Then |
| --- | --- |
| A hunch, goal or unsettled outcome with no shared picture yet | suggests [idea-development](../design/idea-development.md) |
| A decision waits on a fact outside the project | suggests [research](../productivity/research.md) |
| The open question is how it looks | suggests [visual-design](../design/visual-design.md) |
| The open question is how it works on screen | suggests [ui-design](../design/ui-design.md) |
| Motion or gesture feels wrong | suggests [motion-design](../design/motion-design.md) |
| Swift or SwiftUI code needs work | suggests [write-swift](../engineering/write-swift.md) |
| An agreed plan fits one session | suggests [feature-development](../engineering/feature-development.md) |
| Something is broken, slow or failing | suggests [diagnosing-bugs](../engineering/diagnosing-bugs.md) |
| Existing code is painful to change and no direction is agreed | suggests [codebase-improvement](../engineering/codebase-improvement.md) |
| The code to change is not understood | suggests [explain-code](../engineering/explain-code.md) |
| Code changed and has not been read against intent and standards | suggests [code-review](../engineering/code-review.md) |
| Work is reported done and its evidence is unchecked | suggests [critic](../engineering/critic.md) |
| Verified work is waiting to be reported | suggests [close-out](../productivity/close-out.md) |
| The text itself is the work | suggests [writing](../productivity/writing.md) |
| The user wants to understand, not decide | suggests [teach](../productivity/teach.md) |
| Agent sessions keep stumbling in this repo | suggests [agent-setup](../engineering/agent-setup.md) |

Reached from [next](../productivity/next.md) only.
<!-- handoffs:end -->

## Credits

Drawn from upstream skills (MIT, revisions pinned in [LINEAGE](../../LINEAGE.md)); the skill itself is a rewrite.

- "A router over the skills in this repo." — [Matt Pocock, ask-matt](https://github.com/mattpocock/skills/blob/d81f3a183412e71a5b1e84ca21bc1a35eea03a60/skills/engineering/ask-matt/SKILL.md)
- "Delegate to other skills by path. Don't restate." — [poteto, poteto-mode · authoring-a-skill](https://github.com/cursor/plugins/blob/fae2c6ed95821bd85f614a73e4842e13229fa5e5/pstack/skills/poteto-mode/playbooks/authoring-a-skill.md)
