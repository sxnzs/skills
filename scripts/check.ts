import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Supports flat scalar frontmatter and inline Markdown links, not general YAML/Markdown.
export function validate(root: string): string[] {
  const errors: string[] = [];
  const skillsDir = join(root, 'skills');
  if (!existsSync(skillsDir)) return ['skills: missing directory'];
  const dirs = (dir: string) => readdirSync(dir, { withFileTypes: true })
    .filter(entry => entry.isDirectory()).map(entry => entry.name).sort();
  // Layout: skills/<bucket>/<skill>/SKILL.md. Every bucket ships.
  const skills: { bucket: string, name: string }[] = [];
  for (const bucket of dirs(skillsDir)) {
    if (existsSync(join(skillsDir, bucket, 'SKILL.md')))
      errors.push(`${bucket}: skills belong in a bucket, as skills/<bucket>/${bucket}`);
    for (const name of dirs(join(skillsDir, bucket))) skills.push({ bucket, name });
  }
  const names = skills.map(skill => skill.name);
  for (const name of new Set(names))
    if (names.filter(other => other === name).length > 1) errors.push(`${name}: duplicate skill name across buckets`);
  const docs = ['README.md', 'LINEAGE.md'];
  for (const bucket of dirs(skillsDir))
    if (existsSync(join(skillsDir, bucket, 'README.md'))) docs.push(join('skills', bucket, 'README.md'));
  const evalDir = join(root, 'evals');
  function collect(dir: string): void {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) collect(path);
      else if (entry.name.endsWith('.md')) docs.push(relative(root, path));
    }
  }
  if (existsSync(evalDir)) collect(evalDir);
  const docsDir = join(root, 'docs');
  if (existsSync(docsDir)) {
    collect(docsDir);
    for (const { bucket, name } of skills)
      if (!existsSync(join(docsDir, bucket, `${name}.md`))) errors.push(`${name}: missing docs/${bucket}/${name}.md`);
  }
  errors.push(...checkManifests(root, skills));
  for (const { bucket, name } of skills) {
    const path = join('skills', bucket, name, 'SKILL.md');
    if (!existsSync(join(root, path))) {
      errors.push(`${name}: missing SKILL.md`);
      continue;
    }
    collect(join(skillsDir, bucket, name));
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

function readJson(root: string, path: string, errors: string[]): any {
  if (!existsSync(join(root, path))) return undefined;
  try { return JSON.parse(readFileSync(join(root, path), 'utf8')); }
  catch { errors.push(`${path}: invalid JSON`); return undefined; }
}

// Plugin manifests are optional; when present they must ship exactly the skills on disk.
function checkManifests(root: string, skills: { bucket: string, name: string }[]): string[] {
  const errors: string[] = [];
  const version = readJson(root, 'package.json', errors)?.version;
  const claude = readJson(root, '.claude-plugin/plugin.json', errors);
  if (claude) {
    const listed = [...(Array.isArray(claude.skills) ? claude.skills : [])].sort();
    const expected = skills.map(({ bucket, name }) => `./skills/${bucket}/${name}`).sort();
    for (const path of expected) if (!listed.includes(path)) errors.push(`.claude-plugin/plugin.json: missing ${path}`);
    for (const path of listed) if (!expected.includes(path)) errors.push(`.claude-plugin/plugin.json: unknown ${path}`);
    if (claude.version !== version) errors.push(`.claude-plugin/plugin.json: version ${claude.version} != package.json ${version}`);
  }
  const codex = readJson(root, '.codex-plugin/plugin.json', errors);
  if (codex) {
    if (codex.skills !== './skills/') errors.push(`.codex-plugin/plugin.json: skills must be "./skills/"`);
    if (codex.version !== version) errors.push(`.codex-plugin/plugin.json: version ${codex.version} != package.json ${version}`);
  }
  return errors;
}

const root = fileURLToPath(new URL('../', import.meta.url));
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const errors = validate(root);
  const count = readdirSync(join(root, 'skills'), { withFileTypes: true }).filter(e => e.isDirectory())
    .flatMap(b => readdirSync(join(root, 'skills', b.name), { withFileTypes: true }).filter(e => e.isDirectory())).length;
  console.log(errors.join('\n') || `ok: ${count} skills`);
  process.exitCode = errors.length ? 1 : 0;
}
