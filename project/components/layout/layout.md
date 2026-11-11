---
name: Layout
group: layout
status: ready
classes: pp-stack, pp-inline, pp-columns, pp-grid, pp-gap-*, pp-grow, pp-fixed, pp-push, pp-shrink, pp-measure-*, pp-width-field-*, pp-scroll
primeng: none (plain div, ul, ol and dl)
replaces: every style="display:flex…" and style="display:grid…" in today's templates, PrimeFlex flex, grid, gap-* and col-* classes
---

# Layout

Layout is how a screen arranges components: one under another, side by side, a main column with a side column, or equal tiles. It is the only way to do that. **No screen, kit or example sets `style=""`**; `npm run verify:design` fails the build if one does. If these primitives cannot express a layout, the layout is a new pattern: add it here (or to the component it belongs to) first, then use it.

## Anatomy

| Primitive | Class | What it does | Default gap |
| --- | --- | --- | --- |
| Stack | `pp-stack` | Children one under another | `--space-200` |
| Inline | `pp-inline` | Children in a row, centred, wrapping when there is no room | `--space-100` |
| Columns | `pp-columns` | The page's main column and a side column of `--layout-aside-width` (340px); one column below 1024px | `--space-300` |
| Grid | `pp-grid` | Equal tiles that fit as many as the width allows (240px minimum) | `--space-200` |

Modifiers:

| Class | Use |
| --- | --- |
| `pp-gap-0`, `pp-gap-025` … `pp-gap-600` | Any other space step between children. Only space tokens: there is no in-between gap |
| `pp-stack--start`, `pp-stack--center` | Children keep their own width (a button under text), or sit centred |
| `pp-inline--between`, `--end`, `--center` | Spread a row to both ends, or push it to the end or centre |
| `pp-inline--top`, `--bottom`, `--baseline`, `--stretch` | Line children up on their tops, bottoms, text baselines, or full height |
| `pp-inline--nowrap`, `pp-inline--fit` | Keep a row on one line; make it only as wide as its content |
| `pp-columns--panel`, `--aside-start`, `--wide-aside`, `--even` | A 480px side column for the agent panel or a working card; side column first; a 7 to 5 split; two equal columns. A side column is 340px or 480px, nothing in between |
| `pp-grid--2` … `pp-grid--6`, `pp-grid--small`, `pp-grid--large`, `pp-grid--bottom` | Fixed counts (fewer on a phone); 160px or 380px tiles; line tiles up on their bottoms |
| `pp-grow`, `pp-grow--field`, `pp-fixed`, `pp-push`, `pp-shrink` | Inside a row: take the free space, take it but never under 120px, keep own size, push to the far end, allow shrinking below content width |
| `pp-measure-narrow`, `pp-measure-form`, `pp-measure-reading` | At most 360px, 560px or 720px wide |
| `pp-width-field-small`, `pp-width-field-medium` | A control that should not stretch: 220px or 320px |
| `pp-scroll` | A region that scrolls inside itself above its `--_height` |

A `ul`, `ol` or `dl` with a layout class loses its bullets, margin and padding. For a bulleted list of sentences use `pp-list` (Text).

## States

Layout has no states. It responds to width only: `pp-columns` stacks below 1024px, `pp-grid--3` and up fall to two columns below 768px and one below 480px, and `pp-inline` wraps.

## Behaviour

- A gap belongs to the parent, never to a child: there are no margin utilities. Space between the page header and the page, and between sections, comes from the app shell content column (24px).
- Inline values a component takes as input, such as a progress (`--_pct`), a height for an in-place frame (`--_height`) or a gap a component exposes (`--_gap`), are the only things `style=""` may set, and only as custom properties starting `--_`.

## Content

Layout carries no content of its own. Order the children in reading order; never reorder visually.

## Accessibility

- Reading order is source order at every width. Nothing uses `order` or `row-reverse`.
- Rows wrap rather than scroll sideways, so nothing hides off screen at 390px.

## PrimeNG mapping

None. These are plain elements with classes. In the Angular app the same classes are used in templates (`<div class="pp-stack pp-gap-300">`), and screens style nothing else.

## In Pepla today

Today's templates set layout inline (`style="display:flex; gap: 8px"`) or with PrimeFlex (`flex gap-2`, `grid col-6`), with gaps of 6, 10, 14 and 18px that are not on the space scale. The 6 UI kits carried 364 inline styles before this component; they now carry none.

## Do and don't

- **Do** pick the primitive by what the children are to each other: one under another, a row, main and side, or tiles.
- **Don't** add `style=""`, a margin to a child, or a one-off class to move something. Add a modifier here, with its use, and use that.
- **Do** use the component's own structure first: a card's header, a form's rows, a drawer's footer already lay themselves out.
- **Don't** use Grid for a table of data. Use Table.
