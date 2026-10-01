# Variant prototypes

Use when candidates should be compared in place rather than as isolated mockups.
An empty route makes every variant look fine; real surroundings expose problems.

- Mount variants in the existing page that will host the result, keeping its
  data loading, routing and auth; only the part under question changes. Use a
  new prototype-named route only when no host exists, following the project's
  routing convention.
- Select the variant from a URL parameter such as `?variant=b`, so each one is
  shareable and survives reload.
- Add a small switcher that is visibly not part of the design: previous and next
  controls with the current label, and arrow keys that ignore focused inputs and
  editable regions. Exclude it from production builds.
- Each variant answers the named axis. Two or three usually suffice; beyond
  about five the differences blur. If two drafts converge, redo one under an
  explicit constraint.
- Let variants own their layout; share only stable chrome. Point mutations at
  stubs unless the backend is the question.
- Expect hybrid answers ("B's header with C's list") and record exactly which
  parts were chosen.

When the choice is made, record it and why, then fold it into production code
written to normal standards. Remove the switcher and losing variants from the
main line; keep them reconstructable on a throwaway branch or as recorded
artifacts.
