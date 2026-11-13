---
name: Site lights
group: site
status: ready
classes: pp-site-lights, pp-site-light
primeng: none (public site only, no PrimeNG)
replaces: the public site's hero canvas script and its background-position flow
---

# Site lights

Soft coloured circles that drift slowly behind a hero or the closing band, so a white page is not flat. They are the only decoration behind the hero.

## Anatomy

1. **Layer** (`pp-site-lights`): fills its parent and sits behind the content (`z-index: -1`). The parent must create its own stacking context (the hero and band do, with `isolation: isolate`). Clips what drifts out.
2. **Light** (`pp-site-light`): one circle with a soft edge and a thin ring inside it, 42% of its size. Colour: `--violet`, `--mint`, `--coral` or `--sky`, from the `--color-site-orb-*` tokens.
3. **Inputs**: `--_x` and `--_y` set the centre (percent of the parent), `--_size` the diameter (default 44cqw), `--_dx` and `--_dy` how far it drifts (default 6cqw and 3cqw), `--_i` a position 0 to 3 that offsets its start so lights never move together.

## States

| State | How |
| --- | --- |
| Default | Drifts one loop in 28s, swelling a little |
| Reduced motion | Same drift at half speed. It slows and never stops, because the lights are ambient |
| Still | `data-site-still`: not moving |

## Behaviour

- Animates `transform` only (translate and scale). Never left, top, width, background-position or a canvas, which each cost a full repaint every frame.
- Sizes use `cqw`, a share of the hero's own width, so a phone-sized preview on a wide screen draws phone-sized lights.

## Content

None. A light has no text and is hidden from assistive technology (`aria-hidden="true"` on the layer).

## Accessibility

- Decorative: `aria-hidden="true"` on the layer.
- No text sits on a light's centre at full strength: the strongest light is 40% mint over white, so body text keeps 12:1 or better.
- Slow (28s), no flashing, and under reduced motion slower still.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

Not in the signed-in app. Source: the approved public site's hero light (three brand circles drifting on a canvas).

## Do and don't

- Do use at most three lights in a hero and three in the band.
- Do spread the `--_i` values (0, 1, 2) so they drift out of step.
- Don't put a light behind a table, a form or a demo card. It belongs behind a headline.
- Don't use a customer's colour. The site's lights are Naleko People's.
