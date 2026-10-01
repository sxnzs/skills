---
name: code-review
description: Review changes against intended behavior and repository standards. Use when reviewing a diff, branch, PR or work in progress. To check whether work is done, use critic.
---

Establish the requested comparison and intended behavior. For a branch or PR,
resolve the base ref and review the diff against the merge-base
(`git diff <base>...HEAD`) with its commit list; stop early if the ref does not
resolve or the diff is empty. For work in progress, include staged, unstaged and
relevant untracked changes unless the user narrows the scope. Enumerate untracked
paths before opening relevant files; exclude credential stores and redact secret
values from reports. Read callers, contracts and tests around the change before
judging it.

- Review **intent** and **repository standards** as distinct lenses. Find the
  requirements in issue references in the commits, a path the user gives, specs
  or plans matching the branch, then the conversation. Missing requirements are
  uncertainty to report, not permission to invent a spec. Under intent, look for
  requirements missing or partly done, behavior nobody asked for, and requirements
  implemented incorrectly, citing the requirement for each.
- Under standards, written repository rules outrank personal taste; skip what
  tooling already enforces. Where the repository documents little, [design
  smells](references/smells.md) supply labelled judgment calls, never hard
  violations. For a large change, when separate reviewers are available, give
  each lens its own context so one does not mask the other.
- Follow the changed behavior to a concrete failure condition. Check whether
  callers, validation, state transitions or boundary values make it reachable.
  Distinguish defects introduced by this change from pre-existing problems.
  For consequential changes, identify the fact their safety depends on and test
  it through the actual code. Check beyond symbol callers when the contract crosses
  wire formats, storage, pinned dependencies or asynchronous lifecycles.
- Run relevant required checks when possible, using disposable artifacts where
  necessary and staying within the task's authorization for external effects.
  Investigate failures enough to attribute them; record blocked or
  skipped checks. Do not modify the implementation unless separately asked.
- Report actionable defects by consequence. For each, give the changed file and
  precise line, the triggering condition, incorrect result, impact and supporting
  evidence. Keep severity proportional to that impact and distinguish evidence
  from an unconfirmed concern.
- Do not manufacture findings to fill a quota, repeat the same defect under both
  lenses, or turn an unrequested rewrite into a review requirement. Mention taste
  only when requested or necessary to explain a documented constraint.

Lead each lens with its most consequential findings; a change can pass one lens
and fail the other, so report both results. A review with no actionable findings
is valid; state material verification gaps without presenting them as proven
bugs. Follow the requested review format.
