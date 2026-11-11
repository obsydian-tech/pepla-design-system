// The design system rules, checked in CI:   npm test   (or npm run verify:design for the full list)
// - verify:design finds nothing: no inline style, no raw value, no unknown class, no hand-drawn
//   SVG, no glyph icon, no icon outside the vocabulary, no part of a component outside it
//   (see scripts/verify-design.mjs)
// - every pp- class a component spec names exists in the CSS, so a spec never promises
//   something the system cannot draw (code fences for Angular or PrimeNG config are skipped)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { verify, CLASSES, checkMarkup, checkCss } from './verify-design.mjs';

test('verify:design finds no violations', () => {
  const v = verify();
  assert.equal(v.length, 0, `\n${v.slice(0, 40).map((x) => `${x.file}:${x.line} [${x.rule}] ${x.text}`).join('\n')}\nRun npm run verify:design for the full list.`);
});

// The checker itself: each rule catches what it says it catches, so a green build means something
const rules = (v) => v.map((x) => x.rule).sort();
test('verify:design catches each kind of violation', () => {
  assert.deepEqual(rules(checkMarkup('t.html', '<div class="pp-stack" style="display:flex; gap: 8px"></div>')), ['markup']);
  assert.deepEqual(rules(checkMarkup('t.html', '<div class="pp-stack" style="--_height: 320px"></div>')), []);
  assert.deepEqual(rules(checkMarkup('t.html', '<div class="flex gap-2"></div>')), ['markup', 'markup']);
  assert.deepEqual(rules(checkMarkup('t.html', '<button type="button">Save</button>')), ['markup']);
  assert.deepEqual(rules(checkMarkup('t.html', '<span class="pp-text">✓ Done</span>')), ['icons']);
  assert.deepEqual(rules(checkMarkup('t.html', '<svg viewBox="0 0 4 4"></svg>')), ['icons']);
  assert.deepEqual(rules(checkMarkup('t.html', '<i data-lucide="party-popper"></i>')), ['icons']);
  assert.deepEqual(rules(checkMarkup('t.html', '<div class="pp-card"><div class="pp-form__footer"></div></div>')), ['anatomy']);
  assert.deepEqual(rules(checkMarkup('t.html', '<div class="pp-form"><div class="pp-card"><br><div class="pp-form__footer"></div></div></div>')), []);
  assert.deepEqual(rules(checkCss('t.css', '.pp-x { color: #fff; border-radius: 6px; font-size: 13px; transition: opacity 200ms ease; }')), ['colour', 'motion', 'shape', 'type']);
  assert.deepEqual(rules(checkCss('t.css', '.pp-x { color: var(--color-text); border-radius: var(--radius-small); font: var(--font-body); }')), []);
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
