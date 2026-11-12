---
name: Side navigation
group: navigation
status: ready
classes: pp-side-navigation
primeng: none (plain Angular template with routerLinkActive)
replaces: the 5 separate app shells and sidebars (HR, TalentFlow, Onboarding, employee portal, IT)
---

# Side navigation

The side navigation is Naleko People's one main menu, the same in every module: the company at the top, then Today and People, then a section per module (Hire, Onboard, Requests, Help desk), and Settings at the bottom. A person sees only the modules their company has and their role allows. Modules such as Naleko People Hire and Naleko People Onboard are what a company buys, never separate apps with their own menus.

## Anatomy

1. **Company switcher** (`pp-side-navigation__product`): the Naleko People mark, the wordmark "Naleko People", the company name and `chevrons-up-down`. Opens a Dropdown menu of the companies the person belongs to (an accountant or HR partner may serve several). A person with one company sees the name with no chevron, and it is not a button. 56px tall, lined up with the top navigation.
2. **Sections**: groups of items. The first has no heading; later ones have a short heading in `--font-heading-xxsmall`.
3. **Item**: 20px Lucide icon from the vocabulary, a label, and an optional count. 40px tall; 44px on touch; 48px on phone.
4. **Selected item**: selected fill, violet text and icon, a 4px bar on the left edge.
5. **Count**: a small pill with the number of things waiting for this person.
6. **Footer**: Settings, pinned to the bottom.

## Appearances

| Class | Use |
| --- | --- |
| (default) | 256px (`--layout-sidebar-width`), desktop and tablet |
| `pp-side-navigation--collapsed` | 64px (`--layout-sidebar-width-collapsed`): icons only, counts become a small bubble on the icon, section headings become dividers. The person chooses it; Batsi remembers |
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
- The order never changes: Today, People, then modules in the order Hire, Onboard, Leave, Requests, Help desk, Move and exit, Comply, then Settings. A module's section heading is the module name; its items are that module's main lists. A hidden module leaves no gap.
- By role: an HR admin sees every module the company has; a hiring manager sees Today, Hire (their candidates) and Requests; IT sees Today and Requests; an employee or new employee sees Today, My onboarding, Documents, My details and Help.
- Settings opens settings mode: the same sidebar lists the settings sections, with "Back to Today" at the top.
- The company switcher lists only the companies the person belongs to; with one company there is no chevron and no menu.

## Content

- Item labels are the area names from the icon vocabulary: "Hire", "Onboard", "Leave", "Help desk", "Move and exit", "Comply", "Perform". One or two words, sentence case.
- Section headings are one word: "Work", "Admin".
- The wordmark reads "Naleko People" in the heading font.

## Accessibility

- A `<nav aria-label="Main">` with lists of links. The selected link has `aria-current="page"`.
- Counts carry their meaning in an `aria-label` ("3 waiting"), not only a number.
- Collapsed labels use a visually hidden class, never `display: none`, so each link keeps its name.
- On phone the open sidebar is a modal: focus moves to the first item, is trapped, and returns to the menu button on close.
- The mark is the inline `pp-logo__mark` SVG with `aria-hidden="true"`; the switcher's name comes from its text or `aria-label`.

## PrimeNG mapping

No PrimeNG component. Build it as a plain Angular template; on phone, wrap it in `p-drawer` with `position="left"` and pass-through to keep Naleko People's styling:

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

## In Naleko People today

There are several shells, each with its own navigation: the shared `sidebar` used by the HR dashboard, the TalentFlow shell, the TalentFlow admin shell (`admin-sidebar`), the IT provisioning shell and the platform shell. This one sidebar, grouped by module, replaces them.

## Do and don't

- **Do** use one icon per area, from the vocabulary. **Don't** invent an icon for a page.
- **Do** keep counts for things waiting on this person. **Don't** show totals ("38 people").
- **Do** write the wordmark as "Naleko People". **Don't** colour the mark's circles yourself; use `pp-logo__mark`, which follows the theme.
