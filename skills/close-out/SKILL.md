---
name: close-out
description: Report finished work as a commit message, PR body, handoff, announcement or retro. Use when wrapping up, writing a PR or handing off a session. To verify completion use critic.
---

# Close-out

Turn finished or paused work into the message its next reader needs: a
reviewer, a future maintainer, another agent, or the people who should hear
about it.

## What done looks like

The requested artifact, true to the evidence: what changed, why, how it was
checked, and what remains. Verified and unverified claims are kept apart, and
existing artifacts are linked rather than restated.

## How the work goes

- Start from evidence, not memory: the diff, check output, decisions and open
  questions. If completion itself is in doubt, use **critic** first and report
  its verdict.
- **Commit message:** a subject that says what changed, then why. For a fix, name
  the confirmed cause; for a change with a behavior contract, the check that
  proves it.
- **PR body:** follow [PR body](references/pr-body.md): the smallest view that
  shows the change, before-and-after evidence, and how risky the merge is.
- **Handoff:** for another session or agent, shaped by what that session will
  do next, state the goal, current state,
  decisions with reasons, open questions, affected files, checks and their
  results, and the next step; suggest the skills that fit it. Point to specs,
  plans, issues and commits instead of copying them. Save it outside the
  working tree unless asked otherwise, or seed a new background session with it
  when the environment supports that and the user wants it.
- **Announcement:** only when the work earns attention. Say what changed, why it
  matters, the proof, and how to try it, in a plain voice without hype. Draft it;
  the person decides whether and where it ships.
- **Retro:** follow [retro](references/retro.md) to propose changes to the agent's
  environment that would have made this session faster or safer.
- Redact secrets, credentials and personal data in everything you write. Use the
  project's own terms. Keep it short enough to read in one pass.

## Boundaries

Close-out writes about the work; it does not change the work, invent evidence or
mark something verified that was not. Publishing, pushing, posting or sending
follows the project's and user's authorization; prepare the artifact and leave
external actions to them unless already approved.
