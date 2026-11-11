// Calm screens (readme): one primary per surface, one status per row, card or header, nothing said
// twice, one stepper, one Pepla notice, short headers, quiet stats, one row of filters, no box in a
// box, no disabled buttons as decoration.   Full list: node scripts/calm-audit.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { audit } from './calm-audit.mjs';

test('every kit screen is calm', () => {
  const v = audit();
  assert.equal(v.length, 0, '\n' + v.map((x) => `${x.file} · ${x.screen} [${x.rule}] ${x.msg}`).join('\n'));
});
