---
name: Date picker
group: forms
status: ready
classes: pp-date-picker, pp-date-picker__panel
primeng: DatePicker (p-datepicker, formerly p-calendar)
replaces: p-calendar with default theme, input type="date", dates shown as 2026-11-03 or 11/03/2026
---

# Date picker

A date picker takes one date. People can type it or pick it from a calendar. Dates always read like `3 Nov 2026`, never in numbers only, so nobody has to guess which is the day and which is the month.

## Anatomy

1. **Field**: a Text field with the date as text and a `calendar-days` action button at the right edge.
2. **Panel**: an overlay, `--radius-large`, `--elevation-surface-overlay`, `--elevation-shadow-overlay`.
3. **Header**: previous and next month buttons (`chevron-left`, `chevron-right`) around the month and year.
4. **Weekdays**: Monday first, two letters, `--font-body-small` in `--color-text-subtlest`.
5. **Day**: a 40px circle (44px on touch). Today has a ring; the chosen day is violet with white text; days from the next and previous month are dimmed.
6. **Footer** (optional): the rule that limits the dates ("Earliest start is today") and a "Today" link.

## States

| State | How |
| --- | --- |
| Field | All the Text field states: hover, focus, error, disabled, read only |
| Day hover | `--color-background-neutral-subtle-hovered` |
| Today | 1px `--color-border-bold` ring and bold figures, `aria-current="date"` |
| Chosen | `--color-background-brand-bold`, `--color-text-inverse` |
| In range | `pp-date-picker__day--in-range`: `--color-background-selected` between a start and end (leave requests) |
| Outside month | `--color-text-subtlest`; still choosable |
| Unavailable | `disabled`: `--color-text-disabled`. The footer says why. |
| Marked | `pp-date-picker__day--marked`: a dot under a public holiday or approved leave; the day's label says which |

## Behaviour

- Typing is always allowed. Accept `3 Nov 2026`, `3 November 2026`, `3/11/2026`, `03-11-2026` and `2026-11-03`; slashes and dashes are read as day, month, year. On blur, rewrite the value as `3 Nov 2026`.
- The calendar opens from the button, or with Alt + Down arrow in the field. It does not open on focus, so keyboard and screen reader users can just type.
- In the calendar, arrows move by day and week, Page Up and Page Down by month, Home and End to the start and end of the week, Enter chooses, Escape closes and returns focus to the field.
- Help text under the field turns the date into words: "Monday, in 12 days". This catches a wrong year or a weekend.
- Dates of birth are read from the SA ID number when there is one, and shown read only.
- Public holidays come from the person's country of work (South Africa, Zimbabwe or Zambia).
- On phone the panel opens as a bottom sheet.

## Content

- Format: `3 Nov 2026`. With a time: `3 Nov 2026, 14:30` (24-hour).
- Help says what the date is for and turns it into words: "Monday, in 12 days".
- Errors say what is wrong and show the format: "November has 30 days. Check the date, for example 30 Nov 2026." For a date before the limit: "The start date cannot be in the past. Choose today or later."
- Never put the format in the placeholder alone.

## Accessibility

- The field is a normal text input with a `<label for>`; the calendar is optional.
- The button has `aria-label` naming the field ("Choose start date"), `aria-haspopup="dialog"` and `aria-expanded`.
- The panel is `role="dialog"` labelled by the month title, which is a polite live region so month changes are announced.
- Days are buttons in a `role="grid"` with full labels: "Monday 23 November 2026". Today adds ", today" and `aria-current="date"`; the chosen day has `aria-pressed="true"` (or `aria-selected` on a grid cell).
- Weekday headings use `<abbr title>` with the full name.

## PrimeNG mapping

```ts
datepicker: {
  root: { class: 'pp-date-picker' },
  pcInputText: { root: { class: 'pp-text-field__input' } },
  dropdown: { class: 'pp-text-field__action' },
  panel: { class: 'pp-date-picker__panel' },
  header: { class: 'pp-date-picker__header' },
  title: { class: 'pp-date-picker__title' },
  pcPrevButton: { root: { class: 'pp-date-picker__nav' } },
  pcNextButton: { root: { class: 'pp-date-picker__nav' } },
  dayView: { class: 'pp-date-picker__grid' },
  weekDayCell: { class: 'pp-date-picker__weekday' },
  dayCell: { class: 'pp-date-picker__cell' },
  day: ({ context }) => ({
    class: ['pp-date-picker__day', {
      'pp-date-picker__day--today': context.date.today,
      'pp-date-picker__day--outside': context.date.otherMonth,
    }],
  }),
  buttonbar: { class: 'pp-date-picker__footer' },
},
```

Use `dateFormat="d M yy"` (gives `3 Nov 2026`), `firstDayOfWeek="1"`, `[showIcon]="true"` with `iconDisplay="input"`, and `[showOnFocus]="false"`. Wrap the input in a `div.pp-text-field` so it gets the box.

## In Pepla today

Date inputs appear on the new employee registration form, the offer tab and the admin audit filters. Dates must show as "3 Nov 2026" everywhere, never `11/03/2026`, which South Africans read as 11 March.

## Do and don't

- **Do** show `3 Nov 2026`. **Don't** show `03/11/2026`, which half your readers will misread.
- **Do** let people type. **Don't** force them through the calendar for a date of birth in 1992.
- **Do** say why a date is unavailable. **Don't** grey out days with no reason.
