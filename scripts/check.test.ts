import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { validate } from './check.ts';

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
}));
