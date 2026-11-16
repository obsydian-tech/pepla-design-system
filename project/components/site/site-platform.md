---
name: Site platform layout
group: site
status: ready
classes: pp-site-platform, pp-site-platform__card, pp-site-platform__head, pp-site-platform__title, pp-site-platform__note, pp-site-platform__foot, pp-site-platform__again
primeng: none (public site only, no PrimeNG)
replaces: the landing page's .pl-grid, .pl-set and .pl-foot
---

# Site platform layout

The landing page's Platform section: the Settings · Modules card beside the app frame.

## Anatomy

1. **Grid** (`pp-site-platform`): one column, two from a 1080px wide section.
2. **Card** (`__card`): white, rounded, with the site card shadow. Each card is a container, so the app frame follows its card's width.
3. **Head** (`__head`): title (`__title`) and "Sample company" (`__note`).
4. **Foot** (`__foot`): "Switched on by Naleko. Each change logged." and Play again (`__again`, violet, `rotate-ccw` icon).

## States

| State | How |
| --- | --- |
| Playing | The modules switch on 1.1s apart from 0.7s |
| Play again | Turns everything off and plays again |

## Behaviour

- On a phone the cards stack, so the demo waits until the app frame is in view, as on the approved page.

## Content

- Copied from the approved landing page.

## Accessibility

- Play again is a real button with a 44px touch height and a focus ring.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

Not in the app; this is the public site.

## Do and don't

- Do keep the settings card first.
- Don't add a third card.
