# Concurrency boundaries

Check compiler and feature settings before applying these rules. In particular,
Swift 6.2 introduced configurable default actor isolation and a change to
nonisolated async execution. The effective settings matter; the version number
alone is insufficient. `@concurrent` is available in supporting toolchains when
execution must leave the caller's actor.
[Swift 6.2 release guidance](https://www.swift.org/blog/swift-6.2-released/).

- Map mutable state to one owner. Prefer avoiding shared state, immutable values
  or actor isolation before adding locks or unsafe annotations. Treat
  `@unchecked Sendable` as a synchronization promise that needs evidence.
- At each `await`, ask which assumptions other work could invalidate. Actor
  isolation prevents simultaneous access but does not make a suspended operation
  a transaction. Revalidate before committing results or deduplicate in-flight
  work. Do not hold a thread-bound lock across suspension.
- Use structured children for work whose lifetime fits the enclosing operation.
  Use `async let` for a small known set and a bounded group for dynamic work.
  Unstructured tasks need an explicit owner, cancellation path and stale-result
  policy; detaching is not a substitute for understanding isolation.
- Cancellation is cooperative. Check before expensive work and handle cancellation
  in cleanup. A cancelled or superseded request must not later replace newer
  state. Keep cancellation handlers safe for the context in which they execute.
- Bridge callbacks with checked continuations only when every completion,
  failure and cancellation path resumes exactly once. Make resource cleanup
  explicit. For a stream, define termination, buffering and producer lifetime.
- Match closure captures to the actual API's isolation and sendability contract.
  Capture the needed immutable values instead of moving an entire mutable owner
  across a boundary. Confirm framework declarations rather than guessing from
  a closure's visual position in the source.

The language guide documents tasks, actors and cancellation; use the sections
relevant to the observed boundary rather than loading a whole concurrency manual.
[Swift concurrency](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/concurrency/).
