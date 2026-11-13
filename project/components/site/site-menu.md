---
name: Site menu
group: site
status: ready
classes: pp-site-menu
primeng: none (public site only, no PrimeNG)
replaces: the public site's mega menu, which animated left, width and height and highlighted with a sliding block
---

# Site menu

The main links in the header. Product, Integrations, Resources and Company open a list; Ask Batsi is a plain link. One shared panel opens under the links: it slides to the link you point at, resizes to fit the list, and the new list fades in with its entries one after another.

## Anatomy

1. **Menu** (`pp-site-menu`): the `<nav>` that holds everything below. `pp-site-menu--open` while a list is showing.
2. **List and items** (`pp-site-menu__list`, `pp-site-menu__item`): the row of top-level entries.
3. **Trigger** (`pp-site-menu__trigger`): a 40px pill-shaped link or button. A button has a label and `chevron-down` (`pp-site-menu__chevron`, which turns over when open). A link ("Ask Batsi") has the label only.
4. **Shared background** (`pp-site-menu__morph`) and **arrow** (`pp-site-menu__arrow`): drawn once for the whole menu, before the list. The background is one fixed size (`--layout-site-menu-max` by `--layout-site-menu-height-max`) and is scaled down to the open list.
5. **Panel** (`pp-site-menu__panel`): one per list, transparent, on the shared background. Three widths: narrow (the default, `--layout-narrow-max`), `pp-site-menu__panel--medium` (`--layout-drawer-width-medium`) and `pp-site-menu__panel--wide` (`--layout-site-menu-max`, two columns). `pp-site-menu__panel--open` for the one showing.
6. **Entry** (`pp-site-menu__link`): an icon tile, a name (`pp-site-menu__name`), a hint (`pp-site-menu__hint`, only where the approved site has one) and, for something not built yet, "Coming soon" in a small pill (`pp-site-menu__soon`). Mint is used only for the entry that is Batsi's own (the MCP server).
7. **Foot** (`pp-site-menu__foot`): a closing line and one link. Only the Product list has one.

## States

| State | How |
| --- | --- |
| Closed | No `--open` on the menu. Panels are `inert` and invisible; the background and arrow are transparent |
| Open | `pp-site-menu--open` on the menu, `pp-site-menu__panel--open` on one panel, `aria-expanded="true"` on its trigger, the others `inert` |
| Trigger hover or open | A pale violet layer fades in behind the label |
| Entry hover or keyboard focus | A pale violet layer fades in behind the entry |
| Switching lists | The background and arrow slide and resize to the new list; the old panel fades and moves 40px away from the direction of travel; the new one fades in from the other side |
| Reduced motion | Panels fade and land where they belong; they do not fly in from the side |
| Still | `data-site-still` turns the transitions off |

## Behaviour

- Inputs the page script sets (they are the only inline values): on the menu, `--_x` (the open panel's distance from the menu's left edge), `--_sx` and `--_sy` (the background's size as a fraction of its reference size, 0 to 1) and `--_ax` (where the arrow points); on each panel, its own `--_x` and, while it moves away or arrives, `--_dir` (1 or -1, the side it comes from).
- The panel never changes its real size. The shared background is scaled with `transform`, which is why the menu is smooth: moving or resizing a box with `left`, `width` or `height` made the old menu stutter. The corner radius is the small medium radius so the scale does not show.
- A panel's left edge is the left edge of its trigger, pulled back in so the panel never runs past the menu on the right.
- Open on hover (with a 120ms grace so a pointer can cross the gap), on click or Enter or Space for touch and keyboard. Opening another trigger swaps the list. Close on Escape, on a click outside, and when the pointer leaves the menu.
- Each entry arrives `--motion-site-stagger` after the one before, set through `--_i` on the entry.
- The preview script on the UI kit page does the measuring and the opening; it is preview-only (see Site header). The Angular site does the same in a directive.

## Content

- Top level: Product, Ask Batsi, Integrations, Resources, Company.
- Product: Employee Records, Recruitment, Onboarding and Offboarding, Leave Management, Compliance Management, HR Help Desk (Coming soon), Performance Management (Coming soon), Platform. Foot: "South Africa first: BCEA, UIF, SARS, POPIA" and "See it on a call".
- Integrations: API, MCP server, Events and webhooks, Payroll providers (Coming soon), Verification providers (Coming soon).
- Resources: Help centre, Security and POPIA, Developer documentation. This is the approved site's word. The word rules avoid "resource", so the content audit allows this one label only (see scripts/content-audit.mjs).
- Company: About Naleko Digital Solutions, Contact.
- A hint is one short fact in noun form, not a sentence with "you".

## Accessibility

- A `<nav aria-label="Main">` with a list of items. A list trigger is a `<button>` with `aria-expanded` and `aria-controls`; "Ask Batsi" is a link.
- Closed panels are `inert`, so they cannot be tabbed into or read out.
- Tab goes from trigger to trigger; Enter or Space opens a list and moves focus into it; Arrow keys move between entries; Escape closes the list and returns focus to its trigger.
- "Coming soon" is words in the entry, not a colour or an icon alone.
- A pointer is not required: every list opens from the keyboard.
- Reduced motion keeps the fades.

## PrimeNG mapping

None. The public site does not use PrimeNG. In Angular, `<pp-site-menu>` uses the CDK for focus and keyboard handling and a directive for the measuring.

## In Naleko People today

Not in the signed-in app. Source: the dropdowns of the approved public site (Concept D), which moved the panel with `left`, `width` and `height`, slid a highlight block with `width` and `height`, tilted with the pointer (not carried over) and used hand-drawn icons and literal colours.

## Do and don't

- Do give every list at most eight entries; a list longer than that is a page.
- Do put an unbuilt module in the list with the "Coming soon" pill.
- Don't tilt or parallax the panel with the pointer.
- Don't make Ask Batsi a list. It is a link to the Batsi band on the home page.
- Don't set a width or height on a panel from a script; set the inputs above.
