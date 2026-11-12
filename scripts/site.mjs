#!/usr/bin/env node
// Builds the published site into dist/: project/ copied as is, plus dist/index.html,
// the foundations page. Every table on it is generated from tokens/, so the page cannot
// disagree with the CSS.   npm run build   then open dist/index.html
import { cpSync, rmSync, writeFileSync, readFileSync } from 'node:fs';
import { wcagContrast } from 'culori';
import { resolvedThemes, palette } from './build-tokens.mjs';
import { light as lightSrc } from '../tokens/semantic.mjs';
import * as F from '../tokens/foundations.mjs';
import { icon, inlineIcons } from './lib.mjs';

const ROOT = new URL('..', import.meta.url);
const DIST = new URL('dist/', ROOT);
rmSync(DIST, { recursive: true, force: true });
cpSync(new URL('project/', ROOT), DIST, { recursive: true });

const { light: L, dark: D } = resolvedThemes();
const v = (k) => `var(--${k.replace(/\./g, '-')})`;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const ratio = (fg, bg) => wcagContrast(fg, bg).toFixed(1);

// ---------- rules, parsed from the readme so they cannot drift
const readme = readFileSync(new URL('project/readme.md', ROOT), 'utf8');
const rules = [...readme.split('## The rules that govern everything')[1].split('## ')[0].matchAll(/^\d+\.\s+\*\*(.+?)\*\*\s*(.*)$/gm)].map((m) => [m[1], m[2]]);
const iconSection = readme.split('## Iconography')[1].split('\n## ')[0];
const iconRe = /^\| (.+?) \| `(.+?)`(?: \/ `(.+?)`)? \|$/gm;
const iconGroups = iconSection.split(/^\*\*(.+?)\*\*$/m).slice(1).reduce((acc, part, i, arr) => (i % 2 ? acc : [...acc, [part, [...arr[i + 1].matchAll(iconRe)].map((m) => [m[1], m[2], m[3]])]]), []);
const icons = iconGroups.flatMap(([, rows]) => rows);

// ---------- colour role tables
const groups = [
  ['Text', (k) => k.startsWith('color.text') && !k.includes('accent') || k.startsWith('color.link')],
  ['Icons', (k) => k.startsWith('color.icon') && !k.includes('accent')],
  ['Borders', (k) => k.startsWith('color.border')],
  ['Backgrounds', (k) => k.startsWith('color.background') && !k.includes('accent')],
  ['Surfaces', (k) => k.startsWith('elevation.surface')],
  ['Brand marks and overlays', (k) => k.startsWith('color.brand') || k.startsWith('color.blanket') || k.startsWith('color.skeleton')],
];
const swatch = (hex) => `<span class="sw" style="background:${hex}"></span>`;
const roleRows = (pred) => Object.keys(L).filter(pred).map((k) => {
  const isText = k.startsWith('color.text') || k.startsWith('color.link');
  const cl = isText ? `<span class="cr">${ratio(L[k], L['elevation.surface.raised'])}:1</span>` : '';
  const cd = isText ? `<span class="cr">${ratio(D[k], D['elevation.surface.raised'])}:1</span>` : '';
  return `<tr><td><code>--${k.replace(/\./g, '-')}</code></td><td>${swatch(L[k])}<code>${L[k]}</code>${cl}<br><small>${esc(lightSrc[k])}</small></td><td>${swatch(D[k])}<code>${D[k]}</code>${cd}</td></tr>`;
}).join('');
const roleTables = groups.map(([t, p]) => `<details ${t === 'Text' ? 'open' : ''}><summary>${t}</summary><div class="tw"><table><thead><tr><th>Token</th><th>Light</th><th>Dark</th></tr></thead><tbody>${roleRows(p)}</tbody></table></div></details>`).join('');

const ramps = Object.entries(palette).map(([n, steps]) => `<div class="ramp"><div class="rn">${n}</div>${Object.entries(steps).map(([s, h]) =>
  `<div class="st" style="background:${h};color:${wcagContrast(h, '#fff') >= 4.5 ? '#fff' : '#1b1640'}" title="${n}.${s} ${h}"><b>${s}</b><span>${h}</span></div>`).join('')}</div>`).join('');

const accentNames = ['blue', 'sky', 'green', 'lime', 'yellow', 'amber', 'red', 'magenta', 'violet', 'gray'];
const accents = accentNames.map((a) => `<span class="lz" style="background:${v(`color.background.accent.${a}.subtler`)};color:${v(`color.text.accent.${a}`)}">${a}</span>`).join('');

const typeRows = Object.entries(F.type).map(([n, [w, s, l, t, f]]) => {
  const c = n.replace(/\./g, '-');
  const sample = n.startsWith('metric') ? 'R 18 500' : n.startsWith('display') ? 'People admin, done.' : n === 'code' ? 'POST /core/v1/people' : n === 'label.small' ? 'The 20-second pitch' : 'Thandeka starts on Monday';
  return `<tr><td><div style="font:var(--font-${c});letter-spacing:var(--font-${c}-tracking);${n === 'label.small' ? 'text-transform:uppercase;' : ''}${n.startsWith('metric') ? 'font-variant-numeric:tabular-nums;' : ''}">${sample}</div></td><td><code>--font-${c}</code><br><small>${f === 'display' ? 'Manrope' : f === 'code' ? 'Mono' : 'Inter'} ${w}, ${s}/${l}, ${t}</small></td></tr>`;
}).join('');

const spaceRows = Object.entries(F.space).map(([k, val]) => `<tr><td><code>--${k.replace('.', '-')}</code></td><td>${val}</td><td><span class="bar" style="width:${val}"></span></td></tr>`).join('');
const radiusCells = Object.entries(F.shape).filter(([k]) => k.startsWith('radius')).map(([k, val]) => `<div class="rad"><div style="border-radius:${val}"></div><code>--${k.replace('.', '-')}</code><small>${val}</small></div>`).join('');
const shadowCells = Object.keys(F.shadows.light).map((k) => `<div class="sh" style="box-shadow:${v(k)}"><code>--${k.replace(/\./g, '-')}</code></div>`).join('');
const motionRows = Object.entries(F.motion).map(([k, val]) => `<tr><td><code>--${k.replace(/\./g, '-')}</code></td><td><code>${val}</code></td></tr>`).join('');
const layoutRows = Object.entries(F.layout).map(([k, val]) => `<tr><td><code>--${k.replace(/\./g, '-')}</code></td><td>${val}</td></tr>`).join('');
const iconCard = ([m, a, b]) => `<div class="ic"><span><i data-lucide="${a}"></i>${b ? `<i data-lucide="${b}"></i>` : ''}</span><b>${esc(m)}</b><code>${a}${b ? ` / ${b}` : ''}</code></div>`;
const iconRows = iconGroups.map(([g, rows]) => `<h3>${esc(g)}</h3><div class="ics">${rows.map(iconCard).join('')}</div>`).join('');

const mark = (vio) => `<svg viewBox="0 0 76 64" aria-hidden="true"><circle cx="20" cy="38" r="18" fill="#ff7a59"/><circle cx="38" cy="24" r="18" fill="${vio}"/><circle cx="56" cy="38" r="18" fill="#2bb3a3"/></svg>`;

let html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Naleko People design system</title>
<link rel="icon" href="assets/pepla-mark.svg">
<link rel="stylesheet" href="styles.css">
<style>
body{margin:0}
.wrap{max-width:var(--layout-content-max);margin:0 auto;padding:var(--space-400) var(--layout-gutter-phone) var(--space-1000)}
@media (min-width:768px){.wrap{padding-left:var(--layout-gutter-desktop);padding-right:var(--layout-gutter-desktop)}}
header.top{display:flex;align-items:center;gap:var(--space-150);flex-wrap:wrap}
.lock{display:flex;align-items:center;gap:var(--space-150)}
.lock svg{width:48px;height:40px}
.word{display:inline-grid;gap:8px;font:800 40px/1 var(--font-family-display);letter-spacing:-1.5px;color:var(--color-text)}.word .people{color:var(--color-brand-violet)}.word .maker{font:600 13px/1 var(--font-family-display);letter-spacing:.28em;text-transform:uppercase;color:var(--color-text-subtle)}
.mark-dark{display:none}
[data-theme="dark"] .mark-light{display:none}[data-theme="dark"] .mark-dark{display:inline}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .mark-light{display:none}:root:not([data-theme="light"]) .mark-dark{display:inline}}
.spacer{flex:1}
.btn{display:inline-flex;align-items:center;gap:var(--space-100);min-height:var(--size-touch-target);padding:0 var(--space-250);border-radius:var(--radius-full);border:var(--border-width) solid var(--color-border-bold);background:var(--elevation-surface-raised);color:var(--color-text);font:var(--font-label);cursor:pointer}
.btn:hover{background:var(--elevation-surface-raised-hovered)}
.btn.primary{background:var(--color-background-brand-bold);color:var(--color-text-inverse);border-color:transparent}
.btn.primary:hover{background:var(--color-background-brand-bold-hovered)}
.btn.agent{background:var(--color-background-agent-bold);color:var(--color-text-inverse);border-color:transparent}
.btn.danger{background:var(--color-background-danger-bold);color:var(--color-text-inverse);border-color:transparent}
.btn svg{width:var(--size-icon-small);height:var(--size-icon-small)}
h1{font:var(--font-display);letter-spacing:var(--font-display-tracking);margin:var(--space-500) 0 var(--space-150)}
h2{font:var(--font-heading-xlarge);letter-spacing:var(--font-heading-xlarge-tracking);margin:var(--space-800) 0 var(--space-150);scroll-margin-top:var(--space-300)}
h3{font:var(--font-heading-medium);letter-spacing:var(--font-heading-medium-tracking);margin:var(--space-400) 0 var(--space-100)}
.lead{font:var(--font-body-large);color:var(--color-text-subtle);max-width:var(--layout-reading-max);margin:0}
p{max-width:var(--layout-reading-max)}
nav.toc{display:flex;flex-wrap:wrap;gap:var(--space-100);margin-top:var(--space-300)}
nav.toc a{padding:var(--space-075) var(--space-200);border-radius:var(--radius-full);background:var(--color-background-neutral);color:var(--color-text);text-decoration:none;font:var(--font-label)}
nav.toc a:hover{background:var(--color-background-neutral-hovered)}
.card{background:var(--elevation-surface-raised);border:var(--border-width) solid var(--color-border);border-radius:var(--radius-large);padding:var(--space-300)}
ol.rules{list-style:none;counter-reset:r;padding:0;display:grid;gap:var(--space-150);grid-template-columns:repeat(auto-fill,minmax(300px,1fr))}
ol.rules li{counter-increment:r;background:var(--elevation-surface-raised);border:var(--border-width) solid var(--color-border);border-radius:var(--radius-large);padding:var(--space-250)}
ol.rules li::before{content:counter(r);display:inline-grid;place-items:center;width:28px;height:28px;border-radius:var(--radius-full);background:var(--color-background-brand-subtle);color:var(--color-text-brand);font:var(--font-heading-xsmall);margin-bottom:var(--space-100)}
ol.rules li:first-child::before{background:var(--color-background-agent-subtle);color:var(--color-text-agent)}
ol.rules b{display:block;font:var(--font-heading-small);margin-bottom:var(--space-050)}
ol.rules span{color:var(--color-text-subtle)}
.tw{overflow-x:auto;border:var(--border-width) solid var(--color-border);border-radius:var(--radius-large);background:var(--elevation-surface-raised)}
table{border-collapse:collapse;width:100%;min-width:560px}
th,td{text-align:left;padding:var(--space-100) var(--space-200);border-bottom:var(--border-width) solid var(--color-border);vertical-align:middle}
th{font:var(--font-heading-xxsmall);color:var(--color-text-subtlest);text-transform:uppercase;letter-spacing:.6px}
tr:last-child td{border-bottom:0}
code{font:var(--font-code);font-size:12px}
small{color:var(--color-text-subtlest)}
.sw{display:inline-block;width:20px;height:20px;border-radius:var(--radius-xsmall);vertical-align:middle;margin-right:var(--space-100);box-shadow:inset 0 0 0 1px rgba(127,127,127,.3)}
.cr{margin-left:var(--space-100);font:var(--font-body-small);color:var(--color-text-subtlest)}
details{margin:var(--space-150) 0}
summary{font:var(--font-heading-small);cursor:pointer;padding:var(--space-100) 0;min-height:var(--size-touch-target);display:flex;align-items:center}
.ramp{display:grid;grid-template-columns:80px repeat(11,minmax(52px,1fr));gap:2px;margin-bottom:2px;min-width:720px}
.rn{font:var(--font-heading-xsmall);display:flex;align-items:center}
.st{height:56px;border-radius:var(--radius-xsmall);padding:var(--space-050);display:flex;flex-direction:column;justify-content:space-between;font:var(--font-body-small)}
.st span{font-size:10px;opacity:.9}
.scroll{overflow-x:auto}
.lz{display:inline-flex;align-items:center;min-height:24px;padding:0 var(--space-100);border-radius:var(--radius-full);font:var(--font-heading-xxsmall);margin:0 var(--space-050) var(--space-050) 0;text-transform:capitalize}
.grid2{display:grid;gap:var(--space-200);grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr))}
.demo{display:flex;flex-direction:column;gap:var(--space-150)}
.msg{display:flex;gap:var(--space-150);padding:var(--space-200);border-radius:var(--radius-large);font:var(--font-body)}
.msg svg{flex:none;width:var(--size-icon-medium);height:var(--size-icon-medium)}
.msg b{display:block;font:var(--font-heading-xsmall);margin-bottom:var(--space-025)}
.agentcard{background:var(--elevation-surface-overlay);border-radius:var(--radius-large);box-shadow:var(--elevation-shadow-overlay);padding:var(--space-250);display:flex;flex-direction:column;gap:var(--space-100);max-width:340px}
.agentcard .who{display:flex;align-items:center;gap:var(--space-075);font:var(--font-heading-xxsmall);color:var(--color-text-agent)}
.agentcard .who svg{width:14px;height:14px}
.agentcard h4{margin:0;font:700 16px/22px var(--font-family-display)}
.agentcard p{margin:0;color:var(--color-text-subtle)}
.agentcard .row{display:flex;gap:var(--space-100);margin-top:var(--space-050)}
.agentcard .row .btn{flex:1;justify-content:center}
.due{display:inline-flex;align-items:center;gap:var(--space-050);font:var(--font-heading-xxsmall);padding:var(--space-050) var(--space-100);border-radius:var(--radius-full)}
.due svg{width:14px;height:14px}
.bar{display:inline-block;height:12px;background:var(--color-background-brand-bold);border-radius:2px}
.rads{display:flex;flex-wrap:wrap;gap:var(--space-300)}
.rad{display:flex;flex-direction:column;gap:var(--space-050);align-items:flex-start}
.rad div{width:88px;height:56px;background:var(--color-background-brand-subtle);border:2px solid var(--color-border-brand)}
.shs{display:flex;flex-wrap:wrap;gap:var(--space-300)}
.sh{width:220px;height:96px;border-radius:var(--radius-large);background:var(--elevation-surface-raised);display:flex;align-items:flex-end;padding:var(--space-150)}
.ics{display:grid;gap:var(--space-100);grid-template-columns:repeat(auto-fill,minmax(200px,1fr))}
.ic{display:flex;flex-direction:column;gap:var(--space-050);padding:var(--space-200);border:var(--border-width) solid var(--color-border);border-radius:var(--radius-medium);background:var(--elevation-surface-raised)}
.ic span{display:flex;gap:var(--space-100);color:var(--color-icon)}
.ic svg{width:var(--size-icon-large);height:var(--size-icon-large);stroke-width:1.75}
.ic b{font:var(--font-body-strong)}
.ic code{color:var(--color-text-subtlest)}
.logos{display:grid;gap:var(--space-200);grid-template-columns:repeat(auto-fill,minmax(240px,1fr))}
.logos > div{border-radius:var(--radius-large);display:flex;align-items:center;justify-content:center;gap:var(--space-150);min-height:140px;border:var(--border-width) solid var(--color-border)}
.logos svg{width:44px;height:38px}
.logos .w{font:800 40px/1 var(--font-family-display);letter-spacing:-1.5px}
footer{margin-top:var(--space-1000);color:var(--color-text-subtlest);font:var(--font-body-small)}
</style>
</head>
<body>
<div class="wrap">
<header class="top">
  <span class="lock"><span class="mark-light">${mark('#5b4bd6')}</span><span class="mark-dark">${mark('#7d6ff0')}</span><span class="word">Naleko <span class="people">People</span><span class="maker">by Naleko</span></span></span>
  <span class="spacer"></span>
  <button class="btn" type="button" id="theme" aria-label="Switch light or dark"><span>Light / dark</span></button>
</header>
<h1>Naleko People design system</h1>
<p class="lead">Foundations for every Naleko People screen: the rules, colour in light and dark, type, space, shape, elevation, motion, icons and the mark.</p>
<p class="pp-button-group"><a class="pp-button pp-button--primary pp-button--large" href="components.html">See all components</a><a class="pp-button pp-button--default pp-button--large" href="kits.html">See the UI kits</a></p>
<nav class="toc" aria-label="Sections"><a href="components.html">All components</a><a href="#rules">Rules</a><a href="#colour">Colour</a><a href="#palette">Palette</a><a href="#type">Type</a><a href="#space">Space</a><a href="#shape">Shape</a><a href="#elevation">Elevation</a><a href="#motion">Motion</a><a href="#icons">Icons</a><a href="#logo">Logo</a></nav>

<h2 id="rules">The rules that govern everything</h2>
<p>Every component and screen obeys these. The first one is the reason mint exists.</p>
<ol class="rules">${rules.map(([t, d]) => `<li><b>${esc(t)}</b><span>${esc(d.replace(/`[^`]+`/g, (m) => m.slice(1, -1)).replace(/\*\*/g, ''))}</span></li>`).join('')}</ol>

<h2 id="colour">Colour</h2>
<p>Components use roles, never raw colours. Violet acts, mint is the agent, coral is warmth, status colours always come with an icon and a word. Every text pair below is checked in CI against WCAG AA in both themes.</p>
<div class="grid2">
  <div class="card demo">
    <div class="pp-inline">
      <button class="pp-button pp-button--primary" type="button">Send contract</button>
      <button class="pp-button pp-button--default" type="button">Edit</button>
      <button class="pp-button pp-button--danger" type="button">Withdraw offer</button>
    </div>
    <div class="pp-inline">
      <span class="pp-lozenge pp-lozenge--success"><i data-lucide="circle-check"></i>Done 3 Nov</span>
      <time class="pp-lozenge pp-lozenge--warning pp-deadline" datetime="2026-11-13"><i data-lucide="clock"></i>Due in 2 days</time>
      <time class="pp-lozenge pp-lozenge--danger pp-deadline" datetime="2026-11-10"><i data-lucide="clock-alert"></i>Overdue by 1 day</time>
      <span class="pp-agent-mark"><i data-lucide="sparkles"></i><span>Checked by Batsi</span></span>
    </div>
    <div class="pp-section-message" role="region" aria-label="Payroll connection"><i data-lucide="info"></i><div class="pp-section-message__content"><h3 class="pp-section-message__title">Payroll connection</h3><div class="pp-section-message__body">Connect Naleko People to your payroll so new employees are added without retyping.</div></div></div>
    <div class="pp-section-message pp-section-message--danger" role="region" aria-label="ID number"><i data-lucide="octagon-alert"></i><div class="pp-section-message__content"><h3 class="pp-section-message__title">That ID number has 12 digits</h3><div class="pp-section-message__body">South African ID numbers have 13. Check the last digits.</div></div></div>
  </div>
  <div class="card">
    <div class="pp-proposal-list" role="list" aria-label="Batsi suggests">
      <article class="pp-proposal--compact" role="listitem" aria-labelledby="fd-p1">
        <div class="pp-proposal__titles">
          <span class="pp-agent-mark"><i data-lucide="sparkles"></i><span>Batsi suggests</span></span>
          <span class="pp-proposal__title" id="fd-p1">Send Thandeka her contract and laptop request</span>
          <span class="pp-proposal__meta">Her ID checked out and she starts Monday · Nothing leaves Naleko People</span>
        </div>
        <div class="pp-proposal__row-actions">
          <button class="pp-button pp-button--agent pp-button--small" type="button" aria-describedby="fd-p1">Approve</button>
          <button class="pp-button pp-button--default pp-button--small" type="button" aria-describedby="fd-p1">Review</button>
        </div>
      </article>
    </div>
  </div>
</div>
<h3>Roles</h3>
${roleTables}
<h3>Accents</h3>
<p>Ten accents for tags, avatars, departments and charts. Mint is not an accent: it belongs to the agent.</p>
<div>${accents}</div>

<h2 id="palette">Palette</h2>
<p>The ramps the roles draw from. Brand colours are pinned exactly: violet <code>#5b4bd6</code> is violet 700, coral <code>#ff7a59</code> coral 400, mint <code>#2bb3a3</code> mint 500, ink <code>#1b1640</code> ink 950. Never use a step directly in a component.</p>
<div class="scroll">${ramps}</div>

<h2 id="type">Type</h2>
<p>Manrope for display, big headings and metrics; Inter for everything else. Never Manrope below 16px. Numbers that line up use tabular figures.</p>
<div class="tw"><table><thead><tr><th>Sample</th><th>Token</th></tr></thead><tbody>${typeRows}</tbody></table></div>

<h2 id="space">Space and layout</h2>
<p>An 8px base. The token name is the multiple of 8: <code>--space-200</code> is 16px.</p>
<div class="tw"><table><thead><tr><th>Token</th><th>Value</th><th></th></tr></thead><tbody>${spaceRows}</tbody></table></div>
<h3>Sizes and layout</h3>
<div class="tw"><table><thead><tr><th>Token</th><th>Value</th></tr></thead><tbody>${layoutRows}</tbody></table></div>
<p><small>Breakpoints (min width): ${Object.entries(F.breakpoints).map(([k, x]) => `${k} ${x}px`).join(' · ')}</small></p>

<h2 id="shape">Shape</h2>
<p>Pills for anything you press or that labels a status, 12px fields, 16px cards, 24px dialogs.</p>
<div class="rads">${radiusCells}</div>

<h2 id="elevation">Elevation</h2>
<p>Most surfaces separate by colour and a 1px border. Shadows are ink-tinted and reserved for things that float.</p>
<div class="shs">${shadowCells}</div>

<h2 id="motion">Motion</h2>
<p>Quick and quiet. Reduced motion turns durations to zero and drops the press scale.</p>
<div class="tw"><table><thead><tr><th>Token</th><th>Value</th></tr></thead><tbody>${motionRows}</tbody></table></div>

<h2 id="icons">Icons</h2>
<p>Lucide only, 1.75px stroke. One meaning, one icon, everywhere. This is the whole vocabulary: CI rejects any other icon in a component or UI kit.</p>
${iconRows}

<h2 id="logo">Logo</h2>
<p>Three people side by side: coral, violet, mint. On dark, violet lifts to <code>#7d6ff0</code>. The wordmark is "Naleko People" in Manrope 800, with People in violet and "by Naleko" under it in small tracked capitals. Keep clear space of one circle radius around the lockup; the mark is never smaller than 20px wide.</p>
<div class="logos">
  <div style="background:#faf7f2">${mark('#5b4bd6')}<span class="w" style="color:#1b1640">Naleko <span style="color:#5b4bd6">People</span></span></div>
  <div style="background:#1b1640">${mark('#7d6ff0')}<span class="w" style="color:#faf7f2">Naleko <span style="color:#7d6ff0">People</span></span></div>
  <div style="background:var(--elevation-surface-sunken)"><img src="assets/pepla-app-icon.svg" width="96" height="96" alt="Naleko People app icon, light"><img src="assets/pepla-app-icon-dark.svg" width="96" height="96" alt="Naleko People app icon, dark"></div>
</div>

<footer>Naleko People design system · tokens generated from <code>tokens/</code> · built ${new Date().toISOString().slice(0, 10)}</footer>
</div>
<script>
const root = document.documentElement;
let stored = null; try { stored = localStorage.getItem('pp-theme'); } catch (e) {}
if (stored) root.dataset.theme = stored;
document.getElementById('theme').addEventListener('click', () => {
  const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = dark ? 'light' : 'dark';
  try { localStorage.setItem('pp-theme', root.dataset.theme); } catch (e) {}
});
</script>
</body>
</html>
`;
html = inlineIcons(html);
writeFileSync(new URL('index.html', DIST), html);
console.log('Built dist/');
