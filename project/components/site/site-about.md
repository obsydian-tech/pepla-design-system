---
name: Site About
group: site
status: ready
classes: pp-site-about, pp-site-about__card, pp-site-about__line, pp-site-about__mark, pp-site-about__name, pp-site-about__sub, pp-site-about__list, pp-site-about__item, pp-site-about__dot
primeng: none (public site only, no PrimeNG)
replaces: the landing page's .ab section, .ab-card and .ab-list, which moved the gradient with background-position
---

# Site About

The company beside a card that lists what it promises. The name and the card's top edge flow with the Naleko gradient.

## Anatomy

1. **Grid** (`pp-site-about`): one column, two from 1024px of section width. The text side has an eyebrow, a title with the company name in `pp-site-gradient-text--flow`, a lead and a standalone link.
2. **Card** (`__card`): white, rounded, with the site card shadow.
3. **Top edge** (`__line`, with `pp-site-gradient-line pp-site-gradient-line--flow`): the flowing gradient, 5px tall.
4. **Mark** (`__mark`): "Naleko" (`__name`, flowing gradient) and "Digital Solutions" (`__sub`).
5. **List** (`__list`, `__item`): four lines, each after a dot (`__dot`) showing one part of the gradient (`--_p`).

## States

| State | How |
| --- | --- |
| Rest | The gradient flows on the name and the top edge |

## Behaviour

- The flow is the Site gradient's: copies that fade, and a strip that slides. Half speed under reduced motion.

## Content

- Copied from the approved page.

## Accessibility

- The gradient words are real text; in forced colours they show as link text.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

Not in the app; this is the public site.

## Do and don't

- Do keep the gradient to the company name and the card's edge.
- Don't add a third gradient on the page section.
