// The readme's rules that markup can show, across every UI kit screen and component example:
// status is an icon and a word with the right status icon, deadlines are <time> in words,
// icon-only buttons are named, buttons say the outcome, no words we avoid, dates as 3 Nov 2026,
// no 13-digit ID shown in full.   Full list: node scripts/content-audit.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { audit } from './content-audit.mjs';

test('content rules hold on every screen and example', () => {
  const v = audit();
  assert.equal(v.length, 0, '\n' + v.map((x) => `${x.file}:${x.line} [${x.rule}] ${x.msg}`).join('\n'));
});
