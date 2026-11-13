#!/usr/bin/env node
// UI kits: project/ui_kits/<kit>.{md,html}
//   <kit>.md   frontmatter (name, device, order, source) + what the kit shows and which screens it redraws
//   <kit>.html one <section data-screen="Title" data-device="desktop|phone"> per screen, built only
//              from pp- classes (components) and tokens; no kit-only CSS
// Writes dist/ui-kits/<kit>.html (one page per kit) and dist/kits.html (every kit on one page).
// Run after scripts/site.mjs.
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs';
import { marked } from 'marked';
import { inlineIcons, esc } from './lib.mjs';
import { frontmatter } from './components.mjs';

const ROOT = new URL('..', import.meta.url);
const SRC = new URL('project/ui_kits/', ROOT);

export function loadKits() {
  if (!existsSync(SRC)) return [];
  return readdirSync(SRC).filter((f) => f.endsWith('.md')).map((f) => {
    const slug = f.slice(0, -3);
    const [meta, body] = frontmatter(readFileSync(new URL(f, SRC), 'utf8'));
    const htmlPath = new URL(`${slug}.html`, SRC);
    const html = existsSync(htmlPath) ? readFileSync(htmlPath, 'utf8') : '';
    const screens = [...html.matchAll(/<section data-screen="([^"]+)" data-device="(desktop|phone)">([\s\S]*?)<\/section>\s*(?=<section data-screen=|$)/g)]
      .map(([, title, device, inner]) => ({ title, device, inner }));
    return { slug, meta, body, html, screens };
  }).sort((a, b) => Number(a.meta.order || 99) - Number(b.meta.order || 99));
}

const CSS = `
body{margin:0;background:var(--elevation-surface-sunken)}
.kwrap{max-width:1440px;margin:0 auto;padding:var(--space-300) var(--layout-gutter-phone) var(--space-1000)}
@media (min-width:768px){.kwrap{padding-left:var(--layout-gutter-desktop);padding-right:var(--layout-gutter-desktop)}}
.kbar{display:flex;flex-wrap:wrap;gap:var(--space-150);align-items:center;justify-content:space-between;margin-bottom:var(--space-300)}
.kdoc h1{font:var(--font-heading-xxlarge);letter-spacing:var(--font-heading-xxlarge-tracking);margin:0 0 var(--space-100)}
.kdoc h2.kname{font:var(--font-heading-xlarge);margin:var(--space-800) 0 var(--space-100)}
.kdoc p,.kdoc li{max-width:var(--layout-reading-max);font:var(--font-body-large);color:var(--color-text-subtle)}
.kdoc code{font:var(--font-code);font-size:12px;background:var(--color-background-neutral);padding:1px 4px;border-radius:var(--radius-xsmall)}
.ktoc{display:flex;flex-wrap:wrap;gap:var(--space-075);margin:var(--space-200) 0}
.ktoc a{display:inline-flex;min-height:32px;align-items:center;padding:0 var(--space-150);border-radius:var(--radius-full);background:var(--color-background-neutral);color:var(--color-text);text-decoration:none;font:var(--font-label)}
.kscreen{margin:var(--space-400) 0}
.kscreen > .klbl{display:flex;gap:var(--space-100);align-items:center;font:var(--font-heading-xsmall);color:var(--color-text-subtle);margin:0 0 var(--space-100)}
.kframe{background:var(--elevation-surface);color:var(--color-text);border:var(--border-width) solid var(--color-border);border-radius:var(--radius-large);overflow:auto;box-shadow:var(--elevation-shadow-raised)}
.kframe--desktop{width:100%;max-width:1280px;min-height:720px;overflow:hidden}
.kframe--phone{width:390px;max-width:100%;min-height:780px;border-radius:var(--radius-xlarge)}
.kframe > *{min-height:inherit}
`;
const THEME = `<button class="pp-button pp-button--default pp-button--small" type="button" id="ktheme" aria-pressed="false">Dark theme</button>
<script>(()=>{const b=document.getElementById('ktheme');b.addEventListener('click',()=>{const d=document.documentElement.getAttribute('data-theme')!=='dark';document.documentElement.setAttribute('data-theme',d?'dark':'light');b.setAttribute('aria-pressed',String(d));});})();</script>`;

const page = (title, body, up) => `<!doctype html>
<html lang="en" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} · Naleko People design system</title>
<link rel="icon" href="${up}assets/pepla-mark.svg">
<link rel="stylesheet" href="${up}styles.css">
<style>${CSS}</style>
</head>
<body>
<div class="kwrap">${body}</div>
</body>
</html>
`;

const kitHtml = (k, h = 'h1', cls = '') => `<section class="kdoc" id="${k.slug}"><${h}${cls}>${esc(k.meta.name)}</${h}>${marked.parse(k.body.replace(/^\s*# .+\n/, ''))}</section>` +
  k.screens.map((s) => `<div class="kscreen"><div class="klbl">${esc(s.title)} <span class="pp-lozenge">${s.device === 'phone' ? 'Phone' : 'Desktop'}</span></div><div class="kframe kframe--${s.device}">${s.inner}</div></div>`).join('');

// A kit whose frontmatter names a preview script gets it appended to its page. The script lives in scripts/preview/
// and only drives the live frames on the kit page (scroll, menu, sheet). It is never part of a component or the site.
const previewScript = (kits) => [...new Set(kits.flatMap((k) => String(k.meta.preview || '').split(',').map((n) => n.trim())).filter(Boolean))]
  .map((n) => `<script>${readFileSync(new URL(`scripts/preview/${n}.js`, ROOT), 'utf8')}</script>`).join('\n');

export function buildKits(kits, DIST) {
  const out = new URL('ui-kits/', DIST);
  mkdirSync(out, { recursive: true });
  for (const k of kits) {
    writeFileSync(new URL(`${k.slug}.html`, out), page(k.meta.name, inlineIcons(`<div class="kbar"><a href="../kits.html">All UI kits</a>${THEME}</div>` + kitHtml(k)) + previewScript([k]), '../'));
  }
  const toc = `<nav class="ktoc" aria-label="Kits">${kits.map((k) => `<a href="#${k.slug}">${esc(k.meta.name)}</a>`).join('')}</nav>`;
  const intro = `<section class="kdoc"><h1>Naleko People UI kits</h1><p>Today's TalentFlow and Onboarding screens, redrawn only from Naleko People components and tokens: same content and flow, new look. ${kits.reduce((n, k) => n + k.screens.length, 0)} screens in ${kits.length} kits. Use the theme button to see them in dark. Components and foundations: <a href="components.html">all components</a>, <a href="index.html">foundations</a>.</p>${toc}</section>`;
  writeFileSync(new URL('kits.html', DIST), page('UI kits', inlineIcons(`<div class="kbar"><span></span>${THEME}</div>` + intro + kits.map((k) => kitHtml(k, 'h2', ' class="kname"')).join('')) + previewScript(kits), ''));
}

if (process.argv[1]?.endsWith('kits.mjs')) {
  const kits = loadKits();
  const DIST = new URL('dist/', ROOT);
  if (existsSync(DIST)) buildKits(kits, DIST);
  console.log(`${kits.length} UI kits, ${kits.reduce((n, k) => n + k.screens.length, 0)} screens`);
}
