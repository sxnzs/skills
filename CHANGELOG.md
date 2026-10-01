# Changelog

Versions follow `package.json`; both plugin manifests carry the same version,
and `npm run check` fails if they drift.

## 1.0.0

First shareable release.

- **Install:** a Claude Code plugin (`sxnzs-skills@sxnzs`), a Codex plugin from
  the same repository, and skills.sh (`npx skills@latest add sxnzs/skills`).
- **Layout:** skills live in `skills/engineering`, `skills/design` and
  `skills/productivity`. Every bucket ships.
- **Docs:** one page per skill under `docs/`, covering what it does, when to
  reach for it, and how to tell it's working.
- **Current models:** skills name the stops they want, ask after doing the
  authorized work, size verification to the change, and treat pasted, fetched
  and PR text as material to check. Model-specific notes for Claude Opus 5.5
  and GPT-6 are in `evals/MODELS.md`.
- **close-out** lists work that was found but not landed, with the reason.
- **Maintainers:** `scripts/link-skills.sh` symlinks a checkout into local
  harness skill directories.
