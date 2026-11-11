// Icon vocabulary, checked in CI:   npm test
// The Iconography section of project/readme.md is the whole vocabulary. Every icon in a
// component example, a component spec or a UI kit must be listed there, so one meaning
// keeps one icon everywhere. To use a new icon, add its row to the readme first.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { hasIcon } from './lib.mjs';

const root = new URL('../project/', import.meta.url);
const readme = readFileSync(new URL('readme.md', root), 'utf8');
const section = readme.split('## Iconography')[1].split('\n## ')[0];
const vocab = new Set([...section.matchAll(/`([a-z0-9-]+)`/g)].map((m) => m[1]).filter((n) => !n.startsWith('-')));

const files = [];
for (const g of readdirSync(new URL('components/', root), { withFileTypes: true }).filter((d) => d.isDirectory())) {
  for (const f of readdirSync(new URL(`components/${g.name}/`, root))) if (f.endsWith('.examples.html')) files.push(`components/${g.name}/${f}`);
}
for (const f of readdirSync(new URL('ui_kits/', root))) if (f.endsWith('.html')) files.push(`ui_kits/${f}`);

test('every icon in the vocabulary exists in Lucide', () => {
  for (const n of vocab) assert.ok(hasIcon(n), `readme Iconography lists "${n}", which is not a Lucide icon`);
});

for (const f of files) {
  test(`icons in ${f} are in the vocabulary`, () => {
    const html = readFileSync(new URL(f, root), 'utf8');
    for (const [, n] of html.matchAll(/data-lucide="([a-z0-9-]+)"/g)) {
      assert.ok(vocab.has(n), `${f} uses "${n}", which is not in the readme's icon vocabulary. Use the listed icon for that meaning, or add a row first.`);
    }
  });
}
