---
name: Checkbox
group: forms
status: ready
classes: pp-checkbox
primeng: reference only (built without PrimeNG) — Checkbox (p-checkbox)
replaces: p-checkbox with default theme, mat-checkbox look-alikes in the document checklist
---

# Checkbox

A checkbox turns one option on or off, or picks any number from a short list. Changes take effect when the form is saved. For a setting that applies at once, use Toggle.

## Anatomy

1. **Box**: 20px, `--radius-small`, 2px `--color-border-input`.
2. **Check**: drawn in `--color-icon-inverse` on `--color-background-brand-bold` when checked; a dash when mixed.
3. **Label**: `--font-body`, to the right, clickable.
4. **Description** (optional): a second line in `--font-body-small`, `--color-text-subtle`.

A group sits in a `fieldset.pp-field` with a `legend.pp-field__label` and a `pp-field__options` list.

## States

| State | How |
| --- | --- |
| Unchecked | Input background, bold input border |
| Hover | `--color-background-input-hovered` |
| Checked | Violet fill, white check that springs in over 100ms |
| Mixed | `indeterminate` set in script (or `pp-checkbox__input--mixed` for static mock-ups): a dash. Only for "select all" over a partly chosen list. |
| Focus | 2px violet ring, 2px offset, keyboard only |
| Error | `aria-invalid="true"`: danger border, and the Field message below the row |
| Disabled | Disabled fill and text. If it is checked and disabled, the description says why ("Always required for payroll"). |

## Behaviour

- The label and description are part of the hit area. On touch screens each row is at least 44px tall.
- "Select all" is checked when all are chosen, unchecked when none are, and mixed in between. Pressing it when mixed checks all.
- A checkbox never submits or saves on its own. If it should, it is a Toggle.
- Do not pre-check consent. A POPIA consent box starts empty and its error says what it is for.

## Content

- Labels are positive statements of what happens when checked: "Send Lerato her contract by email as well". Never a double negative like "Don't not notify".
- A group legend is a question or a noun: "Documents to request from Sipho".
- Consent copy names the person, what is kept and for how long.

## Accessibility

- A native `<input type="checkbox">` with `<label for>`; the description sits inside the label and is also in `aria-describedby`.
- Groups use `<fieldset>` and `<legend>`.
- Mixed state uses the native `indeterminate` property, which screen readers announce. Do not add `aria-checked` to a native checkbox.
- The checked state shows as a filled box and a check, not colour alone.

## PrimeNG mapping

> **Reference only.** In the Angular app this component is built in `src/app/ds` without PrimeNG. The mapping below describes the behaviour to match; it is not a dependency. Only the date picker, autocomplete, multi-select and long tables wrap PrimeNG (see `docs/verify-design-angular.md`).

```ts
checkbox: {
  root: { class: 'pp-checkbox', style: 'display:contents' },
  input: ({ props }) => ({
    class: ['pp-checkbox__input', { 'pp-checkbox__input--mixed': props.indeterminate }],
    'aria-invalid': props.invalid || undefined,
  }),
  box: { style: 'display:none' },
  icon: { style: 'display:none' },
},
```

Wrap each `p-checkbox` with its `<label class="pp-checkbox__label">` in a `div.pp-checkbox`. PrimeNG's own box and icon are hidden; the native input draws the box.

## In Pepla today

Checkboxes appear in 8 templates, mostly TalentFlow config (panel rules, the rule, trigger, escalation, template and approval chain drawers), plus the employee dashboard and the candidate workspace. Each is styled where it sits.

## Do and don't

- **Do** use a checkbox for choices saved with the form. **Don't** use it for a setting that applies at once.
- **Do** leave consent unchecked. **Don't** pre-tick anything a person is agreeing to.
- **Do** say why a box is locked. **Don't** show a disabled checked box with no reason.
