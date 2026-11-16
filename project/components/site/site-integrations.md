---
name: Site integrations layout
group: site
status: ready
classes: pp-site-integrations, pp-site-integrations__side
primeng: none (public site only, no PrimeNG)
replaces: the landing page's .ap-grid and .ap-side
---

# Site integrations layout

The landing page's Integrations section: the code editor beside the connection panels.

## Anatomy

1. **Grid** (`pp-site-integrations`): one column, two (1.15 and 0.85) from a 1080px wide section.
2. **Side** (`__side`): holds the three connection panels; only the chosen tab's panel shows.

## States

| State | How |
| --- | --- |
| Wide | Editor and panel side by side |
| Narrow | Editor above the panel |

## Behaviour

- On the approved page the demo starts when this grid scrolls into view.

## Content

- None of its own.

## Accessibility

- The editor's tabs control the panels in `__side`.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

Not in the app; this is the public site.

## Do and don't

- Do keep the editor first; it is the only dark surface on the page.
- Don't put a second dark card on the page.
