---
name: Site motion
group: site
status: ready
classes: pp-site-reveal, pp-site-drift, pp-site-turn, pp-site-sweep, pp-site-pulse
primeng: none (public site only, no PrimeNG)
replaces: the public site's own reveal and loop CSS, which used literal durations and animated layout properties
---

# Site motion

The motion of the public site: sections and cards arriving, and the slow loops behind them. Every duration and easing is a `--motion-site-*` token. Motion uses `transform` and `opacity` only, because animating anything else (a mask position, a size, a shadow) made the landing page slow.

## Anatomy

1. **Arrival** (`pp-site-reveal`): fades in and rises `--space-300` as it scrolls into view. Set `--_i` (0, 1, 2) on each item in a group to stagger them by `--motion-site-stagger`.
2. **Loops**: `pp-site-drift` (a soft light moving about), `pp-site-turn` (a ring, one turn per `--motion-site-duration-loop-turn`), `pp-site-sweep` (the radar), `pp-site-pulse` (a live dot).
3. **Still mode**: `data-site-still="start"` or `"end"` on the page or any wrapper.

## States

| State | How |
| --- | --- |
| Resting | Arrival is fully visible. This is also the state with no script, in a screenshot and in a prerendered page |
| Waiting | After the page script sets `data-site-reveal` on the root, an arrival not yet in view is transparent and moved down |
| Arrived | The script adds `pp-site-reveal--in`; it transitions to resting |
| Still | `data-site-still` freezes every loop and shows every arrival, so screenshots are repeatable. `start` and `end` also tell demos which step to show |

## Behaviour

- The page script, not the CSS, decides when an item is in view. It sets `data-site-reveal` once, then adds `pp-site-reveal--in` at about 15% in view, once per item.
- Reduced motion: arrivals fade without moving, `pp-site-drift` runs at half speed (`--motion-site-duration-loop-orb-reduced`), and rings, radar and pulses keep playing, slowly. Demos keep playing. Grain, logo breathing, flying cards and menu tilt are not part of the design system at all.
- Never animate anything other than `transform` and `opacity`. The site check fails a keyframe or transition that does.

## Content

None. Motion carries no words.

## Accessibility

- Content is never hidden without a script, so a reader without JavaScript sees everything.
- Loops are decorative. Put `aria-hidden="true"` on a purely decorative element that uses one.
- Information is never carried by motion alone: a demo step also shows its result in text.

## PrimeNG mapping

None. The public site does not use PrimeNG. In Angular a small directive adds the `--in` class from an IntersectionObserver.

## In Naleko People today

Not in the signed-in app, which stays quiet. Source: the approved public site (Concept D), whose reveals and loops are rewritten here as tokens and classes.

## Do and don't

- Do use the stagger input `--_i` for items in one group.
- Do show the first and the last step of a demo in still mode.
- Don't animate size, position offsets, shadows, masks or background positions.
- Don't add a literal duration or easing. Add a token.
- Don't hide content in CSS alone.
