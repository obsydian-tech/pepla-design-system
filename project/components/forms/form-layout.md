---
name: Form layout
group: forms
status: ready
classes: pp-form, pp-form-section, pp-form-row, pp-form__footer, pp-form-error-summary
primeng: none (plain form with Angular reactive forms; the error summary uses Section message)
replaces: tf-create__section and tf-form-row in candidate create, the step cards and PrimeFlex grid in new employee registration, hand-built footers
---

# Form layout

Form layout is the frame around a form's fields: sections with headings, rows that put two fields side by side on desktop, an error summary at the top after a failed submit, and a footer that keeps the actions in reach. Each field inside follows Field.

## Anatomy

1. **Form**: `pp-form`, a column with 24px between blocks, at most 720px wide (`pp-form--wide` removes the cap).
2. **Note** (optional): `pp-form__note`, one line at the top that says how required fields are marked.
3. **Error summary** (after a failed submit): a danger Section message with `pp-form-error-summary`, listing each problem as a link to its field.
4. **Section**: `pp-form-section`, a `<fieldset>` with its title on the `<legend>` (`pp-form-section__title`, `--font-heading-small`) and an optional `pp-form-section__description`. Sections after the first have a 1px top border.
5. **Row**: `pp-form-row`, one column on phone and two from 768px. `pp-form-row__full` makes a field span both columns.
6. **Footer**: `pp-form__footer`, sticky at the bottom of the scrolling area, with the actions on the right and an optional save status on the left.

## Appearances

| Class | Use | Never |
| --- | --- | --- |
| `pp-form` | Every form | Without a label: give the form `aria-labelledby` its page title |
| `pp-form-section` | Forms with more than about 6 fields. Order sections like the paper form or ID: personal details, contact, employment, banking, tax | For a single field (use the Field's own label) |
| `pp-form-row` | Pairs that belong together: first name and surname, start and end date | For three or more columns, or to pair unrelated fields |
| `pp-form__footer` | Forms longer than one screen, and every form in a drawer | Twice in one form |
| `pp-form--raised` | Forms on a card or in a drawer, so the sticky footer matches the raised surface | On the cream page |
| `pp-form-error-summary` | After a submit with errors in a form of more than 3 fields | Before the person has pressed submit |

## Required and optional

Mark whichever group is smaller, and use only one style in a form:

- **Most fields required** (the usual case): mark nothing as required. Add "(optional)" after the label of each optional field (`pp-field__optional`). The note says "All fields are required unless marked optional."
- **Most fields optional**: put `*` after each required label (`pp-field__required`, hidden from screen readers). The note says "Fields marked * are required."
- Required controls always carry `required`, whichever style the form uses.

## States

| State | How |
| --- | --- |
| Default | Sections, rows and footer as above |
| Saving | The submit Button goes to its working state (rule 8); the other footer buttons stay as they are but do nothing until it lands |
| Draft saved | `pp-form__status` shows `check` and "Draft saved 14:30" |
| Errors after submit | The error summary appears at the top and takes focus; each field in error shows its own message |
| Server error | The error summary shows one line saying what failed and what to do; nothing the person typed is cleared |

## Behaviour

- Validate a field when the person leaves it (see Field). Do not show the summary until they press submit.
- On submit with errors: show every field error, then show the summary at the top, scroll to it and move focus to it (`tabindex="-1"`). Each link moves focus to its field. The summary updates as errors are fixed, and goes away when there are none.
- In a short form (3 fields or fewer), skip the summary and move focus to the first field in error.
- The footer sticks to the bottom of whatever scrolls: the page, or the drawer body. Controls scroll into view clear of it and of the top bar.
- Rows stack below 768px. The order in the HTML is the reading order on phone, so put the left field first.
- Long forms save a draft as the person goes, and the footer says when it last saved. Leaving with unsaved changes asks first.
- Never disable the submit button to show the form is incomplete; let the press show what is missing.

## Content

- Section titles are short nouns in sentence case: "Personal details", "Banking". No numbering unless the form is a Progress tracker flow.
- The summary title says how many things to fix and what for: "Fix 2 things to add Lerato". Each line is the field's own error message, word for word.
- Footer actions: the primary says the outcome ("Add new hire"), the secondary is "Cancel" or "Save draft". Never "Submit".

## Accessibility

- Use `<form>` with an accessible name. Group sections with `<fieldset>` and `<legend>`; put a section description in the fieldset's `aria-describedby`.
- The error summary is `role="alert"`, has a heading, and its links point at the field ids (`href="#field-id"`), so they work without script.
- Focus moves to the summary on a failed submit so screen reader users hear what to fix, then they can tab through the links.
- The sticky footer never covers a focused control (scroll margin on every control).
- On phone the footer buttons stack full width and are 44px or more (rule 9).

## PrimeNG mapping

No PrimeNG component. Use an Angular reactive form; the summary is a Section message (`p-message severity="error"` mapped as in Section message):

```html
<form class="pp-form" [formGroup]="form" (ngSubmit)="submit()" novalidate aria-labelledby="page-title">
  @if (submitted() && errors().length) {
    <div #summary class="pp-section-message pp-section-message--danger pp-form-error-summary" role="alert" tabindex="-1">
      <i data-lucide="octagon-alert"></i>
      <div class="pp-section-message__content">
        <h2 class="pp-section-message__title">Fix {{ errors().length }} things to add {{ firstName() }}</h2>
        <ul class="pp-form-error-summary__list">
          @for (e of errors(); track e.id) { <li><a class="pp-link" [href]="'#' + e.id" (click)="focusField($event, e.id)">{{ e.message }}</a></li> }
        </ul>
      </div>
    </div>
  }
  <fieldset class="pp-form-section">
    <legend class="pp-form-section__title">Personal details</legend>
    <div class="pp-form-row"> ... </div>
  </fieldset>
  <div class="pp-form__footer">
    <div class="pp-button-group pp-button-group--stack-phone">
      <p-button label="Cancel" [outlined]="true" (onClick)="cancel()" />
      <p-button type="submit" label="Add new hire" [loading]="saving()" />
    </div>
  </div>
</form>
```

In `submit()`, call `form.markAllAsTouched()`, build the error list, and focus the summary after the view updates. Do not use `p-fieldset` (it adds a collapsible panel) or `p-card` per section.

## In Pepla today

- Candidate create (`candidate-create-page.component.html`) has sections named with `<p class="tf-create__section-label">`, not headings or legends, and a two-column `tf-form-row` that goes to one column below 560px. Labels have `*` typed into the label text, and some fields add "(optional)", so both styles are mixed in one form. Its footer bar (`tf-create__footer`, Cancel and Create Candidate) sits outside the `<form>`. On submit it marks all fields touched and stops; there is no summary at the top, and a save error shows at the bottom of the form (`tf-create__error`).
- New employee registration (`new-employee-registration.component.html`, 591 lines) is a 4-step wizard. Each step is a `p-card` laid out with PrimeFlex columns (`md:col-4`, `md:col-6`), and labels have `*` typed into the label text.
- No file under `src/app` uses `p-fieldset`.

## Do and don't

- **Do** use one marking style per form. **Don't** mix `*` and "(optional)" in the same form.
- **Do** list every error at the top after submit and link each one to its field. **Don't** show a red banner that only says "Please fix the errors".
- **Do** keep the actions in a sticky footer on long forms. **Don't** make people scroll to the bottom to find "Save".
