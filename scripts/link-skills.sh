#!/usr/bin/env bash
set -euo pipefail

# Maintainer tool: symlink every skill in this checkout into local harness
# skill directories, so `git pull` updates installed skills. Not an installer
# for users; they use the plugin or `npx skills add sxnzs/skills`.
#
#   scripts/link-skills.sh                 # ~/.claude/skills ~/.agents/skills (+ ~/.codex/skills if present)
#   scripts/link-skills.sh DIR [DIR...]    # explicit destinations
#
# A real directory already at a skill's name is left alone with a warning.
# Links into this repo that no longer resolve (a moved or deleted skill) are
# removed.

REPO="$(cd "$(dirname "$0")/.." && pwd)"
if [ "$#" -gt 0 ]; then
  DESTS=("$@")
else
  DESTS=("$HOME/.claude/skills" "$HOME/.agents/skills")
  [ -d "$HOME/.codex/skills" ] && DESTS+=("$HOME/.codex/skills")
fi

skills=()
while IFS= read -r -d '' skill_md; do
  skills+=("$(dirname "$skill_md")")
done < <(find "$REPO/skills" -mindepth 3 -maxdepth 3 -name SKILL.md -print0 | sort -z)

for dest in "${DESTS[@]}"; do
  if [ -L "$dest" ]; then
    case "$(readlink -f "$dest")" in
      "$REPO"|"$REPO"/*) echo "error: $dest resolves into this repo; remove it first" >&2; exit 1 ;;
    esac
  fi
  mkdir -p "$dest"

  for link in "$dest"/*; do
    [ -L "$link" ] || continue
    [ -e "$link" ] && continue
    target="$(readlink "$link")"
    case "$target" in /*) ;; *) target="$dest/$target" ;; esac
    target="$(python3 -c 'import os, sys; print(os.path.normpath(sys.argv[1]))' "$target")"
    case "$target" in
      "$REPO"/*) rm "$link"; echo "pruned $(basename "$link") ($dest)" ;;
    esac
  done

  for src in "${skills[@]}"; do
    target="$dest/$(basename "$src")"
    if [ -e "$target" ] && [ ! -L "$target" ]; then
      echo "skip $(basename "$src"): $target is a real directory" >&2
      continue
    fi
    ln -sfn "$src" "$target"
  done
  echo "linked ${#skills[@]} skills into $dest"
done
