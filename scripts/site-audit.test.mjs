// The public site checks must fail on a bad fixture, so a weakened check fails the tests.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkSiteCss, checkSiteCopy, auditSite } from './site-audit.mjs';

const rules = (list) => list.map((x) => x.rule);

test('a keyframe that animates a layout property fails', () => {
  assert.deepEqual(rules(checkSiteCss('x.css', '@keyframes a { from { width: 0; } to { width: 10px; } }')), ['site:motion', 'site:motion']);
  assert.deepEqual(rules(checkSiteCss('x.css', '@keyframes a { to { mask-position: 0 0; } }')), ['site:motion']);
});
test('a keyframe that animates transform and opacity passes', () => {
  assert.deepEqual(checkSiteCss('x.css', '@keyframes a { 0% { transform: translate(0, 0); opacity: 1; } 100% { transform: rotate(1turn); opacity: .4; } }'), []);
});
test('a transition on anything else fails, "all" included', () => {
  assert.equal(checkSiteCss('x.css', '.a { transition: background-color var(--motion-site-duration-menu); }').length, 1);
  assert.equal(checkSiteCss('x.css', '.a { transition: all var(--motion-site-duration-menu); }').length, 1);
  assert.equal(checkSiteCss('x.css', '.a { transition: opacity var(--x) var(--y) calc(var(--_i, 0) * var(--z)), transform var(--x); }').length, 0);
});
test('banned words fail', () => {
  for (const bad of ['<p>Ask our AI Agent</p>', '<p>Work email</p>', '<p>Midrand</p>', '<p>Pepla</p>', '<p>One — two</p>']) assert.equal(checkSiteCopy('x.html', bad).length, 1, bad);
  assert.deepEqual(checkSiteCopy('x.html', '<p>Ask Batsi. John Doe and Jane Smith.</p>'), []);
});
test('other sample people fail', () => {
  assert.deepEqual(rules(checkSiteCopy('x.html', '<p>Thandeka Dlamini</p>')), ['site:names']);
});
test('the site layer passes today', () => assert.deepEqual(auditSite(), []));
