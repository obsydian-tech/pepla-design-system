---
name: Masked field
group: records
status: ready
classes: pp-masked, pp-masked--revealed
primeng: none (read-only is a plain template; in a form it is the Text field's masked variant)
replaces: ID numbers, bank account numbers and salaries shown in full on records and document cards
---

# Masked field

A masked field shows personal data hidden until someone needs it (rule 6, POPIA): ID and passport numbers, bank accounts, tax numbers, salary and health information. Only the last few characters show. "Show" is a deliberate action: Naleko People records who revealed what and when before the value appears, and hides it again on its own.

The masked field assumes the viewer is allowed to see the value. If they are not, use Restricted value instead; a masked field has no "no permission" state.

## Anatomy

1. **Masked value** (`pp-masked__value`): bullet characters (•) and the last digits, in tabular figures: `•••••••••0876`, `•••• •••• 4821`. Salary hides the whole amount: `R •• •••`. Health shows only that something exists: "1 medical note, hidden" with `eye-off`.
2. **Show** button: a link-style button. "Hide" when revealed.
3. **Notice** (`pp-masked__notice`): `history` and "Revealing is recorded" before; "Shown to you, 11 Nov 2026, 14:30. Hides again in 2 minutes." after.

## Appearances

| Variant | Use | Never |
| --- | --- | --- |
| Read only (`pp-masked`) | Record pages, description lists, table cells, drawers | For a value the person is typing for the first time |
| In a form | A saved value inside a form: `pp-text-field pp-text-field--masked` with an eye action (see Text field). To change it, "Change account" empties the field for a new value; it never reveals the old one | Revealing to edit; people type the new value in full |

## States

| State | How |
| --- | --- |
| Hidden | Masked value and Show. The first masked field on a page carries the notice "Revealing is recorded"; the rest rely on the Show button's description |
| Revealing | Show is busy (`aria-busy`, spinner) while the audit entry is written (rule 8) |
| Revealed | The full value on a neutral wash (`pp-masked--revealed`), Hide, and the notice with the time and the countdown |
| Could not record | The value stays hidden. A danger notice: "Batsi could not record the reveal, so the number stays hidden." and Try again |

## Behaviour

- Show calls the audit endpoint first. The value is fetched and shown only after the audit entry is written. If the audit call fails, the value is never shown.
- The value hides again when the person leaves the page or the tab is hidden, or after 2 minutes, whichever comes first. The countdown is in the notice.
- The mask has a fixed length per kind, not the real length, so it does not leak how many digits there are.
- Copy is allowed only while revealed, and copying writes a second audit entry.
- Never put a full value in a URL, page title, tooltip, toast, export file name or log line.
- The API returns only the last digits for display (as `id_number_last4` does today). The full value comes from a separate, audited call.

## Content

- Use the literal bullet character (•), never asterisks, x's or an HTML entity.
- Button: "Show" and "Hide". In a form: "Show bank account number" as the accessible name.
- Notice before: "Revealing is recorded". After: "Shown to you, 11 Nov 2026, 14:30. Hides again in 2 minutes."
- In audit entries: "Chipo Banda revealed the bank account ending 4471".

## Accessibility

- The masked value is read as text. For salary, give it `aria-label="Salary hidden"` so screen readers do not read out bullets.
- The Show button is described by the value and the notice (`aria-describedby`), so it reads "Show, ending 0876, revealing is recorded".
- When the value appears, the notice is a polite live region (`role="status"`). A failure is `role="alert"`.
- Focus stays on the button, which now reads "Hide".

## PrimeNG mapping

No PrimeNG component for the read-only variant: it is a plain Angular template with `p-button` (link) through the Button pass-through. In a form it is `p-inputtext` with the Text field's masked pass-through. Do not use `p-password` for saved personal data; its own toggle does not write an audit entry.

```html
<span class="pp-masked" [class.pp-masked--revealed]="revealed()">
  <span class="pp-masked__value" [id]="id">{{ revealed() ? value() : (last4 | ppMask: 'bank') }}</span>
  <p-button [link]="true" size="small" [label]="revealed() ? 'Hide' : 'Show'" [loading]="busy()" (onClick)="toggle()" />
</span>
```

`ppMask` is the pipe to build: it takes the last digits and the kind, and returns the fixed-length mask with •.

## In Naleko People today

Verified in `hr-portal/src/app`:

- `shared/models/employee.model.ts` has `id_number_last4`, with the comment that the full ID is stored KMS-encrypted and never returned by the API, and is "Used for masked display: e.g. "••••••••• 1234"". No template uses `id_number_last4`.
- `features/employee-dashboard/components/document-row/document-row.component.html` shows the ID number (`fields.id_number`) and bank account number (`fields.account_number`) read from an uploaded document as plain text.
- `features/talent-flow/components/offer-tab/offer-tab.component.html` shows the offer's salary in full in the offer summary.
- There is no reveal action and no reveal audit anywhere in the app.

## Do and don't

- **Do** mask by default, even for admins. **Don't** show a full ID number in a list or table.
- **Do** write the audit entry before showing the value. **Don't** reveal first and log later.
- **Do** hide again on a timer. **Don't** leave a revealed value on screen when the person walks away.
- **Do** use Restricted value when the viewer may not see it. **Don't** show a Show button that then says "No permission".
