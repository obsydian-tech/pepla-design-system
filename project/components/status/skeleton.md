---
name: Skeleton
group: status
status: ready
classes: pp-skeleton, pp-skeleton-group, pp-skeleton-row, pp-skeleton-stack
primeng: reference only (built without PrimeNG) — Skeleton (p-skeleton)
replaces: p-skeleton with default theme, full-page spinners, "Loading..." text in lists and drawers
---

# Skeleton

A skeleton holds the shape of content while it loads, so the page does not jump when it arrives. Use it for lists, cards, records and forms. For a single short wait on an action, use Spinner.

## Anatomy

1. **Block**: `--color-skeleton`, with a lighter band (`--color-skeleton-subtle`) sweeping across every 1.6s.
2. **Shape**: matches what will load: a text line, a heading, an avatar circle, a lozenge pill, a field, a button, a card.
3. **Group**: one `pp-skeleton-group` per region, with `role="status"`, `aria-busy="true"` and a hidden label that says what is loading.

## Appearances

| Class | Shape | Use |
| --- | --- | --- |
| `pp-skeleton--text` | 12px line, 4px radius | Body text; end a paragraph with `--text-short` |
| `pp-skeleton--heading` | 20px line, 40% wide | Card and section titles |
| `pp-skeleton--avatar`, `--avatar-small` | 40px or 32px circle | People rows |
| `pp-skeleton--lozenge` | 24px pill | Status column |
| `pp-skeleton--field` | Field height, 12px radius | Forms and config drawers |
| `pp-skeleton--button` | 40px pill | Action rows |
| `pp-skeleton--card` | 160px, 16px radius | Dashboards and summary cards |

Layout helpers: `pp-skeleton-row` (avatar, text, lozenge in a line) and `pp-skeleton-stack` (lines under each other).

## States

| State | How |
| --- | --- |
| Loading | Blocks with the sweep |
| Reduced motion | No sweep; the blocks hold still in `--color-skeleton` |
| Loaded | The group is replaced by the content in one go, with no fade |
| Slow | After 10s, add a line under the group that says what is happening ("Still loading the verifications list") |

## Behaviour

- Show a skeleton only after 300ms, so fast loads never flash.
- Match the real layout: the same number of rows that usually fit, and similar line lengths. Vary widths so it does not look like a barcode.
- Replace the whole group at once. Do not fill in row by row.
- If loading fails, replace the skeleton with a Section message that says what failed and offers "Try again".

## Content

The hidden label names what is loading: "Loading people", "Loading the registration form". Not "Loading...".

## Accessibility

- The group has `role="status"`, `aria-busy="true"` and a hidden `pp-skeleton-group__label`. Blocks are empty spans with no role.
- When content arrives, set `aria-busy="false"` (or replace the element) so screen readers read the result.
- The sweep stops under `prefers-reduced-motion`.

## PrimeNG mapping

> **Reference only.** In the Angular app this component is built in `src/app/ds` without PrimeNG. The mapping below describes the behaviour to match; it is not a dependency. The app uses no PrimeNG at all: the hard patterns are built on Angular Aria and the Angular CDK (see `docs/verify-design-angular.md`).

```ts
skeleton: {
  root: ({ props }) => ({
    class: ['pp-skeleton', {
      'pp-skeleton--avatar': props.shape === 'circle',
    }],
  }),
},
```

Prefer the `pp-skeleton--*` shape classes over PrimeNG's `width`, `height` and `borderRadius` inputs, so shapes match the components they stand in for.

## In Pepla today

`p-skeleton` is already used in 6 HR dashboard views: the home page, the verifications list, verification detail, employee detail, notifications and the support inbox. Other areas show a blank page or spinner while loading.

## Do and don't

- **Do** match the shape of what is coming. **Don't** show a single grey box for a whole table.
- **Do** say what is loading in the hidden label. **Don't** leave screen reader users with silence.
- **Do** stop the sweep for reduced motion. **Don't** pulse or flash instead.
