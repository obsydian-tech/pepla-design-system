---
name: Site landing compliance and leave
device: desktop
order: 35
preview: site-sections, site-landing-compliance-leave
source: the Compliance Management and Leave Management sections of landing-concepts/naleko-concept-d.html (markup and script)
---

# Site landing compliance and leave

The landing page's Compliance Management and Leave Management sections. They differ from the Learn more demos: each plays one story across several parts at once. In the live frames the register counts down from 3 Nov, the reminders at 60, 30 and 7 days light up, John Doe's forklift licence goes overdue and he is listed as not cleared to work, then Batsi reads the renewal and Jane Smith accepts it. In Leave, John Doe requests leave on the phone, the days appear on the team calendar, Batsi reminds the line manager, the line manager approves and the balance counts down to 11 days. That behaviour comes from a preview-only script, not from a component.

## Screens

- **Landing: Compliance Management**. Uses Site radar, Site ledger, Site watch, Site clearance, Site document read, Site replay, Site capabilities, Lozenge, Link. Shown at desktop width and at 390px. Before it plays, it shows the end: the licence renewed and accepted.
- **Landing: Leave Management**. Uses Site leave request, Site calendar, Site leave approval, Site suggestion, Site balance, Site leave, Site replay, Site capabilities, Lozenge, Link. Shown at desktop width and at 390px. Before it plays, it shows the end: approved, 11 days left.

## Where the redraw changes the approved site

See `DEVIATIONS.md` for the full table. In short:

- **Every motion is kept.** Row washes, card dimming and the balance bar fade or scale; chips and reminder pills swap at once.
- **The leave parts are the module-page parts** (request phone, calendar, approval, balance), placed as on the landing page.
