---
name: Site Ask Batsi peek
group: site
status: ready
classes: pp-site-peek, pp-site-peek--open, pp-site-peek--static, pp-site-peek__close
primeng: none (public site only, no PrimeNG)
replaces: the landing page's .peek panel and its .msg, .typing and .act parts
---

# Site Ask Batsi peek

A small chat that opens from the hero's Ask Batsi button and plays a short sample conversation. It is a Site Ask Batsi chat (`pp-site-chat`) that floats at the bottom right.

## Anatomy

1. **Panel** (`pp-site-peek pp-site-chat`, `role="dialog"` named "Ask Batsi, sample conversation"): fixed at the bottom right, at most 380px wide (`layout.site.peek.width`).
2. **Head** (`pp-site-chat__top`): "Ask Batsi" with the spark, "Sample data", and a Close icon button (`__close`, a design system button).
3. **Body** (`pp-site-chat__body`, `aria-live="polite"`): the visitor's message (`pp-site-chat__msg--me`), Batsi typing (`pp-site-chat__typing`), Batsi's answers (`pp-site-chat__msg--ai`) and the two answers the visitor can give (`pp-site-chat__actions`).

## States

| State | How |
| --- | --- |
| Closed | Hidden, `aria-hidden`, no pointer events |
| Open (`--open`) | Fades and rises in |
| Answered | The chosen answer becomes the visitor's message and Batsi replies |
| In place (`--static`) | Sits in the page flow, open, for spec pages and frames |

## Behaviour

- The Ask Batsi button toggles it (`aria-expanded`); Close shuts it and returns focus to the button.
- On opening: the question at 0.2s, Batsi types for 0.9s before each answer, the next 0.5s after. A reply comes 0.6s after Send reminder or Not now.
- Under reduced motion the conversation still plays.

## Content

- Copied from the approved page, with John Doe as the employee.

## Accessibility

- A labelled dialog; the body is a polite live region so messages are read as they arrive. The buttons are real design system buttons.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

Ask Batsi is the app's chat (being renamed from Talent Flow chat). The peek is a sample; it reads no data.

## Do and don't

- Do mark it "Sample data".
- Don't open it without the visitor asking, on the site.
