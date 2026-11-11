---
name: Modal dialog
group: overlays
status: ready
classes: pp-modal-dialog, pp-blanket
primeng: reference only (built without PrimeNG) — Dialog (p-dialog), ConfirmDialog (p-confirmdialog)
replaces: p-confirm (4 uses), p-dialog, window.confirm
---

# Modal dialog

A modal dialog asks for one decision or one short task, and blocks the page until it is done. Use it for confirming something that cannot be undone. For editing settings or a record, use a Drawer.

## Anatomy

1. **Blanket**: covers the page in `--color-blanket` and catches clicks outside.
2. **Container**: overlay surface, `--radius-xlarge` (24px), overlay shadow.
3. **Header**: the title as a question or task, `--font-heading-medium`; an optional 24px icon before it for danger and warning; an optional close button.
4. **Body**: one or two short paragraphs. Scrolls on its own when long; header and footer stay put.
5. **Footer**: buttons at the end, primary (or danger) last.

## Appearances

| Class | Use | Never |
| --- | --- | --- |
| (default) | A short task or a decision that can be reversed: "Send contract to Kagiso Molefe" | For a form longer than 3 fields (use a Drawer) |
| `pp-modal-dialog--danger` | Confirming something that destroys or cannot be undone. `triangle-alert` icon in danger, danger button | Without naming the person and the consequence |
| `pp-modal-dialog--warning` | Confirming something risky but reversible | For information only (use a Section message) |

## Sizes

| Class | Width | Use |
| --- | --- | --- |
| `pp-modal-dialog--small` | 400px | Confirms |
| (default) medium | 600px | Short tasks |
| `pp-modal-dialog--large` | 800px | Previewing a document before sending |
| `pp-modal-dialog--sheet` | full width | Phone. Applied by the phone breakpoint on its own; the class forces it |

On phone (under 768px) every dialog becomes a bottom sheet: full width, rounded top corners, a grab handle, buttons stacked with the primary on top at 48px.

## States

| State | How |
| --- | --- |
| Opening | Blanket fades in; the dialog rises 8px and fades in over 300ms. On phone the sheet slides up. Under reduced motion both only fade |
| Working | The confirm button goes to its working state (rule 8); the other button is disabled; Escape and outside clicks are ignored until it lands |
| Error | A Section message (danger) appears at the top of the body; the dialog stays open |
| Closing | Fades out over 100ms; focus returns to the control that opened it |

## Behaviour

- One dialog at a time. Never open a dialog from a dialog.
- Escape and the close button cancel. A click on the blanket cancels only when nothing has been typed.
- Danger confirms never close on a blanket click.
- After a successful action the dialog closes and a Flag confirms ("Offer withdrawn"). If the action can be undone, prefer the Flag's Undo over a confirm dialog.
- Long bodies scroll inside the dialog; the page under it never scrolls.

## Content

- The title is the question with the person's name: "Withdraw Lerato Mokoena's offer?"
- The body says the consequence in plain words: who is told, what is kept, and whether it can be undone. "You can't undo this."
- Buttons repeat the verb: "Withdraw offer" and "Keep offer". Never "Yes", "No", "OK" or "Confirm".
- Use the person's name in the cancel button when it reads better: "Keep Sipho".

## Accessibility

- `role="dialog"` (or `role="alertdialog"` for danger confirms), `aria-modal="true"`, `aria-labelledby` on the title, `aria-describedby` on the body for confirms.
- Focus moves into the dialog on open: to the first field, or to the least destructive button in a confirm ("Keep offer").
- Focus is trapped inside while open; Tab cycles through the dialog only.
- Escape closes it unless it is working. On close, focus returns to the control that opened it.
- The page behind gets `inert`, so screen readers can't reach it.

## PrimeNG mapping

> **Reference only.** In the Angular app this component is built in `src/app/ds` without PrimeNG. The mapping below describes the behaviour to match; it is not a dependency. Only the date picker, autocomplete, multi-select and long tables wrap PrimeNG (see `docs/verify-design-angular.md`).

PrimeNG v19 runs in unstyled mode. `p-dialog` and `p-confirmdialog` share the same pass-through.

```ts
dialog: {
  mask: { class: 'pp-blanket' },
  root: ({ props }) => ({
    class: ['pp-modal-dialog', {
      'pp-modal-dialog--small': props.styleClass?.includes('small'),
      'pp-modal-dialog--large': props.styleClass?.includes('large'),
    }],
  }),
  header: { class: 'pp-modal-dialog__header' },
  title: { class: 'pp-modal-dialog__title' },
  pcCloseButton: { root: { class: 'pp-button pp-button--subtle pp-button--icon pp-modal-dialog__close' } },
  content: { class: 'pp-modal-dialog__body' },
  footer: { class: 'pp-modal-dialog__footer' },
},
confirmdialog: {
  root: { class: 'pp-modal-dialog pp-modal-dialog--small pp-modal-dialog--danger', role: 'alertdialog' },
  message: { class: 'pp-modal-dialog__body' },
  pcAcceptButton: { root: { class: 'pp-button pp-button--danger' } },
  pcRejectButton: { root: { class: 'pp-button pp-button--default' } },
}
```

Set `[modal]="true"`, `[closeOnEscape]="true"`, `[dismissableMask]="false"` for danger confirms, and `[draggable]="false"`. Set `defaultFocus="reject"` on confirms.

## In Pepla today

`p-confirmDialog` sits in four places: the TalentFlow admin shell, the admin users page, the document detail card and the verification detail. The document and verification ones ask "Are you sure", and the TalentFlow config pages (scoring weights, panel rules, intelligence rules, stage config, SLA thresholds and others) call `confirm()`. None names the person or what is lost.

## Do and don't

- **Do** name the person and the consequence. **Don't** ask "Are you sure?"
- **Do** label buttons with the verb: "Withdraw offer". **Don't** use "Yes" and "No".
- **Do** use a Drawer for editing. **Don't** put a long form in a dialog.
- **Do** prefer Undo in a Flag for reversible actions. **Don't** confirm every small change.
