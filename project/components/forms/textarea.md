---
name: Textarea
group: forms
status: ready
classes: pp-textarea
primeng: Textarea (pTextarea)
replaces: pInputTextarea, raw textarea with rows="3" and inline widths
---

# Textarea

A textarea takes more than one line: a note, a reason, a short bio. It sits inside a Field like every input.

## Anatomy

1. **Box**: at least 96px tall, `--radius-medium`, 1px `--color-border-input`, `--color-background-input`, resizes vertically.
2. **Value**: `--font-body`, 16px on phone.
3. **Footer** (optional, from Field): help text on the left, a character count on the right.

## Sizes

| Class | Min height | Use |
| --- | --- | --- |
| (default) | 96px | Notes, reasons, short answers |
| `pp-textarea--large` | 192px | Job descriptions, exit interview notes, letters |
| `pp-textarea--auto` | grows with content, up to 384px | Comment boxes and chat inputs, where the browser supports `field-sizing` |

## States

| State | How |
| --- | --- |
| Hover | `--color-background-input-hovered` |
| Focus | 2px `--color-border-focused` ring inside the border |
| Error | `aria-invalid="true"`: 2px `--color-border-danger`, and the Field shows the message |
| Over the limit | The count turns `--color-text-danger` (`pp-field__count--over`) and an error says by how much |
| Disabled | Disabled fill and text, no resize handle. Help says when it opens. |
| Read only | Sunken background; used to show an earlier value beside its correction (rule 7) |

## Behaviour

- Show a count only when there is a real limit, and only from 80% of it. Count characters, not words.
- Let people type past the limit and say how far over they are. Never cut off what they typed.
- The box grows on drag (desktop) or with content (`--auto`); it never shrinks below its minimum.
- Enter makes a new line. Never submit a form from a textarea on Enter.

## Content

- The label says what to write: "Reason for declining", "Note for the hiring manager".
- Help says who will see it: "Only the hiring team can see this". People write differently when they know the audience.
- Count format: "118 of 500". Over: "212 of 200" and an error: "Shorten this by 12 characters to fit the team page."

## Accessibility

- `<label for>` and `aria-describedby` with the error, help and count ids.
- Do not make the count a live region on every key press; it is read when focus returns or with the description.
- Keep `maxlength` off when you want to show "over the limit"; with `maxlength` the browser blocks typing silently.

## PrimeNG mapping

```ts
textarea: {
  root: ({ props }) => ({
    class: ['pp-textarea', { 'pp-textarea--auto': props.autoResize }],
  }),
},
```

`pTextarea [autoResize]="true"` maps to `pp-textarea--auto`; PrimeNG sets the height itself, which is fine.

## In Pepla today

Text areas appear in 11 templates, including the evaluation scoring panel, the offer tab, the candidate workspace, the IT task detail, the hiring manager bundle pages, the AI mode panel and four config drawers.

## Do and don't

- **Do** say who reads it. **Don't** leave people guessing whether a candidate can see their note.
- **Do** show the count near the limit. **Don't** show "0 of 500" on an empty box.
- **Do** keep the old reason read only beside an edit. **Don't** overwrite it (rule 7).
