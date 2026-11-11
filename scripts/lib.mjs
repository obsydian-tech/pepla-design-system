// Shared helpers for the site builders.
import { createRequire } from 'node:module';
const { icons: LUCIDE } = createRequire(import.meta.url)('lucide');

const pascal = (n) => n.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join('');
export const hasIcon = (name) => Boolean(LUCIDE[pascal(name)]);

// Lucide icons are inlined at build time, so pages need no runtime icon script.
export function icon(name, extra = '') {
  const node = LUCIDE[pascal(name)];
  if (!node) throw new Error(`Unknown Lucide icon: ${name}`);
  const inner = node.map(([tag, attrs]) => `<${tag} ${Object.entries(attrs).map(([k, x]) => `${k}="${x}"`).join(' ')}/>`).join('');
  return `<svg class="lucide" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${extra ? ' ' + extra : ''}>${inner}</svg>`;
}
// Any other attributes on the <i> carry over; a class joins "lucide".
// The Pepla mark: sources write <i data-pepla-mark></i>; only the build draws the SVG (Logo spec).
export const MARK = '<svg class="pp-logo__mark" viewBox="0 0 76 64" aria-hidden="true"><circle class="pp-logo__coral" cx="20" cy="38" r="18"></circle><circle class="pp-logo__violet" cx="38" cy="24" r="18"></circle><circle class="pp-logo__mint" cx="56" cy="38" r="18"></circle></svg>';
export const inlineIcons = (html) => html.replace(/<i data-pepla-mark><\/i>/g, MARK).replace(/<i ([^>]*?)data-lucide="([a-z0-9-]+)"([^>]*)><\/i>/g, (_, a, n, b) => {
  const attrs = (a + ' ' + b).trim();
  const cls = attrs.match(/class="([^"]*)"/);
  const rest = attrs.replace(/class="[^"]*"/, '').trim();
  return icon(n, rest).replace('class="lucide"', `class="lucide${cls ? ' ' + cls[1] : ''}"`);
});
export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
