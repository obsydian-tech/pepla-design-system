---
name: Site Leave demos
device: desktop
order: 28
preview: site-sections, site-leave
source: landing-concepts/site/pages/leave.html (the approved Leave page: four demo sections)
---

# Site Leave demos

The four demos on the approved Leave page, each as a demo section (words and a list, with a sample) in its desktop and phone form. In the live frames each demo plays when it scrolls into view, and "Play again" restarts it. That behaviour comes from a preview-only script, not from a component.

## Screens

- **Leave types**. Five leave types appear one by one, then a company type is added. Uses Site demo rows.
- **Requests**. John Doe requests annual leave from a phone: type, dates, the working days counted, sent. Uses Site leave request.
- **Approvals**. A request waits, Batsi reminds the line manager, and the line manager approves or declines. Uses Site leave approval, Site suggestion, Site live status, Button.
- **Balances and calendar**. The requested days turn solid on the team calendar when the request is approved, and the balance counts down. Uses Site team calendar, Site leave balances.
- Each is shown at desktop width and at 390px.

## Where the redraw changes the approved site

See `DEVIATIONS.md` for the full table. In short:

- **Colours are design system tokens**, close to the site's own values, not the same hex values.
- **Every motion is kept.** The ones the site check cannot allow by their original technique are rebuilt to look the same: field rings, pills, calendar days and number colours are layers that fade in, changing words are stacks of states that crossfade, and the balance bar is a fill that scales.
- **Not on this page:** the Leave hero card (the balance dropping), the Ask Batsi band with leave questions, the trust strip, the "Works together with" cards, the questions and the sub-menu tabs. They belong to the chunk 4 and 6 components and the assembled page (chunk 14).
