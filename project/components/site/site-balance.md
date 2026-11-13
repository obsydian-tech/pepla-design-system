---
name: Site leave balances
group: site
status: ready
classes: pp-site-balance
primeng: none (public site only, no PrimeNG)
replaces: the public site's .balbox, .bline and .bar2 on the Leave page, which changed the number's colour by transition and the bar's width
---

# Site leave balances

A box of leave types with the days left on each. When a request is approved the annual leave number counts down and the bar shrinks.

## Anatomy

1. **Box** (`pp-site-balance`).
2. **Line** (`pp-site-balance__line`): a name, a number (`pp-site-balance__num`) and, for annual leave, a bar (`pp-site-balance__bar` with `pp-site-balance__fill`). A line can have a note (`pp-site-balance__note`: "36-month cycle").
3. **Number**: drawn twice. The second drawing (`pp-site-balance__flash`) is violet and is shown while `pp-site-balance__num--flash` is set.

## States

| State | How |
| --- | --- |
| Full | "15 days", the bar full |
| Counting down | The number steps from 15 to 11 every 0.22s and is violet (a fade) |
| Done | "11 days", the bar at 11 of 15 |
| Still | The done state shows |

## Behaviour

- The bar is a full-width fill that scales from the left (transform, `--_fill`), over 0.8s. Its violet to mint gradient squeezes with it, as the approved page's does.
- Only opacity and transform move.

## Content

- Copied from the approved page: "John Doe · Annual leave", "15 days" counting down to "11 days", "Sick leave", "28 days", "36-month cycle", "Family responsibility" and "3 days".

## Accessibility

- The number is in words ("11 days"). The second drawing is hidden from assistive technology.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

The balances on the employee record in Leave Management.

## Do and don't

- Do keep the unit with the number.
- Don't show a bar without a number.
