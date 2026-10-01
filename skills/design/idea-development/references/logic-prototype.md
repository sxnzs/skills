# Logic prototype

Use when the open question is whether a state model, rule set or data shape
holds up: ideas that read well on paper and break on the third awkward case.

- Write the question at the top of the page in plain words, so the artifact can
  be judged against it later.
- Keep the logic in one pure module inside the page: a reducer, an explicit state
  machine, or a few functions over plain data, whichever fits the question. It
  never touches the DOM; the page calls into it. That module is the part that
  can later move into real code.
- Make one self-contained HTML file with no build step, server or dependencies,
  so a non-developer can open it directly.
- Label everything in domain language. After every action, show the full
  relevant state as readable fields and highlight what changed.
- Offer a button per action for free play, plus guided scenarios that reset to
  a known start and step through the happy path, a tricky edge case and an
  action that should be refused.
- Keep state in memory unless persistence is the question. Skip tests, error
  handling and generality the question does not need.

The useful moments are "that should not be possible" and "I assumed X". Fold
each into the decisions. When implementation is requested, move the validated
module into real code; keep the page as a reconstructable reference, not
production code.
