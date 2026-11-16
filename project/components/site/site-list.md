---
name: Site settings list
group: site
status: ready
classes: pp-site-list, pp-site-list__head, pp-site-list__row, pp-site-list__row--company, pp-site-list__row--dated, pp-site-list__date
primeng: none (public site only, no PrimeNG)
replaces: the public site's .tp and .hol rows on the Platform page
---

# Site settings list

A short list of settings rows with a status on the right: an onboarding documents template, or public holidays.

## Anatomy

1. **List** (`pp-site-list`).
2. **Head** (`__head`, optional): the list's name and a status ("Template").
3. **Row** (`__row`): the item and a Site status. `--company` tints a row the company added. `--dated` adds a date column (`__date`, a `time`).

## States

| State | How |
| --- | --- |
| Arriving | Rows step in one by one (`pp-site-step`), the company's row after a pause |
| In | All rows shown |

## Behaviour

- Templates: rows 0.45s apart from 0.5s, the company row 0.9s later, the log line at 4s.
- Holidays: rows 0.5s apart from 0.5s, the company day 0.9s later, the log line at 3.8s.

## Content

- Copied from the approved page: the four required documents, "Safety induction sign-off" "Added by Jane Smith"; the December public holidays and "Office closed" "Company day".

## Accessibility

- Dates are `time` elements. The status words carry the meaning; the tint is extra.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

Document lists are set per company in the onboarding templates. Public holidays come from the South African calendar.

## Do and don't

- Do tint only what the company added.
- Don't use more than one status per row.
