# Motion constraints

Use these as decision criteria, not universal style constants.

- Prefer the existing platform's transition or animation tools. Use CSS
  transitions for state changes that reverse quickly; keyframes for a sequence;
  imperative animation only when playback control is needed. Gesture release
  often benefits from a spring rather than a fixed-duration tween.
- Favor transform and opacity when they express the desired effect without
  repeated layout or expensive painting. Other properties can be justified;
  measure the real interaction instead of claiming compositor performance from
  syntax alone. Avoid reading layout repeatedly after writing styles in a frame.
- Small state changes generally need less time than large spatial movements.
  Treat roughly 150–250 ms as a starting experiment for an occasional small
  transition, not a requirement. Repeated actions may need less or no motion.
  Match neighboring components and check perceived latency on actual input.
- Arrivals often need a quick response and gentle settling. Avoid a slow start
  that makes an action appear ignored. Tune a curve or spring to the task;
  bounce is not a default. Exits can finish sooner when no new content needs
  to be tracked. A stagger should clarify ordering, not delay access to controls.
- Keep origins meaningful. A popover anchored to a trigger should visually
  connect to it; a centered modal has a different origin. Avoid growing content
  from zero size when a small positional or opacity change conveys the state.
- Respect reduced-motion preferences. Remove unnecessary travel, oscillation
  and parallax while retaining understandable state feedback. Provide an
  immediate transition when needed; essential information must remain available.
- Gate hover-specific effects on an input that supports hover. Touch and keyboard
  users need equivalent feedback and task access. Keep focus visible throughout
  movement and do not make animation completion a prerequisite for interaction.

Watch for delayed callbacks overwriting newer state, unmount races, off-screen
animations continuing unnecessarily and transitions that reset after every render.
Verify the actual lifecycle; a visually plausible snippet is not proof of behavior.
