---
name: Site Ask Batsi band
group: site
status: ready
classes: pp-site-batsi, pp-site-ask, pp-site-chat, pp-site-batsi__split, pp-site-batsi__text, pp-site-batsi__title, pp-site-batsi__lead, pp-site-batsi__vis
primeng: none (public site only, no PrimeNG)
replaces: the public site's .lm-batsi, .qchips and .chat, which used a blurred glow with a literal colour, colour transitions and inline svg
---

# Site Ask Batsi band

A band on a module page where a visitor presses a sample question and watches Batsi answer. Some answers end with a suggested action that waits for a person, who approves it, and the log line appears. It sits on a slowly turning mint and violet glow.

## Anatomy

1. **Band** (`pp-site-batsi`): a container with a vertical wash from white through pale mint and pale blue back to white. Its eyebrow is mint.
2. **Glow** (`pp-site-batsi__glow`): a very large soft conic circle behind the content that turns once in 40 seconds.
3. **Text and visual**: the demo section's split (`pp-site-batsi__split`, `pp-site-batsi__text`, `pp-site-batsi__title`, `pp-site-batsi__lead`, `pp-site-batsi__vis`). See [Site demo](site-demo.html).
4. **Sample questions** (`pp-site-ask`, a `role="group"`): chips (`pp-site-ask__chip`, `aria-pressed`, each with two labels `pp-site-ask__label` and `--on`). One is pressed.
5. **Conversation** (`pp-site-chat`): a frosted card with a top bar (`pp-site-chat__top`: the Batsi icon and name `pp-site-chat__name`, and "Sample data" `pp-site-chat__note`) and a body (`pp-site-chat__body`, a polite live region).
6. **Messages**: the visitor's (`pp-site-chat__msg--me`, dark, right) and Batsi's (`pp-site-chat__msg--ai`, mint, left) with "Batsi" and the sparkle icon (`pp-site-chat__who`), result rows (`pp-site-chat__rows`, `pp-site-chat__row` with a `pp-site-status`), a question (`pp-site-chat__ask`) and actions (`pp-site-chat__actions` with two small [Buttons](button.html)).
7. **Typing** (`pp-site-chat__typing`): three dots before an answer.
8. **Log line** (`pp-site-chat__logged`): a dashed pill, "Approved by Jane Smith · logged".

## States

| State | How |
| --- | --- |
| Answered | The question, then Batsi's answer with its rows |
| Waiting for a person | The answer ends with "Send the line manager a reminder now?" and two buttons |
| Approved | The buttons are gone, "Yes, send it." and Batsi's confirmation follow, then the log line |
| Chip, rest / hover / pressed | White; a mint border fades in; a dark fill and white label fade in |
| Still | `data-site-still`: no motion, the dots show solid |

## Behaviour

- The first question plays when 25% of the band is in view. The visitor's question appears at 0.3s, the dots at 0.9s, the answer at 2s.
- An answer with an action presses its own button after about 2.6s unless the visitor gets there first; then the buttons go, and the confirmation and the log line follow. Without a visitor, the next question plays 5.2s after the last line.
- Pressing a chip stops the automatic cycle for good and plays that question.
- Each message arrives with a 450ms rise and fade. The dots bounce on a 1s loop. The glow turns on `transform` only; under reduced motion it turns at half speed.
- A preview script plays this on the kit page; the Angular site does the same with a component.

## Content

- Eyebrow "Ask Batsi", headline "Ask Batsi about leave.", the lead and the three questions are copied from the approved Leave page.
- Batsi never approves anything: an action always ends with a person's yes and a log line naming that person (Jane Smith).
- Sample people: John Doe, Jane Smith, "Employee 2".

## Accessibility

- The chips are buttons with `aria-pressed`; the pressed label is a hidden copy so the fade does not double what a screen reader says.
- The conversation is a polite live region, so new messages are announced.
- Contrast: mint text on its pale fill, white on the dark message and on the pressed chip, all at least 4.5:1.
- The glow and the typing dots are decorative.

## PrimeNG mapping

None. The public site does not use PrimeNG. The signed-in app's [Agent panel](agent-panel.html) is the real Batsi.

## In Naleko People today

Not in the signed-in app. Source: the approved public site's Ask Batsi band on the Leave page (`lm-batsi`).

## Do and don't

- Do keep three sample questions at most.
- Do end an action with a person's approval and a log line.
- Don't let a sample answer say Batsi did something on its own.
- Don't use real data.
