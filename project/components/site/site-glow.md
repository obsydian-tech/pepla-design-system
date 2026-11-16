---
name: Site glow
group: site
status: ready
classes: pp-site-glow, pp-site-glow__grid
primeng: none (public site only, no PrimeNG)
replaces: the landing page's .ap-lt light and .ap-gr grid
---

# Site glow

A soft violet light with a fine grid showing through it, behind a section. It follows a mouse pointer, or drifts on its own.

## Anatomy

1. **Light** (`pp-site-glow`, `aria-hidden`): a 1100px soft violet circle (`color.site.glow.violet`), placed first in a section that uses `pp-site-section--clip`.
2. **Grid** (`__grid`): fine violet lines every 44px, seen only through the light.

## States

| State | How |
| --- | --- |
| Pointer | The light follows a mouse pointer |
| No pointer | It drifts slowly on its own; under reduced motion at half speed, never still |

## Behaviour

- The light moves by transform only. The grid moves the other way inside it, so the lines stay put on the page.

## Content

- None.

## Accessibility

- Decorative. It ignores touch pointers.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

Not in the app; this is the public site.

## Do and don't

- Do use it once on a page, behind the Integrations section.
- Don't put text on the light that depends on it for contrast.
