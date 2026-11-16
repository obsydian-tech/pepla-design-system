---
name: Site Platform demos
device: desktop
order: 30
preview: site-sections, site-platform
source: landing-concepts/site/pages/platform.html (the approved Platform page: four demo sections) and the Platform section of landing-concepts/naleko-concept-d.html
---

# Site Platform demos

The four demos on the approved Platform page, each as a demo section (words and a list, with a sample) in its desktop and phone form, and the landing page's Platform section, which is built from the same parts. In the live frames each demo plays when it scrolls into view, and "Play again" restarts it. That behaviour comes from a preview-only script, not from a component.

## Screens

- **Modules**. Naleko switches four modules on one by one; the sidebar chips follow, and the change is logged. Uses Site modules, Site sidebar preview, Site log line, Site live status.
- **Templates and checklists**. The onboarding documents template fills, Jane Smith's added row arrives last, and the date it applies from is shown. Uses Site settings list, Site log line.
- **Leave types and holidays**. December's public holidays and the company's own day. Uses Site settings list, Site log line.
- **Roles and access**. Five role buttons; the box shows what each role can see, cycling every 3.2s until one is clicked. Uses Site roles and access, Site choices (slots).
- **Landing: Platform**. The Settings · Modules card beside a sample of the app: as each module is switched on, its sidebar item and its Today item arrive. Uses Site platform layout, Site modules, Site app frame, Site capability columns.
- Each is shown at desktop width and at 390px.

## Where the redraw changes the approved site

See `DEVIATIONS.md` for the full table. In short:

- **"Masked" is "hidden"** in the HR role's access ("Hidden, each Show logged"), by Iggie's word rule.
- **The switches are the design system toggle.** Employee Records' locked switch uses the toggle's disabled look.
- **Every motion is kept.** The app's sidebar items fade and rise into their place instead of sliding open, and the role buttons and the switches' colours fade on layers.
- **Not on this page:** the Platform page hero card (modules switching on), the Ask Batsi band with platform questions, the trust strip, the "Works together with" cards, the questions and the sub-menu tabs. They belong to the chunk 4 and 6 components and the assembled pages (chunk 14).
