# motion-design

> Tune animation and gesture physics by observed behavior.

## What it does

`motion-design` gives movement a job — feedback, state change, spatial continuity or explanation — and tunes it against what actually plays. Frequency shapes the decision: repeated or keyboard-driven actions should remain immediate, occasional interactions can afford more expression, and existing intentional stillness is treated as a valid design decision.

For building or tuning, it inspects the current stack, motion tokens, trigger and surrounding interactions, then picks the simplest native mechanism that meets the behavior: transitions for frequently reversed states, springs when a gesture needs momentum, and no new library for an effect the existing stack already expresses. Spatial continuity is preserved throughout — an anchored surface originates near its trigger, interrupted movement continues from its current visible state, and rapid toggles never queue obsolete animations or leave stale completion callbacks. Input responsiveness survives while movement runs. Verification is by observation: the result is tried with rapid reversal, keyboard and touch paths and reduced motion, checking real playback and, when needed, slowed or frame-by-frame playback, because a screenshot cannot establish timing, interruption or frame smoothness.

The second mode is an audit. The requested surface is reviewed against purpose, frequency, continuity, duration, interruptibility, performance and accessibility, with the cited code inspected and the interaction tried before calling anything defective. A review-only request gets the highest-impact findings and a cheap check for each, not a rewrite. Bundled references cover motion constraints and gesture continuity — dragging, snapping, spring handoffs — plus runnable examples of interruption, release velocity and reduced motion using native browser APIs.

## When to reach for it

Say "this animation feels off", "tune this spring", or "audit the motion on this screen".

| Your situation | Reach for |
| --- | --- |
| Animation or gesture physics needs tuning or an audit | `motion-design` |
| The flow or interaction itself is unsettled | [ui-design](ui-design.md) |
| Type, color or theme needs deciding | [visual-design](visual-design.md) |
| Swift gesture and animation code needs building | [write-swift](../engineering/write-swift.md) |
| The change is done and needs a verdict | [critic](../engineering/critic.md) |

## It's working if

- Every moving element has a stated job: feedback, state change, spatial continuity or explanation.
- Interrupted movement continues from its visible state, and rapid toggles leave no queued obsolete animations or stale callbacks.
- Keyboard and touch paths stay responsive while movement runs.
- Timing was checked with real playback — slowed or frame-by-frame where needed — not inferred from code or screenshots.
- Audit findings separate confirmed problems from intentional choices, and a genuine open taste choice stays with the human.

## Common questions

**Does it add a motion library?**
Only if the existing stack can't express the behavior. The simplest native mechanism wins, and transitions handle frequently reversed states while springs cover gestures with momentum.

**What about reduced motion?**
It's part of verification. The result is tried with reduced motion alongside rapid reversal and both input paths, and the runnable examples demonstrate how.

**Will it rewrite my motion during a review?**
No. A review-only request produces the highest-impact findings with a cheap check for each; rewriting happens only when repair is requested, and the settled change is implemented and verified.

**Can it judge motion from a screenshot?**
No. Screenshots can't establish timing, interruption or frame smoothness, so claims that rest on those are checked with real playback or reported as unverified.

## Where it fits

[ui-design](ui-design.md) and [visual-design](visual-design.md) hand motion questions here when timing, gestures or interruption need investigation. When repair is requested, motion-design implements and verifies the settled change. [write-swift](../engineering/write-swift.md) supplies Swift-specific guidance, and [code-review](../engineering/code-review.md) can review the resulting diff.
