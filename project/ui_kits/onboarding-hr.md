---
name: HR onboarding
device: desktop
order: 1
source: features/hr-dashboard, features/hr-dashboard/components/hr-dashboard-home, features/hr-dashboard/components/new-employee-registration, features/hr-dashboard/components/employee-detail, features/hr-dashboard/components/document-detail-card, features/hr-dashboard/components/verifications-list, features/hr-dashboard/components/verification-detail, features/hr-dashboard/components/support-inbox, features/hr-dashboard/components/notifications, features/hr-dashboard/components/ai-mode-panel, features/hr-dashboard/components/ai-hitl-confirm, features/hr-dashboard/components/ai-template-gallery
---

# HR onboarding

Every screen sits in the one Naleko People sidebar (see "One Naleko People" in the readme); only the selected module changes.

The HR side of Naleko People at Mokoena Logistics, redrawn: Thandeka Dlamini's home page, registering a new employee, one employee's documents, the document checks, the support inbox, notifications and the Batsi panel. Every screen sits in the HR app shell with side and top navigation. The content, fields and steps are the ones in today's Angular templates. Only the look and the rule-driven details change.

## Screens

- **HR home** (`components/hr-dashboard-home/hr-dashboard-home.component.html`). Four counts, the HR partner filter, search, and the employee table with stage, risk and start date. Uses app shell, side and top navigation, page header, stat card, select, search, table, person, avatar, lozenge, pagination, button.
- **New employee: personal information** (`components/new-employee-registration`, step 1). The four-step tracker and the personal details form. Uses breadcrumbs, page header, progress tracker, form section, form row, text field, button group.
- **New employee: confirmation** (same component, step 4). The details to check, the documents ready to upload, the assigned HR partner and the register button. Uses progress tracker, card, icon tile, description list, document checklist, document row, lozenge, inline message, person.
- **New employee: registered** (same component, success state). The new employee ID and the sign-in details. Uses section message, card, description list, masked field, inline message, button.
- **Employee detail** (`components/employee-detail`, `components/document-detail-card`). The person header, the risk note, document counts, completion, and one verification card per document. Uses breadcrumbs, person header, inline message, stat card, progress bar, verification result, description list, masked field, confidence chip, lozenge, button.
- **Verifications list** (`components/verifications-list`). Counts, the decision filter and the table of checks. Uses page header, stat card, select, table, link, lozenge, confidence chip, pagination.
- **Verification detail** (`components/verification-detail`). What Batsi found, the extracted data, the HR decision and the document facts. Uses breadcrumbs, verification result, description list, confidence chip, masked field, inline message, agent proposal card, button group.
- **Support inbox** (`components/support-inbox`). Filter tabs, search, the list of chats and one open chat where Batsi answered first and then passed it on. Uses page header, tabs, search, card (interactive, selected), avatar, lozenge, timeline, textarea, button.
- **Notifications** (`components/notifications`). The pending count and the list of documents that need review. Uses breadcrumbs, page header, stat card, card, notifications list, confidence chip, pagination, button.
- **Ask Batsi: choose a task** (`components/ai-mode-panel`, `components/ai-template-gallery`). The Batsi panel open beside the home page, with the task gallery. Uses agent panel, icon tile, table, stat card, lozenge, button.
- **Ask Batsi: a proposal to approve** (`components/ai-mode-panel`, `components/ai-hitl-confirm`). Batsi proposes to create Ayanda Zulu's record and shows every field it will save. Uses agent panel, agent proposal card, agent mark, description list, tag, button group, textarea.

## Where the redraw changes today's app

- **Sensitive numbers are masked (rule 6).** ID numbers and bank account numbers show only the last four digits, with a Show button. The verification detail says "Revealing is recorded".
- **No password on screen.** Today the success page shows the temporary password. The redraw says "Sent to Ayanda, not shown here" and the welcome email carries it.
- **Status is an icon and a word (rule 4).** The coloured risk dots and emoji risk bands, the coloured counts and the green and red document badges become lozenges with an icon and a word, such as "High risk" or "Needs review".
- **No capitals for emphasis.** Uppercase stage tags like "DOCUMENTS SUBMITTED" become sentence case.
- **Confidence in words (rule 3).** Percentages like "87% confidence" become confidence chips: "High confidence", "Check this" or "Batsi could not tell", with the number of sources.
- **One approval pattern (rule 2).** Today the HITL confirm dialog, the document approve and reject buttons, and the verification approve and reject buttons all look different. The redraw uses one pattern: Batsi's finding or proposal, then a person's decision buttons, then "Your choice is recorded with your name and the time."
- **Batsi, in mint only (rule 1).** "AI Assistant" and "AI mode" become Batsi. Only Batsi's own content carries mint and the agent mark.
- **Dates (content rules).** Bare and medium dates become "16 Nov 2026" and log times "10 Nov 2026, 19:40".
- **Required fields.** The red asterisks go. The form says "All fields are required unless marked optional."
- **Support handover is said in words.** The chat says when Batsi answered and when it passed the chat to HR, and why.
- **Notifications as a page.** The notifications panel component is capped at 400 pixels, so the full page puts the notification list in a card.
