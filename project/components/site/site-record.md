---
name: Site record pill
group: site
status: ready
classes: pp-site-record, pp-site-record__name, pp-site-record__live
primeng: none (public site only, no PrimeNG)
replaces: the landing page's .record pill, whose live dot animated a shadow
---

# Site record pill

The one employee record every module reads and writes, shown as a pill with a live dot.

## Anatomy

1. **Pill** (`pp-site-record`): an avatar (`pp-avatar pp-avatar--violet pp-avatar--small`, "JD"), the name (`__name`) and "Employee record".
2. **Live dot** (`__live`, `aria-hidden`): mint, with a ring that grows and fades every 2.2s.

## States

| State | How |
| --- | --- |
| Rest | The ring pulses |

## Behaviour

- The ring is a layer that scales and fades (the ping keyframes in site-motion.css).

## Content

- John Doe, the demo employee.

## Accessibility

- Plain text; the dot is decorative.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

Not in the app; this is the public site.

## Do and don't

- Do use the demo people only.
- Don't make it a link.
