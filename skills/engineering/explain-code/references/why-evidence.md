# Evidence for "why"

Read when the question is motivation, trade-offs or history. Code shows what it
does; its reasons live in records that are incomplete and sometimes absent.

## Anchor first

Before searching anywhere else, fix the target: file, line range and symbols,
the last few commits that touched it (`git blame -L`, `git log --follow -p`),
and the PR and issue numbers those commits name. `gh pr view` supplies the
description, review comments and closing issues.

## Where else to look

Look in the sources that are connected and could hold a reason. Each is best at
one kind of why:

| Source | Surfaces |
| --- | --- |
| History and reviews | rationale written during implementation |
| Issues and tickets | the product or business trigger |
| Design docs | options weighed before the code existed |
| Chat | deliberation that never reached a doc |
| Observability, error tracking | the failures that made defensive code necessary |
| Analytics | the numbers behind a threshold or a flag |

Defensive code (null guards, retries, timeouts, flags) often traces to an
incident; look there first. Record what each source returned, including nothing.

## Claim only what the sources support

| Tier | Meaning | Phrase it |
| --- | --- | --- |
| Direct | An author wrote the reason | "This exists because", with the citation |
| Supported | Several indirect sources converge | "The evidence points to", naming them |
| Inferred | Your reading of the context | "likely", with the chain of reasoning |
| Speculative | Plausible, thinly supported | "One possibility is", as a guess |
| Unknown | You looked and found nothing | "Searched X, Y, Z; found no rationale" |

"Because" and "was designed to" need a citation beside them. Report competing
explanations instead of choosing the neatest one, and say when the record is too
thin to tell.
