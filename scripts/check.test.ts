import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { validate } from './check.ts';
import { PREFACE, listSkills, readHandoffs, syncDocs } from './graph.ts';

const good = '---\nname: test-skill\ndescription: A plan. Use when needed.\n---\n';
function fixture(run: (root: string, put: (path: string, text: string) => void) => void): void {
  mkdirSync('artifacts', { recursive: true });
  const root = mkdtempSync('artifacts/check-');
  const put = (path: string, text: string) => {
    const dest = join(root, path);
    mkdirSync(join(dest, '..'), { recursive: true });
    writeFileSync(dest, text);
  };
  try {
    put('README.md', ''); put('LINEAGE.md', ''); put('skills/test-bucket/test-skill/SKILL.md', good);
    run(root, put);
  } finally { rmSync(root, { recursive: true, force: true }); }
}

test('valid repository, quoted scalar, and HTTP links', () => fixture((root, put) => {
  put('README.md', '[web](https://example.com/missing)');
  put('skills/test-bucket/test-skill/SKILL.md', good.replace('A plan. Use when needed.', '"A plan: useful # detail. Use when needed."'));
  assert.deepEqual(validate(root), []);
}));

for (const [label, text, expected] of [
  ['missing frontmatter', 'body', /missing frontmatter/],
  ['malformed metadata', good.replace('name: test-skill', 'name test-skill'), /malformed flat/],
  ['duplicate metadata', good.replace('name: test-skill', 'name: test-skill\nname: test-skill'), /duplicate metadata/],
  ['malformed quote', good.replace('A plan.', '"A plan.'), /malformed scalar/],
  ['nested metadata', good.replace('name: test-skill', 'name: test-skill\nmetadata:\n  nested: value'), /malformed flat/],
  ['name mismatch', good.replace('name: test-skill', 'name: other'), /name must equal/],
  ['empty description', good.replace('A plan. Use when needed.', ''), /description empty/],
  ['long description', good.replace('A plan.', 'x'.repeat(1025)), /over 1024/],
  ['missing trigger', good.replace('Use when', 'When'), /lacks 'Use when'/],
  ['colon hazard', good.replace('A plan.', 'A plan: yes.'), /needs quoting/],
  ['comment hazard', good.replace('A plan.', 'A plan # yes.'), /needs quoting/],
  ['unknown sibling', good + '**unknown-skill**', /unknown skill/],
] as const) test(label, () => fixture((root, put) => {
  put('skills/test-bucket/test-skill/SKILL.md', text);
  assert.ok(validate(root).some(error => expected.test(error)));
}));

test('missing skill file', () => fixture((root) => {
  rmSync(join(root, 'skills/test-bucket/test-skill/SKILL.md'));
  assert.ok(validate(root).includes('test-skill: missing SKILL.md'));
}));

for (const doc of ['README.md', 'LINEAGE.md', 'evals/cases.md', 'skills/test-bucket/test-skill/SKILL.md',
  'skills/test-bucket/test-skill/references/nested/method.md']) {
  test(`links relative to ${doc}`, () => fixture((root, put) => {
    const prefix = doc.endsWith('SKILL.md') ? good : '';
    put(doc, prefix + '[missing](missing.md#section)');
    assert.ok(validate(root).some(error => error === `${doc}: broken link missing.md#section`));
    const dir = join(doc, '..');
    put(join(dir, 'missing.md'), '');
    assert.deepEqual(validate(root), []);
  }));
}

for (const raw of ['"Use when needed." "x"', "'Use when needed.' 'x'", '"Use when \\q needed."']) {
  test(`reject malformed quoted scalar ${raw}`, () => fixture((root, put) => {
    put('skills/test-bucket/test-skill/SKILL.md', good.replace('A plan. Use when needed.', raw));
    assert.ok(validate(root).some(error => error.includes('malformed scalar')));
  }));
}

for (const raw of ['"Use when someone says \\"go\\"."', "'Use when it''s needed.'", 'Well-made! Use when (needed).']) {
  test(`accept scalar ${raw}`, () => fixture((root, put) => {
    put('skills/test-bucket/test-skill/SKILL.md', good.replace('A plan. Use when needed.', raw));
    assert.deepEqual(validate(root), []);
  }));
}

test('quoted values are decoded before metadata validation', () => fixture((root, put) => {
  put('skills/test-bucket/test-skill/SKILL.md', good.replace('name: test-skill', 'name: "test-\\u0073kill"')
    .replace('A plan. Use when needed.', '"Use\\u0020when needed."'));
  assert.deepEqual(validate(root), []);
}));

for (const marker of ['- ', '? ', ': ', '# ', '[', ']', '{', '}', '|', '>', '!', '&', '*', ',', '%', '@', '`']) {
  test(`reject leading marker ${marker}`, () => fixture((root, put) => {
    put('skills/test-bucket/test-skill/SKILL.md', good.replace('A plan. Use when needed.', `${marker}Use when needed.`));
    assert.ok(validate(root).some(error => error.includes('must be a flat scalar')));
  }));
}

test('skill outside a bucket', () => fixture((root, put) => {
  put('skills/loose-skill/SKILL.md', good.replace('test-skill', 'loose-skill'));
  assert.ok(validate(root).some(error => /belong in a bucket/.test(error)));
}));

test('duplicate skill name across buckets', () => fixture((root, put) => {
  put('skills/other-bucket/test-skill/SKILL.md', good);
  assert.ok(validate(root).some(error => /duplicate skill name/.test(error)));
}));

test('docs page required per skill once docs/ exists', () => fixture((root, put) => {
  put('docs/README.md', '');
  assert.ok(validate(root).includes('test-skill: missing docs/test-bucket/test-skill.md'));
  put('docs/test-bucket/test-skill.md', '');
  assert.deepEqual(validate(root), []);
}));

test('plugin manifests match skills and package version', () => fixture((root, put) => {
  const pkg = JSON.stringify({ version: '1.0.0' });
  const claude = (skills: string[], version = '1.0.0') => JSON.stringify({ version, skills });
  put('package.json', pkg);
  put('.claude-plugin/plugin.json', claude(['./skills/test-bucket/test-skill']));
  put('.codex-plugin/plugin.json', JSON.stringify({ version: '1.0.0', skills: './skills/' }));
  assert.deepEqual(validate(root), []);
  put('.claude-plugin/plugin.json', claude([]));
  assert.ok(validate(root).some(error => /missing \.\/skills\/test-bucket\/test-skill/.test(error)));
  put('.claude-plugin/plugin.json', claude(['./skills/test-bucket/test-skill', './skills/x/gone']));
  assert.ok(validate(root).some(error => /unknown \.\/skills\/x\/gone/.test(error)));
  put('.claude-plugin/plugin.json', claude(['./skills/test-bucket/test-skill'], '0.9.0'));
  assert.ok(validate(root).some(error => /claude-plugin.*version 0\.9\.0/.test(error)));
  put('.claude-plugin/plugin.json', claude(['./skills/test-bucket/test-skill']));
  put('.codex-plugin/plugin.json', JSON.stringify({ version: '1.0.0', skills: './skills/engineering' }));
  assert.ok(validate(root).some(error => /codex-plugin.*must be/.test(error)));
  put('.codex-plugin/plugin.json', JSON.stringify({ version: '1.1.0', skills: './skills/' }));
  assert.ok(validate(root).some(error => /codex-plugin.*version 1\.1\.0/.test(error)));
}));

test('plugin manifests require a package version', () => fixture((root, put) => {
  put('package.json', '{}');
  put('.claude-plugin/plugin.json', JSON.stringify({ skills: ['./skills/test-bucket/test-skill'] }));
  put('.codex-plugin/plugin.json', JSON.stringify({ skills: './skills/' }));
  assert.ok(validate(root).includes('package.json: version required when plugin manifests exist'));
}));

// Handoff graph: two skills, each with a Handoffs block.
const skill = (name: string, entries: string[], preface = PREFACE) =>
  `---\nname: ${name}\ndescription: A plan. Use when needed.\n---\n\n## Handoffs\n\n${preface}\n\n${entries.join('\n')}\n`;
function pair(run: (root: string, put: (path: string, text: string) => void) => void): void {
  fixture((root, put) => {
    put('skills/test-bucket/test-skill/SKILL.md', skill('test-skill', ['- Work shifts → run **other-skill**']));
    put('skills/test-bucket/other-skill/SKILL.md', skill('other-skill', ['- Work shifts back → suggest **test-skill**']));
    run(root, put);
  });
}

test('valid handoff pair', () => pair((root) => assert.deepEqual(validate(root), [])));

for (const [label, text, expected] of [
  ['missing Handoffs block', '---\nname: test-skill\ndescription: A plan. Use when needed.\n---\n', /missing ## Handoffs/],
  ['no entries', skill('test-skill', []), /no entries/],
  ['altered preface', skill('test-skill', ['- Work shifts → run **other-skill**'], 'run does things.'), /preface differs/],
  ['unknown target', skill('test-skill', ['- Work shifts → run **ghost-skill**']), /unknown skill ghost-skill/],
  ['self handoff', skill('test-skill', ['- Work shifts → run **test-skill**']), /to itself/],
  ['duplicate target', skill('test-skill', ['- A → run **other-skill**', '- B → suggest **other-skill**']), /duplicate handoff to other-skill/],
  ['malformed entry', skill('test-skill', ['- Work shifts to other-skill']), /handoff must read/],
] as const) test(`handoff lint: ${label}`, () => pair((root, put) => {
  put('skills/test-bucket/test-skill/SKILL.md', text);
  assert.ok(validate(root).some(error => expected.test(error)), validate(root).join('\n'));
}));

test('planning and read-only skills may not run editing skills', () => pair((root, put) => {
  put('skills/test-bucket/test-skill/SKILL.md', skill('test-skill', ['- A → run **other-skill**', '- B → run **critic**']));
  put('skills/test-bucket/critic/SKILL.md', skill('critic', ['- Fails → run **feature-development**']));
  put('skills/test-bucket/feature-development/SKILL.md', skill('feature-development', ['- Built → run **critic**']));
  assert.ok(validate(root).some(error => /critic: handoff to feature-development must be suggest/.test(error)));
  put('skills/test-bucket/critic/SKILL.md', skill('critic', ['- Fails → suggest **feature-development**']));
  assert.deepEqual(validate(root), []);
}));

test('handoff entries may wrap across lines', () => pair((root, put) => {
  put('skills/test-bucket/test-skill/SKILL.md', skill('test-skill', ['- Work shifts\n  across lines → run **other-skill**']));
  assert.deepEqual(readHandoffs(root, listSkills(root)).errors, []);
}));

test('next must hand off to every skill and every skill needs an inbound edge', () => pair((root, put) => {
  put('skills/test-bucket/next/SKILL.md', skill('next', ['- Lost → suggest **test-skill**']));
  put('skills/test-bucket/test-skill/SKILL.md', skill('test-skill', ['- Work shifts → run **next**']));
  put('skills/test-bucket/other-skill/SKILL.md', skill('other-skill', ['- Work shifts → run **next**']));
  const errors = validate(root);
  assert.ok(errors.includes('next: missing handoff to other-skill'));
  assert.ok(errors.includes('test-skill: no skill hands off to it (only next does)'));
  assert.ok(!errors.some(error => /next: no skill/.test(error)));
}));

test('generated handoff docs must match the skills', () => pair((root, put) => {
  put('docs/README.md', '<!-- handoffs:start -->\n<!-- handoffs:end -->\n');
  put('docs/test-bucket/test-skill.md', '# test-skill\n');
  put('docs/test-bucket/other-skill.md', '# other-skill\n');
  const skills = listSkills(root), { edges } = readHandoffs(root, skills);
  assert.ok(syncDocs(root, skills, edges).some(error => /missing generated handoffs markers|stale/.test(error)));
  assert.deepEqual(syncDocs(root, skills, edges, true), []);
  assert.deepEqual(syncDocs(root, skills, edges), []);
  put('skills/test-bucket/test-skill/SKILL.md', skill('test-skill', ['- Different → suggest **other-skill**']));
  assert.ok(validate(root).some(error => /generated handoffs are stale/.test(error)));
}));

test('lanes must follow real handoffs', () => pair((root, put) => {
  put('skills/test-bucket/next/SKILL.md', skill('next', ['- A → suggest **test-skill**', '- B → suggest **other-skill**']));
  put('skills/test-bucket/test-skill/SKILL.md', skill('test-skill', ['- A → run **other-skill**', '- Lost → suggest **next**']));
  put('docs/test-bucket/test-skill.md', ''); put('docs/test-bucket/other-skill.md', ''); put('docs/test-bucket/next.md', '');
  const readme = (lane: string) => `## Lanes\n\n- **Route**: ${lane}\n\n<!-- handoffs:start -->\n<!-- handoffs:end -->\n`;
  const sync = () => { const skills = listSkills(root); syncDocs(root, skills, readHandoffs(root, skills).edges, true); };
  put('docs/README.md', readme('test-skill → other-skill'));
  sync();
  assert.deepEqual(validate(root), []);
  put('docs/README.md', readme('other-skill → next'));
  sync();
  assert.ok(validate(root).some(error => /hop other-skill → next is not a handoff/.test(error)));
  put('docs/README.md', readme('test-skill → ghost'));
  assert.ok(validate(root).some(error => /unknown skill ghost/.test(error)));
}));

test('upstream links must use a revision pinned in LINEAGE.md', () => fixture((root, put) => {
  const sha = 'a'.repeat(40);
  put('LINEAGE.md', `| pack | [pin](https://github.com/mattpocock/skills/tree/${sha}) |\n`);
  put('README.md', `[ok](https://github.com/mattpocock/skills/blob/${sha}/x.md) [moving](https://github.com/cursor/plugins/blob/${'b'.repeat(40)}/y.md)`);
  const errors = validate(root);
  assert.equal(errors.length, 1, errors.join('\n'));
  assert.match(errors[0], /README\.md: upstream link .* not a revision pinned/);
}));
