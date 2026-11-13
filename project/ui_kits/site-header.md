---
name: Site header
device: desktop
order: 20
preview: site-header
source: landing-concepts/naleko-concept-d.html (the approved public site's header, menu and phone sheet)
---

# Site header

The header of the public site at desktop and phone size: at the top, after scrolling, with a list open, and with the phone menu sheet open. Every frame on this page is live: scroll inside it and the header turns frosted and shorter, point at the links and the one shared panel slides and resizes between lists, and on a phone the menu button opens the sheet. The behaviour comes from a preview-only script that is not part of the site or the components.

## Screens

- **Header at the top (desktop)**. Logo, five links, Log in, Get started and Book a demo. Uses Site header, Site menu, Logo, Button.
- **Header after scrolling (desktop)**. Frosted and 56px tall. Uses Site header.
- **Product list open (desktop)**. The wide list: eight modules in two columns and a foot. Uses Site menu, Icon tile, Link.
- **Integrations list open (desktop)**. The medium list: five entries, two marked Coming soon. Uses Site menu.
- **Header at the top (phone)**. Logo and menu button. Uses Site header.
- **Header after scrolling (phone)**. Frosted. Uses Site header.
- **Menu sheet open (phone)**. The sheet over the dimmed page. Uses Site sheet, Button, Logo.

## Where the redraw changes the approved site

- **No layout animation.** The old menu moved with left, width and height; this one scales a single background, so it stays smooth on a phone. The check that fails any other animation is `site:motion`.
- **Real components.** The buttons are the Button component and the logo is the Logo component; the old header drew its own.
- **No pointer tilt, no logo breathing.** Both are left out of the system on purpose.
- **A skip link and a focus trap.** The old site had neither.
- **"Coming soon" as words.** The old site showed it as a pill; here it is plain text, because a status chip is for something that needs a person.
- **"Learn" instead of "Resources".** The word rules avoid "resource", so the list that holds the Help centre, Security and POPIA and the developer documentation is called Learn. One word to change if the project lead prefers another.
