---
name: ui-design
description: Design flows, states and interactions with prototypes. Use when a flow is unsettled. Looks use visual-design.
---

# UI Design

Design what the person sees, does and gets back while completing a real task.
Use working interaction evidence to settle behavior, and human judgment to
settle genuine preferences among viable options.

## What done looks like

The user and task, scoped flows and states, clear information hierarchy, and
interaction decisions a builder can apply. Include the relevant task checks,
trade-offs, reconstructable prototypes and any unresolved choice.

## How the work goes

- Establish the task, frequency and constraints from available evidence. Reuse
  current components and conventions. If the audience or desired outcome is
  unresolved, carry the known options into **idea-development** before designing
  flows around an invented user.
- Prototype the smallest surface that answers the open question. Vary a named
  axis such as inline editing versus a dialog. Use realistic content, complete
  interactions and equally careful execution; a button question needs no new
  dashboard. Use an already chosen direction directly rather than forcing variants.
  Prefer variants inside the real page, with its data, chrome and density, over
  an empty route; [variant prototypes](references/variant-prototypes.md)
  describes a switchable in-place setup.
- Try the actual task in each candidate, at its intended size and surroundings.
  Exercise relevant keyboard and pointer paths, feedback, errors and repeat use.
  Loading, empty and recovery states matter when the task reaches them; do not
  fabricate unrelated screens to satisfy a checklist.
- Treat observed task failures and accessibility barriers as evidence. Repair
  or exclude blocked options before asking for preference. If you cannot run the
  prototype, provide a usable artifact and say which interactions remain untested.
- Present viable alternatives with their trade-offs when a choice is genuinely
  open. If the user reserved that choice, preserve the exploration and wait;
  do not claim selection or completion on their behalf.
- Record the chosen flows, state transitions, controls, exact behaviors and
  acceptance checks in the handoff, with stable artifact paths. Use existing docs
  for a requested saved handoff or the project's established planning workflow.
  For substantial motion or direct manipulation, use **motion-design** if available.

## Boundaries

Explore unsettled decisions on an isolated surface. Apply a settled design to
production code when implementation is requested, carrying it through relevant
checks without repeating approval. Rewrite prototype code to production
standards rather than promoting it, and keep losing variants and switchers out
of the main line. Otherwise finish with the design handoff and
one next step. Preserve user assets and artifacts needed to reconstruct the choice;
clean up only disposable exploration after an adequate handoff.

A fully specified small interaction can be built directly; optional
helper skills and tools do not create new prerequisites.

## Handoffs

**run** continues into that skill with this context unless the request stops
short of it, then it is only suggested. **suggest** names it in one closing line
once the deliverable is final and never continues unasked. A missing skill never
blocks; do the work inline.

- The outcome or audience is unsettled → run **idea-development**
- Identity or aesthetic character is the question → run **visual-design**
- Motion or gesture needs its own investigation → run **motion-design**
- The design is settled and ready to build → run **feature-development**
- The interface is Swift or SwiftUI → suggest **write-swift**
