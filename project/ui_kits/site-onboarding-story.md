---
name: Site onboarding story
device: desktop
order: 33
preview: site-sections, site-onboarding-story
source: the Onboarding and Offboarding section of landing-concepts/naleko-concept-d.html (markup and script)
---

# Site onboarding story

The landing page's Onboarding and Offboarding section: John Doe's card stays pinned while the six steps scroll past, over pastel rings that turn slowly. The step past the middle of the window is the current one, and the card follows it: the bar fills, the count and the line under it change, and from 1024px of width a view of that step's detail fades in. On the ID document step Batsi reads the document, suggests Matches and Jane Smith accepts it. That behaviour comes from a preview-only script, not from a component.

## Screens

- **Landing: Onboarding and Offboarding**. Uses Site story, Site person card, Site rings, Site offboarding band, Site document read, Site live status, Lozenge. Shown at desktop width and at 390px (no step views at phone width, as on the approved page).

## Where the redraw changes the approved site

See `DEVIATIONS.md` for the full table. In short:

- **Every motion is kept.** Step colours and the number fills fade on layers; the bar fills by scaling, not by width.
- **"Masked" is "Hidden"** in the ID number, following the word rule.
