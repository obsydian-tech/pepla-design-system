---
name: Site confirmation
group: site
status: ready
classes: pp-site-confirm
primeng: none (public site only, no PrimeNG)
replaces: the public site's .fdone, .call and .fsteps, which drew the tick and the step dots with hand-written svg and borders
---

# Site confirmation

What a form card shows once it is sent: a mint tick, what was done, when the call is, where the company stands, and the next move.

## Anatomy

1. **Panel** (`pp-site-confirm`, `tabindex="-1"`, `aria-live="polite"`): replaces the form inside the card.
2. **Badge** (`pp-site-confirm__badge`): a mint circle with a `check` icon.
3. **Title** (`pp-site-confirm__title`, an `h2`): "The company account is created." or "The demo is booked."
4. **Lead** (`pp-site-confirm__lead`): where the confirmation email goes, with the address in `strong`.
5. **Call** (`pp-site-confirm__call`): a calendar icon, the day and time (`pp-site-confirm__when`) and the zone and length (`pp-site-confirm__zone`).
6. **Steps** (`pp-site-confirm__steps`, Get started only): three steps (`pp-site-confirm__step` with `--done` or `--now`), each a mark (`pp-site-confirm__mark`, with a `check` icon when done), a name and a status (`pp-site-confirm__status`).
7. **Alternatives** (`pp-site-confirm__alt`): up to two lines with a link.

## States

| State | How |
| --- | --- |
| Done step | Mint filled mark with a tick, mint status "Done" |
| Current step | Violet ringed mark, violet status "Booked" |
| Later step | Empty mark, neutral status "After the call" |

## Behaviour

- It is `hidden` until the form is sent, then it shows and takes focus, and the page scrolls so the card sits just under the header.
- The day and time come from the slots the visitor pressed, and the email from the field.
- Nothing is sent yet (see Site form card).

## Content

- Get started: "The company account is created." "A confirmation email goes to {email} with the call invite attached." "Onboarding call: {day}, {time}" "South African time (SAST), 30 minutes". Steps: Account created (Done), Onboarding call (Booked), Modules switched on (After the call). "Until then, the Administrator can explore a sample company with John Doe and Jane Smith. No real employee data can be added yet." "Not ready to create an account? Book a demo instead."
- Book a demo: "The demo is booked." Same lead and call line, "Demo: {day}, {time}". "Ready to begin before the demo? Create a free company account. Modules are switched on after the onboarding call."

## Accessibility

- The panel is a live region and takes focus on send, so a screen reader announces the result.
- The ticks are icons with no text of their own; the status words carry the meaning.
- The email address wraps rather than overflowing a phone.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

Not in the signed-in app. Source: the approved public site's form confirmations.

## Do and don't

- Do repeat the address and the time, so a visitor can spot a typing mistake.
- Do keep the sample names to John Doe and Jane Smith.
- Don't promise more than the form did: no modules are switched on until the call.
- Don't add a second button. The next move is one link in a sentence.
