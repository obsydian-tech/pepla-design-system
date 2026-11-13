---
name: Site header
group: site
status: ready
classes: pp-site-header, pp-site-frame
primeng: none (public site only, no PrimeNG)
replaces: the public site's own header CSS, which animated height, width and background and used literal colours and durations
---

# Site header

The bar at the top of every public page: the logo, the menu ([Site menu](site-menu.html)), Log in, Get started and Book a demo. After a scroll it turns frosted and a little shorter. Below 1280px the menu becomes a button that opens the [Site sheet](site-sheet.html).

## Anatomy

1. **Header** (`pp-site-header`): sticky at the top, `--layout-site-header-height` tall (72px) and 56px shrunk. It floats over the page, so the first section starts under it.
2. **Bar** (`pp-site-header__bar`): the content row, its content at most `--layout-site-max` wide, with the site gutter on each side.
3. **Logo** (`pp-site-header__logo`, with `pp-logo`): the Logo component, default size. A link home. The three circles of the mark breathe: each swells to 108% and settles over 6s, one third of a cycle apart (`scale` only; 12s under reduced motion, never still; off in still mode).
4. **Menu** (`pp-site-header__menu`): holds the [Site menu](site-menu.html). Hidden below 1280px.
5. **Actions** (`pp-site-header__actions`): Log in (`pp-site-header__login`, a subtle Button), Get started (`pp-site-header__secondary`, a line [Site button](site-button.html)) and Book a demo (`pp-site-header__primary`, the dark Site button with the growing mint dot and `arrow-right`). The menu button (`pp-site-header__burger`) is an icon Button with `menu`.
6. **Skip link** (`pp-site-header__skip`): "Skip to content", first in the tab order, seen only while focused.
7. **Frame** (`pp-site-frame`, `pp-site-frame--desktop`, `pp-site-frame--phone`, `pp-site-frame__page`, `pp-site-frame__content`): a box that stands in for the browser window on kit and spec pages, so a desktop and a phone header can be shown side by side. The site does not use it.

The layout follows the header's own width (a container query), not the window's. That is why a 390px frame on a wide screen lays out like a phone.

## States

| State | How |
| --- | --- |
| At the top | Transparent, 72px |
| Scrolled | `pp-site-header--scrolled`: a frosted layer (82% surface, blurred, a hairline underneath) fades in and slides up to 56px, and the bar moves up by half the difference |
| Menu open | See Site menu. The header does not change |
| Sheet open | See Site sheet. The header stays where it is under the blanket |
| Focus | The Naleko focus ring on every link and button; the skip link slides into view |

| Width | Shows |
| --- | --- |
| 1280px and wider | Logo, menu, Log in, Get started, Book a demo |
| 520 to 1279px | Logo, Book a demo, menu button |
| Under 520px | Logo, menu button. Book a demo moves into the sheet |

## Behaviour

- The page script, not the CSS, decides when the header is scrolled: it adds `pp-site-header--scrolled` once the page has scrolled 24px, and takes it off when it is back at the top. In the Angular site this is a small directive on the window scroll.
- The shrink moves two things with `transform` (the frosted layer and the bar), and the frost fades with `opacity`. Nothing animates height, so the page underneath never reflows. Durations are `--motion-site-duration-header`.
- The header floats over the page. Its box is always 72px tall; the page behind shows through the 16px strip when it is shrunk.
- Still mode (`data-site-still`) turns the transitions off so a screenshot is the same each time.
- The preview on the UI kit page has a small script that adds the scrolled class and drives the menu and sheet. It is preview-only: it lives in `scripts/preview/` and is not part of the component or the site.

## Content

- Logo: "Naleko People" with "by Naleko", the locked lockup. Link text for screen readers: "Naleko People home".
- Actions: "Log in", "Get started", "Book a demo". These three words never change.
- Menu button: "Open menu".
- Skip link: "Skip to content".

## Accessibility

- The header is a `<header>` landmark and the menu is a `<nav aria-label="Main">`.
- The skip link is the first focusable element and moves focus to the page's `main`.
- The menu button names itself (`aria-label="Open menu"`), says whether the sheet is open (`aria-expanded`) and points at it (`aria-controls`).
- The frosted ground keeps text at 4.5:1 or better on the page behind it, because the surface is 82% opaque and the blur removes detail.
- Tap targets are 40px or more; the buttons are 40px (`--size-control-medium`) and the menu button 44px on a phone.
- Reduced motion: the shrink and frost stay (they are small and do not move content), the menu and sheet fade instead of sliding.

## PrimeNG mapping

None. The public site does not use PrimeNG. In Angular, `<pp-site-header>` wraps the same classes, uses `pp-logo`, `pp-site-button` and `pp-site-menu`, and a directive adds the scrolled class.

## In Naleko People today

Not in the signed-in app, which has its own top navigation. Source: the header of the approved public site (Concept D), rewritten here with tokens: it used a literal 76px height that animated, a blur with literal alpha, and an inline arrow on the demo button.

## Do and don't

- Do keep Book a demo as the one dark button, and Get started the line button.
- Do let the first section start under the header; it is 72px tall and floats.
- Don't put a lozenge, a role pill or a language switch in the header.
- Don't animate its height or background colour. Use the scrolled class.
- Don't add a fourth action. A new entry belongs in the menu.
