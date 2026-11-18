---
name: Agent launcher
group: agent
status: draft
classes: pp-agent-launcher, pp-agent-launcher--inline, pp-agent-launcher--round, pp-agent-launcher__badge
primeng: none (a plain Angular template; a button)
replaces: the floating chat widget of the old employee portal
---

# Agent launcher

The bubble at the bottom right of every page that opens the agent panel. Proposed, not approved.

## Anatomy

1. **Button**: a pill with the `sparkles` icon and the words "Ask Batsi", fixed bottom right. On phone it is round, icon only, with `aria-label="Ask Batsi"`.
2. **Badge** (`__badge`, optional): the count of Batsi proposals waiting for this person.

## Behaviour

- Opens the agent panel beside the page (full screen on phone). While the panel is open the launcher is hidden.
- It is on every signed-in page of a company that has Ask Batsi switched on. It is not shown to anyone without access, and not on the full-page chat.
- Its place never changes and it never covers a primary action: pages leave room at the bottom right.
- The top bar button "Ask Batsi" does the same thing and stays.

## States

| State | How |
| --- | --- |
| Default | Pill, or round on phone |
| Proposals waiting | The badge shows the count |
| Panel open | The launcher is hidden |

## Appearances

| Class | Use | Never |
| --- | --- | --- |
| `pp-agent-launcher` | The app's one launcher | A second bubble for another assistant |
| `pp-agent-launcher--inline` | Docs: positioned inside its frame | In app templates |
| `pp-agent-launcher--round` | Phone | Desktop |

## Content

- Label: "Ask Batsi", the same words as the top bar button. Never "Chat", "Help" or "AI".
- Badge: a number only.

## Accessibility

A real button with a visible focus ring. The badge is read as part of the label: "Ask Batsi, 2 waiting".

## PrimeNG mapping

> **Reference only.** The app uses no PrimeNG. The launcher is a plain Angular button.

None. A fixed-position `button` with `ppIcon`.

## In Naleko People today

Not built. The old employee portal had a chat widget, `app-chat-widget`, that this replaces. The agent panel opens from it.

## Do and don't

- Do keep one launcher, in one place, bottom right.
- Don't show it to people without access, or on the full-page chat.
- Don't put a second assistant behind a second bubble.
