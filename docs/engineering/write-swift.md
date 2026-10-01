# write-swift

> Write Swift and SwiftUI against real toolchain rules.

## What it does

`write-swift` grounds Swift and SwiftUI work in what the project actually compiles with. Before choosing APIs or concurrency behavior it reads the project's language mode, compiler settings, deployment targets and existing architecture, and it verifies version-dependent guidance against the installed toolchain and official docs — the version number alone is not enough, since effective settings change what the rules mean. It won't migrate the language mode or lower deployment support unless asked, and it preserves existing public API and error behavior.

The default shape is concrete types and clear ownership. A protocol is added for real customization or a dependency boundary, not an imagined future implementation. Concurrency is treated as part of the contract: `async` permits suspension but does not by itself establish background execution. When a compiler diagnostic appears, the ownership problem gets fixed first rather than silenced with unsafe sendability or isolation annotations. In SwiftUI, each piece of state gets a clear owner and lifetime, immediate event feedback stays synchronous where possible, and long-running work is kept separate from it. Performance-driven concurrency is measured first — demonstrated expensive work moves off the UI actor with bounded parallelism, and a task per item is not a default.

Verification uses the affected target's actual settings, checking actor/reentrancy and lifecycle paths rather than a standalone snippet. UI changes get rendered or device evidence where tests can't settle the behavior, and the report says which facts were observed on which surface. Bundled references cover concurrency boundaries and the SwiftUI lifecycle in depth, with a runnable example of stale results and cancellation under Swift 6 strict concurrency.

## When to reach for it

Say "write this in Swift", "fix this SwiftUI view", or "this concurrency warning keeps coming back".

| Your situation | Reach for |
| --- | --- |
| Swift or SwiftUI code needs writing or fixing | `write-swift` |
| An interaction flow needs designing | [ui-design](../design/ui-design.md) |
| Gesture physics or animation timing feel off | [motion-design](../design/motion-design.md) |
| New behavior needs building across a codebase | [feature-development](feature-development.md) |
| The finished change needs a verdict on done-ness | [critic](critic.md) |

## It's working if

- API and concurrency choices match the project's language mode, compiler settings and deployment targets, verified against the installed toolchain.
- Ownership problems are addressed before unsafe sendability or isolation annotations are used to silence a compiler diagnostic.
- Protocols exist for real customization points, not imagined future implementations.
- Builds and tests run against the actual target and settings, covering actor and lifecycle paths.
- UI changes that tests can't settle come with rendered or device evidence, and anything unverified is named.

## Common questions

**Will it modernize the whole project?**
No. Language mode and deployment support change only on request, and a blanket architecture migration to fix one lifecycle bug is avoided — the project's existing state and observation approach is reused.

**What does it do about stale results and cancellation?**
Cancellation is cooperative: results are revalidated before committing, superseded requests never replace newer state, and unstructured tasks need an explicit owner, cancellation path and stale-result policy. The bundled runnable example demonstrates this under Swift 6 strict concurrency.

**Does an `async` function run in the background?**
Not by itself. Isolation is part of the contract, and whether execution leaves the caller's actor depends on the effective toolchain settings, which are checked rather than assumed.

**Can it review Swift code without changing it?**
Yes. When asked to review, it reports findings without editing, along with the target and checks actually run.

## Where it fits

This is the language specialist inside the engineering set: it implements within the rules that [feature-development](feature-development.md) slices and tests around. For design-side decisions it defers outward — [ui-design](../design/ui-design.md) owns the surrounding interaction flow and [motion-design](../design/motion-design.md) owns gesture physics and timing. Like any finished change, its output can face [code-review](code-review.md) and [critic](critic.md).
