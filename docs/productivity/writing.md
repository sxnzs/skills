# writing

> Make prose plain.

## What it does

`writing` takes whatever material exists — scattered notes, an outline, a finished draft — and works it into text that serves its reader. Explore, arrange and edit happen in one flow: the skill enters where the request starts instead of making the author repeat earlier work. Done means the text keeps the author's voice and supported claims, and makes each idea understandable before the prose relies on it, with unresolved factual gaps identified.

The work starts by reading the supplied material in full, including any voice sample, and establishing reader, purpose, format and what the reader already knows. Only gaps that change the piece get asked about. When material is missing, the skill draws out observations, scenes, claims and memorable phrases from the author, capturing fragments without prematurely forcing an outline. Material is then arranged into beats — each beat makes a move for the reader, such as introducing a situation or supporting a claim — while tracking which concepts the reader brings and which the text must establish. Every unfamiliar idea is introduced by name before a later beat depends on it, and ordinary words can hide missing concepts too.

The draft is shaped paragraph by paragraph around what the reader needs next, recombining fragments rather than preserving their original order: prose for an argument, lists for parallel items, tables for comparisons, quotations when the wording matters. Editing preserves deliberate quirks while removing formulaic phrasing, using a bundled tells checklist; a second reference covers prose whose reader is an agent, such as skills and instruction files. Before finishing, file contents are re-read to preserve intervening changes, and the result is checked against the original for altered claims, lost qualifications, voice drift and unsupported additions.

## When to reach for it

Say "write this up", "edit this README", or "make this doc readable".

| Your situation | Reach for |
| --- | --- |
| Docs, a README or agent instructions need writing or editing | `writing` |
| The commit message or PR body for finished work | [close-out](close-out.md) |
| A decision about message or audience is itself unsettled | [idea-development](../design/idea-development.md) |
| The text teaches a concept through practice | [teach](teach.md) |
| Claims need sources before the prose can stand | [research](research.md) |

## It's working if

- The piece establishes each idea before relying on it, with concepts tracked across beats.
- The author's voice and supported claims survive; voice drift, altered claims and lost qualifications are checked at the end.
- Form follows function: prose for arguments, lists for parallel items, tables for comparisons.
- Raw notes are preserved separately unless the author asked for changes to them.
- Unresolved factual gaps are flagged or asked about — never invented around.

## Common questions

**Will it rewrite my voice?**
No. Editing changes only the requested text and preserves voice and facts; deliberate quirks survive the edit. Code, data, metadata and link targets stay intact unless their revision was requested.

**Can it fill in facts I don't have?**
It asks for missing evidence or flags the gap. Invented facts and citations are out of bounds; clearly fictional invention belongs only in an explicitly creative request.

**Does it handle instructions written for agents?**
Yes. A bundled reference covers agent-facing prose for skills and instruction files, where the reader processes text differently from a human.

**What if only exploration is needed?**
An exploration-only request ends with usable raw material, not a forced article.

## Where it fits

Writing sits beside the work skills rather than inside them: [close-out](close-out.md) owns the commit and PR formats for finished work, while this skill owns prose that has to be read — docs, READMEs, agent instructions. It consumes the outputs of [research](research.md) for sourced claims and [teach](teach.md)'s understanding of what a learner needs, and consequential message-or-audience decisions route back to [idea-development](../design/idea-development.md).
