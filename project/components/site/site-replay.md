---
name: Site replay
group: site
status: ready
classes: pp-site-replay
primeng: none (public site only, no PrimeNG)
replaces: the landing page's .replay button, which used an inline svg
---

# Site replay

"Play again" under a landing demo: a violet text button with the rotate icon that starts the demo over.

## Anatomy

1. **Button** (`pp-site-replay`, `type="button"`): the rotate icon (`rotate-ccw`) and "Play again".

## States

| State | How |
| --- | --- |
| Rest | Violet text |
| Hover | Underlined |
| Focus | The focus ring |

## Behaviour

- Pressing it resets the demo and plays it from the start.

## Content

- Always "Play again".

## Accessibility

- A real button with its words; the icon is decorative. It keeps the touch target height.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

Not in the app; this is the public site.

## Do and don't

- Do put it straight under the demo it restarts.
- Don't use it for anything but restarting a demo.
