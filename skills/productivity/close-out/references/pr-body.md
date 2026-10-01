# PR body

Three sections, brief prose, in the project's domain language.

## Summary

Show the change with the smallest view that makes the point, next to one or two
sentences of text. Pick one or two, rarely more:

- **Pseudocode** for logic or an algorithm.
- **Call tree** for runtime control flow.
- **Component tree** for UI structure, with the state and module lines that matter.
- **Shallow file tree** for responsibilities or a broad move.
- **Sequence or flow diagram** (Mermaid) for interactions between parts.
- **Diff sketch** of any of the above when the surrounding shape already exists
  and the point is what changes:

```diff
 submitForm
   createSession
+    expandMention
     launchAgent
```

- **The full block** when most of it is new or the reader needs a copyable
  target.

Keep only the calls, files, states and boundaries the reader needs.

## Evidence

Before and after. A screenshot or recording is strongest for a visible change;
otherwise the exact test or command that failed before and passes now, with its
output trimmed to the signal. Name checks that were not run.

## Merge danger

- **Door:** two-way when the change can be rolled back cheaply; one-way when it
  migrates data, deletes, publishes or locks in a hard-to-reverse decision.
- **Blast radius:** one word, then what could break if it is wrong: consumers,
  layout, performance, data, security.

The summary views come from HumanLayer's show-me method by Dex Horthy.
