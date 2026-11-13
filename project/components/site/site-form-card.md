---
name: Site form card
group: site
status: ready
classes: pp-site-form-card
primeng: none (public site only, no PrimeNG)
replaces: the public site's .fcard, .fform, .fld and .go, which used their own fields, a 11px radius and literal colours
---

# Site form card

The white card the Get started and Book a demo forms sit in. The fields are the design system's own: [Field](field.html), [Text field](text-field.html), [Select](select.html), [Textarea](textarea.html) and [Checkbox](checkbox.html), with [Site choices](site-choices.html) for the chips and the time slots, and a [Site button](site-button.html) to send.

## Anatomy

1. **Card** (`pp-site-form-card`): a 24px radius, a one-pixel border and the soft lifted shadow (`--elevation-shadow-site-card`).
2. **Form** (`pp-site-form-card__form`, a `<form novalidate>`): labelled by its title.
3. **Title** (`pp-site-form-card__title`, an `h2`) and an optional **sub** line (`pp-site-form-card__sub`).
4. **Row** (`pp-site-form-card__row`, with `--two` for two columns): fields side by side from 560px.
5. **Fields**: `pp-field` with a label, a control and, as needed, help and an error line. Required fields carry `required` and no star; optional ones say "(optional)".
6. **Choices**: a group of chips (modules of interest) and a day and time picker.
7. **Consent** (`pp-checkbox`): one line with links to the Terms of use and the Privacy notice.
8. **Submit** (`pp-site-button pp-site-button--dark pp-site-form-card__submit`): the full-width button.
9. **Fine print** (`pp-site-form-card__fine`): one centred line under the button (Get started only).
10. **Confirmation** (`pp-site-confirm`): replaces the form once it is sent. See [Site confirmation](site-confirm.html).

## States

| State | How |
| --- | --- |
| Empty | Placeholders absent; the select shows "Choose a role" |
| Error | The control gets `aria-invalid="true"` and the field shows its error line; the first invalid control takes focus |
| Filled | Values in place, chips and slots pressed |
| Sent | The form is `hidden` and the confirmation shows and takes focus |

## Behaviour

- On send, every required field is checked. A required text field fails when empty. An email field fails when it is not in the shape `name@example.com`. No domain is ever refused: Gmail and Outlook work. The consent box fails when unticked.
- An error clears as soon as the person changes that field.
- Nothing is sent to a server yet; the kit's preview script only swaps the form for the confirmation. This is a go-live blocker, not a kit problem.
- Never clear what a person typed because a check failed.

## Content

- Labels are short nouns: "Full name", "Role", "Email", "Company name", "Number of employees".
- Errors say what to do: "Enter a full name.", "Choose a role.", "Enter an email address, such as name@example.com."
- The field is called "Email" and nothing more specific, so nobody feels a Gmail address is refused.
- Buttons: "Create company account", "Book the demo".

## Accessibility

- Every control has a visible label. Help and error lines are linked with `aria-describedby`.
- Chips and slots are buttons with `aria-pressed`, in groups named by their label.
- The form is named by its title (`aria-labelledby`). On send, focus moves to the confirmation.
- Controls are 44px tall on a phone and the text is 16px, so iOS does not zoom on focus.

## PrimeNG mapping

None. The public site does not use PrimeNG; the fields are the design system's own.

## In Naleko People today

Not in the signed-in app. Source: the approved public site, the Get started and Book a demo forms.

## Do and don't

- Do keep every field's label above the control.
- Do say in the consent line what the details are used for.
- Don't block personal email addresses.
- Don't ask for more than the form asks today.
