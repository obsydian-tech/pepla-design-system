// Naleko People public site tokens. The marketing site is always light: it pins data-theme="light",
// so the dark values below equal the light ones. Merged into the colour, motion and layout tokens by
// semantic.mjs and foundations.mjs; the generated CSS carries them like every other token.
//
// Colour: the six gradient stops are the Naleko Digital Solutions brand colours. Used only for the
// gradient (the company name, the footer hairline), never for text on its own or for status.
const brand = {
  'color.site.gradient.1': '#110c4a', // navy
  'color.site.gradient.2': '#2f3f78',
  'color.site.gradient.3': '#80beeb', // sky
  'color.site.gradient.4': '#8b66d0',
  'color.site.gradient.5': '#a922b3',
  'color.site.gradient.6': '#be34c9', // magenta
  // The sky stop is 2:1 on white, too pale for letters. Text uses this darker stop in its place; the hairline keeps the brand sky.
  'color.site.gradient.text.3': '{sky.600}',
};

export const siteLight = {
  ...brand,
  // Section grounds: cream and three washes. Text on them is color.text.
  'color.site.canvas': '#f7f3ec',
  'color.site.wash.violet': '{ink.100}',
  'color.site.wash.mint': '{mint.50}',
  'color.site.wash.coral': '{coral.50}',
  // The soft lights that drift behind a hero or a band.
  'color.site.orb.violet': 'alpha({violet.400}, 32)',
  'color.site.orb.mint': 'alpha({mint.300}, 40)',
  'color.site.orb.coral': 'alpha({coral.300}, 30)',
  'color.site.orb.sky': 'alpha({sky.300}, 30)',
  // The code editor: the one dark surface on the site.
  'color.site.code.surface': '#110e29',
  'color.site.code.surface.raised': '#1b1640',
  'color.site.code.border': '#352f63',
  'color.site.code.text': '{ink.100}',
  'color.site.code.subtle': '{ink.400}',
  'color.site.code.keyword': '{violet.300}',
  'color.site.code.string': '{mint.300}',
  'color.site.code.number': '{coral.300}',
  'color.site.code.key': '{sky.300}',
};
export const siteDark = { ...siteLight };

export const siteMotion = {
  'motion.site.easing': 'cubic-bezier(0.22, 0.7, 0.2, 1)',
  'motion.site.duration.reveal': '700ms',    // a section or card arriving
  'motion.site.duration.menu': '380ms',      // the shared menu panel sliding and resizing
  'motion.site.duration.header': '300ms',    // the header shrinking after a scroll
  'motion.site.duration.step': '600ms',      // one step of a demo
  'motion.site.stagger': '70ms',             // delay per --_i position inside a group
  'motion.site.duration.loop.orb': '28s',    // one drift of a soft light
  'motion.site.duration.loop.orb.reduced': '56s', // reduced motion: half speed, never still
  'motion.site.duration.loop.turn': '70s',   // one turn of a ring
  'motion.site.duration.loop.sweep': '6s',   // one sweep of the radar
  'motion.site.duration.loop.pulse': '2400ms', // one breath of a live dot
  'motion.site.duration.loop.orb.offset': '-9s', // start offset per --_i position, so soft lights never move together
  'motion.site.duration.loop.shine': '5200ms', // one pass of the light across an accent headline
};

export const siteLayout = {
  'layout.site.max': '1200px',          // content width of every site section
  'layout.site.gutter.desktop': '40px',
  'layout.site.header.height': '72px',
  'layout.site.header.height.shrunk': '56px',
  'layout.site.subnav.height': '56px',
  'layout.site.menu.max': '720px',      // the widest the shared menu panel gets
  'layout.site.menu.height.max': '360px', // the tallest it gets: the shared background is this size and scales down to fit each list
  'layout.site.sheet.width': '380px',   // the phone menu sheet, at most
  'layout.site.breakpoint.nav': '1280px', // the header is at least this wide to show the full menu; below it the menu becomes the sheet (the container query in site-header.css repeats this value)
  'layout.site.frame.height': '560px',  // a preview frame standing in for the browser window
  'layout.site.frame.phone': '390px',   // the phone preview frame's width
};

// Site type: [weight, size, line height, tracking, family], like `type` in foundations.mjs, except that a size or line
// height may be a string. The big headings are fluid and follow the width of their section (cqw), not the window,
// so a phone-sized preview on a wide screen sets type like a phone. Numbers are px; a string is used as written.
export const siteType = {
  'site.hero':    [700, 'clamp(46px, 9.6cqw, 140px)', '.98', '-0.04em', 'display'],   // hero headline
  'site.band':    [800, 'clamp(52px, 11cqw, 168px)', '.98', '-0.045em', 'display'],   // closing band headline
  'site.title':   [700, 'clamp(32px, 4.6cqw, 56px)', '1.08', '-0.025em', 'display'],  // section headline
  'site.lead':    [400, 18, 28, '0', 'body'],                                         // line under a headline
  'site.eyebrow': [700, 12, 16, '0.16em', 'body'],                                    // small caps label above a headline
};
