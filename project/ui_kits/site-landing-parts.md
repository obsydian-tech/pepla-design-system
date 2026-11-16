---
name: Site landing parts
device: desktop
order: 32
preview: site-sections, site-landing-parts
source: landing-concepts/naleko-concept-d.html (the approved landing page's pilot bar, Ask Batsi peek, Modules section, Compliance radar and About section)
---

# Site landing parts

The landing page parts the earlier site kits did not cover: the pilot bar above the header, the small Ask Batsi chat that opens from the hero, the Modules section with its eight cards, the radar behind the Compliance section and the About section. Each is shown at desktop width and at 390px. The peek's conversation and the Ask Batsi card's typing come from a preview-only script, not from a component. On this page the peek opens by itself when its frame scrolls into view; on the site it opens only from the hero's Ask Batsi button.

## Screens

- **Landing: Pilot bar, hero and Ask Batsi peek**. The pilot bar, the header and hero (as on the Site hero and sections kit) and the peek: the visitor asks who hasn't sent their documents, Batsi answers and offers to send another reminder. Uses Site pilot bar, Site Ask Batsi peek, Site Ask Batsi band (chat), Site header, Site hero.
- **Landing: Modules**. The John Doe record pill, five module cards, two dashed cards for modules that are coming, and the Ask Batsi card typing sample questions; two notes underneath. Uses Site module cards, Site record pill, Site notes.
- **Landing: Compliance radar** and **licence overdue**. The section head over the radar; in the second frame the coral blip shows that a licence is overdue. The register itself is on the Site compliance demos kit and joins it on the assembled landing page. Uses Site radar.
- **Landing: About**. The company beside its card, with the flowing Naleko gradient on the name and the card's top edge. Uses Site About, Site gradient.

## Where the redraw changes the approved site

See `DEVIATIONS.md` for the full table. In short:

- **Colours are design system tokens**, with new `color.site.pilot.*` and `color.site.radar.*` tokens.
- **Every motion is kept.** Hover colours on the module cards fade on layers; the radar's and the live dot's rings grow and fade instead of animating a shadow.
- **Icons are design system icons**, as on the site header.
