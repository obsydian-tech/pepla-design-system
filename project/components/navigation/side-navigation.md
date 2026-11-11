---
name: Side navigation
group: navigation
status: ready
classes: pp-side-navigation
primeng: none (plain Angular template with routerLinkActive)
replaces: the 5 separate app shells and sidebars (HR, TalentFlow, Onboarding, employee portal, IT)
---

# Side navigation

The side navigation is the app's main menu: the product switcher at the top, the areas of the product below, settings at the bottom. One sidebar serves every Pepla product; the switcher changes which areas it lists.

## Anatomy

1. **Product switcher**: the Pepla mark, the lowercase wordmark `pepla`, the product and company ("HR, Mokoena Logistics") and `chevrons-up-down`. Opens a Dropdown menu of products the person can use. 56px tall, lined up with the top navigation.
2. **Sections**: groups of items. The first has no heading; later ones have a short heading in `--font-heading-xxsmall`.
3. **Item**: 20px Lucide icon from the vocabulary, a label, and an optional count. 40px tall; 44px on touch; 48px on phone.
4. **Selected item**: selected fill, violet text and icon, a 4px bar on the left edge.
5. **Count**: a small pill with the number of things waiting for this person.
6. **Footer**: Settings, pinned to the bottom.

## Appearances

| Class | Use |
| --- | --- |
| (default) | 256px (`--layout-sidebar-width`), desktop and tablet |
| `pp-side-navigation--collapsed` | 64px (`--layout-sidebar-width-collapsed`): icons only, counts become a small bubble on the icon, section headings become dividers. The person chooses it; Pepla remembers |
| `pp-side-navigation--inline` | Rendered in place for docs; skips the phone drawer |

## States

| State | How |
| --- | --- |
| Hover | Neutral subtle hovered fill, text to full strength, 100ms |
| Focus | Ring drawn inside the item |
| Selected | `aria-current="page"`: selected fill, violet text and icon, the left bar; the count turns violet bold |
| Collapsed | Labels are visually hidden but stay readable by screen readers; each item shows a tooltip on hover and focus (`pp-tooltip--end`) |
| Open on phone | `data-open="true"`: slides in from the left over 300ms with a blanket behind |

## Behaviour

- The selected item follows the route, including child pages: a person's profile keeps People selected.
- Counts show only what waits for this person, and hide at 0. Above 99 they show "99+".
- The collapse toggle lives in the top navigation (`panel-left`) on desktop.
- On phone the sidebar is a drawer from the left, opened by the menu button in the top navigation. Choosing an item closes it. Escape and a blanket tap close it.
- The product switcher lists only the products the person can use; a person with one product sees no chevron.

## Content

- Item labels are the area names from the icon vocabulary: "Hire", "Onboard", "Time off", "Help desk", "Move and exit", "Comply", "Perform". One or two words, sentence case.
- Section headings are one word: "Work", "Admin".
- The wordmark is always lowercase `pepla`.

## Accessibility

- A `<nav aria-label="Main">` with lists of links. The selected link has `aria-current="page"`.
- Counts carry their meaning in an `aria-label` ("3 waiting"), not only a number.
- Collapsed labels use a visually hidden class, never `display: none`, so each link keeps its name.
- On phone the open sidebar is a modal: focus moves to the first item, is trapped, and returns to the menu button on close.
- The mark is the inline `pp-logo__mark` SVG with `aria-hidden="true"`; the switcher's name comes from its text or `aria-label`.

## PrimeNG mapping

No PrimeNG component. Build it as a plain Angular template; on phone, wrap it in `p-drawer` with `position="left"` and pass-through to keep Pepla's styling:

```ts
drawer: {
  root: ({ props }) => ({ class: props.position === 'left' ? 'pp-side-navigation' : 'pp-drawer' }),
}
```

```html
<a class="pp-side-navigation__item" routerLink="/approvals" routerLinkActive #rla="routerLinkActive"
   [attr.aria-current]="rla.isActive ? 'page' : null">
  <i-lucide name="circle-check" /><span class="pp-side-navigation__label">Approvals</span>
</a>
```

## In Pepla today

There are several shells, each with its own navigation: the shared `sidebar` used by the HR dashboard, the TalentFlow shell, the TalentFlow admin shell (`admin-sidebar`), the IT provisioning shell and the platform shell. This one sidebar with a product switcher replaces them.

## Do and don't

- **Do** use one icon per area, from the vocabulary. **Don't** invent an icon for a page.
- **Do** keep counts for things waiting on this person. **Don't** show totals ("38 people").
- **Do** keep the wordmark lowercase. **Don't** colour the mark's circles yourself; use `pp-logo__mark`, which follows the theme.
