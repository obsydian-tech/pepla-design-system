---
name: Site leave
group: site
status: ready
classes: pp-site-leave, pp-site-leave__main, pp-site-leave__card, pp-site-leave__top, pp-site-leave__title, pp-site-leave__note, pp-site-leave__row
primeng: none (public site only, no PrimeNG)
replaces: the landing page's .lv-grid, .lv-main, .calc, .appr, .bal and .lv-row
---

# Site leave

The landing Leave section's layout: the request phone beside the team calendar, the approval and the balances.

## Anatomy

1. **Grid** (`pp-site-leave`): a Site leave request, and the main column (`__main`) from 880px; the phone column is 300px (`layout.site.request.width`).
2. **Cards** (`__card`): white, rounded, with the site card shadow. A top line (`__top`) with a title (`__title`) and either "Sample data" (`__note`) or a live status.
3. **Row** (`__row`): the approval card and the balances card, side by side from 1080px.
4. Inside: a Site calendar, a Site leave approval (with a Site suggestion), a Site balance, and a Site replay under them.

## States

| State | How |
| --- | --- |
| No request | Days plain; status "No request"; Approve and Decline off |
| Waiting | Days dashed violet; "Waiting for approval" |
| Approved | Days solid violet; "Approved"; Batsi's reminder; the balance counts down to 11 days and the phone shows "Annual leave approved. 11 days left." |

## Behaviour

- Fields fill from 0.5s, 0.7s apart; the count at 2.7s; Submit at 3.7s; Batsi's reminder at 6s; Approve at 7.8s.

## Content

- Copied from the approved page.

## Accessibility

- Each part keeps its own roles: the phone is a labelled group, the calendar an image with a full label, the status a live status.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

Leave Management: employees request on a phone, the line manager approves and the balance updates on the record.

## Do and don't

- Do keep the public holiday out of the working days.
- Don't approve without the line manager.
