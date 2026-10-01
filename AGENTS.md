# skills

Public agent skills, shipped as a Claude Code plugin, a Codex plugin and via
skills.sh. Each skill is `skills/<bucket>/<name>/SKILL.md`; buckets are
`engineering`, `design` and `productivity`, and every bucket ships. Names are the
work a person says they are starting, not the technique inside it. `LINEAGE.md`
records what each skill learned from upstream sources; link, don't copy source
text.

Keep only prose that changes a decision. Descriptions say what the skill
produces, then "Use when" with the phrases people actually say, then which
sibling skill to use instead. Keep them plain YAML: no `: ` or ` #`. Skill bodies
stay model-portable; model IDs, effort and workarounds go in `evals/MODELS.md`.
How to write for agents is in `skills/productivity/writing/references/agent-facing.md`.

Adding, renaming or moving a skill touches four places: its folder, its page at
`docs/<bucket>/<name>.md`, the `skills` array in `.claude-plugin/plugin.json`,
and the tables in `README.md` and `docs/README.md`. Releasing bumps `version` in
`package.json`, `.claude-plugin/plugin.json` and `.codex-plugin/plugin.json`
together, with a `CHANGELOG.md` entry.

Verify: `npm run check`
