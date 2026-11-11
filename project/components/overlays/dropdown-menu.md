---
name: Dropdown menu
group: overlays
status: ready
classes: pp-dropdown-menu
primeng: reference only (built without PrimeNG) — Menu (p-menu, popup mode)
replaces: p-menu, hand-built "..." row menus, the topbar avatar menu
---

# Dropdown menu

A dropdown menu lists actions or choices behind a button: row actions behind "More actions", sort options, the avatar menu. It shares the Popup surface and placement.

## Anatomy

1. **Trigger**: a button with `aria-haspopup="menu"`, usually `ellipsis` (icon-only) or a label with `chevron-down`.
2. **Container**: overlay surface, `--radius-large`, overlay shadow, 6px padding, 220px to 320px wide.
3. **Section**: a group of related items, divided by a 1px border. Optional heading in `--font-heading-xxsmall`.
4. **Item**: 16px Lucide icon, label, and an optional end slot (a shortcut, a value, or a check). 40px tall, 44px on touch, 48px on phone.
5. **Danger item**: last in the last section, crimson text and icon.

## Appearances

| Class | Use |
| --- | --- |
| `pp-dropdown-menu__item` | An action or a link |
| `role="menuitemradio"` + `aria-checked` | One choice from a set (sort by); a `check` in the end slot marks the chosen one |
| `pp-dropdown-menu__item--danger` | Removes or ends something; opens a confirm. Always last |
| `pp-dropdown-menu--end` | Aligned to the trigger's end (row actions at the right edge) |
| `pp-dropdown-menu--inline` | Rendered in place, for docs only |

## States

| State | How |
| --- | --- |
| Hover | Neutral subtle hovered fill, 100ms (danger items: danger subtle) |
| Focus | Keyboard focus moves the ring between items, drawn inside the item |
| Pressed | Neutral subtle pressed fill |
| Checked | Selected text colour and a check at the end |
| Disabled | `aria-disabled="true"`: disabled text, still focusable so screen readers find it. Pair with a `lock` icon when it is a permission issue |

## Behaviour

- Opens on click, Enter, Space or Down arrow; focus goes to the first item (Up arrow opens it on the last).
- Up and Down move between items and wrap; Home and End jump; typing a letter jumps to the next item starting with it.
- Enter or Space runs the item and closes the menu; focus returns to the trigger. Escape closes without running anything; Tab closes and moves on.
- Running a danger item opens a Modal dialog that names the person and the consequence.
- On phone the menu opens as a bottom sheet with 48px items.

## Content

- Items are verbs plus object, sentence case: "Edit details", "Send document", "Remove access".
- At most 7 items; split into sections past 4. The danger item is always last and alone in its section where possible.
- Section headings use words from the icon vocabulary: "Move and exit".
- Use the person's name in the trigger's label: "More actions for Thandeka Dlamini".

## Accessibility

- Container `role="menu"` with a label; sections `role="group"`; items `role="menuitem"` (or `menuitemradio`/`menuitemcheckbox`); list items `role="none"`.
- Roving focus: only one item is in the tab order at a time.
- Trigger has `aria-haspopup="menu"`, `aria-expanded` and `aria-controls`.
- Disabled items stay focusable with `aria-disabled`, and say why on focus through a tooltip ("Only payroll admins can change salaries").

## PrimeNG mapping

> **Reference only.** In the Angular app this component is built in `src/app/ds` without PrimeNG. The mapping below describes the behaviour to match; it is not a dependency. Only the date picker, autocomplete, multi-select and long tables wrap PrimeNG (see `docs/verify-design-angular.md`).

```ts
menu: {
  root: ({ props }) => ({ class: ['pp-dropdown-menu', { 'pp-dropdown-menu--end': props.styleClass?.includes('end') }] }),
  list: { class: 'pp-dropdown-menu__section' },
  submenuLabel: { class: 'pp-dropdown-menu__heading' },
  item: { class: '' },
  itemLink: ({ context }) => ({
    class: ['pp-dropdown-menu__item', { 'pp-dropdown-menu__item--danger': context.item.styleClass === 'danger' }],
    'aria-disabled': context.disabled || undefined,
  }),
  itemIcon: { class: '' },
  itemLabel: { class: '' },
  separator: { style: 'display:none' },
}
```

Use `<p-menu [popup]="true" [model]="items" appendTo="body">` and pass Lucide icons through the `#item` template. Mark danger items with `styleClass: 'danger'`.

## In Pepla today

`p-menu` is used once, on the TalentFlow intelligence tile. The topbar notification dropdown is its own component (`notification-dropdown`). Other row actions are separate icon buttons rather than a menu.

## Do and don't

- **Do** put the danger item last, in its own section. **Don't** hide it between harmless actions.
- **Do** give every item an icon or none. **Don't** mix.
- **Do** keep menus for actions and choices. **Don't** use a menu for navigation between pages (use Tabs or Side navigation).
