---
name: Site timeline
group: site
status: ready
classes: pp-site-timeline
primeng: none (public site only, no PrimeNG)
replaces: the public site's .tl and .waiting, which grew the line by `height` and changed dot colours by transition
---

# Site timeline

What happened and when, one entry after another, for a missing document that is chased. A line fills down the dots as each entry arrives. Under it, a short list of who else is still being waited on.

## Anatomy

1. **Timeline** (`pp-site-timeline`): the list and the waiting list.
2. **List** (`pp-site-timeline__list`, an ordered list): a grey line (`pp-site-timeline__line`) and a mint-to-violet fill (`pp-site-timeline__fill`), both decorative.
3. **Entry** (`pp-site-timeline__item`, with `pp-site-step`; `--hr` for the entry that tells HR, `--done` for the last): a dot (`pp-site-timeline__dot`), a text block (`pp-site-timeline__text`, with the time in `pp-site-timeline__when`) and a tag on the right: the Batsi [Lozenge](lozenge.html) or a [status pill](site-demo.html).
4. **Waiting** (`pp-site-timeline__waiting`): a label (`pp-site-timeline__group`, "Waiting on") and rows (`pp-site-timeline__waiting-row`) with a status.

## States

| State | How |
| --- | --- |
| Arriving | The entry gets `pp-site-step--in`: it rises and fades in, its dot colours (mint; amber for `--hr`; solid mint for `--done`) |
| Filling | The fill is full height and scales from the top to the input `--_fill` (0 to 1), set for each entry |
| Finished | The waiting list steps in and "Play again" appears |
| Still | Every entry shows with its dot coloured and the fill at full length |

## Behaviour

- The fill scales (transform), so the mint-to-violet gradient always runs across the length filled so far, as on the approved page.
- A dot's colour is a coloured ring and fill that fade in on top of the grey dot (opacity), not a colour transition.

## Content

- Copied from the approved page: "Requested from John Doe", "Reminder sent", "Second reminder sent", "Jane Smith told: still missing", "Received and matched", the times, "Waiting on" and its two rows.
- Sample people are John Doe and Jane Smith; the others are "Employee N".

## Accessibility

- An ordered list. The line and fill are `aria-hidden`.
- Each entry says what happened in words, with the time in text.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

The follow-up history of a missing document on the employee's record.

## Do and don't

- Do show the reminders in order with their time.
- Do show HR being told before the document arrives.
- Don't animate the line's height. Scale it.
