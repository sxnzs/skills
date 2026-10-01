# Slices and Tests

Read when breaking down a spec or deciding whether a test protects behavior.

## Choose a complete increment

Describe the capability a caller gains, the public entry point, the expected
outcome and what must exist first. An initial tracer bullet crosses the necessary
layers with the smallest useful case. Add rejection paths or richer cases after
that path works. A schema-only task followed by an API-only task postpones the
evidence that the pieces cooperate.

Declare real blocking edges, not an arbitrary sequence. If a proposed increment
cannot pass checks independently, split it differently or make the prerequisite
explicit. Keep supporting migrations compatible until consumers have moved.
A mechanical change with a codebase-wide blast radius is the exception to
vertical slicing: add the new form beside the old, migrate callers in batches
that each stay green, and delete the old form only when nothing uses it.

For each cycle, execute the new test before implementation and inspect why it
fails. Then implement only its behavior and execute the focused test plus checks
appropriate to the changed surface. A test that already passes does not establish
red-before-green evidence; correct the scenario or report that the behavior exists.

## Good versus bad evidence

- Good: create a reservation through the public API, retrieve it through that API,
  and assert the agreed dates and confirmed status. The test remains valid if
  storage or internal coordination changes.
- Bad: assert that a private validator ran twice or inspect database rows behind
  the API. These assertions can reject a valid refactor or miss a broken caller
  experience.
- Good: a pricing example in the spec fixes a discounted total at 18; assert 18.
- Bad: generate the expected total by invoking the production discount helper or
  repeating its formula. A shared mistake makes both sides agree.

Use a known fixture, independently worked example or specification as the oracle.
Name the caller-visible behavior rather than the implementation technique.

## Keep real collaboration inside the system

Exercise internal modules together. Use mocks only for system boundaries such as
third-party services, clock, randomness or filesystem access; prefer disposable
real storage when practical. Inject boundary operations with clear input/output
contracts rather than intercepting internal calls or building a generic fake
whose branching recreates production logic. Boundary substitutes do not prove
real integration; keep any necessary integration check explicit.

Refactor only after the behavioral increment is green, as a separate change with
the same contract and checks.
