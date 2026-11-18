---
name: Ask Batsi chat
device: desktop and phone
order: 4
source: features/hr-dashboard (AI chat panel), features/talent-flow (AI chat panel), lambda/nalekoAiChat, lambda/talentFlowAiChat
---

# Ask Batsi chat

Proposed design, not approved. One chat for all of Naleko People, opened from the Ask Batsi button in the top bar. It opens beside the page on desktop and fills the screen on a phone. The page shown behind it is the HR employee page at Mokoena Logistics.

All sentences on these screens come from one list (`ask-batsi-chat/words.json`). Each is either approved already, with its source, or proposed and waiting for Iggie. The kit introduces no new component: it is the agent panel, the checklist, the proposal card, the section message and the empty state.

## Screens

- **Empty.** Batsi's first message and three questions to pick from.
- **Batsi answers from the records.** A question, a one-line answer and the checks as rows.
- **Batsi is working.** The working line, with Stop.
- **A proposal waits for you.** Batsi asks before it acts. The drafted message is a proposal card with Approve, Edit and Decline.
- **Approved and sent.** The card shows who approved, when, and a link to the audit trail.
- **Waiting for another approver.** The person who asked cannot approve this action; the card says who can.
- **A request outside HR work.** Batsi declines in the approved limits wording.
- **Could not answer**, **Hourly limit reached**, **Not switched on for the company** and **Offline.** What the person sees and what they can do next.
