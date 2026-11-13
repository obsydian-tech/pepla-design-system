---
name: Site demos, questions and Ask Batsi
device: desktop
order: 24
preview: site-sections, site-demos
source: landing-concepts/site/pages/leave.html (the approved Leave page: Leave types demo, Ask Batsi band, Questions)
---

# Site demos, questions and Ask Batsi

The three parts every module page shares: a demo section (words on one side, a sample panel on the other), the Ask Batsi band and the questions. The sample is the approved Leave page. In the live frames the first demo plays when it scrolls into view, "Play again" restarts it, the question chips play a conversation, the Approve button works and the questions open and close. That behaviour comes from a preview-only script, not from a component.

## Screens

- **Demo section, white (desktop)**. Leave types: eyebrow, headline, lead, five ticks, and the panel with five rows that step in, then "Play again". Uses Site demo, Site status.
- **Demo section, cream and flipped (desktop)**. The same section on the cream ground with the panel on the left.
- **Questions (desktop)**. The headline and line on the left, six questions on the right, the first open. Uses Site questions, Link.
- **Ask Batsi, first question answered (desktop)**, **waiting for a person**, and **approved and logged**. Uses Site Ask Batsi band, Button.
- **Phone (390px)**. Demo section, questions (third open), and Ask Batsi answered, waiting and approved.

## Where the redraw changes the approved site

- **The questions ease their height with `grid-template-rows`.** It is the one layout transition the site check allows (on a click, one selector). Same look as the approved page.
- **Ticks, the plus sign and icons are real icons and drawn bars**, not inline svg.
- **Fades are opacity fades.** Chips and status pills crossfade a hidden copy of their label instead of changing colour.
- **The glow keeps its blur but turns by transform only.**
