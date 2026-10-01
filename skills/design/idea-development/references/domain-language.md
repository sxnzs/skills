# Domain language

Shared terms let people, code and agents mean the same thing. Change the
vocabulary deliberately and write it down as it settles.

## Glossary

- Use the project's existing glossary file (often `GLOSSARY.md` or `CONTEXT.md`
  at the root). Create one lazily, when the first term is resolved. When the
  repository holds several bounded areas, a root map can point to one glossary
  per area.
- An entry is the canonical term, a one- or two-sentence meaning, the words to
  avoid in its place, and how it relates to neighboring terms. No
  implementation detail, schema or plan; it is a glossary, not a spec.
- Update it in the moment a term is resolved rather than batching edits.

## Sharpening terms

- Flag a conflict as soon as it appears: the glossary says one thing, the user
  means another, or the code disagrees with both.
- Split overloaded words ("account" as customer and as login) into separate
  canonical terms.
- Test a boundary with an invented edge case: "an order is half shipped and the
  customer cancels; which term covers what remains?"

## Decision records

Offer a record only when all three hold: reversing it later is expensive, a
future reader would be surprised without the context, and real alternatives
were weighed. Keep records short, in the project's existing location
(often `docs/adr/`, numbered):

- **Context:** the forces and constraints at the time.
- **Decision:** what was chosen, in one or two sentences.
- **Alternatives:** what was rejected and why.
- **Consequences:** what becomes easier, harder or now required.

A later review should not re-propose what a record rejected unless new evidence
reopens it; when it does, say so and supersede the record rather than editing
history.
