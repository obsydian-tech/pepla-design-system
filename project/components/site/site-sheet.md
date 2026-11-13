---
name: Site sheet
group: site
status: ready
classes: pp-site-sheet
primeng: none (public site only, no PrimeNG; uses Angular Aria and the CDK for focus)
replaces: the public site's phone menu, which had a literal blanket colour, 380px width and no focus handling
---

# Site sheet

The menu on a phone: a panel that slides in from the right over a dimmed page. It holds the same links as the menu, one level deep, and the two calls to action.

## Anatomy

1. **Sheet** (`pp-site-sheet`): a fixed layer over the whole window. `pp-site-sheet--open` when showing.
2. **Blanket** (`pp-site-sheet__blanket`): the dimmed page behind, `--color-blanket`. A tap closes the sheet.
3. **Panel** (`pp-site-sheet__panel`): `role="dialog"`, `aria-modal="true"`, at most `--layout-site-sheet-width` (380px) wide and the full height.
4. **Head** (`pp-site-sheet__head`): the small logo and a close button (an icon Button with `x`).
5. **Headings and lists** (`pp-site-sheet__heading`, `pp-site-sheet__list`): "Product" lists the modules, "More" lists Ask Batsi, Integrations, Learn, Company and Log in.
6. **Link** (`pp-site-sheet__link`): a row at least 44px tall with a hairline under it. "Coming soon" (`pp-site-sheet__soon`) is plain text after the name.
7. **Actions** (`pp-site-sheet__actions`): Book a demo (the one primary, large, full width, `arrow-right`) and Get started (default, large, full width), at the bottom.

## States

| State | How |
| --- | --- |
| Closed | No `--open`. The panel is off to the right, the blanket is transparent and the sheet is `inert` and takes no taps |
| Open | `pp-site-sheet--open`. The panel slides in over `--motion-site-duration-menu`, the blanket fades in over `--motion-site-duration-header` |
| Link hover or focus | A pale ground behind the row |
| Reduced motion | The panel fades in place instead of sliding |
| Still | `data-site-still` turns the transitions off |

## Behaviour

- Opens from the menu button in the header. Closes from the close button, a tap on the blanket, Escape, and when a link is followed.
- On open, focus moves to the close button and stays inside the panel (a focus trap) while it is open; the page behind cannot scroll. On close, focus returns to the menu button.
- The panel scrolls inside itself if the list is taller than the screen, and never scrolls the page behind (`overscroll-behavior: contain`).
- Safe areas (a notch, the home bar) are added to the padding.
- The preview script on the UI kit page opens, closes and traps focus; it is preview-only (see Site header). The Angular site uses the CDK.

## Content

- Headings: "Product" and "More". Links match the menu's wording exactly.
- Buttons: "Book a demo" and "Get started". The close button is named "Close menu".

## Accessibility

- `role="dialog"` with `aria-modal="true"` and `aria-label="Menu"`.
- The sheet is `inert` while closed.
- Every row is at least 44px tall, so it is easy to hit on a phone.
- Focus trap, Escape and focus return as above. The blanket is not focusable; the close button is the keyboard route.
- Text and buttons use the overlay surface, so contrast is the same as any overlay.

## PrimeNG mapping

None. The public site does not use PrimeNG. In Angular the panel is a CDK overlay with a focus trap (`cdkTrapFocus`) and the same classes.

## In Naleko People today

Not in the signed-in app. Source: the phone menu of the approved public site (Concept D), which used a literal blanket colour and a hand-drawn close icon, and did not trap focus or return it.

## Do and don't

- Do keep the sheet one level deep. A person sees every link without opening a second panel.
- Do keep Book a demo as the one primary button on the sheet.
- Don't put the sheet and the menu on the same page width: the menu shows from 1280px, the sheet below it.
- Don't add a language switch or a search field here.
