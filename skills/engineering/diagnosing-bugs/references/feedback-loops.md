# Feedback loops

A loop is a command that drives the real code path and reports the user's
symptom as pass or fail. Pick the cheapest one that reaches the bug; build a
temporary harness when nothing existing does.

- **Existing test seam.** A failing unit, integration or end-to-end test at the
  level that actually reaches the defect.
- **Request or CLI replay.** A scripted HTTP call against a dev server, or a CLI
  run on a fixture compared with known-good output.
- **Browser automation.** A headless script that performs the user's steps and
  asserts on the DOM, console or network.
- **Captured input replay.** Save a real payload, event log or trace, redacted,
  and feed it through the code path in isolation.
- **Throwaway harness.** Start only the module or service involved, with stand-ins
  for the rest, and call the failing path directly.
- **Generated inputs.** For output that is sometimes wrong, run many random or
  property-based inputs and keep the first failing case.
- **Bisection.** When the bug appeared between two known states (commits,
  versions, datasets), script the check so `git bisect run` or an equivalent
  search finds the change.
- **Differential.** Run the same input through the old and new version, or two
  configurations, and compare outputs.
- **Structured human loop.** When a person must act (a device, sign-in, hardware),
  write numbered steps and named observations such as `ERRORED=yes` for them to
  report back, so each round is comparable. Leave credentials with the human;
  ask only for observations.

## Tighten it

Improve the loop like any tool. Cut setup that does not affect the failure,
assert the specific symptom rather than "did not crash", and pin time,
randomness, network and filesystem state that make verdicts vary. A slow or
flaky loop invites guessing.

## Intermittent failures

Aim for a higher reproduction rate, not a perfect repro: repeat the trigger many
times, run in parallel, add load, or widen a race window with deliberate delays.
Record the rate so a fix can be judged against it.

## When no loop is possible

Say so, list what was tried, and ask for the smallest unblocker: access to the
reproducing environment, a redacted artifact (HAR, log, core dump, timestamped
recording) or permission for temporary instrumentation. Continue safe
investigation meanwhile, and label conclusions as unconfirmed.
