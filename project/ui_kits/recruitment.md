---
name: Recruitment
device: desktop and phone
order: 3
source: features/talent-flow/shell, features/talent-flow/pages/dashboard, features/talent-flow/pages/pipeline, features/talent-flow/pages/candidates, features/talent-flow/pages/candidate-create, features/talent-flow/pages/candidate-workspace, features/talent-flow/pages/offers, features/talent-flow/components/intelligence-tile, features/talent-flow/components/evaluation-scoring-panel, features/talent-flow/components/offer-tab, features/talent-flow/components/provisioning-tab, features/talent-flow/components/ai-chat-panel
---

# Recruitment

Every screen sits in the one Naleko People sidebar under "Hire" (see "One Naleko People" in the readme); only the selected module changes. Every screen is drawn on desktop and on a phone.

The Hire side of hiring at Mokoena Logistics, redrawn as the Hire UX rework: Today as one worklist, Roles, one role's board and the all-roles list, Candidates, the candidate record (Overview, Interviews, Offer), the drawers where data is entered (Add candidate, Interview feedback, Record answer, Schedule an interview), the Move and Not hired dialogs, the guest scoring page, the offer waiting for approval, Hired and the hand-over to Onboarding, Waiting for you, Why this flag, Ask Batsi and Offers. Wording is the approved Recruitment wording (groups A to I). Preview of the rework: https://claude.ai/artifact/3uV7RsjNpxmGvZDaxHaDNE.

## Screens

- **Dashboard.** One worklist "My actions today" (Batsi flags and actions merged), three stats, pipeline by stage. Uses stat card, card, agent proposal card (compact rows), table, lozenge.
- **Pipeline, list** and **Pipeline, board.** One page with a List and Board switch; views as tabs; one toolbar; five stage columns, Not hired is a button with a count. No drag and drop is needed: each card has a Move button and a More actions button ("More actions for {first name}") whose menu the page fills ("Pipeline, card menu" shows it open with Not hired). Uses page header, breadcrumbs, button group, tabs, search, select, table, pipeline board, person, lozenge, deadline chip.
- **Candidates.** Everyone who applied, in any stage. Uses tabs, search, select, table, person.
- **Add candidate** (drawer over the board). Five fields and an optional CV. Uses drawer, text field, select, file upload.
- **Roles** and **Open a role.** The role table and the form, with the Close role refusal as a section message.
- **Move a candidate** and **Not hired.** Modal dialogs with a required reason. **Not hired by the old system** is the one-off list.
- **Candidate: overview**, **Candidate: interviews and evaluation**, **Schedule an interview**, **Interview feedback** (drawer on desktop, full page on a phone). Uses person header, progress tracker, tabs, card, description list, slider, radio tiles, drawer.
- **Guest scoring page.** No sidebar and no sign-in; one candidate, five scores, Submit feedback.
- **Candidate: offer**, **Record answer**, **Candidate: offer, waiting for approval** (approver) and its drafter view, **Candidate: hired**, **Offers.** Uses accordion, masked field, file upload, section message, table, lozenge.
- **Candidate: offer, draft**, **approved**, **accepted**, **declined**, **expired** and **withdrawn**, and the **Withdraw this offer** dialog. One offer page per state: the state card shows the state word and its date, and only the actions that state allows (draft: Save draft, Submit for approval, Withdraw offer, with the sent-back note when there is one; approved: Mark as sent, Withdraw offer; accepted, declined, expired, withdrawn: none, accepted also shows the hand-over lines from Hired). The dialog is a danger confirm over the approved screen with an optional note. Uses card, lozenge, description list, text field, textarea, section message, modal dialog, accordion.
- **Proposals waiting** ("Waiting for you"), **Why this flag**, **Ask Batsi, with a proposal.** Uses agent proposal card, drawer, agent panel, config version badge.

Changes against the old TalentFlow kit: the Provisioning tab is gone (Hired shows "Open in Onboarding"); the four phases became five stages; 0 to 10 scores and weights became 1 to 5; "evaluation", "sentiment" and "SLA" are gone from visible text.
