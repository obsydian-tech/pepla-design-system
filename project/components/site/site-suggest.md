---
name: Site suggestion
group: site
status: ready
classes: pp-site-suggest
primeng: none (public site only, no PrimeNG)
replaces: the public site's .sugg2, which used a literal green box and an inline svg
---

# Site suggestion

The mint box under a demo where Batsi drafts or suggests something, or where the demo says what has just happened ("Onboarding opened for John Doe. Jane Smith notified.").

## Anatomy

1. **Box** (`pp-site-suggest`, with `pp-site-step`): a mint box with a mint border.
2. **Icon** (`pp-site-suggest__icon`): the sparkles icon for something Batsi suggests, or the mint tick circle (`pp-site-ok`) for something that happened.
3. **Text** (`pp-site-suggest__text`): a lead (`pp-site-suggest__lead`, in the agent colour: "Draft for Candidate 3.", "Suggested by Batsi.") followed by the words. A box that reports what happened has no lead.

## States

| State | How |
| --- | --- |
| Waiting | `data-site-live` on the section and the step not in: hidden and 8px low |
| Arriving | `pp-site-step--in`: rises and fades in over 450ms |
| Still | Shows at rest |

## Behaviour

- Arrives as a demo step. Nothing else moves.

## Content

- Copied from the approved page: "Draft for Candidate 3." with the reminder text, "Suggested by Batsi." with the suggestion, and the line about onboarding opening.
- A draft is a quotation of the message HR would send. It names a candidate by number.

## Accessibility

- The icon is decorative. The lead says who suggested it, in words.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

The Batsi suggestion under a flagged candidate or a drafted reminder in Recruitment.

## Do and don't

- Do say what Batsi suggests and leave the decision to HR.
- Don't show a draft as already sent.
