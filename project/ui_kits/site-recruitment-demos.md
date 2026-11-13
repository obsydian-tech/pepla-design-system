---
name: Site Recruitment demos
device: desktop
order: 26
preview: site-sections, site-recruitment
source: landing-concepts/site/pages/recruitment.html (the approved Recruitment page: five demo sections)
---

# Site Recruitment demos

The five demos on the approved Recruitment page, each as a demo section (words and a list, with a sample) in its desktop and phone form. In the live frames each demo plays when it scrolls into view, and "Play again" restarts it. That behaviour comes from a preview-only script, not from a component.

## Screens

- **Hiring board**. Six stage columns for a Sales Consultant role. Three candidates move across the board with a reason each, the counts follow, and a line says what was logged. The words and the list sit side by side with the board below them at the full width. Uses Site hiring board.
- **Interview panels**. Scores arrive panel by panel, the averages settle, and Jane Smith moves the candidate to Offer. Uses Site scorecard, Button, Site suggestion.
- **Reminders and follow-ups**. Feedback is chased and then a reminder is drafted for a candidate who has gone quiet. Uses Site timeline, Site suggestion.
- **Candidate risk**. Three flags arrive, Batsi suggests, and the expiring offer is signed. Uses Site risk list, Site suggestion.
- **Offer to onboarding**. A signed offer creates the employee record, and onboarding opens. Uses Site offer to onboarding, Site suggestion.
- Each is shown at desktop width and at 390px.

## Where the redraw changes the approved site

See `DEVIATIONS.md` for the full table. In short:

- **Colours are design system tokens**, close to the site's own values, not the same hex values.
- **Every motion is kept.** The ones the site check cannot allow by their original technique are rebuilt to look the same: borders and fills that changed colour are layers that fade in, changing words are stacks of states that crossfade, and a card still slides to its new column by transform.
- **"Hidden", not "masked"**, in the list, the offer card and anywhere else the page said it.
- **Not on this page:** the Recruitment hero card (the pipeline with bars), the Ask Batsi band with Recruitment questions, the questions, the "Works together with" cards and the trust strip. They belong to chunk 14 and the components chunks 4 and 6 already built.
