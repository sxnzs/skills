---
name: ui-design
description: Work out how an interface behaves (the task, flow, screen structure, states, and interactions) by prototyping and trying real variants. Use when someone says "help me design this interface", asks about UX, a user flow, or what belongs on a screen, a screen or flow isn't settled, or an interaction feels wrong. For look, identity, and aesthetic character use visual-design.
---

# UI Design

Agree on how an interface works, what someone sees, does, and gets back at each step, by trying it rather than describing it.

## What done looks like

- The task the interface serves and who does it, stated in one or two sentences.
- The flow: steps, entry points, and exits, including the unhappy paths.
- The structure of each screen: what is primary, what is secondary, what is hidden.
- Every state accounted for: empty, loading, error, partial, full, and what happens
  on the hundredth use, not just the first.
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
  and data. Hold the same craft floor as a shipped screen, or the comparison is
  unfair.
- **Try it, don't just look at it.** Step through each variant, including the
  error and empty states, with a browser tool if you have one; otherwise ask the
  human to. Note what felt slow, surprising, or unclear.
- **Present, then stop.** Show the variants with "when it wins / what it costs"
  and let the human choose.
- **Hand off exact decisions.** The result should let someone with no context
  build the chosen design without reconstructing the discussion.

## Boundaries

- Build prototypes on a throwaway surface, not in production code, and delete
  them once the decisions are recorded. Building the real thing is separate
  work; offer it, don't start it.
- How it looks and how it works shape each other. When the open question is
  identity or aesthetic character, bring in **visual-design** without restarting.
