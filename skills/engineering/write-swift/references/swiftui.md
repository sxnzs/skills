# SwiftUI lifecycle

- Give state one clear owner and a lifetime that matches the feature. View
  identity, collection identity and navigation can change that lifetime; a
  rebuilt view value is not evidence that stored state was recreated.
- Keep immediate gesture or button feedback in the synchronous event path when
  no asynchronous operation is needed. Starting a task just to set animation
  state can move feedback outside the intended event/transaction.
- Associate asynchronous work with the appropriate view or model lifetime.
  Understand whether the chosen API cancels on disappearance or identity change;
  manually created tasks need their own cancellation and stale-result handling.
  Cancellation does not guarantee code stops before it writes a result.
- Keep async computation separate from the state commit. Check that the result
  still belongs to the current request and destination before applying it on
  the correct actor. Test disappearance, rapid input changes and out-of-order
  completion when the feature can reach those states.
- Rendering and geometry APIs can have different isolation requirements from
  event callbacks. Inspect the SDK signature and capture only the values needed
  rather than assuming every closure can read the whole view's state.
- Reuse the project's existing state and observation approach. Introduce a new
  model layer only if ownership or testability demands it; avoid a blanket
  architecture migration to fix one lifecycle bug.

Verify with the actual app target and deployment settings. A preview, unit test,
simulator interaction and real-device run establish different facts; say which
ones were observed. Use **motion-design** for gesture physics or timing decisions
and **ui-design** for the surrounding interaction flow when those skills exist.
