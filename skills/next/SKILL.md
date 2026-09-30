---
name: next
description: Recommend the one next step for the work in progress, with the reason, from what already exists. Use when someone asks "what's next?", "which skill now?", "where are we?", or a workflow has just finished and the way forward isn't obvious. Recommends only; never starts the step.
---

# Next

Answer "what now?" with one step, not a menu, grounded in what the work has
already produced.

## Read before recommending

Look at what exists, not at what could exist: the conversation so far, plans
and decision notes, specs, tickets, handoff notes, the branch diff and test
state, prototypes awaiting a choice. Don't interview; if a fact is missing,
find it or name it as the reason for the step.

## Where the work usually stands

| What exists | Usual next step |
| --- | --- |
| A hunch or a question, no shared picture yet | **idea-development** |
| Friction in existing code, no agreed direction | **codebase-improvement** |
| An open question about how it looks | **visual-design** |
| An open question about how it works on screen | **ui-design** |
| Options presented, no human choice yet | the human's choice; nothing else moves |
| An agreed plan, small enough for one session | implement it (`implement` if installed) |
| An agreed plan too large for one session | split it into tickets (`to-tickets` if installed) |
| The session ending with work in flight | a handoff note saved in the repo next to the plan |
| Code changed, not yet checked against the plan | review it (`code-review` if installed) |
| Checked and ready to share | a PR description (`pr` if installed) |
| Something broken or failing | diagnose it (`diagnosing-bugs` if installed) |

The table is a starting point, not a rule. When two rows fit, prefer the one
that resolves the riskiest unknown. If nothing needs doing, say so.

## The answer

- **Next:** the step, and the skill or command if one is installed.
- **Because:** the artifact or gap that makes it next, pointed at by path.
- **Then:** at most one line on what that step unlocks.

Stop there. Starting the step is the human's call.
