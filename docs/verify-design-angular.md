# verify:design for the Naleko People Angular app

This is the spec for the check the Angular app runs on every build. It enforces the same "only way to build UI" rules this repo applies to its kits (see `project/readme.md`), on Angular templates and stylesheets. It also bans PrimeNG and every other UI kit.

Status: built in phase 5 (`pepla-web`, 11 Nov 2026). What Iggie decided on 11 Nov 2026:
- Angular 22, which has long-term support until June 2028.
- Screens use only `pp-*` components from one `src/app/ds` folder.
- **No PrimeNG.** PrimeNG 22 needs a PrimeUI licence key. The few hard interaction patterns are built on [Angular Aria](https://angular.dev/guide/aria/overview) (stable since Angular 22.0, MIT licence) and the Angular CDK.

The app is recommended to live as the `pepla-web/` folder in obsydian-tech/hr-portal; that choice is still open.

## Where things live in the app

| Path | What | Who edits it |
| --- | --- | --- |
| `src/styles/design-system/` | The tokens (`tokens/*.css`), `components.css` and `icons.json`, copied from this repo by `npm run design-system:sync -- <ref>`. `sync.json` holds the ref and a sha256 for every file | Only the sync script |
| `src/app/ds/` | Every UI primitive, as standalone `pp-*` components and directives, grouped like this repo (core, actions, status, messages, overlays, navigation, forms, data, agent, records) | The design system port |
| `src/app/ds/core/icon.registry.ts` | The only file that imports Lucide, generated from `icons.json` | Only the sync script |
| `src/app/ds/README.md` | How to use the port | The design system port |
| `src/app/features/**` | Screens. They compose `pp-*` components and Layout classes, and style nothing else | Feature work |
| `/dev/design-system` | A gallery route showing every `pp-*` component in its states | The design system port |

## How it runs

- `npm run verify:design` runs `scripts/verify-design.mjs`.
- `prebuild` runs it, so `ng build` and the deploy pipeline fail on any violation. CI runs it on every pull request.
- It prints `file:line [rule] text`, and ends with a pointer to `src/app/ds/README.md`.
- It reads everything under `src/`: `.html` templates, `.ts` files (inline `template:`, `styles:`, host classes and imports), `.css` files, and `package.json`. Comments are ignored.
- **There is no escape hatch.** No ignore comment, no allowlist file and no baseline. The app is a rebuild, so the check is on from the first commit and stays at zero.
- `npm run test:design` feeds `scripts/verify-design.test.mjs` one small fixture per rule and asserts that each fixture fails. A weakened rule therefore fails the tests.

## Rules

"Outside ds" means any file not under `src/app/ds/`. "Everywhere" includes ds.

| Rule | Fails on | Where |
| --- | --- | --- |
| tokens | A file under `src/styles/design-system/` that doesn't match its hash in `sync.json`, or a file the sync didn't write | everywhere |
| colour | A hex, `rgb()`, `hsl()`, `oklch()`, `color-mix()` or named colour | everywhere |
| colour | A palette step (`--palette-*`) | everywhere |
| type | A font family, or a literal font size, weight, line height or letter spacing | everywhere |
| shape | A border radius that isn't `var(--radius-*)`, 0 or 50% | everywhere |
| motion | A literal easing (`cubic-bezier`, `linear()`) or duration | everywhere |
| layers | A `z-index` that isn't `var(--layer-*)`, -1, 0 or 1 | everywhere |
| markup | A static `style=""`, or a `[style]`, `[style.x]` or `[ngStyle]` binding, unless every property is an input named `--_*` | everywhere |
| markup | A `<button>`, `<input>`, `<textarea>` or `<table>` without its ds directive (`ppButton` or `ppMenuItem`, `ppTextField`, `ppTextarea`, `ppTable`), or any native `<select>` (use `<pp-select>`) | outside ds |
| markup | A class that isn't Layout (`pp-stack`, `pp-inline`, `pp-columns`, `pp-grid`, `pp-gap-*`, `pp-grow`, `pp-fixed`, `pp-push`, `pp-shrink`, `pp-measure-*`, `pp-width-field-*`, `pp-scroll`) or a text helper (`pp-text*`, `pp-heading*`, `pp-visually-hidden`), whether static or bound with `[class.x]`. A screen that writes `pp-card__header` is building a card by hand: use `<pp-card>` | outside ds |
| markup | A class that isn't `pp-` or isn't defined in the synced CSS (no PrimeFlex, no Tailwind, no one-off classes). Inside ds this also covers parts and modifiers written in TypeScript | everywhere |
| markup | A `<style>` or `<script>` block in a template | everywhere |
| anatomy | A part (`pp-block__part`) outside its block (`pp-block`). The block can be on the element, an ancestor, or the host of a component in the same file | ds |
| styles | In a screen stylesheet or inline `styles:`, any property other than layout (`display`, `grid-*`, `flex-*`, `gap`, `align-*`, `justify-*`, `place-*`, sizes, `overflow`, `container-*`). Recommendation: no screen stylesheets at all | outside ds |
| styles | `order`, `row-reverse` or `column-reverse` (reading order is source order) | everywhere |
| styles | Anything in `src/styles.css` other than the design system import | `src/styles.css` |
| icons | A glyph or emoji used as an icon, or an arrow character used as an icon | everywhere |
| icons | A hand-written `<svg>`; only `<svg ppIcon="…">` and the mark `<svg ppMark>` | everywhere |
| icons | An icon name (`ppIcon`, `icon`, `iconAfter`, `helpIcon`, `statusIcon`) that isn't in `icons.json` | everywhere |
| icons | A Lucide import outside the icon registry, or a registry that doesn't match `icons.json` | everywhere |
| deps | `<p-*>` elements, `pButton`-style directives, or imports from `primeng`, `@primeuix` or `@angular/material` | everywhere |
| deps | PrimeNG, PrimeFlex, PrimeIcons, Angular Material, Bootstrap, Tailwind, a second icon set, or a font package other than Inter and Manrope | `package.json` |

### Icons are `<svg ppIcon>`, not `<pp-icon>`

The component CSS sizes icons with child selectors such as `.pp-button > svg`. So the icon directive sits on the `<svg>` itself: `<svg ppIcon="check" />`. It draws the Lucide nodes from the registry inside that element. The mark works the same way: `<svg ppMark />`.

### The hard patterns: Angular Aria and the CDK

| Folder | Component | Built on |
| --- | --- | --- |
| `src/app/ds/forms/date-picker/` | `<pp-date-picker>` | Naleko People's own calendar grid, following the [WAI-ARIA date picker dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/). The CDK overlay places it. Aria has no date picker |
| `src/app/ds/forms/autocomplete/` | `<pp-autocomplete>` | Aria `ngCombobox` and `ngListbox`, with the CDK overlay |
| `src/app/ds/forms/multi-select/` | `<pp-multi-select>` | Aria `ngCombobox` and a multi `ngListbox`, with the CDK overlay |
| `src/app/ds/data/table/` | `<pp-table>`, for long lists only | CDK virtual scroll on the page's own scroll, loading the next page before the end. Short tables are a plain `<table ppTable>` |

Dialogs use the CDK focus trap. Everything else is plain Angular. The "PrimeNG mapping" sections in this repo's specs are a reference for behaviour only, not a dependency.

## What a feature template looks like

```html
<pp-page-header heading="Candidates" [breadcrumbs]="crumbs" />
<div class="pp-columns">
  <pp-card heading="Pipeline, most urgent first">
    <table ppTable> … </table>
  </pp-card>
  <pp-proposal-list>
    <pp-proposal-row [proposal]="next" (approve)="approve(next)" (review)="open(next)" />
  </pp-proposal-list>
</div>
```

No `style`, no `class` except Layout, no stylesheet.

## Follow-ups

- Done: `project/icons.json`, generated from the readme by `scripts/icons-json.mjs`.
- Done: each spec's "PrimeNG mapping" is marked reference-only.
- Publish a release tag per merge, so `design-system:sync -- <ref>` pins a version. The first tag is `v1.0.0`, once this branch is merged.
