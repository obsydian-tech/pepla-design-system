---
name: Site Onboarding demos
device: desktop
order: 25
preview: site-sections, site-onboarding
source: landing-concepts/site/pages/onboarding.html (the approved Onboarding and Offboarding page: six demo sections)
---

# Site Onboarding demos

The six demos on the approved Onboarding and Offboarding page, each as a demo section (words on one side, a sample on the other) in its desktop and phone form. In the live frames each demo plays when it scrolls into view, and "Play again" restarts it. That behaviour comes from a preview-only script, not from a component.

## Screens

- **New employee's side**. The sample phone: the email link opens, consent is ticked, three uploads are read, the bank letter is blurry and comes back. It loops on its own. Uses Site sample phone, Site live status.
- **Documents read and matched**. A scan light passes over an ID document, fields fill in, three checks tick, Batsi suggests, Jane Smith accepts, the decision is logged. Uses Site document read, Button.
- **Follow-ups**. A missing document is chased: five entries fill a timeline, then who is still waiting. Uses Site timeline.
- **Contract and probation**. Details fill from the record, the contract is signed, probation is set. Uses Site contract.
- **Laptop and access**. IT requests and day-one steps tick off, then the record is active. Uses Site checklist.
- **Offboarding**. The exit checklist ticks off and closes. Uses Site checklist.
- Each is shown at desktop width and at 390px.

## Where the redraw changes the approved site

See `DEVIATIONS.md` for the full table. In short:

- **Colours are design system tokens**, close to the site's own values, not the same hex values.
- **Every motion is kept.** The ones the site check cannot allow by their original technique are rebuilt to look the same: the upload bar and the timeline line scale instead of changing width and height, the scan light and the signature move by transform, colour changes fade a coloured layer in, a changing word is a stack of states that crossfade.
- **Not on this page:** the Onboarding hero card, the Ask Batsi band and the questions (chunk 6 components), and the "Works together with" cards.
