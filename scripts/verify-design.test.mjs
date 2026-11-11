// The design system rules, checked in CI:   npm test   (or npm run verify:design for the full list)
// - verify:design finds nothing: no inline style, no raw value, no unknown class, no hand-drawn
//   SVG, no glyph icon, no icon outside the vocabulary (see scripts/verify-design.mjs)
// - every pp- class a component spec names exists in the CSS, so a spec never promises
//   something the system cannot draw (code fences for Angular or PrimeNG config are skipped)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { verify, CLASSES } from './verify-design.mjs';

test('verify:design finds no violations', () => {
  const v = verify();
  assert.equal(v.length, 0, `\n${v.slice(0, 40).map((x) => `${x.file}:${x.line} [${x.rule}] ${x.text}`).join('\n')}\nRun npm run verify:design for the full list.`);
});

const root = new URL('../project/components/', import.meta.url);
for (const g of readdirSync(root, { withFileTypes: true }).filter((d) => d.isDirectory())) {
  for (const f of readdirSync(new URL(`${g.name}/`, root)).filter((n) => n.endsWith('.md'))) {
    test(`${g.name}/${f}: every class it names exists`, () => {
      const md = readFileSync(new URL(`${g.name}/${f}`, root), 'utf8').replace(/```(?:ts|js|typescript|scss)[\s\S]*?```/g, '');
      const missing = new Set();
      for (const m of md.matchAll(/(<)?\b(pp-[a-z0-9_-]*[a-z0-9])\b(-\*)?/g)) {
        if (m[1] || m[3]) continue; // <pp-element> selectors and pp-x-* wildcards
        if (!CLASSES.has(m[2])) missing.add(m[2]);
      }
      assert.equal(missing.size, 0, `${f} names ${[...missing].join(', ')}, which no CSS defines. Add the class, or fix the spec.`);
    });
  }
}
