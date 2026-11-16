---
name: Site module cards
group: site
status: ready
classes: pp-site-tiles, pp-site-tile, pp-site-tile--later, pp-site-tile--batsi, pp-site-tile__icon, pp-site-tile__glyph, pp-site-tile__glyph--on, pp-site-tile__title, pp-site-tile__text, pp-site-tile__more, pp-site-tile__ask
primeng: none (public site only, no PrimeNG)
replaces: the landing page's .grid of .mod cards (.later, .batsi), whose hover faded background, border, shadow and icon colours
---

# Site module cards

One card per module in a grid, a dashed card for a module that is coming, and the Ask Batsi card where sample questions type themselves.

## Anatomy

1. **Grid** (`pp-site-tiles`): one column, two from 640px and four from 1080px of section width.
2. **Card** (`pp-site-tile`, a link): icon, name (`__title`), one line (`__text`) and "Learn more" (`__more`).
3. **Icon** (`__icon`, `aria-hidden`): the module's design system icon drawn twice (`__glyph`, and `__glyph--on` in white) over a violet layer.
4. **Coming soon** (`--later`): dashed border, grey icon, "Coming soon" in place of Learn more.
5. **Ask Batsi** (`--batsi`): mint, with a box (`__ask`) where sample questions type and a blinking caret; "See Batsi at work".

## States

| State | How |
| --- | --- |
| Rest | As drawn |
| Hover or focus | The card lifts; its violet border and shadow, the icon's violet ground and white icon fade in on layers; the arrow moves right |

## Behaviour

- The Ask Batsi card types a question at 48ms a letter, holds it 1.8s, deletes it at 22ms a letter, then types the next.
- The cards arrive with the section (`pp-site-reveal`, one after another).

## Content

- Copied from the approved page. Icons are the ones the site header uses for each module.

## Accessibility

- Each card is one link; its name is the heading. The typing box is `aria-live="off"`, so the questions are not read out.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

HR Help Desk and Performance Management are not built yet; they show as Coming soon.

## Do and don't

- Do keep the Ask Batsi card last.
- Don't give a Coming soon card a Learn more link.
