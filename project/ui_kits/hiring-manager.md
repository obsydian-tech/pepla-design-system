---
name: Hiring manager
device: desktop and phone
order: 4
source: features/talent-flow/pages/hm-dashboard, features/talent-flow/components/hm-task-card, features/talent-flow/pages/hm-provisioning, features/talent-flow/components/provisioning-bundle-card, features/talent-flow/pages/hm-bundle-review, features/talent-flow/pages/hm-bundle-progress
---

# Hiring manager

Every screen sits in the one Naleko People sidebar (see "One Naleko People" in the readme); only the selected module changes.

The hiring manager's side of Naleko People at Mokoena Logistics, redrawn: Sipho Ndlovu's list of tasks, the Decisions tab (each candidate waiting on a decision, with the Decide button, still a ⟦W-14⟧ gap for Iggie's words), the feedback he gives on an interview, the IT setup for his new employees, the review of a setup Batsi drafted, and the progress of one that is being set up. Every screen except Provisioning is drawn on a phone as well. The content, fields and steps are the ones in today's Angular templates. Only the look and the rule-driven details change.

## Screens

- **My tasks** (`pages/hm-dashboard/hm-dashboard.component.html`, `components/hm-task-card`). Three tabs (My tasks, My candidates, Decisions) and one list, "My tasks", where tasks and what Batsi noticed are one row each with one button and a More actions menu. No scoring form on the page. Uses app shell, side and top navigation, page header, tabs, card, agent proposal card (compact rows), lozenge, deadline chip, button.
- **My tasks on a phone** (same page). The same list at 390 pixels wide. Uses app shell (phone), top navigation (compact), tabs, card, agent proposal card (compact rows), lozenge, button.
- **Interview feedback** (`components/hm-task-card`). The drawer opened from "Capture feedback": 1 to 5 sliders with the scale in words, Decision, optional Notes, the line "Scores are advice. Sipho Ndlovu decides." and Submit feedback. Uses drawer, slider, radio tiles, textarea, button.
- **Interview feedback (phone)**. The same feedback as a full page at 390 pixels wide.
- **Provisioning** (`pages/hm-provisioning/hm-provisioning.component.html`, `components/provisioning-bundle-card`). The three counts, the setup waiting for review, and the two being set up. Uses page header, stat card, card, laptop and access, progress bar, icon tile, tag, lozenge, deadline chip, button.
- **Review the IT setup** (`pages/hm-bundle-review/hm-bundle-review.component.html`). The new employee, one table (Requirement, Goes to, Details, one menu per row) of what Batsi drafted, the approval chain as a section you open, the "When you approve" list above the buttons, then Back and Approve and send to IT. Uses breadcrumbs, page header, person, lozenge, card, table, agent mark, accordion, button.
- **Review the IT setup (phone)**. The same page at 390 pixels wide.
- **IT setup progress** (`pages/hm-bundle-progress/hm-bundle-progress.component.html`). Readiness, what Batsi noticed, each item with its owner and deadline, the action needed and the activity log. Uses person header, progress bar, section message (agent), laptop and access, person, lozenge, deadline chip, textarea, timeline, button.
- **IT setup progress (phone)**. The same page stacked in one column at 390 pixels wide.
- **Redrawn 17 Nov (no new words).** The "Action needed" card and the inline note form are gone. Batsi's note carries the one action, Escalate to the IT manager, and Add a note to the item, which opens the note in a drawer (**Add a note to the item**, a full page on a phone).
- **Provisioning on a phone** (same page as Provisioning). The counts and the three setups stacked. Uses app shell (phone), stat card, card, progress bar, lozenge, deadline chip, button.

## Where the redraw changes today's app

- **One worklist, one button per row.** The hiring manager opens on one list of what they must do. Tasks and Batsi flags are one list. The Batsi box above the tabs, the severity lozenges and the snooze and dismiss icons go.
- **Entering data is separate from reading.** The scoring form no longer fills the page. Feedback opens in a drawer on a desktop and on its own page on a phone, and the page behind it stays as it was.
- **No vote gate.** Today a No vote is blocked when the average score is above 5. The redraw removes the rule and its line, so Strong no and No stay available.
- **Scores in words.** Scores are 1 to 5 sliders that say the word (1 out of 5, poor, up to 5 out of 5, excellent). The closing line reads "Scores are advice. Sipho Ndlovu decides."
- **Status is an icon and a word (rule 4), deadlines in words (rule 5).** Lozenges carry the icon and a word, and deadlines read "Due today" or "Overdue by 2 days".
- **The agent proposes, a person approves (rule 2).** "Drafted by Batsi" carries the agent mark. The approve button sits at the bottom, with what happens on approve above it and a note that the setup cannot change afterwards.
- **Mint only for the agent (rule 1).** Only what Batsi noticed carries the agent mark and the mint section message.
- **Laptop and access, not Provisioning.** The page title and breadcrumb read "Laptop and access" (approved wording, group F). The kit screen names stay.
- **Dates (content rules).** Dates read "Tue 1 Dec 2026" and log times "9 Nov 2026, 17:00".
- **Phone.** Lists and forms stack in one column with full-width buttons.
