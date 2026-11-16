---
name: Site trust layout
group: site
status: ready
classes: pp-site-trust
primeng: none (public site only, no PrimeNG)
replaces: the landing page's .tr-grid, .tr-side and its Play again button
---

# Site trust layout

The landing page's Trust and POPIA section: the audit log on the left and a column of cards on the right (hidden personal data, where the data is kept) with Play again under them. On phones the column goes under the log.

## Anatomy

1. **Block** (`pp-site-trust`): two columns from a 1080px wide section (1.25 to 0.75), one column below that.
2. **Log**: a [Site audit log](site-audit.html) card (`pp-site-audit--card`).
3. **Side** (`pp-site-trust__side`): a [hidden personal data](site-hidden.html) card, a [data residency](site-residency.html) card and Play again (`pp-site-trust__again`, `rotate-ccw` icon).

## States

| State | How |
| --- | --- |
| Playing | The log fills, the reminder is approved, the ID number is shown and hidden again (see the parts) |
| Still | The finished log and the hidden value |

## Behaviour

- Layout only. The parts carry their own motion. Play again restarts the whole sequence.

## Content

- Section words copied from the approved landing page: eyebrow "Trust and POPIA", "Every action approved. Every step recorded.", the lead, the four capability columns and "Learn more about security and POPIA".
- "Masked personal data" and "masked by default" in the approved columns read "hidden" (Iggie's word rule).

## Accessibility

- Play again is a real button. The log and the note are live regions.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

Not in the app. It is how the public site shows the audit log and hidden data together.

## Do and don't

- Do keep the log and the hidden data side by side on desktop.
- Don't add a third card to the side column.
