---
name: Site landing sections
device: desktop
order: 34
preview: site-sections, site-landing-sections
source: the Ask Batsi and Recruitment sections of landing-concepts/naleko-concept-d.html (markup and script)
---

# Site landing sections

The landing page's Ask Batsi and Recruitment sections. They differ from the Learn more demos: Ask Batsi has numbered questions that play one after another with a bar that fills, and Recruitment has the hiring board with Batsi's draft beside it. In the live frames Ask Batsi plays each question for 11 seconds and presses the action itself until a question is pressed, and the board moves Candidate 4 and Candidate 1, flags Candidate 3, types Batsi's draft and sends it. That behaviour comes from a preview-only script, not from a component.

## Screens

- **Landing: Ask Batsi**. Uses Site Ask Batsi band, Site question tabs, Site facts, Button, Link. Shown at desktop width and at 390px. Before it plays, the first question waits for HR.
- **Landing: Recruitment**. Uses Site hiring board, Site hiring, Site capabilities, Lozenge, Button, Link. Shown at desktop width and at 390px. Before it plays, the board shows the end: the reminder sent.

## Where the redraw changes the approved site

See `DEVIATIONS.md` for the full table. In short:

- **Every motion is kept.** The question bar fills by scaling; the selected question, the board borders and the draft card fade on layers or by opacity.
- **Ticks, the "!" and the sparkle are real icons or drawn marks**, not inline svg.
