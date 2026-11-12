---
name: New employee portal
device: phone
order: 2
source: features/employee-dashboard, features/employee-dashboard/components/onboarding-stepper, features/employee-dashboard/components/document-checklist, features/employee-dashboard/components/document-row, features/employee-dashboard/components/employee-highlights
---

# New employee portal

Every screen sits in the one Naleko People sidebar (see "One Naleko People" in the readme); only the selected module changes.

The new employee's side of Naleko People, redrawn for a phone: Ayanda Zulu, who starts at Mokoena Logistics on 1 Dec 2026, gives consent, uploads her documents and follows her onboarding. Every screen is 390 pixels wide in the phone app shell, with a bottom bar. The content, fields and steps are the ones in today's Angular templates. Only the look and the rule-driven details change.

## Screens

- **Home: consent** (`employee-dashboard.component.html`, step 1). The greeting, the two-step tracker and the declaration to accept before upload. Uses app shell (phone), page header, tag, progress tracker, consent capture, checkbox, link, button.
- **Onboarding progress** (`components/onboarding-stepper`). Steps done as a count, what is happening now, and the six-step journey. Uses page header, progress bar, section message, card, icon tile, progress tracker (vertical).
- **Documents: checklist** (`components/document-checklist`, `components/document-row`, step 2). The four documents with one returned, one to upload, one with HR and one verified. Uses page header, tag, progress tracker, document checklist, document row, progress bar, lozenge, button.
- **Documents: upload a qualification** (`components/document-row`, upload state). One file with HR and one still uploading. Uses breadcrumbs, page header, file upload, file list, lozenge, progress bar, inline message, button.
- **Highlights: your details** (`components/employee-highlights`). Her details and her HR partner. Uses person header, avatar, lozenge, card, icon tile, description list, person, link, button.

## Where the redraw changes today's app

- **The consent names who is involved.** Today's text names Naleko. The redraw names the employer, Mokoena Logistics, and Naleko People, says where the data is kept, and cites POPIA in plain words.
- **One journey, not two.** Today the stepper and a separate journey list show the same steps. The redraw merges them into one vertical tracker that says when each step was done.
- **Progress as a count.** The progress percentage becomes "2 of 6 steps done" and "1 of 4 complete".
- **Status is an icon and a word (rule 4).** Coloured document badges become lozenges: "Matches", "With HR", "Needs a new copy", "Not uploaded yet".
- **A returned document says why and who.** The rejected bank letter says who returned it, when, and what to upload instead.
- **ID number masked (rule 6).** The ID shows as "ID ending 4417", never in full.
- **Batsi, in mint only (rule 1).** Checks Batsi makes say "Checked by Batsi". Checks HR makes by hand say so.
- **Dates (content rules).** Dates read "1 Dec 2026", and recent ones "10 Nov".
- **No emoji.** The waving hand in the greeting goes.
- **Phone layout.** Some components follow the screen width, not the frame, so the consent terms and the description lists are set to one column for this kit.
