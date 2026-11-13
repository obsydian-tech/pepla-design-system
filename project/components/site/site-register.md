---
name: Site certificate register
group: site
status: ready
classes: pp-site-register
primeng: none (public site only, no PrimeNG)
replaces: the public site's .cr, .crs, .chip and .flt, which changed pill and button colours by transition
---

# Site certificate register

One row per certificate with the days left on it, and three filters above the rows: All, Expiring in 30 days and Overdue. Green is over 30 days, amber is 30 days or less, and red appears only when a certificate has expired.

## Anatomy

1. **Register** (`pp-site-register`).
2. **Filters** (`pp-site-register__filters`, a group): three buttons (`pp-site-register__filter`, with `aria-pressed`), each with a label drawn twice (`pp-site-register__label` and `--on`) and a count (`pp-site-register__count`).
3. **Rows** (`pp-site-register__list`, then `pp-site-register__row`; `--late` for an expired one, `--renewed` once accepted, `--off` when a filter hides it): a name, a line under it and the days as a [status](site-demo.html) on the right.

## States

| State | How |
| --- | --- |
| All | Every row shows |
| Expiring in 30 days | Only the amber rows show |
| Overdue | Only the expired row shows |
| Renewed | `--renewed`: a mint row with the new expiry date |
| Still | The first filter is pressed and every row shows |

## Behaviour

- The filters change on their own every 3.2s from 2.6s after the demo scrolls into view, and a click stops that and applies the filter.
- The pressed filter is a dark layer that fades in behind a label drawn twice, so the label's colour fades like the fill and the button never changes width.
- On a screen 768px or wider the list keeps its height, so the panel does not jump between filters.

## Content

- Copied from the approved page: "Certificate register", the filter words and counts, the five rows, their sites and days ("9 days", "38 days", "16 days", "195 days", "12 days overdue"), and "1,095 days" for the renewed row.
- Sample people are John Doe and Employee 2 to 5.

## Accessibility

- The filters are buttons with `aria-pressed`; the second label is hidden from assistive technology.
- Days are words ("12 days overdue"), never colour alone.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

The certificate register in Compliance Management, with days remaining on every certificate.

## Do and don't

- Do say how many days are left, and say "overdue" in words.
- Don't use red for anything that has not expired.
