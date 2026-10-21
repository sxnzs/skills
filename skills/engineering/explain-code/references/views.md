# Views

Read when choosing how to show a mechanism. Match the view to the question and
use one.

- **Logic or algorithm:** pseudocode of the decisions, not the syntax.
- **Runtime control flow:** a call tree, indented, with the file where each
  stage lives.
- **UI structure:** a component tree that marks state owners and module
  boundaries.
- **File responsibility or a broad refactor:** a shallow file tree with a
  one-phrase role per directory.
- **Components talking, or data changing shape:** a sequence or flow diagram,
  only when prose would make the reader hold more than they can.
- **What a change does to a shape that exists:** a `diff` of the tree, call
  tree or layout, in the same form as the original.

A view clarifies; if prose already carries the flow, skip it. Keep labels in the
project's own terms.
