---
name: Consent capture
group: records
status: ready
classes: pp-consent, pp-consent__record
primeng: none (plain Angular template with Checkbox and Button)
replaces: the "Declaration & Consent" step on the employee dashboard
---

# Consent capture

Consent capture is the block where a new employee agrees to how their personal information is used, before they upload anything (POPIA). It says in plain words what is collected, why, who receives it and how long it is kept, links to the full notice, and records who agreed, when, and to which version. Nothing is ticked for them.

## Anatomy

1. **Title**: "How [company] uses your information".
2. **Intro**: one sentence on why they are seeing this.
3. **Terms** (`pp-consent__terms`, a `<dl>`), four rows, each with an icon:
   - **What we collect** (`file-text`): the kinds of data, in plain words.
   - **Why** (`info`): what each is for.
   - **Who receives it** (`users`): each system or body that gets data, with its country and which data.
   - **How long we keep it** (`clock`): the period, and what happens after.
4. **Choices**: Checkboxes, never pre-ticked. One required (to be employed and paid), then any optional ones, each marked "Optional".
5. **Footer**: "Read the full privacy notice" link and "Agree and continue" (primary, large on phone).
6. **Record** (`pp-consent__record`, after): who agreed, to which version of the notice, which optional choices they made, when, and where.

## Appearances

| Use | How |
| --- | --- |
| New employee portal, step 1 of onboarding | The full block, phone first, before any upload |
| A new notice version | The same block with a one-line "What changed" above the terms. Consent to the old version stays on record |
| Employee profile and HR record | Only the record line, with "Change or withdraw" for the employee and "View consent history" for HR |

## States

| State | How |
| --- | --- |
| Not agreed | Nothing ticked. "Agree and continue" is enabled |
| Error | Pressing continue without the required box shows a field error under it: what to do and who to ask |
| Working | "Agree and continue" is busy until the consent is stored (rule 8) |
| Agreed | The record line, success colours with `circle-check` and words |
| Withdrawn | The record line says who withdrew what and when. HR sees what has stopped as a result |

## Behaviour

- Checkboxes start empty, always. A pre-ticked box is not consent.
- Never disable "Agree and continue" to force a tick. Let the press show the error (see Button).
- Storing consent writes: the person, the notice version, each choice, the time, and the channel (new employee portal, HR on their behalf). The record is never edited; a change is a new record (rule 7).
- Optional choices can be changed later from the profile without redoing the required one.
- The terms come from the tenant's notice, in short form. The full notice opens in a new view and keeps the person's place.
- HR cannot tick consent for someone. If HR captures it on paper, they upload the signed form and the record says "Captured by Lerato Mokoena from a signed form".

## Content

- Say "we" for the employer here, since the employer is the one asking: "How Mokoena Accounting uses your information", "What we collect".
- Plain words, no legal terms: "bank account", not "financial information"; "deleted", not "destroyed in accordance with".
- Who receives it: name the system and the country. "The payroll system (South Africa) gets your name, ID, bank and tax details."
- Required checkbox describes what it is for: "Needed to employ and pay you". Optional ones start their description with "Optional."
- Button: "Agree and continue". Never "Accept & Continue" or "I agree" alone.

## Accessibility

- The block is a `<form>` labelled by its title. Terms are a description list.
- Choices are a `<fieldset>` with a legend. Each checkbox has a visible label and its description linked with `aria-describedby`.
- The error is linked to the required checkbox and the box gets `aria-invalid="true"`; focus moves to it.
- The record line is a polite live region when it first appears.
- Phone: the button is 48px tall and full width; checkbox rows are at least 44px.

## PrimeNG mapping

No PrimeNG component for the block. It is a plain Angular template composed from `pp-checkbox` (`p-checkbox` with `binary`, through the Checkbox pass-through), `pp-field` errors and `pp-button` (`p-button`).

```html
<form class="pp-consent" [attr.aria-labelledby]="id + '-t'" (ngSubmit)="agree()">
  ...
  <p-checkbox inputId="consent-main" [binary]="true" [(ngModel)]="main" [invalid]="showError()" />
  ...
  <p-button type="submit" label="Agree and continue" size="large" [loading]="saving()" />
</form>
```

## In Naleko People today

Verified in `hr-portal/src/app/features/employee-dashboard/`:

- `employee-dashboard.component.html` has a "Declaration & Consent" step before the documents step. It lists four statements, one of which says "I consent to Naleko Digital Solutions processing my personal information in accordance with the Protection of Personal Information Act (POPIA)." One `p-checkbox`, "I have read and agree to the above declaration", starts unticked. The "Accept & Continue" button is disabled until it is ticked.
- It does not say what is collected, who receives it or how long it is kept, and there is no link to a full notice.
- `acceptConsent()` in `employee-dashboard.component.ts` only sets `consentAccepted` to true. Nothing is sent to the server, so there is no record of who agreed or when. The same file sets `consentAccepted` to true on its own when the employee already has documents.

## Do and don't

- **Do** say what, why, who and how long in plain words. **Don't** hide it behind a link to a legal page.
- **Do** keep every box empty to start. **Don't** pre-tick, and don't fold optional sharing into the required box.
- **Do** store who agreed, when and to which version. **Don't** treat a local flag as consent.
