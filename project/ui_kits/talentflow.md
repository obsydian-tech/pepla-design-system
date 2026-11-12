---
name: TalentFlow
device: desktop
order: 3
source: features/talent-flow/shell, features/talent-flow/pages/dashboard, features/talent-flow/pages/pipeline, features/talent-flow/pages/candidates, features/talent-flow/pages/candidate-create, features/talent-flow/pages/candidate-workspace, features/talent-flow/pages/offers, features/talent-flow/components/intelligence-tile, features/talent-flow/components/evaluation-scoring-panel, features/talent-flow/components/offer-tab, features/talent-flow/components/provisioning-tab, features/talent-flow/components/ai-chat-panel
---

# TalentFlow

Every screen sits in the one Naleko People sidebar (see "One Naleko People" in the readme); only the selected module changes.

The recruiter's side of hiring at Mokoena Logistics, redrawn in Naleko People: the dashboard, the pipeline as a list and as a board, the candidates list, the add candidate form, one candidate's workspace on three tabs, the chat with Naleko People holding a proposal, and the offers page, which is still empty today. The content, fields and steps are the ones in today's Angular templates. Only the look and the rule-driven details change.

## Screens

- **Dashboard** (`pages/dashboard/dashboard-page.component.html`, `components/intelligence-tile`). The five zones in today's order: intelligence alerts, the four signal cards, candidates at risk, my actions today beside the pipeline summary, and this month. Uses app shell, side and top navigation, role pill, page header, agent proposal card (compact rows), stat card, card, table, lozenge, deadline chip, tag, badge.
- **Pipeline, list** (`pages/pipeline/pipeline-page.component.html`, list view). Search, the stage, health, seniority and sentiment filters, the result count, sort, and every candidate. Uses page header, button group (pressed buttons as filter chips and the view toggle), search, select, table, person, tag, lozenge, deadline chip.
- **Pipeline, board** (same page, kanban view). The four phase columns with counts and a column alert, one lozenge per card. Uses pipeline board, badge, person, lozenge, deadline chip. The sidebar is collapsed so all four columns fit.
- **Candidates** (`pages/candidates/candidates-page.component.html`). Search first, health and seniority chips, recently viewed, then all candidates. Uses search, button, card (interactive), person, table, tag, deadline chip, badge.
- **Add candidate** (`pages/candidate-create/candidate-create-page.component.html`). Personal details, role, department and location, hiring manager, seniority, workflow template and the interview setup toggle, with one field in error. Uses form layout, progress bar, text field, select, radio tiles, field error, button.
- **Candidate: interviews and evaluation** (`pages/candidate-workspace`, Interviews tab, and `components/evaluation-scoring-panel`). The persistent header, the details strip, the four-phase stepper, the tabs, the loop tracker, interview records with panel votes, and the evaluation interview feedback being captured for a panel member. Uses person header, description list, progress tracker, tabs, section message (agent), card, avatar group, lozenge, deadline chip, evaluation score, slider, radio tiles, textarea, inline message.
- **Candidate: offer** (`components/offer-tab/offer-tab.component.html`). The four offer states, the risk signal, offer details, offer sent with the interaction log, the approval chain and the acceptance form with what happens on confirm. Uses progress tracker, offer summary, masked salary, approval chain, timeline, form layout, radio tiles, deadline chip.
- **Candidate: provisioning** (`components/provisioning-tab/provisioning-tab.component.html`). The read-only laptop and access for the recruiter: readiness, the breach message, five items with type, queue, owner and status, and the activity log. Uses laptop and access, progress bar, section message, lozenge, deadline chip, timeline, inline message.
- **Ask Batsi, with a proposal** (`components/ai-chat-panel/ai-chat-panel.component.html`). The candidate overview with the chat panel open: the welcome, a config recommendation, the proposal waiting for approval, the topic chips and the composer. Uses agent panel, agent proposal card, confidence chip, config version badge, description list, section message.
- **Offers** (`pages/offers/offers-page.component.ts`). Today a "coming in Phase D" stub, so it is drawn as an empty state that points to the candidate's Offer tab. Uses page header, empty state.

## Where the redraw changes today's app

- **Status is an icon and a word (rule 4).** Today's health pills, health dots on the pipeline summary, coloured avatars and red, amber and green row edges carry status by colour. The redraw uses lozenges with an icon and a word, and the pipeline summary counts health in words ("5 on track, 1 due soon, 1 overdue").
- **Deadlines in words (rule 5).** The SLA bars have no numbers today. Each one becomes a deadline chip: "Overdue by 2 days", "Due today", "On track, 4 days left". Pending actions show when they expire, not "At Risk".
- **Dates (content rules).** Today's "20 Oct 26" and "EEE d MMM yyyy · HH:mm" become "20 Oct 2026" and "Mon 3 Nov 2026, 10:00".
- **Salary is masked (rule 6).** The offer summary shows "ZAR 480000" today. The redraw shows "R ••• ••• a year" with Show salary, and says that showing it is logged.
- **Raw JSON in agent approvals (rule 2).** The chat panel's "Human approval required" box prints the tool name and the parameters as JSON with Approve and Reject. The redraw is an agent proposal card: what changes, why now, what Batsi read, where it goes, how sure, then Approve, Edit or Decline, with the audit note. The button is named Approve and the proposal expires in words.
- **Confidence without numbers.** The proposal's certainty is a confidence chip ("Check this · 2 sources") that opens what Batsi read, never a percentage.
- **Mint only for the agent (rule 1).** Intelligence alerts and "signal intelligence" boxes are things Batsi noticed, so they carry the agent mark and the mint section message. Today's success greens, the cyan "Ask AI" pill and the teal "Add Candidate" pill are no longer mint: Add candidate is the violet primary button, Ask Batsi a default button.
- **Naleko People, not "TalentFlow AI, powered by Claude".** The agent is named Naleko People everywhere, the product is Naleko People (never Naleko), and the TalentFlow topbar becomes the Naleko People side navigation.
- **Scores in words.** The interview feedback's 0 to 10 steppers become sliders that say "7 out of 10, strong", each with its weight. The four coloured decision buttons become radio tiles with words. Panel votes read "Yes, 7.4 of 10".
- **No capitals for emphasis.** The provisioning tab's "COMPLETE", "BREACHED" and "APPROVED BY MARCUS K." become sentence case: "3 of 5 items", "Approved by Sipho Ndlovu, 4 Nov 2026". The readiness percentage is said as a count.
- **Fields.** "First Name *" and the % complete bar become sentence-case labels with a required mark and a progress bar that counts fields. The field error says how to fix it.
- **The board.** Today's kanban has no drag and drop, so the cards have no handle or Move button. Each card keeps one lozenge, the most urgent one.
