---
name: Site hiring
group: site
status: ready
classes: pp-site-hiring, pp-site-hiring__side, pp-site-hiring__draft, pp-site-hiring__draft--on, pp-site-hiring__draft--sent, pp-site-hiring__who, pp-site-hiring__text, pp-site-hiring__body, pp-site-hiring__row, pp-site-hiring__ok
primeng: none (public site only, no PrimeNG)
replaces: the landing page's .board-wrap, .side, .bcard and .replay
---

# Site hiring

The landing Recruitment section's hiring board with Batsi's draft beside it: a candidate goes quiet, Batsi drafts a reminder and Jane Smith sends it.

## Anatomy

1. **Grid** (`pp-site-hiring`): a Site hiring board, and a side column (`__side`) of 290px from 1080px of width (`layout.site.hiring.side`).
2. **Draft card** (`__draft`, a polite live region): "Batsi" and the sparkle (`__who`), what Batsi noticed (`__text`), the draft (`__body`), and a row (`__row`) with two small Buttons and the sent line (`__ok`).
3. **Play again**: a [Site replay](site-replay.html) button.

## States

| State | How |
| --- | --- |
| Waiting | The draft card shows at 35% opacity |
| On (`--on`) | It fades in fully and the draft types itself in |
| Sent (`--sent`) | The buttons go and "Sent to Candidate 3 · Approved by Jane Smith, 09:42" shows |

## Behaviour

- On the landing page: Candidate 4 moves to Interview at 0.6s, Candidate 1 to Hired at 1.8s, Candidate 3 is at risk at 3s, the card turns on at 3.8s and types three characters every 14ms, and Send reminder is pressed at 7.6s. Candidate 3 then shows "Reminder sent".
- Send reminder sends at once; Edit makes the draft editable; Play again starts over.

## Content

- Copied from the approved page. Candidates are numbered, never named.

## Accessibility

- The card is a polite live region, so the sent line is read. The board is a group with its own label.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

Recruitment has a hiring board per role; the reminder waits for HR to send it.

## Do and don't

- Do keep a person's approval before anything is sent.
- Don't send on Batsi's own; the preview presses the button to show the flow.
