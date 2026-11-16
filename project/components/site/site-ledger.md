---
name: Site ledger
group: site
status: ready
classes: pp-site-ledger, pp-site-ledger__head, pp-site-ledger__title, pp-site-ledger__today, pp-site-ledger__note, pp-site-ledger__list, pp-site-ledger__row, pp-site-ledger__row--late, pp-site-ledger__row--renewed, pp-site-ledger__name, pp-site-ledger__sub, pp-site-ledger__pips, pp-site-ledger__pip, pp-site-ledger__pip--sent, pp-site-ledger__pip--hit, pp-site-ledger--tiles
primeng: none (public site only, no PrimeNG)
replaces: the landing page's .ledger, .crow, .chip and .pips, which changed row, chip and pill colours by transition
---

# Site ledger

The landing certificate register: each certificate counts down to its expiry, and the reminders at 60, 30 and 7 days light up as they go out.

## Anatomy

1. **Card** (`pp-site-ledger`, a labelled group): frosted white with the site card shadow.
2. **Head** (`__head`): the title (`__title`), today's date (`__today`, a violet pill with a dot) and "Sample data" (`__note`).
3. **Rows** (`__list` of `__row`, `data-d` holds the days left on the first day): a name (`__name`), a line under it (`__sub`), the days as a Site status, and the reminders (`__pips`: "Reminders" and three `__pip`, `data-r` 60, 30 and 7).

## Variants

- `pp-site-ledger--tiles`: no card around the list, and each row is its own rounded tile. Used inside the Compliance hero card ([Site hero card](site-hcard.html)), which is the card. Rows there have no reminder pips.

## States

| State | How |
| --- | --- |
| Days left | Over 30: mint status; 30 or fewer: amber; today: "Expires today" |
| Overdue (`--late`) | A coral wash with a coral edge fades in; red status, "2 days overdue" |
| Renewed (`--renewed`) | A mint wash with a mint edge fades in; "1,095 days"; the reminders clear |
| Reminder sent (`__pip--sent`) | The dashed pill turns solid mint with a dot; `--hit` presses it once as it goes out |

## Behaviour

- On the landing page the date moves from 3 Nov to 14 Nov, a day every 340ms (650ms for the last three). The washes fade; statuses and pills swap at once.

## Content

- Copied from the approved page. People are John Doe and numbered employees.

## Accessibility

- A labelled group with a list. Today's date is text, so it is read with the rest.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

Compliance Management keeps the expiry date of every certificate on the employee record.

## Do and don't

- Do keep the three reminder points the app uses: 60, 30 and 7 days.
- Don't colour a row without its status words.
