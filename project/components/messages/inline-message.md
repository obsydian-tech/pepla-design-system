---
name: Inline message
group: messages
status: ready
classes: pp-inline-message
primeng: reference only (built without PrimeNG) — Message (p-message, variant="simple")
replaces: small p-message variant, red helper text under fields, coloured status text in rows
---

# Inline message

An inline message is a short icon and line of text next to the thing it is about: under a field, beside a row, after a value. It is the smallest message.

## Anatomy

1. **Icon**: Lucide, 16px, in the appearance's icon colour, aligned to the first line.
2. **Text**: one line where possible, `--font-body-small`, in the appearance's text colour.

## Appearances

| Class | Typical icon | Use | Never |
| --- | --- | --- | --- |
| (default) information | `info` | A hint or who can see something | For anything that blocks saving |
| `pp-inline-message--success` | `circle-check` | A value was checked: "Bank details verified on 4 Nov 2026" | For something only the agent did |
| `pp-inline-message--warning` | `triangle-alert`, `clock` | Something needs attention soon: "Due in 2 days" | As a field validation error |
| `pp-inline-message--error` | `octagon-alert`, `clock-alert` | A field error or something overdue | Without saying how to fix it |
| `pp-inline-message--agent` | `sparkles` | Pepla filled or suggested this value | For a person's input (rule 1) |

## Sizes

| Class | Use |
| --- | --- |
| (default) | A block on its own line, under a field |
| `pp-inline-message--inline` | Inside a row or a line of text, sitting on the text's middle |

## States

| State | How |
| --- | --- |
| Shown | Appears where the cause is; for fields, after the person leaves the field or presses save |
| Cleared | Goes as soon as the value is fixed; no "fixed" message |

## Behaviour

- A field shows one message at a time: the error if there is one, otherwise the hint.
- Validation runs when the person leaves the field or presses save, never on every keystroke.
- An overdue or due-soon line is always words plus icon (rules 4 and 5).

## Content

- Errors say what is wrong and how to fix it, without blame: "That ID number has 12 digits. South African IDs have 13."
- Keep it to one sentence; if it needs two, use a Section message.
- Deadlines: "Due in 2 days", "Overdue by 1 day", "Done 3 Nov".

## Accessibility

- Link a field message with `aria-describedby` on the field, and set `aria-invalid="true"` on the field when it is an error.
- For an error that appears after save, the form's error summary or a Flag announces it; the inline message itself needs no live region.
- Text colours pass 4.5:1 on surface and raised surface in both themes; the icon passes 3:1.

## PrimeNG mapping

> **Reference only.** In the Angular app this component is built in `src/app/ds` without PrimeNG. The mapping below describes the behaviour to match; it is not a dependency. The app uses no PrimeNG at all: the hard patterns are built on Angular Aria and the Angular CDK (see `docs/verify-design-angular.md`).

```ts
message: {
  root: ({ props }) => props.variant === 'simple'
    ? { class: ['pp-inline-message', {
        'pp-inline-message--success': props.severity === 'success',
        'pp-inline-message--warning': props.severity === 'warn',
        'pp-inline-message--error': props.severity === 'error',
        'pp-inline-message--agent': props.severity === 'secondary',
      }] }
    : { class: 'pp-section-message' },
}
```

Field errors under PrimeNG inputs use `<p-message variant="simple" severity="error" size="small">`.

## In Pepla today

Field errors on the new employee registration form, and status text in the verification and document views. These are hand-styled per component today, and not all of them pair the colour with an icon.

## Do and don't

- **Do** put the message right next to its field or value. **Don't** collect field errors only at the top of the form.
- **Do** pair the icon and the words. **Don't** show a red dot alone.
- **Do** use agent only when Pepla filled the value. **Don't** use mint for "saved".
