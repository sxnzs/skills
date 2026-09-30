---
name: ui-design
description: Work out how an interface behaves (the task, flow, screen structure, states, and interactions) by prototyping and trying real variants. Use when someone says "help me design this interface", asks about UX, a user flow, or what belongs on a screen, a screen or flow isn't settled, or an interaction feels wrong. For look, identity, and aesthetic character use visual-design.
---

# UI Design

Agree on how an interface works, what someone sees, does, and gets back at each step, by trying it rather than describing it.

## What done looks like

- The task the interface serves and who does it, stated in one or two sentences.
- The flow and states relevant to the agreed scope, including entry points,
  exits, unhappy paths, and repeated use where they affect the task.
- The structure of each screen in scope: what is primary, secondary, or hidden.
- Interaction details a builder can apply: controls, feedback, keyboard and pointer
  behavior, timing where it matters.
- The alternatives tried, and why they lost.

## How the work goes

- **Start from the task, not the screen.** What is the person trying to get done,
  and how often? Something used a hundred times a day earns speed, not delight.
- **Start from what exists.** Read the project's current screens, components, and
  patterns; reuse them before inventing new ones.
- **Prototype to disagree.** Build working variants that differ on a named axis
  (flow, density, interaction model), sized to the question: one component for a
  single interaction, a clickable flow when order matters. Use realistic content
  and data. Hold shipped-quality execution on the dimension being compared;
  a tiny question needs no full-screen variants.
- **Try it, don't just look at it.** Step through each variant, including the
  states relevant to the task, with a browser tool if you have one; otherwise
  ask the human to. Surface observed task failures and accessibility barriers
  separately from preference. Fix or exclude blocked alternatives before taste
  decides among viable ones.
- **Present, then stop.** Show the variants with "when it wins / what it costs"
  and let the human choose.
- **Hand off exact decisions.** Write the chosen design in the project's existing
  docs or plans, with reconstructable visual references, exact values and
  behaviors, rationale, rejected alternatives, and consequential open questions.
  Someone with no conversation context should be able to build from it.

## Boundaries

- Presentation awaiting human choice is pending, not complete. Clean up only
  agent-created disposable exploration after the choice and an adequate recorded
  handoff. Preserve user-authored and otherwise irreplaceable assets.
- Build prototypes on a throwaway surface, not in production code.
- If the intended user, task, or product outcome is unsettled, return to
  **idea-development**, carrying the context rather than restarting discovery.
- How it looks and how it works shape each other. When the open question is
  identity or aesthetic character, bring in **visual-design** without restarting.
- A fully specified, bounded fix with no open decision doesn't need this
  workflow: say so and recommend building it directly. Otherwise scale the
  exploration to the question.
- Other skills (research, a browser tool, diagnosis, review) are optional
  helpers, never prerequisites: use one when it is available and useful,
  otherwise do the work directly. Questioning and prototype judgment stay here.
- Before handing off, check that the written plan states the goal, scope,
  chosen direction and why, rejected alternatives, constraints, open questions
  that matter, and acceptance checks, with affected files and exact values
  where relevant. Every reference a fresh builder needs must still exist.
- End with one recommended next step, not a menu, and the reason for it
  (**next** has the usual moves). Recommend; don't start without the go-ahead.
