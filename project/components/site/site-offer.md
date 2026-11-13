---
name: Site offer to onboarding
group: site
status: ready
classes: pp-site-offer
primeng: none (public site only, no PrimeNG)
replaces: the public site's .of, .of-c and .of-arrow, which changed border and fill colours by transition
---

# Site offer to onboarding

Two cards side by side: the signed offer letter and the employee record it creates. When the offer is signed, the record's card turns mint, its details fade in one by one and onboarding opens. On a phone the cards stack and the arrow is not shown.

## Anatomy

1. **Offer** (`pp-site-offer`): a grid that holds the two cards and the arrow. Cards sit side by side from 560px wide.
2. **Card** (`pp-site-offer__card`, `--live` when it is the current one): a title (`pp-site-offer__title`, a `h3`) with a [live status](site-state.html) and fields (`pp-site-offer__field`: label `pp-site-offer__label`, value `pp-site-offer__value`, `--in` once shown).
3. **Arrow** (`pp-site-offer__arrow`): decorative, between the cards.
4. A [suggestion](site-suggest.html) under the cards says what happened.

## States

| State | How |
| --- | --- |
| Sent | Offer letter "Sent" with its four details; employee record "Not created", no details |
| Signed | The offer's status becomes "Signed" and its card turns mint (`--live`, a fill and border that fade in) |
| Created | The record's status becomes "Created" and its card turns mint |
| Filling | Its four details fade in 0.45s apart |
| Active | The record's status becomes "Active"; the note steps in; "Play again" appears |
| Still | Both cards show their final state |

## Behaviour

- Timings are the approved page's: signed at 1.2s, created at 2.3s, details from 2.7s, active at 4.8s.
- Words change by crossfade; the mint look is a layer that fades in (opacity).

## Content

- Copied from the approved page: "Offer letter" with Role, Start date, Salary and Expires; "Employee record" with Name, Role, Start date and Onboarding; the statuses and the note.
- Salary is always "Hidden". The sample employee is John Doe; the person told is Jane Smith.

## Accessibility

- A change in either status is announced.
- The arrow is `aria-hidden`; the order of the cards says the same thing.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

The hand-over in Recruitment: a signed offer creates the employee record and opens onboarding.

## Do and don't

- Do carry the details that were already captured; never ask for them again.
- Do keep salary hidden on screen.
- Don't change a card's colour with a transition. Fade a coloured layer in.
