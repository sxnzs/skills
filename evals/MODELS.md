# Model calibration

The skill bodies describe jobs, evidence and decision boundaries. Keep provider
IDs, effort settings and harness workarounds out of them. A new model should use
the same tasks and acceptance criteria before any special instructions are added.

OpenAI recommends direct prompts, explicit outcomes and evaluation rather than
requests to write out reasoning. That supports keeping the skills concise and
asking for evidence a user can inspect.
[Reasoning guidance](https://developers.openai.com/api/docs/guides/reasoning-best-practices).

For GPT-6 Astra, OpenAI reports stronger instruction following and more
sensitivity to skills and `AGENTS.md`: unclear or conflicting guidance can stop
work early, and the model asks for confirmation more readily. Evaluate whether
the same holds for GPT-6.1 Sol before relying on it. The
portable answer lives in [agent-facing prose](../skills/writing/references/agent-facing.md):
named stops, questions after reviewable work, sized verification. Two lines
belong in the harness rather than in each skill: the user's explicit
instructions take precedence over a skill's, and when a skill causes a pause,
a confirmation request or a divergence from the request, the agent names the
`SKILL.md` and quotes the instruction responsible. Start `reasoning.effort` at
`medium`; `none` is unsupported.
[GPT-6 guidance](https://developers.openai.com/api/docs/guides/latest-model#prompting-best-practices).

For Claude Opus 5.5, Anthropic recommends starting effort calibration at `medium`
and measuring other levels. For agentic Sonnet 5.5 tasks, start at `medium` for
well-specified work and compare `high` for harder work. Equal effort names do not
establish equal cost or quality across models. Keep these settings in the harness.
Opus 5.5 can end a turn with a progress report while work remains; unattended
harnesses should treat a text-only turn as a report and resume open checklist
items, at most two or three times.
[Opus guidance](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5-5),
[Sonnet guidance](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-sonnet-5-5).

## Evaluate an exact model

1. Resolve the requested provider/model ID through the actual harness. Confirm
   identity from returned run records; catalog presence alone proves no access.
   Never silently substitute a similarly named model for an unresolved label.
2. Freeze the skill, task and fixture bytes. Give the worker the task and raw
   artifacts; keep the grading criteria and evaluator files outside its inputs.
3. Compare with the previous skill on the same fixture and model. Start with
   small cases covering useful decisions, then real tasks. Test one model change
   at a time; a skill edit and a model upgrade together obscure the cause.
4. Record completion, correctness, scope, meaningful checks, unnecessary pauses,
   time and observed token usage. Grade independently of the worker. Repeat
   consequential cases before claiming a reliable improvement.
5. Add a model-specific instruction only for a reproduced failure that the
   portable skill does not address. Record the model, failed case and a condition
   for removing the workaround; keep it in the harness or an optional reference.

Structural validation, a smoke test and an independent review are different
evidence. Record them separately. A successful example does not establish
perfection or guarantee future-model behavior.
