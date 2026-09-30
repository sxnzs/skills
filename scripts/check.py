#!/usr/bin/env python3
"""Validate every skills/*/SKILL.md: frontmatter, name, description, links."""
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
MAX_DESCRIPTION = 1024  # Agent Skills spec limit
errors = []

skills = sorted(p for p in (ROOT / "skills").iterdir() if p.is_dir())
names = {p.name for p in skills}
for d in skills:
    f = d / "SKILL.md"
    if not f.exists():
        errors.append(f"{d.name}: missing SKILL.md")
        continue
    text = f.read_text()
    m = re.match(r"---\n(.*?)\n---\n", text, re.S)
    if not m:
        errors.append(f"{d.name}: missing frontmatter")
        continue
    meta = dict(line.split(": ", 1) for line in m.group(1).splitlines() if ": " in line)
    if meta.get("name") != d.name:
        errors.append(f"{d.name}: name {meta.get('name')!r} != folder")
    desc = meta.get("description", "")
    if not desc or len(desc) > MAX_DESCRIPTION or "Use when" not in desc:
        errors.append(f"{d.name}: description empty, too long, or lacks 'Use when'")
    for key, value in meta.items():
        # Unquoted YAML scalars can't contain ': ' or ' #' (strict parsers reject or truncate them).
        if value[:1] not in "'\"" and (": " in value or " #" in value):
            errors.append(f"{d.name}: {key} needs quoting or rewording (contains ': ' or ' #')")
    for ref in re.findall(r"\*\*([a-z]+(?:-[a-z]+)+)\*\*", text):
        if ref not in names:
            errors.append(f"{d.name}: references unknown skill {ref!r}")

for md in [ROOT / "README.md", *ROOT.glob("skills/*/SKILL.md")]:
    for link in re.findall(r"\]\(([^)#]+)\)", md.read_text()):
        if not link.startswith("http") and not (md.parent / link).exists():
            errors.append(f"{md.relative_to(ROOT)}: broken link {link}")

print("\n".join(errors) or f"ok: {len(skills)} skills")
sys.exit(1 if errors else 0)
