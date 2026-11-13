---
name: Site contract
group: site
status: ready
classes: pp-site-contract
primeng: none (public site only, no PrimeNG)
replaces: the public site's .contract, .mf, .sig and .prob, which swapped text instantly, recoloured by transition and drew the signature by stroke-dashoffset in an inline svg
---

# Site contract

An employment contract from the company template. Its details fill in from the employee record, the contract is sent for signature, the signature is written and probation dates are set.

## Anatomy

1. **Contract** (`pp-site-contract`): the paper and the probation row.
2. **Paper** (`pp-site-contract__paper`): a title (`pp-site-contract__title`), lines of text (`pp-site-contract__line`, width set by `--_w`), four **details** and the signature row.
3. **Detail** (`pp-site-contract__detail`, `--in` once filled): shows its label (`pp-site-contract__label`, violet) until it is filled, then its value (`pp-site-contract__value`, mint).
4. **Signature** (`pp-site-contract__sign`): the written signature (`pp-site-contract__ink`, `--on` once signed; its parts are `pp-site-contract__wipe` and `pp-site-contract__stroke`) and a note (`pp-site-contract__sign-note`, a [live status](site-state.html) with "Waiting for signature" and "Signed by John Doe, Tue 25 Nov 14:05").
5. **Probation** (`pp-site-contract__probation`): a calendar icon, the end date and a brand status with the reminder.

## States

| State | How |
| --- | --- |
| Draft | Details show their labels |
| Filling | Each detail gets `pp-site-contract__detail--in`: label fades out, value and mint fill fade in |
| Sent for signature | The status above the contract changes |
| Signed | `pp-site-contract__ink--on`: the signature is revealed left to right over 1.4s; the note changes |
| Probation | The probation row steps in and "Play again" appears |
| Still | Filled, signed, probation shown |

## Behaviour

- The signature is revealed by a window that slides across it while the signature slides the other way (transform), so it appears to be written left to right. The signature is an image mask (`assets/site-signature.svg`) filled with the text colour.
- A detail's label and value sit in the same cell, so the detail never changes width.
- Only opacity and transform move.

## Content

- Copied from the approved page: "Contract of employment", "Employee: John Doe", "Position: Sales Consultant", "Start date: 1 December 2026", "Salary: Masked", the signature note, "Probation ends 31 May 2027" and "Reminder 1 May: confirm or extend probation".
- Salary is always masked.

## Accessibility

- The signature is an image with the text alternative "Signature". Its meaning is in the note.
- Only the label or the value of a detail is exposed at a time (the other is `aria-hidden`).

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

The contract and probation step of onboarding.

## Do and don't

- Do fill every detail from the record.
- Do mask salary.
- Don't draw the signature by animating a stroke.
