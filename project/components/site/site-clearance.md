---
name: Site not cleared to work
group: site
status: ready
classes: pp-site-clear, pp-site-day
primeng: none (public site only, no PrimeNG)
replaces: the public site's .ncw, .who-row, .told and .dayc, which swapped blocks with display and changed pill colours by transition
---

# Site not cleared to work

The list of everyone who has an expired requirement, shown for a day, with a count and two lines saying who was told. When the renewal is accepted the list empties.

## Anatomy

1. **Block** (`pp-site-clear`; `--has` while someone is listed) holds the box and the told lines.
2. **Box** (`pp-site-clear__box`): a heading (`pp-site-clear__head`) with a shield icon, the title and a count (`pp-site-clear__count`, a [live status](site-state.html)).
3. **Stage** (`pp-site-clear__stage`): the empty line (`pp-site-clear__empty`) and the listed employee (`pp-site-clear__who`, with `pp-site-clear__avatar` and `pp-site-clear__why`) share one place.
4. **Told** (`pp-site-clear__told`, then `pp-site-clear__line`, with `pp-site-step`): two lines with a tick.
5. **Day** (`pp-site-day`, with `pp-site-day__dot`): the date the demo is showing, as a [live status](site-state.html) inside the pill.
6. A [suggestion](site-suggest.html) under the box.

## States

| State | How |
| --- | --- |
| Cleared | Count "0" in mint, "Every employee is cleared to work." |
| Listed | `--has`: count "1" in red, John Doe listed, "Jane Smith told" and "Manager told" step in |
| Accepted | `--has` removed: the count is "0" again, the lines leave, the suggestion steps in |
| Still | The cleared state shows |

## Behaviour

- The day moves 12, 13, 14 Nov at 0.9s and 1.7s; the employee is listed at 1.7s; the told lines arrive at 2.5s; the renewal is accepted at 5.2s.
- The empty line and the listed employee sit in the same place, so the box does not change height. The listed employee rises and fades in; the empty line leaves at once.
- The count and the date are stacks of states that crossfade.

## Content

- Copied from the approved page: "Compliance today", "Not cleared to work", "Every employee is cleared to work.", "John Doe", "Forklift licence expired 2 days ago", "Jane Smith told", "Manager told", "Renewal accepted by Jane Smith." and "John Doe is cleared to work."
- The sample person is John Doe.

## Accessibility

- The box is a polite live region, so a change in the list is announced.
- The reason is in words under the name.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

The not cleared to work list in Compliance Management.

## Do and don't

- Do say why a person is listed.
- Don't leave a person on the list once the renewal is accepted.
