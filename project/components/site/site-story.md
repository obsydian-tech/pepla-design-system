---
name: Site story
group: site
status: ready
classes: pp-site-story, pp-site-story__pin, pp-site-story__steps, pp-site-story__step, pp-site-story__step--active, pp-site-story__step--done, pp-site-story__step--key, pp-site-story__n, pp-site-story__digit, pp-site-story__digit--on, pp-site-story__title, pp-site-story__em, pp-site-story__text
primeng: none (public site only, no PrimeNG)
replaces: the landing page's .j-grid, .j-sticky, .steps and .step, which faded background, border, shadow and number colours
---

# Site story

A card pinned on one side while numbered steps scroll past on the other. The step past the middle of the window is the current one, and the card follows it.

## Anatomy

1. **Grid** (`pp-site-story`): one column, two from 1024px of section width.
2. **Pin** (`__pin`): sticky under the header; holds a Site person card.
3. **Steps** (`__steps`, an ordered list) of **steps** (`__step`, `data-now` holds the card's line for that step): a number (`__n`, `aria-hidden`), a title (`__title`) and a line (`__text`). `--key` is the step Batsi does (mint border, `__em` for the mint words, the Batsi lozenge).
4. **Number** (`__n`): a grey ring with the digit written twice (`__digit`, and `__digit--on` in white).

## States

| State | How |
| --- | --- |
| Waiting | Translucent card, grey ring |
| Current (`--active`) | White card with a violet border and shadow (a layer that fades); violet number |
| Done (`--done`) | Mint number |

## Behaviour

- On scroll, the last step whose top is above 55% of the window is current; those before it are done.
- From 1024px the steps are at least 200px tall, so each holds the card for a while.

## Content

- Copied from the approved page.

## Accessibility

- An ordered list, so the steps are read in order with their numbers. The current step is shown, not announced; the pinned card is the live region.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

The steps follow the app's onboarding: offer, documents, document check, contract, laptop and access, day one.

## Do and don't

- Do keep one key step, the one Batsi does.
- Don't put buttons in a step.
