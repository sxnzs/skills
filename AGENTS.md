# skills

Public agent skills, one folder per skill under `skills/`. Names are the work a
person says they are starting, not the technique inside it. `LINEAGE.md` records
what each skill learned from upstream sources; link, don't copy source text.

Keep only prose that changes a decision. Descriptions say what the skill
produces, then "Use when" with the phrases people actually say, then which
sibling skill to use instead. Keep them plain YAML: no `: ` or ` #`.

Verify: `python3 scripts/check.py`
