# Lineage

What these skills learned from the skills that inspired them. Links point to
the upstream files; read them for the full picture.

## @poteto — workflows shaped to the problem

Sources: [`architect`](https://github.com/cursor/plugins/blob/main/pstack/skills/architect/SKILL.md),
[`figure-it-out`](https://github.com/cursor/plugins/blob/main/pstack/skills/figure-it-out/SKILL.md),
and the rest of [pstack](https://github.com/cursor/plugins/tree/main/pstack).

- `architect` grounds the problem, produces structurally different designs,
  compares them, and builds against the chosen one. The caller's usage comes
  first; types and signatures follow. → **codebase-improvement** leads with usage
  and demands structurally different alternatives.
- `figure-it-out` defines observable success, attacks the riskiest unknown
  first, and keeps a decision trail. → every skill here ends in recorded
  decisions with the rejected options; **idea-development** takes the riskiest
  unknown first.
- Questions are routed by observability: if running something answers it, run
  it; ask the human only for preference and product calls. → "route questions by
  who can answer them", and the design skills ask the human to look only when
  the agent can't render or click through itself.
- "Keep only prose that changes a decision." → the test applied to every line
  of these skills.

Not copied: pstack's default autonomy (proceed to implementation, human
checkpoint opt-in). These skills stop at a plan and hand the choice back.

## @dexhorthy — make shared understanding visible

Sources: [`show-me`](https://github.com/humanlayer/skills/blob/main/plugins/show-me/skills/show-me/SKILL.md),
[`design-control-loop`](https://github.com/humanlayer/skills/blob/main/plugins/design-control-loop/skills/design-control-loop/SKILL.md).

- `show-me`: "Pick the smallest view that makes the key point clear."
  Pseudocode, a call tree, a file tree, a structural diff, or one HTML artifact,
  whichever fits. → "make the idea concrete enough to disagree with".
- `design-control-loop` reads the repository before questioning, arrives with
  grounded proposals, surfaces trade-offs rather than mandating choices, records
  the design before building, and gives each phase an observable completion
  check. → the collaboration pattern of **idea-development**.
- The name `show-me` is the user's own request, not the capability. → skill
  names here are the work people say they are starting.

## @emilkowalski — exploration with a craft floor

Sources: [`prototype`](https://github.com/emilkowalski/skills/blob/main/skills/prototype/SKILL.md),
[`improve-animations`](https://github.com/emilkowalski/skills/blob/main/skills/improve-animations/SKILL.md).

- `prototype`: "A sloppy variant doesn't widen the exploration; it just loses
  on execution." Genuinely different directions on a named axis, realistic
  content, full size, an honest "when it wins / what it costs", then stop for
  the human's choice. → the core of **visual-design** and **ui-design**.
- `improve-animations` separates surveying, judging, selecting, planning, and
  executing, and writes plans for an executor with no context. → "hand off exact
  decisions".
- Numbers instead of adjectives; frequency decides how much motion something
  earns. → concrete values in visual-design, "used a hundred times a day earns
  speed" in ui-design.
- Emil's prototypes explore layout, personality, motion, and interaction
  together. → visual-design and ui-design stay separate names but hand off to
  each other instead of being isolated stages.

## @mattpocock — the starting point

Source: [mattpocock/skills](https://github.com/mattpocock/skills).

The grilling, domain-modeling, and prototyping skills there are what made the
problem visible: they are good individually, and choosing the next one is the
friction. These four skills name the destination instead.
