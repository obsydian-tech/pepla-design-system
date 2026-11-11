# verify:design for the Pepla Angular app

The spec for the check the Angular 19 app runs on every build. It is the same "only way to build UI" this repo enforces on its kits (see `project/readme.md`), applied to Angular templates and stylesheets, plus the rule that keeps PrimeNG behind a few `pp-*` components.

Status: spec for phase 5. Nothing here exists in the app yet. Decided by Iggie (11 Nov 2026): Angular 19; screens use only `pp-*` components from one `src/app/ds` folder; PrimeNG only inside the date picker, autocomplete, multi-select and long tables, so it can be removed later. The rest is a recommendation, marked as such.

## Where things live in the app

| Path | What | Who edits it |
| --- | --- | --- |
| `src/styles/design-system/` | The tokens (`tokens/*.css`) and `components.css`, copied from this repo by `npm run design-system:sync <ref>`, with a hash file | Only the sync script |
| `src/app/ds/` | Every UI primitive, as standalone `pp-*` components and directives, grouped like this repo (core, layout, actions, forms, …). The icon registry. The four PrimeNG wrappers | The design system port |
| `src/app/ds/README.md` | How to use the port: inputs, outputs, examples | The design system port |
| `src/app/features/**` | Screens. They compose `pp-*` components and Layout classes, and style nothing else | Feature work |
| `/dev/design-system` | A gallery route showing every `pp-*` component in every state | The design system port |

## How it runs

- `npm run verify:design` runs `scripts/verify-design.mjs`.
- `prebuild` runs it, so `ng build` and the deploy pipeline fail on any violation. CI runs it on every pull request.
- It prints `file:line [rule] text`, and ends with a pointer to `src/app/ds/README.md`.
- It reads `.html`, `.ts` (inline `template:` and `styles:`, and imports), `.css`, `.scss` and `package.json` under `src/`. Comments are ignored.
- **There is no escape hatch.** No ignore comment, no allowlist file and no baseline. The app is a rebuild, so the check is on from the first commit and stays at zero.
- `scripts/verify-design.test.mjs` feeds it one small fixture per rule and asserts that each one fails, so a weakened rule fails the tests.

## Rules

"Outside ds" means any file not under `src/app/ds/`. Rules marked "everywhere" apply inside ds too.

| Rule | Fails on | Where |
| --- | --- | --- |
| tokens | A change to `src/styles/design-system/` that does not match the hash file, so the tokens and `components.css` only change through the sync | everywhere |
| colour | A hex, `rgb()`, `hsl()`, `oklch()`, `color-mix()` with a literal, or a named colour | everywhere |
| colour | A palette step (`--palette-*`) | everywhere (components use semantic tokens too) |
| type | A font family, or a literal font size, weight, line height or letter spacing | outside ds; inside ds only through `--font-*` tokens |
| shape | A border radius that is not `var(--radius-*)`, 0 or 50% | everywhere |
| motion | A literal easing (`cubic-bezier`, `linear()`) or duration | everywhere |
| layers | A `z-index` that is not `var(--layer-*)`, -1, 0 or 1 | everywhere |
| markup | A static `style=""`, or a `[style]` / `[ngStyle]` binding, unless every property is a component input named `--_*` | outside ds |
| markup | A `<button>`, `<a>` styled as a button, `<input>`, `<select>`, `<textarea>` or `<table>` without its ds directive (`ppButton`, `ppTextField`, `ppSelect`, `ppTextarea`, `ppTable`) | outside ds |
| markup | A `class` naming anything but Layout (`pp-stack`, `pp-inline`, `pp-columns`, `pp-grid`, `pp-gap-*`, `pp-grow`, `pp-fixed`, `pp-push`, `pp-shrink`, `pp-measure-*`, `pp-width-field-*`, `pp-scroll`) and the text helpers (`pp-text*`, `pp-heading*`, `pp-visually-hidden`). A screen that writes `pp-card__header` is building a card by hand; use `<pp-card>` | outside ds |
| markup | A class that is not `pp-` and is not defined in `components.css` (no PrimeFlex, no Tailwind, no one-off feature classes) | everywhere |
| anatomy | A part (`pp-block__part`) outside its block (`pp-block`) in a ds template | ds |
| styles | In a feature stylesheet, any property other than layout: `display`, `grid-*`, `flex-*`, `gap`, `align-*`, `justify-*`, `place-*`, `width`, `min-width`, `max-width`, `height`, `min-height`, `max-height`, `inline-size`, `block-size`, `overflow`, `container-*`. Values only from tokens. Recommendation: prefer no feature stylesheet at all | outside ds |
| styles | `order`, `row-reverse` or `column-reverse` (reading order is source order) | everywhere |
| icons | A glyph or emoji used as an icon; an arrow character used as an icon | everywhere |
| icons | A hand-written `<svg>`, or a Lucide import outside the icon registry (`src/app/ds/core/icon.registry.ts`) | outside the registry |
| icons | `<pp-icon name="…">` with a name not in the icon vocabulary (synced as `icons.json`; see Follow-ups) | everywhere |
| deps | `<p-*>` elements, `pButton`-style directives, or imports from `primeng/*` or `@primeuix/*` outside the four wrapper folders below | everywhere else |
| deps | PrimeFlex, PrimeIcons, a second icon set, or a font package other than Manrope and Inter | `package.json` |

### PrimeNG: four wrappers, nothing else

PrimeNG may be imported only in these folders. Each wraps one PrimeNG component, styles it through pass-through with `pp-` classes (the "PrimeNG mapping" in each spec), and exposes a `pp-*` API that does not leak PrimeNG types.

| Folder | Component | Why PrimeNG |
| --- | --- | --- |
| `src/app/ds/forms/date-picker/` | `<pp-date-picker>` | Calendar keyboard model and locale handling |
| `src/app/ds/forms/autocomplete/` | `<pp-autocomplete>` | Combobox focus and announcement rules |
| `src/app/ds/forms/multi-select/` | `<pp-multi-select>` | Listbox with filter and select-all |
| `src/app/ds/data/table/` | `<pp-table>` for long lists only (virtual scroll, server paging) | Virtual scroll; short tables are plain `<table ppTable>` |

Everything else, including the components whose specs still show a PrimeNG mapping (dialog, drawer, tabs, menu, toast, tooltip and others), is built in `src/app/ds` without PrimeNG. Those mappings are a reference for behaviour, not a dependency. Removing PrimeNG later means rewriting four folders and nothing in a feature.

## What a feature template looks like

```html
<pp-page-header title="Candidates" [breadcrumbs]="crumbs" />
<div class="pp-columns">
  <pp-card title="Pipeline, most urgent first">
    <table ppTable> … </table>
  </pp-card>
  <div class="pp-stack pp-gap-300">
    <pp-proposal-card [proposal]="next" (approve)="approve($event)" />
  </div>
</div>
```

No `style`, no `class` except Layout, no stylesheet.

## Follow-ups in this repo (for the sync to have something to copy)

- Build `project/icons.json` (the vocabulary as data) alongside the readme table, so the app checks icon names against the same list.
- Mark each spec's "PrimeNG mapping" as reference-only, except the four wrappers above.
- Publish a release tag per merge, so `design-system:sync <ref>` pins a version.
