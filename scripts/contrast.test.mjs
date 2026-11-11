// Every text, icon and border token pair the system promises, checked against WCAG 2.2 AA in both themes.
//   npm test
// Text 4.5:1. Large text, icons, input borders and focus rings 3:1 (WCAG 1.4.11).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { wcagContrast, converter, formatHex } from 'culori';
import { readFileSync } from 'node:fs';
import { resolvedThemes, files } from './build-tokens.mjs';
import { onBold } from '../tokens/semantic.mjs';

const themes = resolvedThemes();
const rgb = converter('rgb');
// composite a translucent colour over a solid background
const over = (fg, bg) => {
  const f = rgb(fg), b = rgb(bg);
  const a = f.alpha ?? 1;
  return formatHex({ mode: 'rgb', r: f.r * a + b.r * (1 - a), g: f.g * a + b.g * (1 - a), b: f.b * a + b.b * (1 - a) });
};

const SURFACES = ['elevation.surface', 'elevation.surface.raised', 'elevation.surface.overlay', 'elevation.surface.sunken'];
const TEXT = ['color.text', 'color.text.subtle', 'color.text.subtlest', 'color.text.brand', 'color.text.selected', 'color.text.agent',
  'color.text.warmth', 'color.text.danger', 'color.text.warning', 'color.text.success', 'color.text.information', 'color.link', 'color.link.pressed'];
const ICONS = ['color.icon', 'color.icon.subtle', 'color.icon.brand', 'color.icon.agent', 'color.icon.danger', 'color.icon.warning',
  'color.icon.success', 'color.icon.information', 'color.border.input', 'color.border.focused', 'color.border.bold'];
// each status text must also read on its own subtle wash (a section message, a lozenge)
const ON_WASH = [
  ['color.text', 'color.background.neutral'], ['color.text.subtle', 'color.background.neutral'],
  ['color.text.brand', 'color.background.brand.subtle'], ['color.text.selected', 'color.background.selected'],
  ['color.text.agent', 'color.background.agent.subtle'], ['color.text.agent', 'color.background.agent.subtlest'],
  ['color.text.warmth', 'color.background.warmth.subtle'],
  ['color.text.danger', 'color.background.danger.subtle'], ['color.text.warning', 'color.background.warning.subtle'],
  ['color.text.success', 'color.background.success.subtle'], ['color.text.information', 'color.background.information.subtle'],
  ['color.text', 'color.background.danger.subtle'], ['color.text', 'color.background.warning.subtle'],
  ['color.text', 'color.background.success.subtle'], ['color.text', 'color.background.information.subtle'],
  ['color.text', 'color.background.agent.subtle'],
];
const ACCENTS = ['blue', 'sky', 'green', 'lime', 'yellow', 'amber', 'red', 'magenta', 'violet', 'gray'];

for (const [theme, T] of Object.entries(themes)) {
  const ratio = (fg, bg) => wcagContrast(over(T[fg] ?? fg, T[bg] ?? bg), T[bg] ?? bg);

  test(`${theme}: text tokens reach 4.5:1 on every surface`, () => {
    for (const s of SURFACES) for (const t of TEXT) {
      const r = ratio(t, s);
      assert.ok(r >= 4.5, `${t} on ${s} is ${r.toFixed(2)}:1 (${T[t]} on ${T[s]})`);
    }
  });

  test(`${theme}: icons, input borders and focus ring reach 3:1 on every surface`, () => {
    for (const s of SURFACES) for (const t of ICONS) {
      const r = ratio(t, s);
      assert.ok(r >= 3, `${t} on ${s} is ${r.toFixed(2)}:1`);
    }
  });

  test(`${theme}: labels on bold fills reach 4.5:1`, () => {
    for (const [bg, fg] of Object.entries(onBold[theme])) for (const state of ['', '.hovered', '.pressed']) {
      if (!(bg + state in T)) continue;
      const r = ratio(fg, bg + state);
      assert.ok(r >= 4.5, `${fg} on ${bg}${state} is ${r.toFixed(2)}:1 (${T[fg]} on ${T[bg + state]})`);
    }
  });

  test(`${theme}: status text reads on its own wash`, () => {
    for (const [fg, bg] of ON_WASH) {
      const r = ratio(fg, bg);
      assert.ok(r >= 4.5, `${fg} on ${bg} is ${r.toFixed(2)}:1`);
    }
  });

  test(`${theme}: accent text reads on its subtler wash (tags, avatars)`, () => {
    for (const a of ACCENTS) {
      const r = ratio(`color.text.accent.${a}`, `color.background.accent.${a}.subtler`);
      assert.ok(r >= 4.5, `accent ${a}: ${r.toFixed(2)}:1`);
    }
  });

  test(`${theme}: danger never looks like coral (lightness differs, rule 3)`, () => {
    const lab = converter('oklch');
    const d = Math.abs(lab(T['color.background.danger.bold']).l - lab(T['color.background.warmth.bold']).l);
    const hue = Math.abs(lab(T['color.background.danger.bold']).h - lab(T['color.background.warmth.bold']).h);
    assert.ok(d >= 0.08 || hue >= 25, `danger.bold and warmth.bold are too close (ΔL ${d.toFixed(3)}, Δh ${hue.toFixed(1)})`);
  });
}

test('generated CSS in project/tokens matches the token source', () => {
  for (const [name, text] of Object.entries(files)) {
    const onDisk = readFileSync(new URL(`../project/tokens/${name}`, import.meta.url), 'utf8');
    assert.equal(onDisk, text, `project/tokens/${name} is stale. Run npm run tokens.`);
  }
});
