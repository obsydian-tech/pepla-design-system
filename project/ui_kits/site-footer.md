---
name: Site footer and sub-menu
device: desktop
order: 21
preview: site-header, site-footer
source: landing-concepts/naleko-concept-d.html (the approved public site's footer) and landing-concepts/site/shared/module.css (the sticky sub-menu of the module pages)
---

# Site footer and sub-menu

The bottom of every public page and the pinned "on this page" bar of a module page, at desktop and phone size. Every frame is live: scroll inside it and the sub-menu stays under the header, its highlight slides to the section in view, and a tap on a tab scrolls to that section. The behaviour comes from preview-only scripts that are not part of the site or the components.

## Screens

- **Footer (desktop)**. Brand and promise on the left, five lists on the right, then the copyright and the four legal links. Uses Site footer, Logo.
- **Footer (phone)**. The same content in two columns. Uses Site footer.
- **Sub-menu pinned under the header (desktop)**. Page name and five tabs, one highlighted. Uses Site subnav, Site header.
- **Sub-menu pinned under the header (phone)**. The tab row scrolls inside the bar. Uses Site subnav.

## Where the redraw changes the approved site

- **The footer line flows**, as on the approved site: the gradient slides with a transform on a strip twice its width, so nothing repaints.
- **The highlight is a neutral block, not a dark pill.** It slides with a translate and a scale, so it stays smooth on a phone. A dark pill needs the label colour to change while it travels, and colour is not a property the site animates.
- **"Resources"** is the approved word. The content audit allows that one label.
- **"Coming soon" is the same small pill** as the approved site.
- **The data promise is plain.** "All data stays in South Africa" sits in a neutral chip; mint is kept for what Batsi did.
- **Legal links are placeholders.** Privacy notice, Terms of use, PAIA manual and Cookie notice point nowhere until the legal text is supplied.
- **Tap targets.** Every footer link is 44px tall; the old links were 14px text.
