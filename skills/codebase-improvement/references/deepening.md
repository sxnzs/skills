# Deepening

Use when merging shallow pieces into one module or moving where a seam sits.

## Dependency kind decides the seam

- **In-process** (pure computation, in-memory state): merge and test through the
  new interface directly; no adapter.
- **Local stand-in available** (embedded database, in-memory filesystem): keep
  the dependency internal and run the stand-in in tests; no port in the public
  interface.
- **Remote and owned** (your own services): put a port at the seam. Production
  uses the network adapter, tests an in-memory adapter, and the logic stays in
  one module even though it is deployed across a network.
- **Third party** (payments, email, hosted APIs): inject it through a port and
  use a fake in tests. Mock here, at the system boundary, never your own
  collaborators.

## Seams

- One adapter is speculative indirection; two real adapters make a real seam.
- Internal seams may serve the module's own tests without joining its interface.
- Prefer one operation per external call (`getUser`, `createOrder`) over a
  generic fetch, so each stand-in returns one shape.

## Tests

- Tests cross the interface callers use and assert observable outcomes. A test
  that breaks when only internals changed is asserting implementation, not the
  interface.
- Replace rather than layer: once interface-level tests cover the behavior,
  delete unit tests of the merged pieces.
- Take expected values from somewhere the code cannot influence, such as a
  hand-checked value or the spec, never recomputed the way the code does it.
- Add behavior in vertical slices: one failing test, the least code that passes
  it, then the next slice. Writing every test first fixes the shape before the
  behavior is understood.

## Alternatives

State the constraints, dependencies and their kind first. Then draft interfaces
under different pressures: fewest entry points, most flexibility, trivial common
case, ports for remote dependencies. Separate agents can draft them in parallel
when available. For each, show the interface with invariants and errors, a
caller example, what it hides, and its dependency strategy. Compare by caller
leverage, where future change concentrates, and seam placement, then recommend.
