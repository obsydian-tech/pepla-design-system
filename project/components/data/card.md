---
name: Card
group: data
status: ready
classes: pp-card, pp-card__aside, pp-card-grid
primeng: reference only (built without PrimeNG) — Card (p-card)
replaces: p-card (25 uses) and the many hand-made white boxes with their own shadows
---

# Card

A card groups everything about one thing: a person, a document, a task, a setting. Use it to set one object apart; never wrap every block of a page in a card.

## Anatomy

1. **Container**: raised surface, 1px border, 16px radius, 24px padding.
2. **Header** (optional): icon tile or avatar, title, subtitle, and `pp-card__aside` at the end, top right: one lozenge, one action (usually an icon button with a menu), or a lozenge then an action.
3. **Body**: content.
4. **Footer** (optional): actions or meta, separated by a border.

## Appearances

| Class | Use | Never |
| --- | --- | --- |
| `pp-card` | A standalone object on the cream page | Inside another card |
| `pp-card--compact` | Dense lists of cards, sidebar panels | For the main object of a page |
| `pp-card--sunken` | A quiet group inside a raised area, such as a settings block in a drawer | On the cream page (it disappears) |
| `pp-card--overlay` | Something that floats: a proposal shown over a list | Static page content |
| `pp-card--interactive` | The whole card opens something | When the card also holds other buttons; then only the title is a link |
| `pp-card--selected` | Chosen option in a set of cards (a template, a plan) | For highlighting importance |
| `pp-card-grid` | Responsive grid, 280px minimum columns | Fewer than 2 cards |

## States

| State | How |
| --- | --- |
| Hover (interactive) | Raised-hovered background and bold border |
| Pressed (interactive) | Raised-pressed background |
| Selected | 2px violet border and selected wash |
| Loading | Use Skeleton shapes inside the same card |

## Behaviour

- An interactive card is one link (`<a class="pp-card pp-card--interactive">`); nested buttons are not allowed in it.
- Card heights follow content; in a grid, cards in a row stretch to the tallest.
- On phone, cards go full width with 16px padding (use `--compact`).

## Content

- Title: the thing's name ("Thandeka Dlamini", "Laptop and email setup"), not a category ("Employee").
- Subtitle: one fact that tells cards apart ("Bookkeeper · Starts 17 Nov").

## Accessibility

- Give the card a heading element for its title so screen-reader users can jump between cards.
- An interactive card's accessible name is its title; keep extra text short.
- Selected cards in a choice group are radio inputs styled as cards, with `aria-checked`.

## PrimeNG mapping

> **Reference only.** In the Angular app this component is built in `src/app/ds` without PrimeNG. The mapping below describes the behaviour to match; it is not a dependency. The app uses no PrimeNG at all: the hard patterns are built on Angular Aria and the Angular CDK (see `docs/verify-design-angular.md`).

```ts
card: { root: { class: 'pp-card' }, header: { class: 'pp-card__header' }, title: { class: 'pp-card__title' }, subtitle: { class: 'pp-card__subtitle' }, body: { class: 'pp-card__body' }, footer: { class: 'pp-card__footer' } }
```

## In Pepla today

Document detail card, provisioning bundle card, hiring-manager task card, AI template gallery and the tenant settings cards (branding, locale, approval chains). Each uses its own padding, radius and shadow today.

## Do and don't

- **Do** use a card to set one object apart. **Don't** card every section of a page.
- **Do** keep one action in the header. **Don't** add a row of five icon buttons.
- **Do** use borders on the cream page. **Don't** add drop shadows to static cards.
