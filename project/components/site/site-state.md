---
name: Site live status
group: site
status: ready
classes: pp-site-state
primeng: none (public site only, no PrimeNG)
replaces: the public site's .st when a demo changed its words and colour in place, which used colour transitions
---

# Site live status

A status pill (or a short line of words) whose text changes while a demo plays: "Waiting", "Uploading", "Reading", "Matches". Every possible state is in the page, stacked in one spot, and the current one fades in while the others fade out.

## Anatomy

1. **Stack** (`pp-site-state`): an inline grid that holds every state in the same cell, right-aligned. It is as wide as the widest state.
2. **State** (`pp-site-state__item`): one pill or one line of words. A pill is a [Site status](site-demo.html) with its tone (`pp-site-status--success`, `--brand`, `--warning`, `--danger`, or neutral). A stack of plain words that sits at the start of a line (a row's reason) takes `pp-site-state--start` so the words align left. A status that sits alone on the right of a panel top takes `pp-site-state--end`. `pp-site-state__item--on` marks the current one. `pp-site-state__item--pulse` makes the current one breathe while Batsi is working ("Reading").

## States

| State | How |
| --- | --- |
| Current | `pp-site-state__item--on`: opacity 1 |
| Not current | Opacity 0 over 350ms. The page also sets `aria-hidden="true"` on it |
| Working | `--pulse` on the current item: opacity 1 to .4 and back every 1.1s |
| Still | `data-site-still`: nothing fades or breathes; the current state shows |

## Behaviour

- A page changes the state by moving `pp-site-state__item--on` and the `aria-hidden` values. Nothing else changes: colour comes from the pill's own tone, so there is no colour transition.
- Only opacity moves. Reduced motion keeps the fades and the breathing.

## Content

- Words are copied from the approved page: "Waiting", "Uploading", "Reading", "Matches", "Needs a look", "Received", "Accepted", "Missing", "Draft", "Sent for signature", "Signed", "Open", "Closed".
- A line of words (the signature note) uses the same stack with plain text items.

## Accessibility

- The stack is a `role="status"`, so a change is announced politely. Only the current state is exposed, because the others are `aria-hidden`.
- Status words carry the meaning, never colour alone.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

Not in the signed-in app. Source: the approved public site's `.st` statuses in the Onboarding demos.

## Do and don't

- Do put every state a demo can reach in the stack.
- Do keep the words short: a state is one to three words.
- Don't change a pill's colour with a transition. Fade to another pill instead.
