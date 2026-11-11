---
name: IT provisioning
device: desktop
order: 5
source: features/it-provisioning, features/it-provisioning/pages/it-queue, features/it-provisioning/pages/it-task-detail, features/it-provisioning/pages/completed
---

# IT provisioning

Every screen sits in the one Pepla sidebar (see "One Pepla" in the readme); only the selected module changes.

The IT side of Pepla at Mokoena Logistics, redrawn: Bongani Mthembu's queue of setup tasks for new hires, one laptop task he has claimed, and the tasks he has finished. Every screen sits in the IT app shell with side and top navigation. The content, fields and steps are the ones in today's Angular templates. Only the look and the rule-driven details change.

## Screens

- **My queue** (`pages/it-queue/it-queue-page.component.html`). What Pepla noticed, four counts, the queue tabs, and one card per task with the new hire, start date, SLA time used and the claim button. Uses app shell, side and top navigation, role pill, agent proposal card (compact rows), page header, stat card, tabs, card, tag, lozenge, deadline chip, person, avatar, progress bar, button.
- **Task detail** (`pages/it-task-detail/it-task-detail-page.component.html`). The task facts and SLA, the new hire, the hiring manager's note, the fulfilment checklist and notes, who claimed it, what happens on complete, and the activity. Uses breadcrumbs, page header, card, icon tile, tag, lozenge, description list, deadline chip, progress bar, person, checkbox, inline message, text field, select, textarea, verification result list, timeline, button group.
- **Completed** (`pages/completed/it-completed-page.component.ts`). The tasks Bongani resolved. Uses page header, card, table, tag, person, avatar, lozenge.

## Where the redraw changes today's app

- **SLA time in words.** Today the SLA is a coloured bar with no number. The redraw labels it "4 of 5 working days used", and a breached task says "over by 1".
- **Status is an icon and a word (rule 4).** The red, amber and green SLA dots and card edges become lozenges: "SLA breached", "At risk", "On track".
- **Deadlines in words (rule 5).** "2d remaining" and "5 days to start" become "Starts in 2 days" and "Due in 2 days", beside the full date.
- **Pepla, in mint only (rule 1).** Today's intelligence tiles with "critical" and "high" badges become what Pepla noticed, as compact proposals with the agent mark. Pepla changes nothing until IT acts.
- **Say why complete is off.** Mark as complete stays disabled until the checklist is done, as today, but a line now says why. The redraw also says what completing does: the bundle updates, the team is told and the notes are locked to the audit trail.
- **No capitals for emphasis.** "SLA BREACHED", "SLA HEALTH" and the other uppercase labels become sentence case tags.
- **Completed shows when.** The Completed list gains a "Done 9 Nov" status on each row.
- **Dates (content rules).** Dates read "13 Nov 2026" and log times "10 Nov 2026, 09:14".
