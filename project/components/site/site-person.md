---
name: Site person card
group: site
status: ready
classes: pp-site-person, pp-site-person__head, pp-site-person__name, pp-site-person__role, pp-site-person__meter, pp-site-person__fill, pp-site-person__count, pp-site-person__now, pp-site-person__views, pp-site-person__view, pp-site-person__view--on, pp-site-person__label, pp-site-person__row, pp-site-person__follow
primeng: none (public site only, no PrimeNG)
replaces: the landing page's .person card, .meter, .now, .views, .vrow and .follow, which grew the bar by width
---

# Site person card

One new employee's onboarding at a glance: who, how far, what happened last and, from 1024px, the detail of the current step.

## Anatomy

1. **Card** (`pp-site-person`, `aria-live="polite"`): frosted white, rounded, with the site card shadow.
2. **Head** (`__head`): avatar (`pp-avatar pp-avatar--violet pp-avatar--large`), name (`__name`), role and start date (`__role`), and the stage (a Site live status stack: Onboarding, Active).
3. **Bar** (`__meter`, `__fill`): violet to mint; `--_p` (0 to 1) is the share done. Under it the count (`__count`).
4. **Line** (`__now`): what happened last.
5. **Views** (`__views`, from 1024px): one `__view` per step, each with a label (`__label`) and rows (`__row`: a tick, the item and a Site status), or a Site document read and a follow-up line (`__follow`).

## States

| State | How |
| --- | --- |
| Step changes | The bar scales to the new share; the count, line and stage change; the new view fades and rises in (`--on`) |
| Last step | The stage crossfades to Active |

## Behaviour

- The bar fills by scaling across (transform), never by width.
- Under 1024px the views are not shown, as on the approved page.

## Content

- Copied from the approved page, with John Doe and Jane Smith. "Masked · ends 0861" is "Hidden · ends 0861" (word rule).

## Accessibility

- The card is a polite live region, so the new line is read when the step changes. Views that are not shown are `aria-hidden`.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

The app's onboarding record shows the same steps for each new employee.

## Do and don't

- Do use the demo people only.
- Don't show a full ID number.
