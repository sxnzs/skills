import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Supports flat scalar frontmatter and inline Markdown links, not general YAML/Markdown.
export function validate(root: string): string[] {
  const errors: string[] = [];
  const skillsDir = join(root, 'skills');
  if (!existsSync(skillsDir)) return ['skills: missing directory'];
  const names = readdirSync(skillsDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory()).map(entry => entry.name).sort();
  const docs = ['README.md', 'LINEAGE.md'];
  const evalDir = join(root, 'evals');
  function collect(dir: string): void {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) collect(path);
      else if (entry.name.endsWith('.md')) docs.push(relative(root, path));
    }
  }
  if (existsSync(evalDir)) collect(evalDir);
  for (const name of names) {
    const path = join('skills', name, 'SKILL.md');
    if (!existsSync(join(root, path))) {
      errors.push(`${name}: missing SKILL.md`);
      continue;
    }
    collect(join(skillsDir, name));
    const text = readFileSync(join(root, path), 'utf8');
    const front = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(text);
    if (!front) errors.push(`${name}: missing frontmatter`);
    else {
      const meta = new Map<string, string>();
      for (const line of front[1].split(/\r?\n/)) {
        const field = /^([a-zA-Z][\w-]*):(?: (.*))?$/.exec(line);
        if (!field) { errors.push(`${name}: malformed flat frontmatter ${JSON.stringify(line)}`); continue; }
        const [, key, raw = ''] = field;
        if (meta.has(key)) errors.push(`${name}: duplicate metadata ${key}`);
        const quoted = raw.startsWith('"') || raw.startsWith("'");
        let value = raw;
        if (quoted) {
          try {
            if (raw.startsWith('"')) value = JSON.parse(raw);
            else {
              if (!/^'(?:[^']|'')*'$/.test(raw)) throw new Error('invalid single quote');
              value = raw.slice(1, -1).replace(/''/g, "'");
            }
          } catch {
            errors.push(`${name}: malformed scalar for ${key}`);
            continue;
          }
        }
        if (!quoted && (raw.includes(': ') || raw.includes(' #')))
          errors.push(`${name}: ${key} needs quoting or rewording (contains ': ' or ' #')`);
        if (!quoted && /^(?:[-?:](?:\s|$)|[#[\]{}|>!&*,%@`]|\s)/.test(raw))
          errors.push(`${name}: ${key} must be a flat scalar`);
        meta.set(key, value);
      }
      if (meta.get('name') !== name) errors.push(`${name}: name must equal folder`);
      const desc = meta.get('description') ?? '';
      if (!desc || Array.from(desc).length > 1024 || !desc.includes('Use when'))
        errors.push(`${name}: description empty, over 1024 characters, or lacks 'Use when'`);
    }
    for (const ref of text.matchAll(/\*\*([a-z]+(?:-[a-z]+)+)\*\*/g))
      if (!names.includes(ref[1])) errors.push(`${name}: references unknown skill ${ref[1]}`);
  }
  for (const doc of docs) {
    const path = join(root, doc);
    if (!existsSync(path)) { errors.push(`${doc}: missing document`); continue; }
    for (const match of readFileSync(path, 'utf8').matchAll(/\]\(([^)]+)\)/g)) {
      const target = match[1].replace(/^<([^>]+)>$/, '$1');
      if (/^https?:\/\//i.test(target)) continue;
      const link = target.split('#')[0];
      if (link && !existsSync(resolve(dirname(path), link))) errors.push(`${doc}: broken link ${target}`);
    }
  }
  return errors;
}

const root = fileURLToPath(new URL('../', import.meta.url));
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const errors = validate(root);
  console.log(errors.join('\n') || `ok: ${readdirSync(join(root, 'skills'), { withFileTypes: true }).filter(e => e.isDirectory()).length} skills`);
  process.exitCode = errors.length ? 1 : 0;
}
