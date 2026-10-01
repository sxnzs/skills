# Gesture continuity

Use this only when direct manipulation is in scope.

- Keep the object's initial grab offset so it does not jump under the pointer.
  Capture the pointer where the platform supports it; handle cancellation and
  release capture/listeners at the end. Preserve ordinary scrolling unless the
  gesture intentionally takes ownership of that direction.
- Sample recent positions and elapsed time to estimate velocity. Use consistent
  units when passing velocity into the animation API; stale movement before a
  pause should not launch the object on release.
- Interrupt from the presentation value rather than the previous target. Carry
  useful velocity through a release or reversal so the object does not stop and
  restart unnaturally. Keep independent axes independent when their constraints
  differ.
- Choose a snap point from position and momentum. Add hysteresis around competing
  targets to prevent flicker; tune thresholds to the actual control and input
  precision rather than copying a universal pixel distance.
- Bounds can resist a drag while clearly communicating the limit. Preserve a
  reliable way to recover, cancel or undo; visual elasticity must not corrupt
  the underlying value or make the action inaccessible without dragging.

Try slow dragging, quick release, a pause before release, direction changes,
gesture cancellation and a new grab mid-animation. Confirm the same meaningful
state can be reached through keyboard or another accessible control. Inspect
touch behavior on a real device when that is the target; desktop playback alone
does not verify it.
