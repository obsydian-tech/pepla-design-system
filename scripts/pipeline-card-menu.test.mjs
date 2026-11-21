// Pipeline board card menu: a "More actions for {first name}" button beside Move.   npm test
// The page gives the board the menu items and gets back the item picked; the design system holds the contract
// (spec, examples, kit screens); the app builds the behaviour from it.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseHTML } from 'linkedom';

const read = (p) => readFileSync(new URL(`../project/${p}`, import.meta.url), 'utf8');
const spec = read('components/records/pipeline-board.md');
const css = read('components/records/pipeline-board.css');
const examples = parseHTML(`<body>${read('components/records/pipeline-board.examples.html')}</body>`).document;
const kit = parseHTML(`<body>${read('ui_kits/recruitment.html')}</body>`).document;
const screen = (n) => [...kit.querySelectorAll('section[data-screen]')].find((s) => s.getAttribute('data-screen') === n);
const section = (h) => spec.split(`## ${h}`)[1].split('\n## ')[0];

test('spec: the menu button is named "More actions for {first name}" and the page supplies the items', () => {
  assert.match(spec, /named "More actions for \{first name\}"/);
  assert.match(section('Behaviour'), /the page gives the board the menu items/);
  assert.match(section('Behaviour'), /`cardAction`/);
  assert.match(section('Behaviour'), /With no items the button is not shown/);
});

test('spec: the board runs nothing itself and has no words of its own for the items', () => {
  assert.match(section('Behaviour'), /The board runs nothing itself/);
  assert.match(section('Content'), /in the page's words/);
});

test('spec and css: the two buttons share one card-actions slot', () => {
  assert.match(spec, /pp-pipeline__card-actions/);
  assert.match(css, /\.pp-pipeline__card-actions\s*\{/);
});

test('example: each card has Move and More actions side by side; the open menu is a labelled menu', () => {
  const ex = [...examples.querySelectorAll('section[data-example]')].find((s) => s.getAttribute('data-example') === 'Card with More actions');
  assert.ok(ex, 'an example named "Card with More actions" exists');
  for (const card of ex.querySelectorAll('.pp-pipeline__card')) {
    const actions = card.querySelector('.pp-pipeline__card-actions');
    assert.ok(actions, 'card has __card-actions');
    const names = [...actions.querySelectorAll('button')].map((b) => b.getAttribute('aria-label'));
    assert.match(names[0], /^Move \S+$/);
    assert.match(names[1], /^More actions for \S+$/);
    assert.equal(actions.querySelectorAll('button')[1].getAttribute('aria-haspopup'), 'menu');
  }
  const menu = ex.querySelector('[role="menu"]');
  assert.ok(menu && /^More actions for /.test(menu.getAttribute('aria-label')));
  assert.ok(ex.querySelector('button[aria-expanded="true"][aria-controls]'), 'the open menu has its button marked expanded');
});

test('kit: every board card has Move and More actions; "Pipeline, card menu" shows the menu open', () => {
  for (const n of ['Pipeline, board', 'Pipeline, board (phone)', 'Pipeline, card menu']) {
    const s = screen(n);
    assert.ok(s, `kit screen "${n}" exists`);
    const cards = [...s.querySelectorAll('.pp-pipeline__card')];
    assert.ok(cards.length > 0);
    for (const c of cards) {
      const move = c.querySelector('button[aria-label^="Move "]');
      const more = c.querySelector('button[aria-label^="More actions for "]');
      assert.ok(move && more, `${n}: a card has both buttons`);
      assert.equal(move.getAttribute('aria-label').replace('Move ', ''), more.getAttribute('aria-label').replace('More actions for ', ''), 'both name the same person');
    }
  }
  const menu = screen('Pipeline, card menu').querySelector('[role="menu"]');
  assert.ok(menu, 'the open menu is on the screen');
  assert.deepEqual([...menu.querySelectorAll('[role="menuitem"]')].map((i) => i.textContent.trim()), ['Not hired']);
  assert.equal(screen('Pipeline, board').querySelector('[role="menu"]'), null, 'the plain board has no open menu');
});
