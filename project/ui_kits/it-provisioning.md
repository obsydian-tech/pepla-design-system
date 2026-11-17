---
name: IT provisioning
device: desktop and phone
order: 5
source: features/it-provisioning, features/it-provisioning/pages/it-queue, features/it-provisioning/pages/it-task-detail, features/it-provisioning/pages/completed
---

# IT provisioning

Every screen sits in the one Naleko People sidebar (see "One Naleko People" in the readme); only the selected module changes.

The IT side of Naleko People at Mokoena Logistics, redrawn: Bongani Mthembu's queue of setup tasks for new employees, one laptop task he has claimed, and the tasks he has finished. Every screen sits in the IT app shell with side and top navigation. The content, fields and steps are the ones in today's Angular templates. Only the look and the rule-driven details change.

## Screens

- **My queue** (`pages/it-queue/it-queue-page.component.html`). One note from Batsi, three counts (Overdue, Due soon, Claimed by me), the queue tabs, and one table, most urgent first, with the new employee, requirement, start date, a status word and one button per row. Uses app shell, side and top navigation, page header, section message (agent), stat card, tabs, table, person, lozenge, button.
- **My queue (phone)**. The same page at 390 pixels wide.
- **Task detail** (`pages/it-task-detail/it-task-detail-page.component.html`). One column: the task facts and the hiring manager's note, the fulfilment checklist, the fulfilment notes, then "When you complete it" and "Task activity" as sections you open, and the button row at the bottom. Release back to queue sits in More actions. Uses breadcrumbs, page header, card, description list, lozenge, person, checkbox, inline message, text field, select, textarea, accordion, button.
- **Task detail (phone)**. The same page at 390 pixels wide.
- **Completed** (`pages/completed/it-completed-page.component.ts`). The tasks Bongani resolved, in the same table pattern as My queue. Uses page header, card, table, person, lozenge.
- **Completed (phone)**. The same page at 390 pixels wide.

## Where the redraw changes today's app

- **Due and overdue in words.** Today the time limit is a coloured bar with no number. The redraw says "Overdue", "Due soon" or "On track" as a word with an icon, and "Overdue by 1 working day" where a task is over.
- **Status is an icon and a word (rule 4).** The red, amber and green dots and card edges become lozenges. Only Overdue and Due soon are loud.
- **Deadlines in words (rule 5).** "2d remaining" and "5 days to start" become "Starts in 2 days" and "Due in 2 days", beside the full date.
- **One table, one button per row.** The card grid with a button in every card becomes one table, most urgent first, with the queues as tabs.
- **Batsi, in mint only (rule 1).** One note says what Batsi noticed. Batsi changes nothing until IT acts.
- **Say why complete is off.** Mark as complete stays disabled until the checklist is done, as today, but a line now says why. The page also says what completing does: HR and the hiring manager are told, and the notes are locked to the audit trail.
- **HR, not the talent team.** The notification lines say "HR" (approved wording, group F).
- **Completed shows when.** The Completed list has a "Done 9 Nov" status on each row.
- **Dates (content rules).** Dates read "13 Nov 2026" and log times "10 Nov 2026, 09:14".
