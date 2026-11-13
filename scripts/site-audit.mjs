#!/usr/bin/env node
// Checks that only apply to the public site layer (project/components/site/ and any site kit page):
//   site:motion   a keyframe or transition that animates anything but transform, translate, rotate, scale or opacity
//   site:words    words the site never uses: "AI Agent", "work email", "Midrand", "Pepla", an em dash
//   site:names    a sample person other than John Doe (employee) and Jane Smith (HR)
// Runs inside verify:design and on its own:   node scripts/site-audit.mjs
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const P = join(ROOT, 'project');
const lineOf = (t, i) => t.slice(0, i).split('\n').length;
const strip = (css) => css.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '));

export const ALLOWED_ANIMATED = ['transform', 'translate', 'rotate', 'scale', 'opacity'];
// The sample people the platform kits use. The site uses John Doe and Jane Smith, and "Candidate N" or "Employee N".
export const OTHER_SAMPLE_NAMES = ['Thandeka', 'Sipho', 'Lerato', 'Kagiso', 'Bongani', 'Nomvula', 'Thabo', 'Tariro', 'Ayanda', 'Kudzai', 'Sizwe', 'Thembeka', 'Nomsa'];
const BANNED = [[/AI Agent/i, 'AI Agent (say Ask Batsi)'], [/work e-?mail/i, 'work email (the field is "Email")'], [/Midrand/, 'Midrand'], [/Pepla/, 'Pepla'], [/—/, 'an em dash']];

export function checkSiteCss(file, raw) {
  const out = [];
  const report = (line, rule, text) => out.push({ file, line, rule, text });
  const css = strip(raw);
  for (const k of css.matchAll(/@keyframes\s+[\w-]+\s*\{((?:[^{}]|\{[^{}]*\})*)\}/g)) {
    for (const d of k[1].matchAll(/([\w-]+)\s*:\s*[^;{}]+(?=;|\})/g)) {
      if (!ALLOWED_ANIMATED.includes(d[1])) report(lineOf(css, k.index + k[0].indexOf(d[0])), 'site:motion', `keyframe animates "${d[1]}": only ${ALLOWED_ANIMATED.join(', ')}`);
    }
  }
  for (const m of css.matchAll(/(^|[;{\s])(transition(?:-property)?)\s*:\s*([^;{}]+)/gm)) {
    const value = m[3].replace(/\([^()]*(?:\([^()]*\)[^()]*)*\)/g, ' ');
    const props = value.split(',').map((x) => x.trim().split(/\s+/)[0]).filter(Boolean);
    for (const p of props) {
      if (p === 'none' || /^[\d.]/.test(p)) continue;
      if (!ALLOWED_ANIMATED.includes(p)) report(lineOf(css, m.index + m[1].length), 'site:motion', `transition on "${p}": only ${ALLOWED_ANIMATED.join(', ')}`);
    }
  }
  return out;
}

export function checkSiteCopy(file, raw) {
  const out = [];
  const html = raw.replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, ' '));
  const visible = html.replace(/<(?:script|style)[\s\S]*?<\/(?:script|style)>/g, (m) => m.replace(/[^\n]/g, ' ')).replace(/<[^>]+>/g, (m) => m.replace(/[^\n]/g, ' '));
  for (const [re, what] of BANNED) for (const m of visible.matchAll(new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g'))) out.push({ file, line: lineOf(visible, m.index), rule: 'site:words', text: `${what}: "${m[0]}"` });
  for (const n of OTHER_SAMPLE_NAMES) for (const m of visible.matchAll(new RegExp(`\\b${n}\\b`, 'g'))) out.push({ file, line: lineOf(visible, m.index), rule: 'site:names', text: `sample name "${n}": the site names only John Doe and Jane Smith` });
  return out;
}

const walk = (d) => (existsSync(d) ? readdirSync(d).flatMap((n) => { const p = join(d, n); return statSync(p).isDirectory() ? walk(p) : [p]; }) : []);

export function auditSite() {
  const v = [];
  for (const f of walk(join(P, 'components', 'site'))) {
    const rel = relative(ROOT, f);
    const raw = readFileSync(f, 'utf8');
    if (f.endsWith('.css')) v.push(...checkSiteCss(rel, raw));
    if (f.endsWith('.examples.html') || f.endsWith('.md')) v.push(...checkSiteCopy(rel, f.endsWith('.md') ? raw.replace(/^---[\s\S]*?---/, '') : raw));
  }
  for (const f of walk(join(P, 'ui_kits')).filter((x) => /\/site-[^/]*\.(html|md)$/.test(x))) v.push(...checkSiteCopy(relative(ROOT, f), readFileSync(f, 'utf8')));
  return v;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const v = auditSite();
  if (v.length) { console.error(v.map((x) => `${x.file}:${x.line}  [${x.rule}]\n      ${x.text}`).join('\n')); process.exit(1); }
  console.log('Public site checks: no violations.');
}
