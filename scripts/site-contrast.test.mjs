// Contrast for the public site tokens (the site is always light, so only the light theme is checked).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { wcagContrast } from 'culori';
import { resolvedThemes } from './build-tokens.mjs';

const T = resolvedThemes().light;
const ratio = (fg, bg) => wcagContrast(T[fg], T[bg]);

test('page text reads on the cream canvas and on every wash', () => {
  for (const bg of ['color.site.canvas', 'color.site.wash.violet', 'color.site.wash.mint', 'color.site.wash.coral']) {
    for (const fg of ['color.text', 'color.text.subtle', 'color.text.brand', 'color.link']) {
      const r = ratio(fg, bg);
      assert.ok(r >= 4.5, `${fg} on ${bg} is ${r.toFixed(2)}:1`);
    }
  }
});

test('code editor text reads on both editor surfaces', () => {
  for (const bg of ['color.site.code.surface', 'color.site.code.surface.raised']) {
    for (const fg of ['text', 'subtle', 'keyword', 'string', 'number', 'key']) {
      const r = ratio(`color.site.code.${fg}`, bg);
      assert.ok(r >= 4.5, `code ${fg} on ${bg} is ${r.toFixed(2)}:1`);
    }
  }
});

test('gradient text stops reach 3:1 (large text) on white and cream', () => {
  const stops = ['1', '2', 'text.3', '4', '5', '6'].map((s) => `color.site.gradient.${s}`);
  for (const bg of ['elevation.surface.raised', 'color.site.canvas']) {
    for (const s of stops) {
      const r = ratio(s, bg);
      assert.ok(r >= 3, `${s} on ${bg} is ${r.toFixed(2)}:1`);
    }
  }
});

test('the brand sky stop is too pale for text, so text never uses it', () => {
  assert.ok(ratio('color.site.gradient.3', 'elevation.surface.raised') < 3);
});

test('form pieces read: pressed chip, pressed slot, confirmation badge and statuses', () => {
  const pairs = [
    ['color.text.selected', 'color.background.selected'], // pressed chip
    ['color.text.inverse', 'color.background.neutral.bold'], // pressed slot
    ['color.text.agent', 'color.background.agent.subtlest'], // badge and "Done"
    ['color.text.brand', 'color.background.brand.subtlest'], // "Booked" and the next-step number
    ['color.text.subtle', 'color.background.neutral'], // "After the call"
    ['color.text', 'color.background.brand.subtlest'], // the call card
    ['color.text.danger', 'elevation.surface.raised'], // an error line on the card
  ];
  for (const [fg, bg] of pairs) {
    const r = ratio(fg, bg);
    assert.ok(r >= 4.5, `${fg} on ${bg} is ${r.toFixed(2)}:1`);
  }
});
