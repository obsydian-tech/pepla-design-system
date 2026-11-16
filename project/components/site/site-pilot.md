---
name: Site pilot bar
group: site
status: ready
classes: pp-site-pilot, pp-site-pilot__link
primeng: none (public site only, no PrimeNG)
replaces: the landing page's .pilot bar
---

# Site pilot bar

One line above the header that says pilot companies are welcome, with a link to Book a demo.

## Anatomy

1. **Bar** (`pp-site-pilot`): the ink ground (`color.background.neutral.bold`), pale words (`color.site.pilot.text`), centred. Holds a `pp-site-wrap`.
2. **Link** (`__link`): mint (`color.site.pilot.link`), semibold, never wraps.

## States

| State | How |
| --- | --- |
| Rest | Static |
| Link hover | Underlined |
| Link focus | Mint outline |

## Behaviour

- It scrolls away with the page; the header below it is the sticky part.

## Content

- Copied from the approved page: "Naleko People is open for pilot companies." and "Book a demo".

## Accessibility

- A plain line of text and a link. The mint link on ink passes contrast.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

Not in the app; this is the public site.

## Do and don't

- Do keep it to one line and one link.
- Don't add a close button or a second link.
