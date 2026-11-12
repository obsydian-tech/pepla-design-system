#!/usr/bin/env node
// Enforces the Naleko People design system inside this repo, the way One Link's verify:design does in
// its app. Runs in `npm test` (scripts/verify-design.test.mjs) and on its own:
//
//   npm run verify:design
//
// It reads component CSS, component examples and UI kit screens, and fails, with file:line, on:
//   colour   any hex, rgb(), hsl(), oklch(), hwb() or named colour; a palette step (--palette-*)
//   type     a font family, font size, weight, line height or letter spacing that is not a token
//   shape    a border radius that is not a --radius-* token (or 0 / 50%)
//   motion   a literal easing (cubic-bezier, linear()) or duration; use --motion-*
//   layers   a z-index above 1 that is not a --layer-* token
//   markup   a static style="" (only component inputs, --_name: value, may be set inline);
//            a <style> or <script> block; a class that is not a pp- class a component defines;
//            a <button>, <input>, <select>, <textarea> or <table> without a pp- class
//   icons    a hand-written <svg> (icons are <i data-lucide>, the mark is <i data-pepla-mark>);
//            a glyph or emoji standing in for an icon; an arrow used as an icon; a Lucide icon
//            that is not in the readme's Iconography table
//
// Comments are ignored. There is no escape hatch: change the system, not the check.
import { audit as calm } from './calm-audit.mjs';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const P = join(ROOT, 'project');

const walk = (dir) => readdirSync(dir).flatMap((n) => {
  const p = join(dir, n);
  return statSync(p).isDirectory() ? walk(p) : [p];
});
const blank = (m) => m.replace(/[^\n]/g, ' ');
const lineOf = (text, i) => text.slice(0, i).split('\n').length;

// ------------------------------------------------------------------ vocabularies
const readme = readFileSync(join(P, 'readme.md'), 'utf8');
const iconSection = readme.split('## Iconography')[1].split('\n## ')[0];
export const VOCAB = new Set([...iconSection.matchAll(/`([a-z0-9-]+)`/g)].map((m) => m[1]).filter((n) => !n.startsWith('-')));

const componentCss = walk(join(P, 'components')).filter((f) => f.endsWith('.css'));
const cssSources = [...componentCss, join(P, 'tokens', 'base.css'), join(P, 'tokens', 'typography.css')];
export const CLASSES = new Set(cssSources.flatMap((f) => [...readFileSync(f, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/\.(pp-[a-z0-9_-]+)/g)].map((m) => m[1])));

// ------------------------------------------------------------------ patterns
const HEX = /#[0-9a-fA-F]{3}(?:[0-9a-fA-F]{1}|[0-9a-fA-F]{3}|[0-9a-fA-F]{5})?(?![0-9a-zA-Z_-])/;
const COLOR_FN = /\b(?:rgba?|hsla?|oklch|oklab|lab|lch|hwb)\(/;
const NAMED_COLOR = /(?:^|[\s:,(])(?:white|black|red|green|blue|gray|grey|orange|yellow|purple|pink|brown|navy|silver|gold|teal|maroon|olive|lime|aqua|fuchsia)(?=[\s;,)!]|$)/i;
const ICON_GLYPHS = /[✓✔✗✘✕✖⚠⛔●○◉◐◑◒◓◷◇◆■□▣▪▫▲△▼▽▶▷◀◁▸▹▾▿▴▵▬✦✧★☆✎✏✐↺↻⟳⟲ⓘℹ⇄⇆↔↕☰⋮⋯]|(?![©®™])\p{Extended_Pictographic}/u;
const ARROW = '[←→↑↓⇐⇒]';
const ARROWS = [
  new RegExp(`<[a-zA-Z][^>]*>\\s*${ARROW}\\s*</`),
  new RegExp(`<[a-zA-Z][^>]*>\\s*${ARROW}\\s+\\S`),
  new RegExp(`\\S\\s+${ARROW}\\s*</`),
  new RegExp(`^\\s*${ARROW}(\\s|$)`),
];
const ENTITIES = { larr: '←', rarr: '→', uarr: '↑', darr: '↓', harr: '↔', check: '✓', cross: '✗', rsaquo: '›', raquo: '»', laquo: '«', dtrif: '▾', rtrif: '▸' };
const decode = (s) => s
  .replace(/&#x([0-9a-f]+);/gi, (m, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (m, d) => String.fromCodePoint(Number(d)))
  .replace(/&([a-zA-Z]+);/g, (m, n) => ENTITIES[n] ?? m);
const TOKEN = (prefix) => new RegExp(`^(?:inherit|var\\(--${prefix}[\\w-]*\\)|var\\(--_[\\w-]+(?:,\\s*var\\(--${prefix}[\\w-]*\\))?\\))$`);

// ------------------------------------------------------------------ checks
export function checkCss(file, raw) {
  const out = [];
  const report = (line, rule, text) => out.push({ file, line, rule, text: String(text).trim().slice(0, 160) });
  const body = raw.replace(/\/\*[\s\S]*?\*\//g, blank);
  for (const m of body.matchAll(/(^|[;{\s])(-?-?[a-zA-Z][\w-]*)\s*:\s*([^;{}]+?)\s*(?=;|}|$)/gm)) {
    const prop = m[2].toLowerCase();
    const value = m[3].trim();
    if (!value || /^[&.#:@]/.test(prop) || /^(?:hover|focus|active|not|is|has|where|before|after|first|last|nth|checked|disabled|focus-visible|focus-within|root|placeholder|empty|only|marker|selection|indeterminate|invalid|read-only|target|visited|link|any-link)$/.test(prop)) continue;
    const line = lineOf(body, m.index + m[1].length);
    const decl = `${prop}: ${value}`;
    if (HEX.test(value) || COLOR_FN.test(value)) report(line, 'colour', decl);
    if (!prop.startsWith('--') && NAMED_COLOR.test(` ${value}`) && !/^(?:font|grid|animation|transition|will-change|content|list-style)/.test(prop)) report(line, 'colour', decl);
    if (/--palette-/.test(value)) report(line, 'colour', `palette step, use a semantic token: ${decl}`);

    if (prop === 'font-family' && !TOKEN('font-family').test(value)) report(line, 'type', decl);
    if (prop === 'font' && !TOKEN('font-').test(value)) report(line, 'type', `use font: var(--font-*): ${decl}`);
    if (prop === 'font-size' && !/^(?:inherit|\d*\.?\d+em|var\(--[\w-]+\)|calc\(.*var\(--.*\))$/.test(value)) report(line, 'type', decl);
    if (prop === 'font-weight' && !/^(?:inherit|var\(--font-weight-[\w-]+\))$/.test(value)) report(line, 'type', `use var(--font-weight-*): ${decl}`);
    if (prop === 'line-height' && !/^(?:inherit|normal|0|1|var\(--[\w-]+\))$/.test(value)) report(line, 'type', decl);
    if (prop === 'letter-spacing' && !/^(?:inherit|0|normal|var\(--[\w-]+\))$/.test(value)) report(line, 'type', decl);

    if (/^border(?:-[a-z]+)*-radius$/.test(prop)) {
      const ok = value.split(/\s+(?![^(]*\))/).every((v) => /^(?:0|50%|inherit|var\(--radius-[\w-]+\)|var\(--_[\w-]+(?:,\s*var\(--radius-[\w-]+\))?\))$/.test(v));
      if (!ok) report(line, 'shape', `use var(--radius-*): ${decl}`);
    }
    if (/cubic-bezier\(|\blinear\(/.test(value)) report(line, 'motion', `use var(--motion-easing-*): ${decl}`);
    if (/^(?:transition|transition-duration|transition-delay|animation|animation-duration|animation-delay)$/.test(prop) && /(?:^|[\s,])\d*\.?\d+m?s\b/.test(value.replace(/var\([^)]*\)/g, ''))) report(line, 'motion', `use var(--motion-duration-*): ${decl}`);
    if (prop === 'z-index' && !/^(?:-1|0|1|auto|var\(--layer-[\w-]+\))$/.test(value)) report(line, 'layers', `use var(--layer-*): ${decl}`);
  }
  return out;
}

export function checkMarkup(file, raw) {
  const out = [];
  const report = (line, rule, text) => out.push({ file, line, rule, text: String(text).trim().slice(0, 160) });
  const html = raw.replace(/<!--[\s\S]*?-->/g, blank);
  html.split('\n').forEach((l, i) => {
    const text = decode(l);
    if (ICON_GLYPHS.test(text)) report(i + 1, 'icons', `glyph or emoji icon, use <i data-lucide>: ${text.match(ICON_GLYPHS)[0]}`);
    if (ARROWS.some((r) => r.test(text))) report(i + 1, 'icons', 'arrow used as an icon, use <i data-lucide="arrow-…">');
    if (HEX.test(text.replace(/&#x?[0-9a-f]+;/gi, '')) || COLOR_FN.test(text)) report(i + 1, 'colour', 'raw colour in markup');
  });
  for (const m of html.matchAll(/<(style|script)\b/g)) report(lineOf(html, m.index), 'markup', `<${m[1]}> block; components own their CSS, kits carry none`);
  for (const m of html.matchAll(/<svg\b/g)) report(lineOf(html, m.index), 'icons', 'hand-written <svg>; use <i data-lucide="…"> or the mark <i data-pepla-mark></i>');
  for (const m of html.matchAll(/\sstyle="([^"]*)"/g)) {
    const decls = m[1].split(';').map((d) => d.trim()).filter(Boolean);
    const bad = decls.filter((d) => !/^--_[\w-]+\s*:\s*[^;]+$/.test(d));
    if (bad.length) report(lineOf(html, m.index), 'markup', `static style="${bad.join(';').slice(0, 80)}"; use a layout or component class (only --_inputs may be set inline)`);
    for (const d of decls) {
      const v = d.split(':').slice(1).join(':').trim();
      if (/--palette-/.test(v)) report(lineOf(html, m.index), 'colour', `palette step in ${d}`);
    }
  }
  for (const m of html.matchAll(/\sclass="([^"]*)"/g)) {
    for (const c of m[1].split(/\s+/).filter(Boolean)) {
      if (!c.startsWith('pp-')) report(lineOf(html, m.index), 'markup', `class "${c}" is not a Naleko People class`);
      else if (!CLASSES.has(c)) report(lineOf(html, m.index), 'markup', `class "${c}" is not defined by any component`);
    }
  }
  for (const m of html.matchAll(/<(button|input|select|textarea|table)\b([^>]*)>/g)) {
    const cls = (m[2].match(/\sclass="([^"]*)"/) || [, ''])[1].split(/\s+/).filter((c) => c.startsWith('pp-'));
    if (!cls.length) report(lineOf(html, m.index), 'markup', `<${m[1]}> without a pp- class`);
  }
  // Anatomy: an element (pp-block__part) only appears inside its block (pp-block), so a part is never
  // borrowed for another meaning and inherits the block's inputs. A missing root is a missing component.
  const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
  const open = [];
  for (const m of html.matchAll(/<(\/?)([a-zA-Z][\w-]*)\b((?:[^>"]|"[^"]*")*)>/g)) {
    const [, close, tag, attrs] = m;
    if (close) { if (!VOID.has(tag.toLowerCase())) open.pop(); continue; }
    const cls = ((attrs.match(/\sclass="([^"]*)"/) || [, ''])[1]).split(/\s+/).filter((c) => c.startsWith('pp-'));
    const blocks = new Set(cls.filter((c) => !c.includes('__')).map((c) => c.split('--')[0]));
    const inside = (b) => blocks.has(b) || open.some((o) => o.has(b));
    for (const c of cls) {
      const i = c.indexOf('__');
      if (i > 0 && !inside(c.slice(0, i))) report(lineOf(html, m.index), 'anatomy', `"${c}" outside its block: put it inside a .${c.slice(0, i)}, or use the component that means this`);
    }
    if (!VOID.has(tag.toLowerCase()) && !attrs.trim().endsWith('/')) open.push(blocks);
  }
  for (const m of html.matchAll(/data-lucide="([a-z0-9-]+)"/g)) {
    if (!VOCAB.has(m[1])) report(lineOf(html, m.index), 'icons', `"${m[1]}" is not in the readme's icon vocabulary`);
  }
  return out;
}

export function verify() {
  const violations = [];
  for (const f of componentCss) violations.push(...checkCss(relative(ROOT, f), readFileSync(f, 'utf8')));
  const markup = [
    ...walk(join(P, 'components')).filter((f) => f.endsWith('.examples.html')),
    ...walk(join(P, 'ui_kits')).filter((f) => f.endsWith('.html')),
  ];
  for (const f of markup) violations.push(...checkMarkup(relative(ROOT, f), readFileSync(f, 'utf8')));
  // Calm screens (readme): how much is on a kit screen, not only what it is made of.
  for (const c of calm()) violations.push({ file: c.file, line: c.screen, rule: `calm:${c.rule}`, text: c.msg });
  return violations;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const v = verify();
  if (v.length) {
    const byRule = v.reduce((a, x) => ({ ...a, [x.rule]: (a[x.rule] || 0) + 1 }), {});
    console.error(`\nNaleko People design system: ${v.length} violation(s) ${JSON.stringify(byRule)}\n`);
    console.error(v.map((x) => `${x.file}:${x.line}  [${x.rule}]\n      ${x.text}`).join('\n'));
    console.error('\nEverything visual comes from the design system. See project/readme.md, "The only way to build UI".\n');
    process.exit(1);
  }
  console.log('Naleko People design system: no violations.');
}
