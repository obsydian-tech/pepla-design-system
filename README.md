# Naleko People design system

Tokens, type, icons, components and example screens for **Batsi**, the HR platform for teams under 100 in South Africa, Zimbabwe and Zambia: the HR web app, the phone-first employee and new employee portal, the hiring-manager and IT views, and the marketing site.

| What | Where |
|---|---|
| The rules, content and icon vocabulary | [`project/readme.md`](project/readme.md) |
| Tokens for code (generated, light and dark) | [`project/tokens/`](project/tokens), all imported by [`project/styles.css`](project/styles.css) |
| Machine-readable tokens (PrimeNG preset, other platforms) | [`project/tokens/tokens.json`](project/tokens/tokens.json) |
| Token source (edit these) | [`tokens/semantic.mjs`](tokens/semantic.mjs), [`tokens/foundations.mjs`](tokens/foundations.mjs), [`scripts/palette.mjs`](scripts/palette.mjs) |
| Logo and app icon | [`project/assets/`](project/assets) |
| Skill for coding and design agents | [`project/SKILL.md`](project/SKILL.md) |

## For coding agents

**This system is the only way to build Naleko People UI.** Screens compose `pp-*` components and Layout; a missing component is added here first; no `style=""`; every value is a token. Read "The only way to build UI" in [`project/readme.md`](project/readme.md); `npm run verify:design` enforces it.

**Read `project/readme.md` and `project/tokens/` before adding any colour, type, spacing, radius, shadow or motion.** Use semantic tokens only (`--color-text-subtle`, `--elevation-surface-raised`, `--space-200`), never a palette step or a hex. Mint (`agent`) is only for what Batsi did; coral (`warmth`) is never a status.

## How the tokens are made

```
scripts/palette.mjs        brand colours -> 12 ramps (tokens/palette.json); brand hexes pinned exactly
tokens/semantic.mjs        roles, light and dark, referencing ramp steps
tokens/foundations.mjs     type, space, shape, shadows, motion, layout, layers
scripts/build-tokens.mjs   -> project/tokens/*.css and tokens.json (never edit those by hand)
scripts/contrast.test.mjs  every promised pair checked against WCAG 2.2 AA, both themes; fails on stale CSS
scripts/verify-design.mjs  the only-way rules: no inline style, no raw value, no unknown class, parts inside their block
scripts/content-audit.mjs  status icons, deadlines in words, button names, words, dates, masked IDs
scripts/site.mjs           -> dist/, the published foundations site
```

```bash
npm ci
npm test               # contrast, drift, verify:design, content, icons, kits
npm run verify:design  # the full list of design-system violations
npm run build          # verify:design, then tokens + site into dist/
```

Structure is modelled on large public design systems (Atlassian's in particular): layered tokens, foundations, component anatomy and documentation depth. No Atlassian code, styles, icons, assets or text are used; their licence covers only products that integrate with Atlassian. Icons are [Lucide](https://lucide.dev) (ISC).

## Roadmap

1. Foundations (this) · 2. Core components · 3. Naleko People components: agent, HR records, POPIA · 4. UI kits from the TalentFlow and Onboarding screens · 5. Adoption: the Angular 19 `pp-*` components and the app's `verify:design` ([spec](docs/verify-design-angular.md)); this repo's own `verify:design` is in place
