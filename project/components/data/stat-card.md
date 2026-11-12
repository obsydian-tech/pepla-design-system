---
name: Stat card
group: data
status: ready
classes: pp-stat, pp-stat-row
primeng: none
replaces: app-stat-card on the HR dashboard home, the TalentFlow dashboard tiles
---

# Stat card

One number that matters, what it counts, and what changed. A stat card is an entry point: it opens the list behind the number.

## Anatomy

1. **Label**: what is counted, with an optional 16px icon.
2. **Value**: Manrope metric, tabular figures.
3. **Meta line**: the change or the reason to act, in words, with an icon.

## Appearances

| Class | Use | Never |
| --- | --- | --- |
| `pp-stat` | A count or amount on a dashboard | For a number nobody acts on |
| `a.pp-stat` | Opens the filtered list behind the number | Without a destination when one exists |
| `pp-stat__meta--attention / --danger` | "2 overdue", "1 failed check" | For a normal change |
| `pp-stat__meta--good` | "All documents in" | For decoration |
| `pp-stat__meta--agent` | "Batsi chased 5 documents this week" | For work a person did (rule 1) |
| `pp-stat-row` | 2 to 4 stats in a row; wraps on phone | More than 4 |

## States

| State | How |
| --- | --- |
| Loading | Skeleton bar the height of the value |
| No data | The value shows "None yet" in subtle text, never 0 when nothing is set up |
| Hover (link) | Raised-hovered background, bold border |

## Behaviour

- Lead with what needs attention: a dashboard opens on the stat with overdue work first.
- The number links to the list it counts, already filtered.
- Change is said in words with direction: "3 more than last month", not "+3".

## Content

- Label: plural noun phrase, sentence case: "New starters this month", "Documents waiting".
- Money: "R 186 400" with a space for thousands, no decimals unless cents matter.

## Accessibility

- The whole card is one link; its name reads label then value: "Documents waiting, 12".
- Never rely on the meta colour; the meta line always has words.

## PrimeNG mapping

None. Plain markup in an Angular component.

## In Naleko People today

The HR dashboard home (`app-stat-card`) and the TalentFlow dashboard show counts like candidates per stage and pending verifications, with coloured numbers but no words for the change.

## Do and don't

- **Do** say what changed in words. **Don't** show a red number with no reason.
- **Do** link to the list. **Don't** make a stat that leads nowhere.
- **Do** keep 2 to 4 in a row. **Don't** open a page with eight tiles.
