---
name: Hiring manager
device: desktop and phone
order: 4
source: features/talent-flow/pages/hm-dashboard, features/talent-flow/components/hm-task-card, features/talent-flow/pages/hm-provisioning, features/talent-flow/components/provisioning-bundle-card, features/talent-flow/pages/hm-bundle-review, features/talent-flow/pages/hm-bundle-progress
---

# Hiring manager

Every screen sits in the one Naleko People sidebar (see "One Naleko People" in the readme); only the selected module changes.

The hiring manager's side of Naleko People at Mokoena Logistics, redrawn: Sipho Ndlovu's dashboard with a vote open, the IT setup for his new employees, the review of a setup Batsi drafted, and the progress of one that is being set up. Two of the screens are drawn on a phone. The content, fields and steps are the ones in today's Angular templates. Only the look and the rule-driven details change.

## Screens

- **My tasks, with a vote open** (`pages/hm-dashboard/hm-dashboard.component.html`, `components/hm-task-card`). What Batsi noticed, the tabs for tasks, candidates and decisions, and a task card opened to score four criteria and vote. Uses app shell, side and top navigation, role pill, page header, agent proposal card (compact rows), tabs, card, avatar, tag, lozenge, deadline chip, slider, radio tiles, button.
- **My tasks on a phone** (same page). The same task card and vote at 390 pixels wide. Uses app shell (phone), top navigation (compact), tabs, card, slider, radio tiles, deadline chip, button.
- **Provisioning** (`pages/hm-provisioning/hm-provisioning.component.html`, `components/provisioning-bundle-card`). The three counts, the setup waiting for review, and the two being set up. Uses page header, stat card, card, laptop and access, progress bar, icon tile, tag, lozenge, deadline chip, button.
- **Review the IT setup** (`pages/hm-bundle-review/hm-bundle-review.component.html`). The new employee, the review deadline, the items Batsi drafted from the template with a note being added, the approval chain, what happens on approve, and the approve bar. Uses breadcrumbs, person header, section message, laptop and access, textarea, approval chain, card, button.
- **IT setup progress** (`pages/hm-bundle-progress/hm-bundle-progress.component.html`). Readiness, what Batsi noticed, each item with its owner and deadline, the action needed and the activity log. Uses person header, progress bar, section message (agent), laptop and access, person, lozenge, deadline chip, textarea, timeline, button.
- **Provisioning on a phone** (same page as Provisioning). The counts and the three setups stacked. Uses app shell (phone), stat card, card, progress bar, lozenge, deadline chip, button.

## Where the redraw changes today's app

- **Status is an icon and a word (rule 4).** The SLA dot, the coloured type badges and the green, amber and red card edges carry status by colour today. The redraw uses lozenges with an icon and a word, and says the item type in words ("Hardware", "Access").
- **Deadlines in words (rule 5).** "N days to start" becomes "Starts in 5 days". Items say "Overdue by 2 days" or "Due in 3 days", and the review says "Review due today".
- **Readiness as a count.** The readiness percentage becomes "3 of 5 items", on a progress bar.
- **No capitals for emphasis.** "BREACHED", "NEW HIRE" and the other uppercase labels become sentence case.
- **The agent proposes, a person approves (rule 2).** Today the laptop and access reads as "auto-generated". The redraw says "Drafted by Batsi from Office starter", and the hiring manager reviews, changes and approves it. The approve bar says the setup cannot change after approval.
- **Mint only for the agent (rule 1).** The signal intelligence box is something Batsi noticed, so it carries the agent mark and the mint section message. Other success greens are not mint.
- **Named queues in the approval chain.** Today's chain shows avatars and a "…". The redraw names each step: you, then the hardware, software and facilities queues.
- **Scores and votes in words.** The 0 to 10 steppers become sliders that say "8 out of 10, strong". The vote is four radio tiles with words. When the average is above 5, Strong no and No are disabled and a line says why.
- **Dates (content rules).** Dates read "Tue 1 Dec 2026" and log times "9 Nov 2026, 17:00".
- **Phone.** The task card, the vote and the provisioning list stack in one column with full-width buttons. The tabs drop their counts so they fit.
