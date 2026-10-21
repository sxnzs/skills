import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Each SKILL.md owns its outgoing handoffs in a `## Handoffs` block. Everything
// else (docs graph, per-page tables, lane checks) is derived from those blocks.
export type Skill = { bucket: string, name: string };
export type Edge = { from: string, to: string, mode: 'run' | 'suggest', when: string };

// Skills that plan, design, explain or verify; they suggest editing skills but never run them unasked.
const NO_AUTO_EDIT = ['idea-development', 'ui-design', 'visual-design', 'motion-design', 'explain-code', 'critic', 'code-review', 'research', 'teach'];
const EDITING = ['feature-development', 'diagnosing-bugs', 'codebase-improvement', 'agent-setup'];

export const PREFACE = '**run** continues into that skill with this context unless the request stops short of it, '
  + 'then it is only suggested. **suggest** names it in one closing line once the deliverable is final and never '
  + 'continues unasked. A missing skill never blocks; do the work inline.';

export function listSkills(root: string): Skill[] {
  const dirs = (dir: string) => readdirSync(dir, { withFileTypes: true })
    .filter(entry => entry.isDirectory()).map(entry => entry.name).sort();
  return dirs(join(root, 'skills')).flatMap(bucket => dirs(join(root, 'skills', bucket)).map(name => ({ bucket, name })));
}

const squash = (text: string) => text.replace(/\s+/g, ' ').trim();
const ENTRY = /^(.+?) → (run|suggest) \*\*([a-z]+(?:-[a-z]+)*)\*\*\.?$/;

export function readHandoffs(root: string, skills: Skill[]): { edges: Edge[], errors: string[] } {
  const edges: Edge[] = [], errors: string[] = [];
  const names = skills.map(skill => skill.name);
  if (skills.length < 2) return { edges, errors };
  for (const { bucket, name } of skills) {
    const path = join(root, 'skills', bucket, name, 'SKILL.md');
    if (!existsSync(path)) continue;
    const text = readFileSync(path, 'utf8');
    const start = /^## Handoffs[ \t]*$/m.exec(text);
    if (!start) { errors.push(`${name}: missing ## Handoffs block`); continue; }
    const rest = text.slice(start.index + start[0].length);
    const body = rest.slice(0, /^## /m.exec(rest)?.index ?? rest.length);
    const [preface, ...list] = body.split(/^(?=- )/m);
    if (squash(preface) !== PREFACE) errors.push(`${name}: Handoffs preface differs from the canonical text`);
    const seen = new Set<string>();
    for (const item of list) {
      const entry = ENTRY.exec(squash(item.replace(/^- /, '')));
      if (!entry) { errors.push(`${name}: handoff must read '- <when> → run|suggest **skill**': ${squash(item)}`); continue; }
      const [, when, mode, to] = entry;
      if (!names.includes(to)) errors.push(`${name}: handoff to unknown skill ${to}`);
      else if (to === name) errors.push(`${name}: handoff to itself`);
      else if (seen.has(to)) errors.push(`${name}: duplicate handoff to ${to}`);
      else if (mode === 'run' && NO_AUTO_EDIT.includes(name) && EDITING.includes(to)) errors.push(`${name}: handoff to ${to} must be suggest (${name} never starts edits unasked)`);
      else { seen.add(to); edges.push({ from: name, to, mode: mode as Edge['mode'], when }); }
    }
    if (!list.length) errors.push(`${name}: Handoffs block has no entries`);
  }
  if (!names.includes('next')) return { edges, errors };
  for (const { name } of skills) {
    if (name === 'next') continue;
    if (!edges.some(edge => edge.from === 'next' && edge.to === name)) errors.push(`next: missing handoff to ${name}`);
    if (!edges.some(edge => edge.to === name && edge.from !== 'next')) errors.push(`${name}: no skill hands off to it (only next does)`);
  }
  return { edges, errors };
}

const page = (skill: Skill) => `../${skill.bucket}/${skill.name}.md`;

function pageSection(skill: Skill, skills: Skill[], edges: Edge[]): string {
  const link = (name: string) => `[${name}](${page(skills.find(other => other.name === name)!)})`;
  const out = edges.filter(edge => edge.from === skill.name);
  const into = edges.filter(edge => edge.to === skill.name && edge.from !== 'next').map(edge => link(edge.from));
  const rows = out.map(edge => `| ${edge.when} | ${edge.mode === 'run' ? 'runs' : 'suggests'} ${link(edge.to)} |`);
  return ['## Handoffs', '', '| When | Then |', '| --- | --- |', ...rows, '',
    into.length ? `Reached from ${into.join(', ')}.` : 'Reached from [next](../productivity/next.md) only.'].join('\n');
}

function overview(skills: Skill[], edges: Edge[]): string {
  const buckets = [...new Set(skills.map(skill => skill.bucket))];
  const run = edges.filter(edge => edge.mode === 'run' && edge.from !== 'next');
  const id = (name: string) => name.replace(/-/g, '_');
  const lines = ['```mermaid', 'flowchart LR'];
  for (const bucket of buckets) {
    lines.push(`  subgraph ${bucket}`);
    for (const skill of skills.filter(other => other.bucket === bucket && other.name !== 'next'))
      lines.push(`    ${id(skill.name)}[${skill.name}]`);
    lines.push('  end');
  }
  for (const edge of run) lines.push(`  ${id(edge.from)} --> ${id(edge.to)}`);
  lines.push('```', '', '| Skill | Runs | Suggests |', '| --- | --- | --- |');
  for (const skill of skills.filter(other => other.name !== 'next')) {
    const list = (mode: Edge['mode']) => edges.filter(edge => edge.from === skill.name && edge.mode === mode)
      .map(edge => edge.to).join(', ') || '–';
    lines.push(`| [${skill.name}](${page(skill).replace('../', '')}) | ${list('run')} | ${list('suggest')} |`);
  }
  return lines.join('\n');
}

const markers = (id: string) => [`<!-- ${id}:start -->`, `<!-- ${id}:end -->`] as const;

function splice(text: string, id: string, body: string): string | undefined {
  const [open, close] = markers(id);
  const from = text.indexOf(open), to = text.indexOf(close);
  if (from < 0 || to < from) return undefined;
  return `${text.slice(0, from)}${open}\n${body}\n${text.slice(to)}`;
}

// Lanes are `- **Name**: a → b → c` lines under `## Lanes` in docs/README.md; every hop must be a handoff.
export function checkLanes(readme: string, edges: Edge[], names: string[]): string[] {
  const errors: string[] = [];
  const start = /^## Lanes[ \t]*$/m.exec(readme);
  if (!start) return ['docs/README.md: missing ## Lanes section'];
  const rest = readme.slice(start.index + start[0].length);
  const body = rest.slice(0, /^## /m.exec(rest)?.index ?? rest.length);
  const lanes = [...body.matchAll(/^- \*\*([^*]+)\*\*: (.+)$/gm)];
  if (!lanes.length) errors.push('docs/README.md: ## Lanes has no lanes');
  for (const [, label, chain] of lanes) {
    const steps = chain.split(' → ').map(step => step.trim());
    for (const step of steps) if (!names.includes(step)) errors.push(`docs/README.md: lane ${label} names unknown skill ${step}`);
    steps.slice(1).forEach((step, i) => {
      if (names.includes(steps[i]) && names.includes(step) && !edges.some(edge => edge.from === steps[i] && edge.to === step))
        errors.push(`docs/README.md: lane ${label} hop ${steps[i]} → ${step} is not a handoff`);
    });
  }
  return errors;
}

// Returns stale generated sections; with write, regenerates them instead.
export function syncDocs(root: string, skills: Skill[], edges: Edge[], write = false): string[] {
  const errors: string[] = [];
  if (skills.length < 2) return errors;
  const targets: { path: string, id: string, body: string }[] = [
    { path: 'docs/README.md', id: 'handoffs', body: overview(skills, edges) },
    ...skills.map(skill => ({ path: `docs/${skill.bucket}/${skill.name}.md`, id: 'handoffs', body: pageSection(skill, skills, edges) })),
  ];
  for (const { path, id, body } of targets) {
    const file = join(root, path);
    if (!existsSync(file)) continue;
    const text = readFileSync(file, 'utf8');
    let next = splice(text, id, body);
    if (next === undefined) {
      if (!write) { errors.push(`${path}: missing generated ${id} markers (run node scripts/graph.ts --write)`); continue; }
      const [open, close] = markers(id);
      const block = `${open}\n${body}\n${close}\n`;
      const credits = text.indexOf('\n## Credits');
      next = credits < 0 ? `${text.replace(/\s*$/, '')}\n\n${block}` : `${text.slice(0, credits).replace(/\s*$/, '')}\n\n${block}${text.slice(credits)}`;
    }
    if (next !== text) {
      if (write) writeFileSync(file, next);
      else errors.push(`${path}: generated handoffs are stale (run node scripts/graph.ts --write)`);
    }
  }
  return errors;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const root = fileURLToPath(new URL('../', import.meta.url));
  const skills = listSkills(root);
  const { edges, errors } = readHandoffs(root, skills);
  if (errors.length) { console.log(errors.join('\n')); process.exitCode = 1; }
  else if (process.argv.includes('--write')) {
    syncDocs(root, skills, edges, true);
    console.log(`wrote handoffs for ${skills.length} skills, ${edges.length} edges`);
  } else console.log(edges.map(edge => `${edge.from} -${edge.mode}-> ${edge.to}`).join('\n'));
}
