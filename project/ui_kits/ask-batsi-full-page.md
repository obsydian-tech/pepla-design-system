---
name: Ask Batsi full page
device: desktop and phone
order: 5
source: features/hr-dashboard (AI chat panel), features/talent-flow (AI chat panel)
---

# Ask Batsi full page

Proposed design, not approved. Two ways to talk to Batsi, both from the one chat: the Ask Batsi button in the top bar opens the side panel (no floating bubble; on a phone it is an icon button in the top bar), and a full-page chat mode with past chats, familiar from the chat assistants people already use.

The full page replaces the app's sidebar with the list of past chats (new chat, search, grouped by day) and a "Back to Today" link, the way Settings mode works. The conversation is a centred reading column with a rounded composer. It is the same chat as the panel: "Open as a full page" in the panel header continues the same conversation on the page.

Every sentence comes from `ask-batsi-chat/words.json`; new ones are marked proposed.

## Screens

- **Top bar: Ask Batsi opens the panel**, desktop and phone, with the count of proposals waiting.
- **Full page chat: new chat.** Greeting and three questions to pick from.
- **Full page chat: a proposal waits for you.** Answer, question and the proposal card.
- **Full page chat: an earlier chat.** A past chat opened from the list, with its approved outcome.
- **Full page chat: past chats (phone)** and **a proposal waits for you (phone).** The list first; a chat opens full screen with Back.

Delete chat (button in the chat header) and Delete all my chats (bottom of the list of chats) are drawn. The "are you sure" step before deleting (a danger modal dialog, three screens) is drawn with proposed wording, not approved yet.
