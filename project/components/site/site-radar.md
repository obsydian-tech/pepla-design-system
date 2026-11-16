---
name: Site radar
group: site
status: ready
classes: pp-site-radar, pp-site-radar--overdue, pp-site-radar__ax, pp-site-radar__ax--h, pp-site-radar__blip, pp-site-radar__blip--late
primeng: none (public site only, no PrimeNG)
replaces: the landing page's .radar and .blip, whose blips animated a shadow
---

# Site radar

Rings, a turning sweep and blips behind the Compliance section. A coral blip shows while a licence is overdue.

## Anatomy

1. **Radar** (`pp-site-radar`, `aria-hidden`): placed first in a section with `pp-site-section--clip`, to the right, at most 980px (`layout.site.radar`). Rings every 60px (`color.site.radar.line`), a sweep that turns every 6s (`color.site.radar.sweep`) and a mask that fades it into the section.
2. **Axes** (`__ax`, `__ax--h`): a cross through the centre.
3. **Blips** (`__blip`): mint, placed with `--_x` and `--_y`, flashing one after another (`--_d`). Each flash sends out a ring.
4. **Late blip** (`__blip--late`): coral, hidden until the radar is `--overdue`, then pinging every 1.6s.

## States

| State | How |
| --- | --- |
| On time | Mint blips flash |
| Overdue (`--overdue`) | The coral blip fades in and pings |

## Behaviour

- A frame that shows the radar alone (no register beside it) sets `--_h` on the section for room.
- The Compliance demo adds `--overdue` when a licence goes past its date and removes it when the renewal is accepted.
- Under reduced motion the sweep keeps turning, as on the approved page.

## Content

- None.

## Accessibility

- Decorative. The overdue state is also said in words by the register beside it.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

Not in the app; this is the public site. The certificate register is the app's Compliance screen.

## Do and don't

- Do use it once, behind the Compliance section.
- Don't let the coral blip be the only sign that something is overdue.
