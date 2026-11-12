---
name: Text field
group: forms
status: ready
classes: pp-text-field, pp-text-field-audit
primeng: reference only (built without PrimeNG) — InputText (pInputText), InputNumber (p-inputnumber), InputGroup (p-inputgroup), Password (p-password)
replaces: pInputText with inline styles, .form-control, p-inputgroup addons, plain-text ID and bank numbers
---

# Text field

A text field takes one line of text: a name, an email, a number, an amount. It always sits inside a Field, which gives it a label, help and errors.

## Anatomy

1. **Box**: 40px tall on desktop, 48px on phone, `--radius-medium`, 1px `--color-border-input`, `--color-background-input`.
2. **Value**: `--font-body` (16px on phone so iOS does not zoom), placeholder in `--color-text-subtlest`.
3. **Prefix** (optional): a currency symbol or an icon before the value, in `--color-text-subtlest`.
4. **Suffix** (optional): a unit after the value: "hours", "days", "%".
5. **Action** (optional): one icon button inside the right edge: reveal, clear or open a calendar. 32px, with a 44px hit area on touch.

Put `pp-text-field` straight on the `<input>` when there is nothing else in the box. With a prefix, suffix or action, put it on a wrapper and the input gets `pp-text-field__input`.

## Appearances

| Class | Use | Never |
| --- | --- | --- |
| `pp-text-field` | Any single-line text | For more than one line (use Textarea) |
| `pp-text-field--money` | Amounts: prefix `R`, `US$` or `ZK`, right-aligned tabular figures | For two currencies in one record |
| `pp-text-field--numeric` | Counts, hours, ID and tax numbers: tabular figures | With `type="number"` for IDs (it drops leading zeros) |
| `pp-text-field--masked` | A saved personal value: ID, passport, bank account, tax number (rule 6) | For a value the person is typing for the first time |

## Sizes

| Class | Height | Use |
| --- | --- | --- |
| `pp-text-field--small` | 32px | Filters inside dense desktop tables only |
| (default) | 40px | Desktop forms and drawers |
| (phone, automatic) | 48px | Every field below 768px, small included |
| `pp-text-field--fit` | content | Short values beside text, such as a notice period in days |

## States

| State | How |
| --- | --- |
| Hover | Background moves to `--color-background-input-hovered` |
| Focus | 2px `--color-border-focused` ring drawn inside the border, so the layout never moves |
| Error | `aria-invalid="true"`: 2px `--color-border-danger`, and the Field shows the message with `octagon-alert` |
| Disabled | `--color-background-disabled`, disabled text. Say why in help text ("Set by payroll"). |
| Read only | `--elevation-surface-sunken` and a light border; the value can be selected and copied |
| Masked | Value shows as `•••••••••0876`; the eye button reveals it |
| Revealed | Full value, `aria-pressed="true"` on the button, and a line that says who saw it and when |

## Behaviour

- Money: accept "18500", "18 500" and "R18 500"; on blur reformat to `18 500`. Store cents as a whole number.
- ID number: accept spaces and strip them. Check length and the checksum on blur, and read the date of birth from it to prefill the Date picker.
- Masked values: pressing "Show ID number" writes an audit entry (who, which record, when) before the value appears. The value hides again when the person leaves the page, or after 2 minutes, whichever comes first.
- A person typing a new ID number sees what they type. Masking starts once it is saved.
- Never block typing; validate on blur and on submit.

## Content

- Labels name the thing: "Monthly salary", not "Enter salary".
- Placeholders show an example only when the format is not obvious: `name@example.co.za`. Never put instructions in a placeholder; they vanish when typing starts.
- The reveal button is labelled for what it shows: "Show ID number", "Show bank account number". Its pair is "Hide ID number".
- The audit line: "Shown to you, 11 Nov 2026, 14:30".

## Accessibility

- Label with `<label for>`; help and error ids in `aria-describedby`.
- Prefix currency symbols are `aria-hidden` because the label says the unit ("Monthly salary" with help "in rand"). Suffix units stay readable.
- `inputmode="numeric"` or `"decimal"` on number-like fields so phones show the right keypad; `autocomplete` on names, email and phone.
- The reveal button is a toggle: `aria-pressed` and a label that changes with it. When the value appears, its live audit line is in `aria-describedby`.
- Error border is 2px and comes with an icon and text, never colour alone.

## PrimeNG mapping

> **Reference only.** In the Angular app this component is built in `src/app/ds` without PrimeNG. The mapping below describes the behaviour to match; it is not a dependency. The app uses no PrimeNG at all: the hard patterns are built on Angular Aria and the Angular CDK (see `docs/verify-design-angular.md`).

PrimeNG runs in unstyled mode; pass-through adds the Naleko People classes.

```ts
inputtext: {
  root: ({ props }) => ({
    class: ['pp-text-field', { 'pp-text-field--small': props.size === 'small' }],
  }),
},
inputnumber: {
  root: { class: 'pp-text-field pp-text-field--money' },
  pcInputText: { root: { class: 'pp-text-field__input' } },
},
inputgroup: { root: { class: 'pp-text-field' } },
inputgroupaddon: { root: { class: 'pp-text-field__prefix' } },
password: {
  root: { class: 'pp-text-field pp-text-field--masked' },
  pcInputText: { root: { class: 'pp-text-field__input' } },
  maskIcon: { class: 'pp-text-field__action' },
  unmaskIcon: { class: 'pp-text-field__action' },
},
```

`p-inputnumber` uses `mode="currency" currency="ZAR" locale="en-ZA"`. For a saved ID number do not use `p-password`; render the masked value with a reveal button that calls the audit endpoint first.

## In Naleko People today

The new employee registration form (names, ID, tax and bank numbers), candidate create and the TalentFlow config drawers. ID and bank numbers must follow the masking rule (rule 6) when shown back.

## Do and don't

- **Do** mask saved ID, passport, bank and tax numbers and log every reveal. **Don't** show them in full by default, even to admins.
- **Do** use `type="text"` with `inputmode="numeric"` for ID numbers. **Don't** use `type="number"`.
- **Do** show the currency inside the field. **Don't** put "(ZAR)" in the label and leave the field bare.
