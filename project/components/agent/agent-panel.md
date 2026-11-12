---
name: Agent panel
group: agent
status: ready
classes: pp-agent-panel, pp-agent-panel--inline, pp-agent-panel--sheet, pp-agent-panel__suggestions, pp-agent-panel__suggestion
primeng: reference only (built without PrimeNG) — Drawer (p-drawer) for the shell; the content is a plain Angular template
replaces: the hr-dashboard AI Assistant drawer (app-ai-mode-panel), the TalentFlow AI chat drawer (tf-ai-chat-panel) and the employee chat widget (app-chat-widget)
---

# Agent panel

The agent panel is where a person talks with Batsi. It opens from the right on desktop and fills the screen on phone. Messages from the person and from Batsi alternate; when Batsi wants to change something, the proposal appears in the conversation as a compact proposal card, and nothing changes until the person approves it.

## Anatomy

1. **Panel**: raised surface, opens from the right, the drawer's medium width. On phone a full-screen sheet.
2. **Header**: the agent avatar (`pp-avatar--agent`, the only mint avatar), the title "Naleko People", one line of context ("Looking at Kagiso Molefe"), and Close.
3. **Conversation** (`pp-agent-panel__log`): on the cream ground, newest at the bottom, grouped by day.
   - **Person's message**: right-aligned, neutral bubble.
   - **Batsi's message**: left-aligned, white bubble with a border. Not mint: mint is for Batsi's work, not its words.
   - **Proposal**: a compact Agent proposal card, full width.
   - **Time**: under each message, 24-hour.
   - **Suggestions** (`pp-agent-panel__suggestions`): when the conversation is empty, up to five things Batsi can do here, as one bordered list. Each row (`pp-agent-panel__suggestion`) is a link or button with one icon and a short verb-first title: "Show high-risk employees". No descriptions, no cards, no lozenges; the composer hint already says Batsi changes nothing until you approve.
4. **Working line**: a spinner, what Batsi is doing in words, and Stop.
5. **Composer**: a Textarea that grows to 4 lines, a Send icon button (primary), and the hint "Batsi changes nothing until you approve."

## Appearances

| Class | Use | Never |
| --- | --- | --- |
| `pp-agent-panel` | The app's one panel to talk to Batsi, opened from the top bar or a record | A second chat with a different name on another page |
| `pp-agent-panel--inline` | In docs and in a page layout where the panel is part of the page, not an overlay | On phone |
| `pp-agent-panel--sheet` | Docs only: shows the phone layout at desktop width. In the app, the media query does this | In app templates |

## States

| State | How |
| --- | --- |
| Empty | Batsi's first message says what it can do here, in one or two sentences, with up to three suggested questions as Default small buttons |
| Batsi is working | The working line at the bottom of the log, `role="status"`. Send is `aria-disabled`; the person can still type |
| Proposal waiting | A compact proposal row in the log, with the same buttons as anywhere else: one-tap Approve only when Batsi is sure and nothing leaves Naleko People, otherwise Review, which opens the full card |
| Decided | The proposal row shows its outcome lozenge ("Approved") and who approved, like the card |
| Error | Batsi's bubble says what went wrong and what to do: "I could not reach payroll. Try again in a few minutes." with a "Try again" button |
| Offline | A Section message (warning) above the composer; the composer is disabled with the reason |

## Behaviour

- One panel for all of Naleko People, everywhere. Its context line changes with the page ("Looking at Kagiso Molefe", "Getting started").
- Enter sends; Shift+Enter adds a line. On phone the Send button is 48px (`pp-button--large`).
- The log scrolls to the newest message when one arrives, unless the person has scrolled up; then a "New message" button appears at the bottom.
- Stop cancels Batsi's current work. Nothing it had started is applied.
- Proposals follow the proposal card rules (rule 2). Approving from the panel is the same call, the same audit entry and the same outcome as on the card.
- Personal data stays masked in Batsi's messages (rule 6). Batsi offers a link to the record instead of printing an ID number.
- Closing the panel keeps the conversation for the session. Reopening returns to the same place.
- Phone: the panel covers the screen, Close sits top left, and the composer stays above the keyboard.

## Content

- Title: "Naleko People". Never "AI Assistant", "TalentFlow AI", "Beta" or "Powered by" a model name.
- Batsi speaks as "I" in its own messages and names people by first name.
- Working line: what Batsi is doing, in words: "Batsi is reading 6 onboarding checklists". Never "Thinking…".
- Composer placeholder says what to ask about: "Ask Batsi about Kagiso".

## Accessibility

- The panel is a dialog (`p-drawer`, `role="dialog"`, `aria-modal="true"`) labelled by its title; focus goes to the composer when it opens and returns to the opener when it closes.
- The conversation is `role="log"`, so new messages are announced politely. Each message starts with visually hidden "You said:" or "Batsi said:".
- The working line is `role="status"`.
- Icon buttons have `aria-label` ("Send", "Close Batsi").
- Contrast: bubbles use surface and neutral tokens checked in CI; nothing in the log relies on colour alone.

## PrimeNG mapping

> **Reference only.** In the Angular app this component is built in `src/app/ds` without PrimeNG. The mapping below describes the behaviour to match; it is not a dependency. The app uses no PrimeNG at all: the hard patterns are built on Angular Aria and the Angular CDK (see `docs/verify-design-angular.md`).

`p-drawer` gives the shell (position, focus trap, Escape to close) through the Drawer pass-through. Everything inside is a plain Angular template composed from `pp-avatar`, `pp-button`, `pp-textarea` (`pTextarea` with `autoResize`), `pp-spinner` and the compact proposal card.

```ts
drawer: {
  root: ({ props }) => ({ class: ['pp-agent-panel', { 'pp-agent-panel--inline': props.modal === false }] }),
  header: { class: 'pp-agent-panel__header' },
  content: { class: 'pp-agent-panel__log', role: 'log' },
  footer: { class: 'pp-agent-panel__composer' },
}
```

Key names are to be checked against PrimeNG 19.

## In Naleko People today

Three separate AI chat surfaces, verified in `hr-portal/src/app`:

- `features/hr-dashboard/components/ai-mode-panel/ai-mode-panel.component.html` (`app-ai-mode-panel`): a right `p-drawer` 480px wide titled "AI Assistant" with a "BETA" pill. It starts with a template gallery, then a slot form, then chat bubbles. The working state is a `p-progressSpinner` with "Thinking…". The follow-up box is a 200-character textarea with "Ask a follow-up question…". Approvals use `app-ai-hitl-confirm`.
- `features/talent-flow/components/ai-chat-panel/ai-chat-panel.component.html` (`tf-ai-chat-panel`, opened from "Ask AI" in the TalentFlow shell and the candidate workspace): titled "TalentFlow AI", with the status line "Powered by Claude · " and the candidate's name, intent chips, a typing indicator of three dots, and a one-line input "Ask anything about this candidate…". Approvals sit inside a chat bubble.
- `shared/components/chat-widget/chat-widget.component.html` (`app-chat-widget`, on the employee dashboard): a floating chat bubble that opens a chat panel, with a `pi-sparkles` avatar in one mode and `pi-user` in the HR mode.

## Do and don't

- **Do** use one panel called "Naleko People" everywhere. **Don't** ship a second assistant with another name.
- **Do** show proposals as proposal cards in the conversation. **Don't** ask "Shall I go ahead?" in a bubble and act on "yes".
- **Do** say what Batsi is doing while it works. **Don't** show three bouncing dots or "Thinking…".
- **Do** keep Batsi's bubbles neutral. **Don't** fill the conversation with mint.
