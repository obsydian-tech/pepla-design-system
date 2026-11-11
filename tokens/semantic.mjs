// Pepla semantic colour tokens, light and dark. The ONLY colour tokens components may use.
//
// Naming follows the layered pattern of large design systems (role, then sub-role, then emphasis, then state):
//   color.text.subtle, color.background.danger.bold.hovered, elevation.surface.raised
// In CSS a token is the same path with dashes: --color-background-danger-bold-hovered.
//
// Values are references into tokens/palette.json ({ramp.step}), a literal hex, or two helpers:
//   mix(a, b, pct)   a mixed into b at pct% (OKLab), used for dark-theme washes
//   alpha(a, pct)    a at pct% opacity
//
// The two families no other system has:
//   agent   = mint. Only for what Pepla's AI agents did or propose. Never success, never decoration.
//   warmth  = coral. Celebration, highlights, marketing. Never a status, never an error.

const night = {
  sunken: '#0b0920', page: '#110e29', raised: '#1b1640', overlay: '#241e4f', hovered: '#2c2660', pressed: '#352e70',
  border: '#352f63', borderBold: '#8079b0',
};

export const light = {
  // ---- Text
  'color.text': '{ink.950}',
  'color.text.subtle': '{ink.800}',
  'color.text.subtlest': '{ink.600}',
  'color.text.disabled': '{ink.400}',
  'color.text.inverse': '#ffffff',
  'color.text.brand': '{violet.700}',
  'color.text.selected': '{violet.700}',
  'color.text.agent': '{mint.700}',
  'color.text.warmth': '{coral.700}',
  'color.text.danger': '{red.700}',
  'color.text.warning': '{amber.700}',
  'color.text.warning.inverse': '{ink.950}',
  'color.text.success': '{green.700}',
  'color.text.information': '{blue.700}',
  'color.link': '{violet.700}',
  'color.link.pressed': '{violet.800}',
  'color.link.visited': '{violet.800}',

  // ---- Icons (3:1 against the surface they sit on)
  'color.icon': '{ink.950}',
  'color.icon.subtle': '{ink.600}',
  'color.icon.disabled': '{ink.400}',
  'color.icon.inverse': '#ffffff',
  'color.icon.brand': '{violet.700}',
  'color.icon.selected': '{violet.700}',
  'color.icon.agent': '{mint.600}',
  'color.icon.warmth': '{coral.600}',
  'color.icon.danger': '{red.600}',
  'color.icon.warning': '{amber.600}',
  'color.icon.success': '{green.600}',
  'color.icon.information': '{blue.600}',

  // ---- Borders
  'color.border': '{ink.200}',
  'color.border.bold': 'mix({ink.600}, {ink.500}, 35)',
  'color.border.input': 'mix({ink.600}, {ink.500}, 35)',
  'color.border.disabled': '{ink.100}',
  'color.border.focused': '{violet.700}',
  'color.border.selected': '{violet.700}',
  'color.border.brand': '{violet.700}',
  'color.border.agent': '{mint.500}',
  'color.border.danger': '{red.600}',
  'color.border.warning': '{amber.500}',
  'color.border.success': '{green.600}',
  'color.border.information': '{blue.600}',

  // ---- Backgrounds
  'color.background.input': '#ffffff',
  'color.background.input.hovered': '{ink.50}',
  'color.background.input.pressed': '#ffffff',
  'color.background.disabled': '{ink.100}',

  'color.background.neutral': '{ink.100}',
  'color.background.neutral.hovered': '{ink.200}',
  'color.background.neutral.pressed': '{ink.300}',
  'color.background.neutral.subtle': 'transparent',
  'color.background.neutral.subtle.hovered': '{ink.100}',
  'color.background.neutral.subtle.pressed': '{ink.200}',
  'color.background.neutral.bold': '{ink.950}',
  'color.background.neutral.bold.hovered': '{ink.900}',
  'color.background.neutral.bold.pressed': '{ink.800}',

  'color.background.brand.subtlest': '{violet.50}',
  'color.background.brand.subtlest.hovered': '{violet.100}',
  'color.background.brand.subtle': '{violet.100}',
  'color.background.brand.bold': '{violet.700}',
  'color.background.brand.bold.hovered': '{violet.800}',
  'color.background.brand.bold.pressed': '{violet.900}',
  'color.background.selected': '{violet.50}',
  'color.background.selected.hovered': '{violet.100}',
  'color.background.selected.bold': '{violet.700}',

  'color.background.agent.subtlest': '{mint.50}',
  'color.background.agent.subtle': '{mint.100}',
  'color.background.agent.subtle.hovered': '{mint.200}',
  'color.background.agent.bold': '{mint.600}',
  'color.background.agent.bold.hovered': '{mint.700}',
  'color.background.agent.bold.pressed': '{mint.800}',

  'color.background.warmth.subtle': '{coral.50}',
  'color.background.warmth.bold': '{coral.400}',

  'color.background.danger.subtle': '{red.50}',
  'color.background.danger.subtle.hovered': '{red.100}',
  'color.background.danger.bold': '{red.700}',
  'color.background.danger.bold.hovered': '{red.800}',
  'color.background.danger.bold.pressed': '{red.900}',
  'color.background.warning.subtle': '{amber.50}',
  'color.background.warning.subtle.hovered': '{amber.100}',
  'color.background.warning.bold': '{amber.400}',
  'color.background.warning.bold.hovered': '{amber.500}',
  'color.background.success.subtle': '{green.50}',
  'color.background.success.subtle.hovered': '{green.100}',
  'color.background.success.bold': '{green.700}',
  'color.background.success.bold.hovered': '{green.800}',
  'color.background.information.subtle': '{blue.50}',
  'color.background.information.subtle.hovered': '{blue.100}',
  'color.background.information.bold': '{blue.700}',
  'color.background.information.bold.hovered': '{blue.800}',

  'color.blanket': 'alpha({ink.950}, 50)',
  'color.skeleton': '{ink.100}',
  'color.skeleton.subtle': '{ink.50}',

  // ---- Brand marks (decorative only: never text, never a status)
  'color.brand.violet': '{violet.700}',
  'color.brand.coral': '{coral.400}',
  'color.brand.mint': '{mint.500}',

  // ---- Elevation
  'elevation.surface': '#faf7f2',
  'elevation.surface.hovered': '#f4efe7',
  'elevation.surface.pressed': '#eee8de',
  'elevation.surface.sunken': '#f3eee5',
  'elevation.surface.raised': '#ffffff',
  'elevation.surface.raised.hovered': '{ink.50}',
  'elevation.surface.raised.pressed': '{ink.100}',
  'elevation.surface.overlay': '#ffffff',
  'elevation.surface.overlay.hovered': '{ink.50}',
};

const accents = { blue: 'blue', sky: 'sky', green: 'green', lime: 'lime', yellow: 'yellow', amber: 'amber', red: 'red', magenta: 'magenta', violet: 'violet', gray: 'ink' };
for (const [name, ramp] of Object.entries(accents)) {
  light[`color.background.accent.${name}.subtlest`] = `{${ramp}.50}`;
  light[`color.background.accent.${name}.subtler`] = `{${ramp}.100}`;
  light[`color.background.accent.${name}.subtle`] = `{${ramp}.300}`;
  light[`color.background.accent.${name}.bolder`] = `{${ramp}.700}`;
  light[`color.text.accent.${name}`] = `{${ramp}.800}`;
  light[`color.icon.accent.${name}`] = `{${ramp}.600}`;
}

export const dark = {
  'color.text': '#faf7f2',
  'color.text.subtle': '#cdc8e0',
  'color.text.subtlest': '#a8a2c4',
  'color.text.disabled': '#6b6593',
  'color.text.inverse': '{ink.950}',
  'color.text.brand': '{violet.300}',
  'color.text.selected': '{violet.300}',
  'color.text.agent': '{mint.300}',
  'color.text.warmth': '{coral.300}',
  'color.text.danger': '{red.300}',
  'color.text.warning': '{amber.300}',
  'color.text.warning.inverse': '{ink.950}',
  'color.text.success': '{green.300}',
  'color.text.information': '{blue.300}',
  'color.link': '{violet.300}',
  'color.link.pressed': '{violet.200}',
  'color.link.visited': '{violet.200}',

  'color.icon': '#faf7f2',
  'color.icon.subtle': '#a8a2c4',
  'color.icon.disabled': '#6b6593',
  'color.icon.inverse': '{ink.950}',
  'color.icon.brand': '{violet.400}',
  'color.icon.selected': '{violet.300}',
  'color.icon.agent': '{mint.400}',
  'color.icon.warmth': '{coral.400}',
  'color.icon.danger': '{red.400}',
  'color.icon.warning': '{amber.400}',
  'color.icon.success': '{green.400}',
  'color.icon.information': '{blue.400}',

  'color.border': night.border,
  'color.border.bold': night.borderBold,
  'color.border.input': night.borderBold,
  'color.border.disabled': night.hovered,
  'color.border.focused': '{violet.400}',
  'color.border.selected': '{violet.400}',
  'color.border.brand': '{violet.400}',
  'color.border.agent': '{mint.500}',
  'color.border.danger': '{red.400}',
  'color.border.warning': '{amber.400}',
  'color.border.success': '{green.400}',
  'color.border.information': '{blue.400}',

  'color.background.input': night.sunken,
  'color.background.input.hovered': night.page,
  'color.background.input.pressed': night.sunken,
  'color.background.disabled': night.hovered,

  'color.background.neutral': night.hovered,
  'color.background.neutral.hovered': night.pressed,
  'color.background.neutral.pressed': '#3f3880',
  'color.background.neutral.subtle': 'transparent',
  'color.background.neutral.subtle.hovered': night.hovered,
  'color.background.neutral.subtle.pressed': night.pressed,
  'color.background.neutral.bold': '#faf7f2',
  'color.background.neutral.bold.hovered': '{ink.100}',
  'color.background.neutral.bold.pressed': '{ink.200}',

  'color.background.brand.subtlest': `mix({violet.500}, ${night.raised}, 14)`,
  'color.background.brand.subtlest.hovered': `mix({violet.500}, ${night.raised}, 22)`,
  'color.background.brand.subtle': `mix({violet.500}, ${night.raised}, 28)`,
  'color.background.brand.bold': '{violet.400}',
  'color.background.brand.bold.hovered': '{violet.300}',
  'color.background.brand.bold.pressed': '{violet.200}',
  'color.background.selected': `mix({violet.500}, ${night.raised}, 18)`,
  'color.background.selected.hovered': `mix({violet.500}, ${night.raised}, 26)`,
  'color.background.selected.bold': '{violet.400}',

  'color.background.agent.subtlest': `mix({mint.500}, ${night.raised}, 12)`,
  'color.background.agent.subtle': `mix({mint.500}, ${night.raised}, 22)`,
  'color.background.agent.subtle.hovered': `mix({mint.500}, ${night.raised}, 30)`,
  'color.background.agent.bold': '{mint.400}',
  'color.background.agent.bold.hovered': '{mint.300}',
  'color.background.agent.bold.pressed': '{mint.200}',

  'color.background.warmth.subtle': `mix({coral.400}, ${night.raised}, 16)`,
  'color.background.warmth.bold': '{coral.400}',

  'color.background.danger.subtle': `mix({red.500}, ${night.raised}, 18)`,
  'color.background.danger.subtle.hovered': `mix({red.500}, ${night.raised}, 26)`,
  'color.background.danger.bold': '{red.300}',
  'color.background.danger.bold.hovered': '{red.200}',
  'color.background.danger.bold.pressed': '{red.100}',
  'color.background.warning.subtle': `mix({amber.500}, ${night.raised}, 18)`,
  'color.background.warning.subtle.hovered': `mix({amber.500}, ${night.raised}, 26)`,
  'color.background.warning.bold': '{amber.400}',
  'color.background.warning.bold.hovered': '{amber.300}',
  'color.background.success.subtle': `mix({green.500}, ${night.raised}, 18)`,
  'color.background.success.subtle.hovered': `mix({green.500}, ${night.raised}, 26)`,
  'color.background.success.bold': '{green.400}',
  'color.background.success.bold.hovered': '{green.300}',
  'color.background.information.subtle': `mix({blue.500}, ${night.raised}, 18)`,
  'color.background.information.subtle.hovered': `mix({blue.500}, ${night.raised}, 26)`,
  'color.background.information.bold': '{blue.400}',
  'color.background.information.bold.hovered': '{blue.300}',

  'color.blanket': 'alpha(#05040f, 70)',
  'color.skeleton': night.hovered,
  'color.skeleton.subtle': night.overlay,

  'color.brand.violet': '{violet.500}',
  'color.brand.coral': '{coral.400}',
  'color.brand.mint': '{mint.500}',

  'elevation.surface': night.page,
  'elevation.surface.hovered': night.raised,
  'elevation.surface.pressed': night.overlay,
  'elevation.surface.sunken': night.sunken,
  'elevation.surface.raised': night.raised,
  'elevation.surface.raised.hovered': night.overlay,
  'elevation.surface.raised.pressed': night.hovered,
  'elevation.surface.overlay': night.overlay,
  'elevation.surface.overlay.hovered': night.hovered,
};

for (const [name, ramp] of Object.entries(accents)) {
  dark[`color.background.accent.${name}.subtlest`] = `mix({${ramp}.500}, ${night.raised}, 12)`;
  dark[`color.background.accent.${name}.subtler`] = `mix({${ramp}.500}, ${night.raised}, 24)`;
  dark[`color.background.accent.${name}.subtle`] = `{${ramp}.700}`;
  dark[`color.background.accent.${name}.bolder`] = `{${ramp}.400}`;
  dark[`color.text.accent.${name}`] = `{${ramp}.200}`;
  dark[`color.icon.accent.${name}`] = `{${ramp}.400}`;
}

// Text on bold fills: which label colour each bold background carries.
export const onBold = {
  light: {
    'color.background.brand.bold': 'color.text.inverse',
    'color.background.agent.bold': 'color.text.inverse',
    'color.background.danger.bold': 'color.text.inverse',
    'color.background.success.bold': 'color.text.inverse',
    'color.background.information.bold': 'color.text.inverse',
    'color.background.warning.bold': 'color.text.warning.inverse',
    'color.background.neutral.bold': 'color.text.inverse',
    'color.background.selected.bold': 'color.text.inverse',
  },
  dark: {
    'color.background.brand.bold': 'color.text.inverse',
    'color.background.agent.bold': 'color.text.inverse',
    'color.background.danger.bold': 'color.text.inverse',
    'color.background.success.bold': 'color.text.inverse',
    'color.background.information.bold': 'color.text.inverse',
    'color.background.warning.bold': 'color.text.warning.inverse',
    'color.background.neutral.bold': 'color.text.inverse',
    'color.background.selected.bold': 'color.text.inverse',
  },
};
