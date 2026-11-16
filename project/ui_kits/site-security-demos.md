---
name: Site Security demos
device: desktop
order: 29
preview: site-sections, site-security
source: landing-concepts/site/pages/security.html (the approved Security and POPIA page: five demo sections) and the Trust and POPIA section of landing-concepts/naleko-concept-d.html
---

# Site Security demos

The five demos on the approved Security and POPIA page, each as a demo section (words and a list, with a sample) in its desktop and phone form, and the landing page's Trust and POPIA section, which is built from the same parts. In the live frames each demo plays when it scrolls into view, and "Play again" restarts it. That behaviour comes from a preview-only script, not from a component.

## Screens

- **Approvals**. Batsi's drafted reminder and a write from the API wait in the approval queue; Jane Smith approves and it is logged. Uses Site approval queue, Site who did it, Site leave approval (the decision and log line), Site live status.
- **Audit trail**. Six entries arrive, each with a time, who did it (person or Batsi) and what happened, with Export to CSV. Uses Site audit log, Site who did it.
- **Hidden data**. ID number, bank account and salary hidden; Show reveals the ID number, the view is logged, and it hides again. Uses Site hidden personal data.
- **POPIA consent**. John Doe agrees to the privacy notice, then the upload unlocks and the document is uploaded. Uses Site POPIA consent, Site live status.
- **Data in South Africa**. The place, with a live dot, and what is stored there. Uses Site data residency.
- **Landing: Trust and POPIA**. The audit log fills, Batsi's reminder waits for Jane Smith and is approved, then the ID number is shown, logged and hidden again. Beside it, the hidden data card and where the data is kept. Uses Site trust layout, Site audit log (card), Site hidden personal data (card), Site data residency (card), Site capability columns.
- Each is shown at desktop width and at 390px.

## Where the redraw changes the approved site

See `DEVIATIONS.md` for the full table. In short:

- **"Masked" is "hidden"** everywhere, by Iggie's word rule ("Masked data" is "Hidden data", "Personal data, masked" is "Personal data, hidden").
- **Colours are design system tokens**, close to the site's own values, not the same hex values.
- **Every motion is kept.** The ones the site check cannot allow by their original technique are rebuilt to look the same: the shown ID number is a second copy that crossfades, the consent wash and tick are layers that fade in, and the live dot's ring grows with a transform instead of a box-shadow.
- **Not on this page:** the Security page hero card (the audit log filling), the Ask Batsi band with security questions, the trust strip, the "Works together with" cards, the questions and the sub-menu tabs. They belong to the chunk 4 and 6 components and the assembled pages (chunk 14).
