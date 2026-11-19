// Danger dialog: Close (x) and Escape when it can be closed.   npm test
// A danger dialog that can be closed ("closable") shows a Close (x) button in its header and closes on Escape.
// A danger dialog that cannot be closed has neither, and no danger dialog closes on a click outside it.
// The design system holds the contract (spec, examples, kit screens); the app builds the behaviour from it.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseHTML } from 'linkedom';

const read = (p) => readFileSync(new URL(`../project/${p}`, import.meta.url), 'utf8');
const spec = read('components/overlays/modal-dialog.md');
const examples = parseHTML(`<body>${read('components/overlays/modal-dialog.examples.html')}</body>`).document;
const kit = parseHTML(`<body>${read('ui_kits/ask-batsi-full-page.html')}</body>`).document;

const dangerIn = (doc) => [...doc.querySelectorAll('.pp-modal-dialog--danger')];
const closeOf = (d) => d.querySelector('.pp-modal-dialog__header .pp-modal-dialog__close');
const exampleOf = (name) => [...examples.querySelectorAll('section[data-example]')].find((s) => s.getAttribute('data-example') === name);

const sentences = (t) => t.replace(/\s+/g, ' ').split(/(?<=[.!?])\s+/);
const behaviour = spec.split('## Behaviour')[1].split('\n## ')[0];
const a11y = spec.split('## Accessibility')[1].split('\n## ')[0];

test('spec: a closable danger dialog shows Close and closes on Escape', () => {
  const s = sentences(behaviour).find((x) => /closable danger/i.test(x) && !/not closable/i.test(x));
  assert.ok(s, 'Behaviour must have a sentence about a closable danger dialog');
  assert.ok(/Close/.test(s) && /Escape/.test(s), `that sentence must name both the Close button and Escape: "${s}"`);
});

test('spec: a danger dialog that is not closable has no Close and ignores Escape', () => {
  const s = sentences(behaviour).find((x) => /not closable/i.test(x) && /has no Close/i.test(x));
  assert.ok(s, 'Behaviour must have a sentence about a danger dialog that is not closable');
  assert.ok(/no Close/i.test(s) && /(ignores|no) Escape/i.test(s), `that sentence must say no Close button and Escape ignored: "${s}"`);
});

test('spec: the general Escape rule names the exception', () => {
  const s = sentences(behaviour).find((x) => /^- Escape and the close button cancel/.test(x) || /Escape and the close button cancel/.test(x));
  assert.ok(s && /except[^.]*danger[^.]*not closable/i.test(s), `the general Escape line must carry the danger exception: "${s}"`);
});

test('spec: a click outside a danger dialog never closes it, and nothing says otherwise', () => {
  assert.match(spec, /Danger confirms never close on a blanket click/);
  for (const x of spec.split('\n').flatMap(sentences).filter((y) => /(blanket|outside)/i.test(y) && /danger/i.test(y))) assert.ok(/never|not|nothing|ignored/i.test(x), `a sentence lets a click outside close a danger dialog: "${x}"`);
});

test('spec: the Close button is named "Close", focus goes to the safe button, and Escape is not contradicted', () => {
  assert.match(a11y, /aria-label="Close"|labelled "Close"/, 'Accessibility must name the Close button "Close"');
  assert.match(a11y, /least destructive button/);
  const esc = sentences(a11y).filter((x) => /Escape/.test(x));
  assert.ok(esc.length > 0);
  assert.ok(esc.some((x) => /not closable|danger/i.test(x)), 'the Accessibility Escape line must cover the danger dialog that is not closable');
});

test('example: a closable danger dialog is drawn with the Close (x) in the header, and a non-closable one is not', () => {
  const closable = exampleOf('Destructive confirm that can be closed: Close and Escape');
  assert.ok(closable, 'examples need a section "Destructive confirm that can be closed: Close and Escape"');
  const d = closable.querySelector('.pp-modal-dialog--danger');
  assert.ok(d, 'the closable example is a danger dialog');
  assert.equal(d.getAttribute('role'), 'alertdialog');
  const x = closeOf(d);
  assert.ok(x, 'the closable danger dialog has the Close button in its header');
  assert.equal(x.getAttribute('aria-label'), 'Close');
  assert.ok(x.querySelector('[data-lucide="x"]'), 'the Close button draws the x icon');
  const foot = [...d.querySelectorAll('.pp-modal-dialog__footer .pp-button')];
  assert.ok(foot[0] && !foot[0].classList.contains('pp-button--danger') && foot.at(-1).classList.contains('pp-button--danger'), 'the safe button comes first and the danger button last');
  // wording: only what the approved delete dialogs say (P36, P37), and "Close" as the accessible name
  assert.equal(d.querySelector('.pp-modal-dialog__title').textContent.trim(), 'Delete this chat?');
  assert.equal(d.querySelector('.pp-modal-dialog__body').textContent.replace(/\s+/g, ' ').trim(), 'This removes the chat for good. The audit log keeps that a chat was deleted, not what it said.');
  assert.deepEqual(foot.map((b) => b.textContent.trim()), ['Cancel', 'Delete chat']);
  assert.ok(!x.textContent.trim() && !x.hasAttribute('title'), 'the Close button carries no visible text or title');

  const plain = exampleOf('Destructive confirm: names the person and the consequence');
  assert.ok(plain, 'the existing destructive example stays');
  assert.ok(!plain.querySelector('.pp-modal-dialog__close'), 'the danger dialog that is not closable stays as it was: no Close button');
});

test('kit: both delete dialogs (desktop) and the phone one draw the Close (x)', () => {
  const screens = [...kit.querySelectorAll('section[data-screen]')].filter((s) => /^Delete (chat|all my chats): are you sure/.test(s.getAttribute('data-screen')));
  assert.deepEqual(screens.map((s) => s.getAttribute('data-screen')).sort(), ['Delete all my chats: are you sure', 'Delete chat: are you sure', 'Delete chat: are you sure (phone)']);
  for (const s of screens) {
    const [d, ...rest] = dangerIn(s);
    assert.ok(d && rest.length === 0, `${s.getAttribute('data-screen')}: one danger dialog`);
    const x = closeOf(d);
    assert.ok(x, `${s.getAttribute('data-screen')}: Close (x) in the header`);
    assert.equal(x.getAttribute('aria-label'), 'Close');
    assert.ok(x.querySelector('[data-lucide="x"]'));
    const buttons = [...d.querySelectorAll('.pp-modal-dialog__footer .pp-button')].map((b) => b.textContent.trim());
    assert.equal(buttons[0], 'Cancel', 'Cancel stays first, the safe choice');
  }
});

test('kit: no new wording on the delete dialogs', () => {
  const words = new Set(['Delete this chat?', 'This removes the chat for good. The audit log keeps that a chat was deleted, not what it said.', 'Cancel', 'Delete chat',
    'Delete all your chats?', 'This removes all 4 of your chats for good. The audit log keeps that you deleted them, not what they said.', 'Delete all my chats']);
  for (const d of dangerIn(kit)) {
    for (const el of d.querySelectorAll('*')) {
      assert.ok(!el.hasAttribute('title'), 'no title attribute on the delete dialogs');
      const own = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).filter(Boolean).join(' ');
      if (own) assert.ok(words.has(own), `unapproved wording: "${own}"`);
    }
  }
});
