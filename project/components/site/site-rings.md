---
name: Site rings
group: site
status: ready
classes: pp-site-rings, pp-site-rings__group, pp-site-rings__group--outer, pp-site-rings__circle, pp-site-rings__circle--coral, pp-site-rings__circle--violet, pp-site-rings__circle--mint, pp-site-rings__circle--dot, pp-site-rings--hero
primeng: none (public site only, no PrimeNG)
replaces: the landing page's .rings svg, whose circles had literal stroke colours
---

# Site rings

Three pastel circles that turn slowly behind a section, and a dotted circle that turns the other way.

## Anatomy

1. **Rings** (`pp-site-rings`, `aria-hidden`): placed first in a section with `pp-site-section--clip`, to the right, at most 1100px (`layout.site.rings`), at 55% opacity.
2. **Groups** (`__group`, `__group--outer`): each turns around the centre.
3. **Circles** (`__circle`): `--_x` and `--_r` place them on a 600-unit square; `--coral`, `--violet`, `--mint` (`color.site.ring.*`) and `--dot` (dotted).

## Variants

- `pp-site-rings--hero`: at the top of the Recruitment and Onboarding Learn more pages, higher and further out, behind the hero card, as on the approved pages.

## States

| State | How |
| --- | --- |
| Rest | The inner group turns every 70s, the outer every 95s the other way |

## Behaviour

- Under reduced motion they turn once every 240s, never still, as on the approved page.

## Content

- None.

## Accessibility

- Decorative.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

Not in the app; this is the public site.

## Do and don't

- Do use it once, behind the Onboarding section.
- Don't put text over the circles that depends on them.
