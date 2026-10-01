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
