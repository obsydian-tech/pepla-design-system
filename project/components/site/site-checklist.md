---
name: Site checklist
group: site
status: ready
classes: pp-site-checklist
primeng: none (public site only, no PrimeNG)
replaces: the public site's .cl2, .cli, .grp and .done-bar, which changed border and fill colours by transition and used inline svg ticks
---

# Site checklist

A list of requests or steps, each with an owner and a due date, that tick off one after another. It closes with a line that says what is now true. Used for "Before day one" and for an exit.

## Anatomy

1. **Checklist** (`pp-site-checklist`).
2. **Group label** (`pp-site-checklist__group`): small capitals, "IT request", "Day one".
3. **Item** (`pp-site-checklist__item`, `--now` while it is being done, `--done` when finished): a tick box (`pp-site-checklist__box`), the step (`pp-site-checklist__text`) and its owner and due date (`pp-site-checklist__owner`).
4. **Closing line** (`pp-site-checklist__done`, with `pp-site-step`): a mint tick circle (`pp-site-ok`) and a sentence.

## States

| State | How |
| --- | --- |
| Waiting | White row, empty box |
| Now | `--now`: a pale violet fill and border fade in |
| Done | `--done`: the box fills mint and the tick scales in; the text goes softer |
| Finished | The closing line steps in (when the list has one) and "Play again" appears |
| Still | Every item shows done |

## Behaviour

- Items tick every 0.85s: each is "now" for 0.55s, then done.
- The row highlight and the box fill are layers that fade in (opacity). The tick scales (transform).
- The exit list changes its status from "Open" to "Closed" when the last item is done.

## Content

- Copied from the approved page: the group labels, each step with its owner and due date, and "John Doe's employee record is active".
- Owners are roles ("IT", "Facilities", "Manager", "HR"), never a person.

## Accessibility

- Items are plain rows with their owner in text. Done is shown by the tick and by the softer text; the closing line says it in words.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

The IT request, first-day and exit checklists.

## Do and don't

- Do give every item an owner and a due date.
- Do end the list with what is now true.
- Don't colour a row with a transition. Fade a layer.
