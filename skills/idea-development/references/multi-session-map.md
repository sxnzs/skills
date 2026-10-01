# Multi-session map

Use when the way from here to the destination is unclear and too large for one
session. The map finds the route by resolving decisions; it does not build the
destination. Keep it in the project's issue tracker when it has one, otherwise
as Markdown files in the repository.

## The map

One index document, read at the start of every session:

- **Destination:** the spec, decision or change this effort is finding its way
  to, in a line or two. Settle it first; it fixes the scope.
- **Notes:** domain, standing preferences, helpers each session should use.
- **Decisions so far:** one line per closed ticket with a link. The decision
  itself lives only in its ticket.
- **Not yet specified:** in-scope questions too vague to phrase precisely yet.
- **Out of scope:** what was ruled beyond the destination, and why.

Refer to tickets by their title, with the link inside it, never by bare number.

## Tickets

Each ticket asks one question that a single session can resolve. Its type says
how: **research** (an agent reads sources alone), **prototype** (a rough artifact
to react to), **conversation** (decided with the person; the agent never answers
for them) or **task** (work that must happen before a decision, such as
provisioning access). Record blocking edges with the tracker's native links
where possible. The frontier is every open, unblocked, unclaimed ticket.

Write a ticket when the question can be stated precisely, even if it is
blocked. Leave vaguer areas under **Not yet specified** rather than pre-slicing
them.

## Sessions

- **Chart:** settle the destination, survey the space breadth-first, write the
  map and the tickets you can state, wire blocking edges, and start research
  tickets. If no fog appears, skip the map and plan directly.
- **Work:** load the map, take the named or first frontier ticket and claim it
  before working, resolve it, record the answer on the ticket, close it, and add
  a line to the decisions. Then graduate newly clear fog into tickets, close
  anything now out of scope, and fix tickets the answer invalidated. Resolve one
  ticket per session, except quick research.

The map is done when nothing remains to decide before building.
