---
name: Site Compliance demos
device: desktop
order: 27
preview: site-sections, site-compliance
source: landing-concepts/site/pages/compliance.html (the approved Compliance page: five demo sections)
---

# Site Compliance demos

The five demos on the approved Compliance page, each as a demo section (words and a list, with a sample) in its desktop and phone form. In the live frames each demo plays when it scrolls into view, and "Play again" restarts it. That behaviour comes from a preview-only script, not from a component.

## Screens

- **Requirements per role**. A role's list of certificates is copied onto a new employee, and each one is requested, then uploaded or given a due date. Uses Site role requirements.
- **Certificate register**. Five certificates with the days left on each. The filters cycle by themselves and answer a click. Uses Site certificate register.
- **Reminders**. A forklift licence gets its reminders at 60, 30 and 7 days, expires, and is renewed. Uses Site timeline.
- **Renewals read**. Batsi reads a renewed licence, checks the holder and suggests the new expiry date, and Jane Smith accepts it. Uses Site document read, Button, Site certificate register.
- **Not cleared to work**. The licence expires, John Doe joins the list, HR and the manager are told, and the renewal empties the list. Uses Site not cleared to work, Site suggestion.
- Each is shown at desktop width and at 390px.

## Where the redraw changes the approved site

See `DEVIATIONS.md` for the full table. In short:

- **Colours are design system tokens**, close to the site's own values, not the same hex values.
- **Every motion is kept.** The ones the site check cannot allow by their original technique are rebuilt to look the same: pills and filters that changed colour are layers that fade in, changing words are stacks of states that crossfade, and the list and the empty line swap by opacity and a small rise.
- **Not on this page:** the Compliance hero card (the register with days passing), the Ask Batsi band with certificate questions, the questions, the "Works together with" cards and the trust strip. They belong to chunk 14 and the components chunks 4 and 6 already built.
