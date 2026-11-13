---
name: Site team calendar
group: site
status: ready
classes: pp-site-calendar
primeng: none (public site only, no PrimeNG)
replaces: the public site's .cal-grid, .day and .legend on the Leave page, which changed a day's colour, border and number by transition
---

# Site team calendar

One month as a grid. Public holidays are hatched, a team member's days are mint, and John Doe's days turn from dashed to solid violet when the line manager approves.

## Anatomy

1. **Block** (`pp-site-calendar`) holds the grid and the key.
2. **Grid** (`pp-site-calendar__grid`, `role="img"` with a label that says it all): seven day names (`pp-site-calendar__dow`) and the days (`pp-site-calendar__day`). A blank first cell (`--blank`) starts the month on a Tuesday.
3. **Day kinds**: `--weekend` (a light wash), `--holiday` (hatched, with "PH"), `--team` (mint).
4. **A day that can be requested** has two layers (`pp-site-calendar__layer--requested`, `--approved`) and three drawings of its number (`pp-site-calendar__num`, `--requested`, `--approved`). `pp-site-calendar__day--requested` shows the dashed layer; `--approved` shows the solid one.
5. **Key** (`pp-site-calendar__legend`, then `pp-site-calendar__key` with `pp-site-calendar__swatch`, `--team`, `--holiday`).

## States

| State | How |
| --- | --- |
| Plain | White cell with a border |
| Requested | `--requested`: a dashed violet border and a pale violet fill fade in, the number turns violet, the day pops in |
| Approved | `--approved`: a solid violet fill fades in, the number turns white |
| Team | `--team`: mint |
| Still | The approved state shows |

## Behaviour

- The four days are requested one after another, 0.18s apart from 0.8s, and approved together at 2.8s. The balance beside it drops at the same time (see [leave balances](site-balance.html)).
- Every colour change is a fade: the layers and the number drawings change opacity. The pop on a requested day is transform and opacity.
- Under 561px the cells are 38px tall; above it they are 46px.

## Content

- Copied from the approved page: "Team calendar · December 2026", "Sample data", the day names, December 2026 with 16, 25 and 26 as public holidays, John Doe on 14 to 18 (not 16), Employee 2 on 21 to 23, and the key words "John Doe", "Employee 2" and "Public holiday".
- The sample people are John Doe and Employee 2.

## Accessibility

- The grid is one image with a label that names the leave and the holidays. Colour is not the only signal: holidays carry "PH" and the key names every colour.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

The team calendar in Leave Management.

## Do and don't

- Do mark public holidays in words ("PH") as well as by pattern.
- Don't colour a day for a person without the key saying who.
