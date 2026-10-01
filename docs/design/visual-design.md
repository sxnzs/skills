# visual-design

> Set look and feel as concrete values.

## What it does

`visual-design` finds a visual direction grounded in the product, audience and existing design language, makes it visible at the intended size, then expresses it as values a builder can apply. The output is a justified direction, inspected renderings, concrete values mapped to the project's tokens, relevant state behavior, and the alternatives and trade-offs that informed the choice.

It starts by inspecting existing tokens, components, brand references and the surrounding surface, reusing the user's chosen direction and project language. When the look is still open, directions are compared on a named axis — typography, density, contrast or material can change the character, while palette swaps alone may not — and the experiment is sized to the question. Options render with realistic content and deliberate hierarchy, then get inspected full-size in their actual surroundings: narrow widths, long content, control states. Nothing loses simply because its implementation is unfinished.

An undirected first rendering tends toward familiar patterns — cream backgrounds, italic accent words in headlines, numbered "01/02/03" section labels, monospace labels, pill buttons — and naming the patterns that conflict with the brief beats "avoid a generic look", which just swaps one default for another. Everything presented is rendered and inspected: small text, alignment and fine detail get judged cropped and zoomed, not from a downscaled screenshot. Renderings that can't be inspected are marked unverified. When taste still has to choose, viable directions come with honest trade-offs, a reserved human selection is respected, and the handoff records actual type choices and scale, color roles and values, spacing, radius, elevation and relevant motion mapped to the existing design system.

## When to reach for it

Say "pick a typeface", "this looks generic", or "make it feel like our brand".

| Your situation | Reach for |
| --- | --- |
| Type, color or theme needs concrete values | `visual-design` |
| Flows, states or interaction behavior are the question | [ui-design](ui-design.md) |
| Motion timing or gesture physics need study | [motion-design](motion-design.md) |
| Audience or product identity is still unsettled | [idea-development](idea-development.md) |
| The chosen direction needs implementing in code | [feature-development](../engineering/feature-development.md) |

## It's working if

- When the look is open, directions are compared on a named axis with realistic content, equally careful execution and full-size inspection.
- Generic patterns that conflict with the brief are named and excluded, while requested or established styles are kept.
- The handoff maps real values — type scale, color roles, spacing, radius, elevation — onto the existing design system rather than creating a parallel one.
- Renderings that could not be inspected are labeled unverified instead of presented as seen.
- A direction awaiting human selection stays pending, with its artifacts preserved.

## Common questions

**Is this the same as ui-design?**
No. [ui-design](ui-design.md) settles how the interface behaves — flows, states, interactions. This skill settles how it looks, and ends with token-mapped values a builder can apply. When both are open, sharing context beats restarting discovery.

**How does it avoid a generic result?**
By naming the specific familiar patterns a first rendering would drift toward, and treating that list as a working exclusion list that grows after each rendering — not by chasing novelty for its own sake.

**Will it redesign the whole design system?**
No. It extends the existing system and updates production tokens only when implementation is requested.

**What if no one has chosen a direction yet?**
Viable directions are presented with trade-offs when taste must decide. A reserved human choice is respected and kept reconstructable, not claimed on their behalf.

## Where it fits

The design set splits the surface three ways: [idea-development](idea-development.md) settles intent, [ui-design](ui-design.md) settles behavior, and this skill settles appearance. Timing and gesture questions that need their own investigation continue in [motion-design](motion-design.md). Once values are chosen, they become input for implementation skills like [feature-development](../engineering/feature-development.md), which apply and verify them in real code.
