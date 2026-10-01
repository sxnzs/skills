---
name: motion-design
description: Tune animation and gesture physics by observed behavior. Use when motion needs work. Flows use ui-design.
---

# Motion Design

Give movement a job: feedback, state change, spatial continuity or explanation.
Consider how often the interaction occurs. Repeated or keyboard-driven actions
should remain immediate; occasional interactions can afford more expression.
Existing intentional stillness is a valid design decision.

## Build or tune

- Inspect the current stack, motion tokens, trigger and surrounding interactions.
  Choose the simplest native mechanism that meets the behavior. Use transitions
  for frequently reversed states and springs when a gesture needs momentum;
  avoid adding a library for one effect the existing stack can express.
- Preserve spatial continuity. An anchored surface should originate near its
  trigger; interrupted movement should continue from its current visible state.
  Rapid toggles must not queue obsolete animations or leave stale completion
  callbacks. Preserve input responsiveness while movement runs.
- Read [motion constraints](references/motion.md) for implementation choices;
  read [gesture continuity](references/gestures.md) only for dragging, snapping
  or spring handoffs. Adapt values to the project's tokens and actual interaction.
  [Runnable examples](examples/index.html) demonstrate interruption, release
  velocity and reduced motion using native browser APIs.
- Try the result, including rapid reversal, keyboard/touch paths and reduced
  motion. Check real playback and, when necessary, slowed or frame-by-frame
  playback. A screenshot cannot establish timing, interruption or frame smoothness.

## Audit

Review the requested surface against purpose, frequency, continuity, duration,
interruptibility, performance and accessibility. Inspect the cited code and try
the interaction before calling it defective. Distinguish confirmed problems from
intentional choices, untested concerns and optional opportunities.

For a review-only request, report the highest-impact findings and a cheap check
for each; do not rewrite the motion. When repair is requested, implement the
settled change and verify it. Keep a genuine open taste choice available to the
human rather than silently selecting it.

Report the behavior changed or found, the actual values/tool used, observed
checks and any feel or device testing that remains unverified.
