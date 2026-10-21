---
name: write-swift
description: Write Swift and SwiftUI against real toolchain rules. Use when Swift code needs work. Flows use ui-design.
---

# Write Swift

Read the project's language mode, compiler settings, deployment targets and
existing architecture before choosing APIs or concurrency behavior. Verify
version-dependent guidance against the installed toolchain and official docs.
Do not migrate the language mode or lower deployment support without a request.

- Start with concrete types and clear ownership. Add a protocol for real
  customization or a dependency boundary, not an imagined future implementation.
  Preserve existing public API and error behavior unless a change is requested.
- Treat isolation as part of the contract. `async` permits suspension; it does
  not by itself establish background execution. Read
  [concurrency boundaries](references/concurrency.md) for isolation, cancellation,
  shared state or callback bridging. Fix the ownership problem before silencing
  a compiler diagnostic with unsafe sendability or isolation annotations.
  [Runnable ownership example](examples/request-ownership.swift) covers stale
  results and cancellation under Swift 6 strict concurrency.
- In SwiftUI, identify the owner and lifetime of each piece of state. Keep
  immediate event feedback synchronous when possible, and separate it from
  long-running work. Read [SwiftUI lifecycle](references/swiftui.md) when state,
  tasks, rendering or animation crosses that boundary.
- Measure before adding concurrency for performance. Move demonstrated expensive
  work off the UI actor using APIs supported by this project; bound parallelism
  and retain cancellation and error handling. A task per item is not a default.
- Build and test the affected target with its actual settings. Check relevant
  actor/reentrancy and lifecycle paths, not just a standalone snippet. UI changes
  need rendered or device evidence where behavior cannot be settled by tests.

Implement when asked; review without editing when asked to review. Report the
change or findings, the target and checks actually run, and any build, simulator
or device behavior that remains unverified.

## Handoffs

**run** continues into that skill with this context unless the request stops
short of it, then it is only suggested. **suggest** names it in one closing line
once the deliverable is final and never continues unasked. A missing skill never
blocks; do the work inline.

- The flow or interaction is unsettled → run **ui-design**
- Motion or gesture needs its own investigation → run **motion-design**
- A bug's cause is unknown → run **diagnosing-bugs**
- Toolchain or API behavior depends on documentation → run **research**
- New behavior needs building test-first → suggest **feature-development**
- The change is finished → suggest **code-review**
