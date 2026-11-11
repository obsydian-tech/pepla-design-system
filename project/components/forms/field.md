---
name: Field
group: forms
status: ready
classes: pp-field
primeng: none (wraps every PrimeNG input; FloatLabel and IftaLabel are not used)
replaces: hand-built .form-group, .form-label, .error-text and mat-style floating labels
---

# Field

A field is the wrapper every input sits in: a label above, the control, then help text or an error message. Form layout stacks fields and puts two side by side on desktop.

## Anatomy

1. **Label**: `--font-label`, above the control, always visible. Never a placeholder used as a label.
2. **Required marker** (optional): a red `*` after the label, hidden from screen readers; the control carries `required`.
3. **Control**: any input from this group (Text field, Select, Date picker and so on).
4. **Help text** (optional): one line in `--font-body-small`, `--color-text-subtle`, under the control.
5. **Error message**: `octagon-alert` icon and a sentence in `--color-text-danger`. It replaces nothing: help text stays, the error sits above it.
6. **Footer** (optional): help text on the left and a character count on the right, for Textarea.

The form around the fields (`pp-form`, `pp-form-section`, `pp-form-row`, the footer and the error summary) is specified in Form layout.

## Appearances

| Class | Use | Never |
| --- | --- | --- |
| `pp-field` | One label, one control | Around two controls with one label (use a `<fieldset>` with a legend) |
| `fieldset.pp-field` + `legend.pp-field__label` | A group of checkboxes, radios or tiles under one question | For unrelated controls |
| `pp-form-row` | Pairs that belong together: first name and surname, start date and end date | For three or more columns; split into rows |
| `pp-field__label--hidden` | A label kept for screen readers where the field is already named on screen: a toolbar search | In forms; every form field shows its label |
| `pp-form--wide` | Forms inside a wide page where the 720px cap leaves a gap | In drawers (they are already narrow) |

## States

| State | How |
| --- | --- |
| Default | Label, control, optional help |
| Required | `*` after the label and `required` on the control. If most fields are required, mark the few optional ones with "(optional)" instead, and say so once at the top with `pp-form__note`. |
| Error | Control gets `aria-invalid="true"` (red border); the message shows with the icon |
| Disabled | The control is disabled; the label stays full contrast so the form still reads |
| Read only | The control is read only; use for values a person cannot change here, such as an ID number already verified |

## Behaviour

- Validate a field when the person leaves it, not on every key press. Once a field shows an error, re-check it on every change so the error clears as soon as it is fixed.
- On submit, show every error at once and show the error summary at the top of the form, which takes focus and links to each field (see Form layout).
- Never clear what someone typed because it failed validation.
- Long forms group fields into sections in the order the paper form or ID document uses: personal details, contact, employment, banking, tax.
- `pp-form-row` stacks below 768px; the order in the HTML is the reading order on phone.

## Content

- Labels are short nouns in sentence case: "First name", "ID number", "Monthly salary". No colon.
- Help says what format or why: "13 digits, as on the green ID book or smart card". Not "Enter your ID number".
- Errors say what went wrong and how to fix it, without blame: "That ID number has 12 digits. South African IDs have 13."
- Never "Invalid input", "Required field" or "Error". For an empty required field: "Enter the start date".

## Accessibility

- Every control has a `<label for>` that matches its `id`.
- Help and error ids go in the control's `aria-describedby`, error first.
- `aria-invalid="true"` on the control when it is in error. The error text is not a live region on blur; the summary at the top of the form is.
- The `*` has `aria-hidden="true"`; `required` on the control is what screen readers announce.
- Groups use `<fieldset>` and `<legend>`, never a `<div>` with a heading.

## PrimeNG mapping

Field has no PrimeNG component; it wraps them. Do not use `p-floatlabel` or `p-iftalabel`. Errors come from the Angular form control:

```html
<div class="pp-field">
  <label class="pp-field__label" for="idNumber">ID number<span class="pp-field__required" aria-hidden="true">*</span></label>
  <input pInputText id="idNumber" formControlName="idNumber" required
         [attr.aria-invalid]="idNumber.invalid && idNumber.touched || null"
         [attr.aria-describedby]="(idNumber.invalid && idNumber.touched ? 'idNumber-error ' : '') + 'idNumber-help'">
  <p class="pp-field__error" id="idNumber-error" *ngIf="idNumber.invalid && idNumber.touched">
    <i data-lucide="octagon-alert"></i>{{ idNumberError() }}
  </p>
  <p class="pp-field__help" id="idNumber-help">13 digits, as on the ID book or smart card</p>
</div>
```

```ts
message: { root: { class: 'pp-field__error' } }   // when p-message is used for field errors
```

## In Pepla today

The new employee registration form (591 lines of template), candidate create, and every TalentFlow config drawer. Each lays out its own labels, help text and errors.

## Do and don't

- **Do** keep the label above the control. **Don't** use the placeholder as the label.
- **Do** say how to fix it: "Use the format 3 Nov 2026". **Don't** say "Invalid date".
- **Do** pair related fields in a row on desktop. **Don't** put unrelated fields side by side to save space.
