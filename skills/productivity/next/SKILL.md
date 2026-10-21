---
name: next
description: Recommend one next step and why. Use when asked what's next, which skill now, or where we are. Recommends only.
---

# Next

Read the current conversation, decisions, plans, diff and check results needed
to establish where the work stands. Reuse what is already known; do not restart
discovery or interview the user for facts available in the project.

Recommend the smallest useful step that resolves the most consequential gap.
A missing acceptance check can matter more than adding features; an approved
direction calls for execution rather than another options exercise. If the user
explicitly reserved a decision, that decision remains next. If nothing remains,
say the work is complete. When two rows below fit, take the one that retires the
riskiest unknown.

Name a skill only when it is available and fits that step; otherwise describe
the step. Give one recommendation, the concrete artifact or gap that makes it
next, and the observable result that would complete it. Keep the explanation
proportional to the decision. Recommend only; do not execute the step when asked
"what's next?"

## Handoffs

**run** continues into that skill with this context unless the request stops
short of it, then it is only suggested. **suggest** names it in one closing line
once the deliverable is final and never continues unasked. A missing skill never
blocks; do the work inline.

- A hunch, goal or unsettled outcome with no shared picture yet → suggest **idea-development**
- A decision waits on a fact outside the project → suggest **research**
- The open question is how it looks → suggest **visual-design**
- The open question is how it works on screen → suggest **ui-design**
- Motion or gesture feels wrong → suggest **motion-design**
- Swift or SwiftUI code needs work → suggest **write-swift**
- An agreed plan fits one session → suggest **feature-development**
- Something is broken, slow or failing → suggest **diagnosing-bugs**
- Existing code is painful to change and no direction is agreed → suggest **codebase-improvement**
- The code to change is not understood → suggest **explain-code**
- Code changed and has not been read against intent and standards → suggest **code-review**
- Work is reported done and its evidence is unchecked → suggest **critic**
- Verified work is waiting to be reported → suggest **close-out**
- The text itself is the work → suggest **writing**
- The user wants to understand, not decide → suggest **teach**
- Agent sessions keep stumbling in this repo → suggest **agent-setup**
