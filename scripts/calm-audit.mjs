#!/usr/bin/env node
// Calm screens: the density rules in the readme ("Calm screens"), checked on every UI kit screen.
// verify:design checks what a screen is made of; this checks how much of it there is.
// Used by scripts/calm.test.mjs and by verify:design; run on its own for the full list:
//   node scripts/calm-audit.mjs
import { readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseHTML } from 'linkedom';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const KITS = join(ROOT, 'project', 'ui_kits');

// An "item" is one thing on a screen: a table row, a list row, a card, a record header.
const ITEM = 'tr, [role="listitem"], li, article, .pp-card, .pp-page-header, .pp-person-header, .pp-proposal, .pp-proposal--compact, .pp-section-message, .pp-banner';
// An inline deadline (pp-deadline--inline) is words in a meta line, not a chip.
const STATUS = '.pp-lozenge:not(.pp-deadline--inline), .pp-tag, .pp-confidence-chip';
const text = (el) => (el?.textContent || '').replace(/\s+/g, ' ').trim();
const nearest = (el, sel) => { let p = el.parentElement; while (p && !p.matches(sel)) p = p.parentElement; return p; };
// Overlays (modal, drawer, popup, agent panel, the site's phone menu sheet and its header bar) are their own surface with their own one primary.
const SURFACE = '.pp-modal-dialog, .pp-drawer, .pp-popup, .pp-agent-panel, .pp-inline-dialog, .pp-site-sheet, .pp-site-header, [data-screen]';
const LIMITS = {
  primary: 1, // primary buttons per surface
  statusPerItem: 1, // lozenges, tags and confidence chips in one item (not counting items inside it)
  headerActions: 2, // buttons in a page or person header; more go in a "More" menu
  steppers: 1, // progress trackers per screen
  agentCallouts: 1, // Batsi notices (agent section messages, proposal lists) per screen, outside the agent panel
  statMeta: 2, // stat cards per row that carry a meta line; the rest show a label and a value
  filterGroups: 1, // visible rows of filter chips; the rest go behind a Filters button
};

export function audit() {
  const out = [];
  for (const f of readdirSync(KITS).filter((n) => n.endsWith('.html'))) {
    const file = relative(ROOT, join(KITS, f));
    const src = readFileSync(join(KITS, f), 'utf8');
    const { document } = parseHTML(`<!doctype html><html><body>${src}</body></html>`);
    for (const screen of document.querySelectorAll('section[data-screen]')) {
      const name = screen.getAttribute('data-screen');
      const report = (rule, msg) => out.push({ file, screen: name, rule, msg });

      // 1. One primary action per surface, and none in the top navigation
      const surfaces = new Map();
      for (const b of screen.querySelectorAll('.pp-button--primary')) {
        if (nearest(b, '.pp-top-navigation')) report('primary', `primary button in the top navigation: "${text(b)}"`);
        const s = nearest(b, SURFACE) || screen;
        surfaces.set(s, [...(surfaces.get(s) || []), text(b)]);
      }
      for (const [, labels] of surfaces) if (labels.length > LIMITS.primary) report('primary', `${labels.length} primary buttons on one surface: ${labels.map((l) => `"${l}"`).join(', ')}`);
      for (const r of screen.querySelectorAll('.pp-top-navigation .pp-role')) report('top-nav', `role pill in the top navigation ("${text(r)}"): it belongs in the account menu`);

      // 2. One status per item
      const per = new Map();
      for (const s of screen.querySelectorAll(STATUS)) {
        if (nearest(s, '.pp-proposal__sources, .pp-tag-group, .pp-description-list__value .pp-tag-group, .pp-table__filters, .pp-legend')) continue;
        const item = nearest(s, ITEM);
        if (!item) continue;
        per.set(item, [...(per.get(item) || []), text(s)]);
      }
      for (const s of screen.querySelectorAll('.pp-lozenge:not(.pp-deadline--inline), .pp-tag')) {
        const t = text(s);
        if (/^On track\b/.test(t)) report('status', `"${t}" lozenge: a row that is on track shows none`);
        if (/^(?:Positive|Neutral|Hesitant|Excited|Junior|Mid|Senior)$/.test(t)) report('status', `"${t}" as a chip: sentiment and seniority are plain text`);
      }
      for (const [item, labels] of per) if (labels.length > LIMITS.statusPerItem) report('status', `${labels.length} status chips in one ${item.tagName.toLowerCase()}${item.className ? '.' + String(item.className).split(' ')[0] : ''}: ${labels.map((l) => `"${l}"`).join(', ')}`);

      for (const el of screen.querySelectorAll('*')) {
        if (el.matches('.pp-tag-group, .pp-proposal__sources')) continue;
        const tags = [...el.children].filter((c) => c.matches('.pp-tag'));
        if (tags.length >= 2) report('status', `${tags.length} tags in a row ("${tags.map(text).join('", "')}"): facts are words, tags are for a tag group`);
      }
      const bold = screen.querySelectorAll('.pp-lozenge--bold');
      if (bold.length > 1) report('status', `${bold.length} bold lozenges: bold is for the one status per screen that matters most`);

      // 3. Headers: few actions, one status, nothing repeated in a summary card below
      for (const h of screen.querySelectorAll('.pp-page-header, .pp-person-header')) {
        // A view switch (a button group of pressed buttons) counts as one control.
        const acts = [...h.querySelectorAll('.pp-button')].filter((b) => !b.matches('.pp-button--icon, [aria-pressed]') && !nearest(b, '.pp-breadcrumbs'))
          .concat([...h.querySelectorAll('.pp-button-group')].filter((g) => g.querySelector('[aria-pressed]')));
        if (acts.length > LIMITS.headerActions) report('header', `${acts.length} buttons in a header: ${acts.map((b) => `"${text(b)}"`).join(', ')}`);
        const next = h.nextElementSibling;
        if (next?.matches('.pp-card, .pp-description-list') || next?.querySelector?.(':scope > .pp-description-list')) {
          const terms = [...next.querySelectorAll('.pp-description-list__value, dd')].map(text).filter((t) => t.length > 2);
          const said = text(h);
          const dup = terms.filter((t) => said.includes(t));
          if (dup.length >= 2) report('repeat', `summary below the header repeats it: ${dup.map((t) => `"${t}"`).join(', ')}`);
        }
      }

      // 4. One stepper per screen
      const steppers = screen.querySelectorAll('.pp-progress-tracker');
      if (steppers.length > LIMITS.steppers) report('stepper', `${steppers.length} progress trackers on one screen`);

      // 5. One Batsi notice per screen (the agent panel is its own surface)
      const notices = [...screen.querySelectorAll('.pp-section-message--agent, .pp-banner--agent, .pp-proposal-list')].filter((n) => !nearest(n, '.pp-agent-panel'));
      if (notices.length > LIMITS.agentCallouts) report('agent', `${notices.length} Batsi notices on one screen`);

      // 6. Stat rows: a label and a value; a meta line only where it asks for attention
      for (const row of screen.querySelectorAll('.pp-stat-row')) {
        const metas = row.querySelectorAll('.pp-stat__meta');
        if (metas.length > LIMITS.statMeta) report('stats', `${metas.length} stat cards in a row carry a meta line`);
      }

      // 7. One visible row of filter chips
      const groups = [...screen.querySelectorAll('[role="group"]')].filter((g) => g.querySelectorAll('[aria-pressed]').length >= 3 && !nearest(g, '.pp-page-header, .pp-modal-dialog, .pp-drawer, .pp-popup, .pp-site-form-card')); // a form's own pickers (day and time) are not a filter row
      if (groups.length > LIMITS.filterGroups) report('filters', `${groups.length} visible filter groups`);

      // 8. No card in a card: a raised card or a stat card inside another card is a box in a box.
      // A sunken card is the one quiet group a card may hold.
      const nested = [...screen.querySelectorAll('.pp-card .pp-card:not(.pp-card--sunken), .pp-card .pp-stat')];
      if (nested.length) report('nested', `${nested.length} cards inside a card: lay them on the page, or use a sunken card or a list`);

      // 9. No disabled buttons as decoration: a disabled button outside a form says why next to it
      for (const b of screen.querySelectorAll('.pp-button[disabled], .pp-button[aria-disabled="true"]')) {
        // A send button waits for its composer to have text; that needs no reason.
        let p = b.parentElement, composer = false;
        for (let i = 0; p && i < 3; i++, p = p.parentElement) if (p.querySelector('textarea')) { composer = true; break; }
        if (!composer && !nearest(b, 'form, .pp-form, .pp-modal-dialog') && !b.getAttribute('aria-describedby')) report('disabled', `disabled button with no reason: "${text(b)}"`);
      }
    }
  }
  return out;
}

if (process.argv[1]?.endsWith('calm-audit.mjs')) {
  const out = audit();
  const by = {};
  for (const o of out) (by[`${o.file} · ${o.screen}`] ||= []).push(o);
  for (const [k, list] of Object.entries(by)) {
    console.log(`\n${k}`);
    for (const o of list) console.log(`  [${o.rule}] ${o.msg}`);
  }
  const rules = {};
  for (const o of out) rules[o.rule] = (rules[o.rule] || 0) + 1;
  console.log(`\n${out.length} calm-screen issues`, rules);
  process.exitCode = out.length ? 1 : 0;
}
