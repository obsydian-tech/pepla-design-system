---
name: Site form pages
device: desktop
order: 23
preview: site-sections, site-form
source: landing-concepts/site/pages/get-started.html and book-demo.html (the approved public site's Get started and Book a demo pages)
---

# Site form pages

The two pages that collect a visitor's details: Get started creates a free company account, Book a demo books a 30-minute call with no account. Each is shown empty, with errors, filled in and sent, at desktop and phone width. In the live frames a visitor can press the chips and slots, send the form and see the errors and the confirmation. That behaviour comes from a preview-only script, not from any component, and nothing is sent anywhere.

## Screens

- **Get started, empty (desktop)**. Header over the hero: breadcrumb, eyebrow, headline with the shining accent, lead, three facts, the form card beside them and the three next steps under the intro. Uses Site hero, Site form page, Site form card, Site choices, Site lights, Site shine, Field, Text field, Select, Checkbox, Site button.
- **Get started, with errors (desktop)**. Send pressed with nothing filled in: every required field shows its message and the consent box shows its error state.
- **Get started, filled in (desktop)**. Values in, two chips pressed, a day and a time picked, consent ticked.
- **Get started, sent (desktop)**. The confirmation replaces the form: the tick, the email, the call, the three steps and the two lines about what comes next. Uses Site confirmation.
- **Book a demo, empty (desktop)** and **sent (desktop)**. The shorter form (name, company, email, what to see, time, a note, consent) and its confirmation.
- **Phone (390px)**. Get started empty, with errors and sent; Book a demo empty and sent. One column; the card comes straight after the lead and facts, and the next steps follow it.

## Where the redraw changes the approved site

- **The fields are the design system's own** (Field, Text field, Select, Textarea, Checkbox), so their sizes, borders, focus ring and error line follow the rest of Naleko People. The approved page drew its own fields.
- **Chips and slots fade their pressed look in by opacity**, not by changing colours, because the site check allows only transform and opacity.
- **The send button is the Site button** (dark, with the mint dot that grows into an arrow on hover). The approved form button kept a still dot.
- **Light circles have no ring**, as on the approved form pages (`pp-site-lights--plain`).
- **Sample dates are fixed** (Mon 16 to Fri 20 Nov) so the kit looks the same every day. The site shows the next five working days.
- **Nothing is sent.** The confirmation is a go-live blocker until a tenant backend exists.
