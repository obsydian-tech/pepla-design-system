#!/usr/bin/env node
// Content and rule checks across every UI kit screen and component example: the readme's rules
// that markup can show. Used by scripts/content.test.mjs; run on its own for the full list:
//   node scripts/content-audit.mjs
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const P = join(ROOT, 'project');
const walk = (d) => readdirSync(d).flatMap((n) => { const p = join(d, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
const lineOf = (t, i) => t.slice(0, i).split('\n').length;
const text = (html) => html.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

// Status icons per lozenge appearance: the status rows of the readme's icon vocabulary.
const STATUS_ICONS = {
  success: ['check', 'circle-check', 'shield-check', 'user-check', 'thumbs-up'],
  danger: ['x', 'circle-x', 'octagon-alert', 'clock-alert', 'circle-slash', 'user-x', 'lock', 'thumbs-down'],
  warning: ['triangle-alert', 'clock', 'timer', 'hourglass', 'clock-alert'],
};
// Mint (agent) appearances are checked by hand in review: an agent button accepts Batsi's suggestion.
const BANNED_WORDS = [
  [/\bAI[- ]powered\b/i, 'AI-powered'], [/\bleverage\b/i, 'leverage'], [/\bseamless(ly)?\b/i, 'seamless'],
  [/\bheadcount\b/i, 'headcount'], [/\bresources?\b(?! (?:the|a))/i, 'resource'], [/\bthe (?:AI|system)\b/i, '"the AI" or "the system" (say Batsi)'],
  [/\bclick here\b/i, 'click here'], [/\bwhy now\b/i, '"Why now" (say Reason)'], [/\bwhat happens next\b/i, '"What happens next" (state the next step plainly)'],
  [/\bwhat Batsi (?:read|found)\b/i, '"What Batsi read" (say Sources or Check result)'], [/\bhow sure\b/i, '"How sure" (say Confidence)'],
  [/\bBatsi (?:suggests|noticed|can|will|thinks)\b/, 'Batsi narrating (use a label: Suggested by Batsi, Insights)'], [/\b(?:here is|here\'s|you\'re all caught up|you are all caught up)\b/i, 'narration (use a label)'], [/\bPepla\b/, 'Pepla (a working name; say Naleko People, or Batsi for the agent)'],
];
const BAD_BUTTONS = /^(?:OK|Okay|Submit|Click here|Yes|No)$/i;
const BAD_DATES = [/\b\d{1,2} [A-Z][a-z]{2} \d{2}\b(?!\d)/, /\b\d{4}-\d{2}-\d{2}\b/, /\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/];
const SA_ID = /(?<![\d•])\d{13}(?!\d)/;

export function audit() {
  const out = [];
  const files = [
    ...walk(join(P, 'ui_kits')).filter((f) => f.endsWith('.html')),
    ...walk(join(P, 'components')).filter((f) => f.endsWith('.examples.html')),
  ];
  for (const f of files) {
    const file = relative(ROOT, f);
    const html = readFileSync(f, 'utf8').replace(/<!--[\s\S]*?-->/g, '');
    const report = (i, rule, msg) => out.push({ file, line: lineOf(html, i), rule, msg });

    // 1. Status is an icon and a word (rule 4): every lozenge has both, and the icon fits its appearance
    for (const m of html.matchAll(/<(span|time|a|button)\b[^>]*class="([^"]*\bpp-lozenge\b[^"]*)"[^>]*>([\s\S]*?)<\/\1>/g)) {
      const icons = [...m[3].matchAll(/data-lucide="([a-z0-9-]+)"/g)].map((x) => x[1]);
      if (!icons.length) report(m.index, 'status', `lozenge without an icon: "${text(m[3]).slice(0, 40)}"`);
      if (!text(m[3])) report(m.index, 'status', 'lozenge without a word');
      // Success, warning and danger carry their status icon; neutral and information lozenges name a
      // stage ("Documents submitted", "Invited") with the vocabulary icon for that meaning.
      const tone = (m[2].match(/pp-lozenge--(success|danger|warning)\b/) || [])[1];
      if (tone && icons.length && !STATUS_ICONS[tone].includes(icons[0])) report(m.index, 'status', `${tone} lozenge with icon "${icons[0]}": the vocabulary gives ${STATUS_ICONS[tone].join(', ')}`);
    }
    // 2. Deadlines are said in words (rule 5): a deadline chip is a <time> with datetime, an icon and words
    for (const m of html.matchAll(/<(\w+)\b([^>]*class="[^"]*\bpp-deadline\b[^"]*"[^>]*)>([\s\S]*?)<\/\1>/g)) {
      const paused = /circle-pause/.test(m[3]);
      if (!paused && (m[1] !== 'time' || !/\sdatetime="/.test(m[2]))) report(m.index, 'deadline', 'deadline chip must be a <time datetime="…">');
      if (!/(?:Due|Overdue|Done|left|today|tomorrow|ago|in \d|On track|Expired|Expires|Starts|Ends|Paused)/i.test(text(m[3]))) report(m.index, 'deadline', `deadline not in words: "${text(m[3]).slice(0, 40)}"`);
    }
    // 3. Icon-only buttons have a name
    for (const m of html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g)) {
      const label = text(m[2]);
      if (!label && !/aria-label(?:ledby)?="/.test(m[1])) report(m.index, 'a11y', 'icon-only button without aria-label');
      if (BAD_BUTTONS.test(label)) report(m.index, 'content', `button says "${label}": buttons say the outcome`);
      if (label && label.length > 3 && label === label.toUpperCase() && /[A-Z]/.test(label)) report(m.index, 'content', `button in capitals: "${label}"`);
    }
    // 3b. One way to mark fields per form (form-layout.md): "(optional)" on the few optional fields, or * on the
    // few required ones, never both
    for (const m of html.matchAll(/<form\b[\s\S]*?<\/form>/g)) {
      if (/pp-field__required/.test(m[0]) && /pp-field__optional/.test(m[0])) report(m.index, 'content', 'form marks fields with both * and "(optional)": use one style per form');
    }
    // 4. Words we avoid, dates in the house format, IDs masked (rule 6)
    const visible = html.replace(/<(?:script|style|option)[\s\S]*?<\/(?:script|style|option)>/g, '').replace(/\s(?:datetime|href|id|for|aria-[a-z]+|data-[a-z-]+|class|value|title|placeholder|inputmode|type|name|role)="[^"]*"/g, '');
    for (const [re, word] of BANNED_WORDS) for (const m of visible.matchAll(new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g'))) report(0, 'words', `"${m[0]}": avoid ${word}`);
    for (const re of BAD_DATES) for (const m of text(visible).matchAll(new RegExp(re.source, 'g'))) report(0, 'dates', `date "${m[0]}": write 3 Nov 2026`);
    for (const m of text(visible).matchAll(new RegExp(SA_ID.source, 'g'))) report(0, 'popia', `13-digit number "${m[0]}" shown in full: mask it (•••••••••0876)`);
  }
  return out;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const v = audit();
  const by = v.reduce((a, x) => ({ ...a, [x.rule]: (a[x.rule] || 0) + 1 }), {});
  console.log(`${v.length} finding(s) ${JSON.stringify(by)}`);
  for (const x of v) console.log(`${x.file}:${x.line} [${x.rule}] ${x.msg}`);
  process.exit(v.length ? 1 : 0);
}
