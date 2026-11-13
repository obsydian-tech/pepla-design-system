---
name: Site sample phone
group: site
status: ready
classes: pp-site-phone
primeng: none (public site only, no PrimeNG)
replaces: the public site's .ph, .ph-mail, .consent and .updoc, which used literal sizes, colour transitions, a width transition and inline svg ticks
---

# Site sample phone

The new employee's phone in the Onboarding demo. An email arrives, the new employee opens the link and agrees to POPIA consent, then three uploads are read one by one. One of them, the bank letter, is blurry and comes back.

## Anatomy

1. **Phone** (`pp-site-phone`): a 330px frame with a thick dark edge, a rounded top and a speaker line. It follows the width it is given when that is narrower.
2. **Status bar** (`pp-site-phone__bar`): the time and "Onboarding".
3. **Email** (`pp-site-phone__mail`): "New message" (`pp-site-phone__mail-note`), a title (`pp-site-phone__mail-title`), a line, and the "Open my onboarding" button (`pp-site-phone__open`). The button is not interactive: it is part of the picture.
4. **Consent** (`pp-site-phone__consent`, `--on` when ticked): a tick box (`pp-site-phone__box`) and the consent words.
5. **Upload** (`pp-site-phone__doc`, with `--ok` or `--bad` when finished): a name and a [live status](site-state.html) (`pp-site-phone__doc-row`), a bar (`pp-site-phone__track` with `pp-site-phone__fill`) and, for a rejected file, the reason (`pp-site-phone__error`).
6. **Note** (`pp-site-phone__note`): "Sample data", which becomes "All documents in. Sample data".

## States

| State | How |
| --- | --- |
| Waiting | Steps hidden (`data-site-live` on the section), the bar empty |
| Uploading | The bar fills over 1s (`pp-site-phone__fill--full`); status "Uploading" |
| Reading | The bar dims (`pp-site-phone__track--dim`); status "Reading" breathes |
| Matches or Received | `pp-site-phone__doc--ok`: the bar turns mint |
| Needs a look | `pp-site-phone__doc--bad`: the bar turns amber and the reason pops in |
| Still | Every step shows, the last state of every upload, nothing moves |

## Behaviour

- The bar is a full-width fill that scales from the left (transform). Its colour changes by fading a coloured layer in (opacity). `pp-site-phone__fill--reset` removes the transition for an instant return to empty before a retake.
- Plays from the first step when the section is in view and starts again after a pause, as the approved page does.
- Only opacity and transform move.

## Content

- Copied from the approved page: "Welcome, John", "Upload three documents before Monday 1 December.", the consent line, "ID document", "Bank letter", "Tax number" and the reason "Bank letter is blurry. Take the photo again in good light."
- The sample person is John Doe only.

## Accessibility

- The phone is a `role="group"` named "Sample: new employee's phone".
- Statuses are announced (see [Site live status](site-state.html)). The reason text carries the message, not colour.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

The real page is the new employee's onboarding page in the signed-in kits. This is its picture for the public site.

## Do and don't

- Do keep the demo to three uploads.
- Do let the reason say what to do ("Take the photo again in good light").
- Don't make the sample button a link.
