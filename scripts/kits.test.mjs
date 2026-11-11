// UI kit rules, checked in CI:   npm test
// - each kit has a spec (.md) with name, device and source, and at least one screen
// - screens use only Pepla component classes (pp-*), never a raw colour, only known tokens
// - every icon exists in Lucide
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { loadKits } from './kits.mjs';
import { hasIcon } from './lib.mjs';

const kits = loadKits();
const tokenCss = ['palette', 'colors', 'typography', 'spacing', 'shape', 'motion', 'layers'].map((n) => readFileSync(new URL(`../project/tokens/${n}.css`, import.meta.url), 'utf8')).join('\n');
const defined = new Set([...tokenCss.matchAll(/(--[a-z0-9-]+)\s*:/g)].map((m) => m[1]));
const components = ['components.css', 'tokens/base.css', 'tokens/typography.css'].map((n) => readFileSync(new URL(`../project/${n}`, import.meta.url), 'utf8')).join('\n');
const known = new Set([...components.matchAll(/\.(pp-[a-z0-9_-]+)/g)].map((m) => m[1]));
const RAW = /#[0-9a-fA-F]{3,8}\b|\brgba?\(|\bhsla?\(|\boklch\(|\bhwb\(/;

for (const k of kits) {
  test(`kit ${k.slug}: spec and screens`, () => {
    for (const f of ['name', 'device', 'source']) assert.ok(k.meta[f], `${k.slug}.md frontmatter is missing ${f}`);
    assert.ok(k.screens.length > 0, `${k.slug}.html has no <section data-screen="..." data-device="desktop|phone">`);
  });
  test(`kit ${k.slug}: only Pepla classes, tokens and Lucide icons`, () => {
    const raw = k.html.match(RAW);
    assert.equal(raw, null, `${k.slug}.html uses a raw colour (${raw?.[0]})`);
    assert.doesNotMatch(k.html, /<style|<script/, `${k.slug}.html must not carry its own CSS or scripts`);
    for (const [, v] of k.html.matchAll(/var\((--[a-z0-9-]+)/g)) if (!v.startsWith('--_')) assert.ok(defined.has(v), `${k.slug} uses ${v}, which is not a token`);
    for (const [, list] of k.html.matchAll(/class="([^"]*)"/g)) for (const c of list.split(/\s+/).filter(Boolean)) {
      if (['c1', 'c2', 'c3'].includes(c)) continue; // the logo mark's three circles
      assert.ok(c.startsWith('pp-'), `${k.slug} uses class "${c}"; kits use only Pepla component classes`);
      assert.ok(known.has(c), `${k.slug} uses ${c}, which no component defines`);
    }
    for (const [, n] of k.html.matchAll(/data-lucide="([a-z0-9-]+)"/g)) assert.ok(hasIcon(n), `${k.slug}: no Lucide icon "${n}"`);
  });
}
