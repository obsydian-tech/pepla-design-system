---
name: Drawer
group: overlays
status: ready
classes: pp-drawer
primeng: reference only (built without PrimeNG) — Drawer (p-drawer)
replaces: p-drawer (15 config drawers), the admin audit event drawer
---

# Drawer

A drawer slides in from the right to edit a record or a setting without leaving the page. The list behind stays in view so the person keeps their place. It is the home of every settings form in Pepla.

## Anatomy

1. **Blanket**: the shared `pp-blanket` from Modal dialog, behind the drawer.
2. **Container**: overlay surface, full height, right edge, 24px radius on the left corners, overlay shadow.
3. **Header**: title (`--font-heading-medium`), an optional one-line description, and a close button. A border below.
4. **Body**: scrolls on its own. Forms use `pp-drawer__form` for 20px between fields.
5. **Footer**: sticks to the bottom with a border above. Cancel and the primary action at the end; an optional note at the start ("Last changed by Sipho Ndlovu, 3 Nov 2026").

## Sizes

| Class | Width | Use |
| --- | --- | --- |
| (default) medium | 480px (`--layout-drawer-width-medium`) | Config forms: template, queue, routing rule, escalation, trigger, add user, edit roles |
| `pp-drawer--large` | 720px (`--layout-drawer-width-large`) | Side by side content: audit event before and after, a document preview with fields |

On phone (under 768px) every drawer is full screen with no radius, and the footer buttons stack with the primary on top at 48px.

## States

| State | How |
| --- | --- |
| Opening | Slides in from the right over 300ms; the blanket fades. Under reduced motion it only fades |
| Unsaved changes | Close, Escape or a blanket click asks "Discard changes to Payslip questions?" in a small Modal dialog |
| Saving | Save goes to its working state (rule 8); fields stay readable but are not editable |
| Error | A danger Section message at the top of the body, and Inline messages at the fields |
| Saved | The drawer closes and a success Flag confirms: "Routing rule saved" |

## Behaviour

- The footer is always visible, however long the form. Save never scrolls out of reach.
- Escape, the close button and a blanket click close it, with the discard check if anything changed.
- One drawer at a time. A drawer may open a Modal dialog (for a confirm), never another drawer.
- Every save records who, when and what changed (rule 7); the footer note shows the last change.
- Read-only drawers (like the audit event) have no footer.

## Content

- Title says the task and the thing: "Edit routing rule", "Add user", "Edit roles for Sipho Ndlovu".
- Description says what the setting does, in one line.
- The primary button names the outcome: "Save rule", "Add user", "Send invite". Not "Submit".

## Accessibility

- `role="dialog"`, `aria-modal="true"`, `aria-labelledby` on the title.
- Focus moves to the first field on open (or the close button for read-only drawers), is trapped inside while open, and returns to the control that opened it on close.
- Escape closes it (with the discard check). The page behind is `inert`.
- The close button has `aria-label="Close"`.

## PrimeNG mapping

> **Reference only.** In the Angular app this component is built in `src/app/ds` without PrimeNG. The mapping below describes the behaviour to match; it is not a dependency. The app uses no PrimeNG at all: the hard patterns are built on Angular Aria and the Angular CDK (see `docs/verify-design-angular.md`).

```ts
drawer: {
  mask: { class: 'pp-blanket pp-blanket--end' },
  root: ({ props }) => ({ class: ['pp-drawer', { 'pp-drawer--large': props.styleClass?.includes('large') }] }),
  header: { class: 'pp-drawer__header' },
  title: { class: 'pp-drawer__title' },
  pcCloseButton: { root: { class: 'pp-button pp-button--subtle pp-button--icon pp-drawer__close' } },
  content: { class: 'pp-drawer__body' },
  footer: { class: 'pp-drawer__footer' },
}
```

Use `<p-drawer position="right" [modal]="true" [blockScroll]="true">` with `#header` and `#footer` templates. Never use `position="full"`; the phone breakpoint does that.

## In Pepla today

`p-drawer` is used in 16 components: the add user and edit roles drawers, the config drawers (intelligence rule, provisioning template, notification trigger and others), the AI chat panel and the AI mode panel. The admin audit event drawer is the read-only case. Each styles its own width and footer; all move to this drawer with the sticky footer.

## Do and don't

- **Do** use a drawer for editing a record or a setting. **Don't** send the person to a new page for a 4-field form.
- **Do** keep Save in the sticky footer. **Don't** put the primary action at the top.
- **Do** ask before discarding changes. **Don't** lose typed work on a blanket click.
