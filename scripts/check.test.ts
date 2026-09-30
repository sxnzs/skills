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
    put('README.md', ''); put('LINEAGE.md', ''); put('skills/test-skill/SKILL.md', good);
    run(root, put);
  } finally { rmSync(root, { recursive: true, force: true }); }
}

test('valid repository, quoted scalar, and HTTP links', () => fixture((root, put) => {
  put('README.md', '[web](https://example.com/missing)');
  put('skills/test-skill/SKILL.md', good.replace('A plan. Use when needed.', '"A plan: useful # detail. Use when needed."'));
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
  put('skills/test-skill/SKILL.md', text);
  assert.ok(validate(root).some(error => expected.test(error)));
}));

test('missing skill file', () => fixture((root) => {
  rmSync(join(root, 'skills/test-skill/SKILL.md'));
  assert.ok(validate(root).includes('test-skill: missing SKILL.md'));
}));

for (const doc of ['README.md', 'LINEAGE.md', 'evals/cases.md', 'skills/test-skill/SKILL.md']) {
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
    put('skills/test-skill/SKILL.md', good.replace('A plan. Use when needed.', raw));
    assert.ok(validate(root).some(error => error.includes('malformed scalar')));
  }));
}

for (const raw of ['"Use when someone says \\"go\\"."', "'Use when it''s needed.'", 'Well-made! Use when (needed).']) {
  test(`accept scalar ${raw}`, () => fixture((root, put) => {
    put('skills/test-skill/SKILL.md', good.replace('A plan. Use when needed.', raw));
    assert.deepEqual(validate(root), []);
  }));
}

test('quoted values are decoded before metadata validation', () => fixture((root, put) => {
  put('skills/test-skill/SKILL.md', good.replace('name: test-skill', 'name: "test-\\u0073kill"')
    .replace('A plan. Use when needed.', '"Use\\u0020when needed."'));
  assert.deepEqual(validate(root), []);
}));

for (const marker of ['- ', '? ', ': ', '# ', '[', ']', '{', '}', '|', '>', '!', '&', '*', ',', '%', '@', '`']) {
  test(`reject leading marker ${marker}`, () => fixture((root, put) => {
    put('skills/test-skill/SKILL.md', good.replace('A plan. Use when needed.', `${marker}Use when needed.`));
    assert.ok(validate(root).some(error => error.includes('must be a flat scalar')));
  }));
}
