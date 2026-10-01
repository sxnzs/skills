# Design smells

A fallback vocabulary for the standards lens when the repository documents
little. Each smell is a possible problem: report it as "possible <smell>" with
the hunk and a one-line repair, never as a defect on its own. A documented
repository rule overrides any of them, and anything a linter or formatter
already enforces is skipped. Report a smell only when the change introduces or
worsens it.

- **Unclear name**: the name does not say what the thing does or holds. If no
  honest name exists, the design is probably muddled.
- **Duplicated logic**: the same shape appears in several hunks or files of the
  change; extract it once.
- **Feature envy**: a function mostly works with another object's data; it may
  belong with that data.
- **Data clump**: the same few values travel together through signatures; they
  may want a type.
- **Primitive obsession**: a string or number stands in for a domain concept
  with its own rules.
- **Repeated conditional**: the same switch on the same kind recurs; one table
  or dispatch point could own it.
- **Shotgun surgery**: one logical change forces scattered edits; what changes
  together may belong together.
- **Divergent change**: one module is edited for several unrelated reasons.
- **Speculative generality**: parameters, hooks or layers for needs no
  requirement mentions; inline them until a real need appears.
- **Message chain**: callers walk `a.b().c().d()` and depend on structure they
  should not know.
- **Middle man**: a layer that only forwards calls.
- **Refused bequest**: an implementer ignores or overrides most of what it
  inherits; composition may fit better.

Names follow Martin Fowler, *Refactoring*, chapter 3, as used in Matt Pocock's
code-review baseline.
