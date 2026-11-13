---
name: Site leave request
group: site
status: ready
classes: pp-site-request
primeng: none (public site only, no PrimeNG)
replaces: the public site's .phone, .fld, .count, .submit and .toast on the Leave page, which used a colour and box-shadow transition on the fields and literal sizes
---

# Site leave request

The employee's phone in the Leave demo. John Doe picks a leave type and two dates, the working days are counted, the request is sent and a note confirms it.

## Anatomy

1. **Block** (`pp-site-request`) holds the phone and "Play again".
2. **Phone** (`pp-site-request__frame`): a 300px frame with a thin edge, rounded corners and a shadow. It follows the width it is given when that is narrower. Its `pp-site-request__screen` holds everything and clips the note.
3. **Head** (`pp-site-request__head`): an avatar with initials (`pp-site-request__avatar`), a name and a role (`pp-site-request__name`, `pp-site-request__role`).
4. **Title** (`pp-site-request__title`): "Request leave".
5. **Fields** (`pp-site-request__field`, with `--on` while it is being filled and `--set` once filled): a label (`pp-site-request__label`) and an input box (`pp-site-request__input`) holding the value (`pp-site-request__value`). The two dates sit side by side in `pp-site-request__dates`.
6. **Count** (`pp-site-request__count`, `--on` once shown): the working days and the holiday that is left out.
7. **Submit** (`pp-site-request__submit`): a button with two labels, "Submit request" and "Request sent"; it is `disabled` once sent.
8. **Note** (`pp-site-request__toast`, `--on` once shown): a dark note with the tick (`pp-site-ok`) saying the request went to the line manager.
9. **More** (`pp-site-request__more`): holds "Play again" under the phone.

## States

| State | How |
| --- | --- |
| Empty | No field is on or set, the count and the note are hidden, the button says "Submit request" |
| Filling | The field has `--on`: a violet ring fades in and the value fades in |
| Set | The field has `--set`: the ring is gone, the value stays |
| Counted | `pp-site-request__count--on`: the working days fade in |
| Sent | The button is disabled and says "Request sent"; the note rises and fades in |
| Still | The sent state shows, nothing moves |

## Behaviour

- Leave type fills at 0.5s, From at 1.2s, To at 1.9s; the count shows at 2.7s; the button is pressed at 3.7s and the note arrives 0.3s later. The approved page's timings are kept.
- A click on the button sends the request at once.
- The ring is a layer that fades in (opacity); the value fades in. The button's two labels swap at once, as they do on the approved page.
- Only opacity and transform move.

## Content

- Copied from the approved page: "John Doe", "Sales Consultant", "Request leave", "Leave type", "Annual leave", "From", "Mon 14 Dec", "To", "Fri 18 Dec", "4 working days.", "16 Dec is a public holiday and is not counted.", "Submit request", "Request sent" and "Request sent to the line manager."
- The sample person is John Doe only.

## Accessibility

- The phone is a `role="group"` named "Sample leave request on a phone"; the note is a polite status.
- The button is a real button; its disabled state is the `disabled` attribute.
- The working days and the holiday are in words.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

The leave request page for employees, on a phone.

## Do and don't

- Do show the working days before the request is sent.
- Don't leave a holiday in the count.
