# Behavioral cases

Observe an agent using the named skill in a disposable project fixture. Build the
fixture described below and use the prompt verbatim. Save the transcript
and resulting artifacts; compare them with the criteria. Human replies are
specified where a choice is needed. The [recorded smoke trials](RESULTS.md)
cover two decisions, the [debugging pilot](DEBUGGING-PILOT.md) covers two
seeded bugs, and the [ambiguous debugging comparison](AMBIGUOUS-DEBUGGING.md)
covers one async cache case across three models. The [real-task screening](REAL-TASKS.md)
records twelve completed matched tasks and eighteen blocked by model capacity.
The remaining matrix is a set
of proposed checks.

These test behavior, not file structure. `npm run check` cannot prove them, and
no model evaluation framework or paid evaluation is required by this repository.
Use the [model calibration notes](MODELS.md) to keep exact identities and observed
results distinct from compatibility assumptions.

| Case | Fixture and prompt | Pass | Fail |
| --- | --- | --- | --- |
| Tiny interaction | Provide a working toolbar with a copy button and realistic text. Invoke ui-design with "Compare immediate feedback versus a 150 ms delay for this copy button. Keep its layout." | Comparison stays at the button, equally polished on feedback timing; agent tries both rendered interactions and explains costs. | Multiple full screens or unrelated states are fabricated. |
| Unsettled outcome | Use the exact [outcome notes](fixtures/unsettled-outcome.md). Invoke either design skill with "Design the dashboard; we haven't chosen who it serves or what success means." Repeat for the other skill. | Returns to idea-development with those known alternatives and the unresolved outcome carried across. | Chooses an audience silently or starts discovery from a blank slate. |
| No code friction | Provide a small module, callers, passing behavior checks, and history showing no repeated repairs. Invoke codebase-improvement with "Improve this module; I have no pain example." When asked after inspection, reply "There is no difficult change or recurring bug I can name." | Inspects code, calls, and history before asking; accepts unchanged code as a result without editing. | Proposes speculative layers or edits behavior checks before a chosen plan. |
| Selected design | Provide existing docs/plans, current tokens, a user-authored reference image, and disposable agent prototypes. Invoke visual-design with "Compare compact and spacious typography for this card." After presentation reply "Choose compact; record the handoff." Repeat with ui-design comparing inline editing and a dialog. | Records reconstructable references, exact values/behaviors, rationale, rejected alternatives, and consequential open questions in existing docs/plans before disposable cleanup; preserves the user image and stops before production implementation. | Deletes needed references before recording, loses user assets, or leaves only a chat summary. |
| Awaiting choice | Provide a realistic settings component. Invoke ui-design with "Compare inline editing and a dialog; show me the options before I decide." Give no choice. Repeat with visual-design comparing two type directions. | Explicitly pending human choice; exploration remains available; no selected-design claim or production implementation. | Calls presentation complete, silently picks, or deletes the exploration. |
| Evidence versus taste | Open the standalone [form comparison](fixtures/evidence-versus-taste.html) locally; it simulates feedback without sending data. Invoke ui-design with "I prefer the pointer-only version's appearance. Compare these for submitting this form." | Tries the task, identifies the keyboard barrier as evidence, and repairs or excludes the blocked option before asking for taste among viable alternatives. | Treats task failure or keyboard access as a preference trade-off the human can simply vote away. |
| Already chosen refactor | Provide two public functions with the same normalization and passing behavior checks. Invoke codebase-improvement with "I have chosen the shared private helper approach. Refactor now, preserve the public functions and exact behavior, and run the check." | Implements and verifies the chosen change within scope. | Produces another alternatives plan or asks to approve the same direction again. |
| Blocked completion evidence | Provide a completion report and the promised artifact, but make a required verification environment unavailable. Invoke critic with "Check whether this is done." | Reports the specific missing evidence and an unverified or pending verdict; identifies a useful next check. | Invents a pass, or treats unavailable evidence as a demonstrated code defect. |
| Safety fact | Provide a changed boundary and an actual dependency implementation. Invoke code-review with "Check whether the change can safely rely on this boundary." | Checks the load-bearing fact through the real implementation and separates proved/cleared concerns from hypotheses. | Lists callers without testing the assumption, or invents a risk as a definite finding. |
| Motion interruption | Provide a working transition with a trigger that can reverse before completion. Invoke motion-design with "Repair the rapid-toggle jump and retain reduced-motion behavior." | Tries rapid reversals, continues from visible state, preserves accessible feedback and reports actual playback checks. | Only checks a screenshot or replaces the transition with queued animations. |
| Swift suspension | Provide the actual project settings and an actor method that awaits before committing a result. Invoke write-swift with "Review whether this result can overwrite newer state." | Checks effective isolation, reentrancy and request lifetime; proposes an in-scope check or repair without unsafe warning suppression. | Assumes async means background execution or that actor isolation makes the whole async operation atomic. |
