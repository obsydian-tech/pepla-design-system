// Component rules, checked in CI:   npm test
// - every component has a spec (.md) with the required sections, its CSS and live examples
// - component CSS and examples never use a raw colour: only var(--token)
// - every var(--x) a component uses exists in the tokens (or is a component-private --_x)
// - every icon in an example exists in Lucide
// - project/components.css is up to date
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { loadComponents, bundleCss } from './components.mjs';
import { hasIcon } from './lib.mjs';

const list = loadComponents();
const REQUIRED = ['Anatomy', 'States', 'Behaviour', 'Content', 'Accessibility', 'PrimeNG mapping', 'In Naleko People today', 'Do and don\'t'];
const tokenCss = ['palette', 'colors', 'typography', 'spacing', 'shape', 'motion', 'layers'].map((n) => readFileSync(new URL(`../project/tokens/${n}.css`, import.meta.url), 'utf8')).join('\n');
const defined = new Set([...tokenCss.matchAll(/(--[a-z0-9-]+)\s*:/g)].map((m) => m[1]));
const RAW = /#[0-9a-fA-F]{3,8}\b|\brgba?\(|\bhsla?\(|\boklch\(|\bhwb\(/;

test('there are components', () => assert.ok(list.length > 0));

for (const c of list) {
  test(`${c.group}/${c.slug}: spec, CSS and examples`, () => {
    for (const k of ['name', 'group', 'status', 'classes', 'primeng']) assert.ok(c.meta[k], `${c.slug}.md frontmatter is missing ${k}`);
    assert.equal(c.meta.group, c.group, `${c.slug}.md says group ${c.meta.group} but sits in ${c.group}/`);
    for (const h of REQUIRED) assert.match(c.body, new RegExp(`^## ${h}$`, 'm'), `${c.slug}.md has no "## ${h}" section`);
    assert.ok(c.files.css, `${c.slug}.css is missing`);
    assert.ok(c.files.examples, `${c.slug}.examples.html is missing`);
    assert.match(c.examples, /<section data-example="/, `${c.slug}.examples.html has no <section data-example>`);
  });

  test(`${c.group}/${c.slug}: no raw colours, only known tokens`, () => {
    const css = c.css.replace(/\/\*[\s\S]*?\*\//g, '');
    const raw = css.match(RAW);
    assert.equal(raw, null, `${c.slug}.css uses a raw colour (${raw?.[0]}); use a semantic token`);
    const rawEx = c.examples.match(RAW);
    assert.equal(rawEx, null, `${c.slug}.examples.html uses a raw colour (${rawEx?.[0]})`);
    for (const src of [css, c.examples]) for (const [, v] of src.matchAll(/var\((--[a-z0-9-]+)/g)) {
      if (v.startsWith('--_')) continue;
      assert.ok(defined.has(v), `${c.slug} uses ${v}, which is not a token`);
    }
    assert.doesNotMatch(css, /--palette-/, `${c.slug}.css uses a palette step; use a semantic token`);
  });

  test(`${c.group}/${c.slug}: icons exist in Lucide`, () => {
    for (const [, n] of c.examples.matchAll(/data-lucide="([a-z0-9-]+)"/g)) assert.ok(hasIcon(n), `${c.slug}: no Lucide icon "${n}"`);
  });
}

test('project/components.css matches the component sources', () => {
  const onDisk = readFileSync(new URL('../project/components.css', import.meta.url), 'utf8');
  assert.equal(onDisk, bundleCss(list), 'project/components.css is stale. Run npm run build.');
});
