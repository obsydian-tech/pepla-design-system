---
name: Button
group: actions
status: ready
classes: pp-button, pp-button-group
primeng: reference only (built without PrimeNG) — Button (p-button)
replaces: p-button (87 uses), hand-styled .btn-* classes
---

# Button

A button starts an action. Links go somewhere; buttons do something.

## Anatomy

1. **Container**: pill (`--radius-full`), 40px tall by default, at least 44px wide.
2. **Label**: a verb in sentence case, `--font-label`.
3. **Icon** (optional): Lucide, 16px, before the label. An icon after the label is only for `chevron-down` (opens a menu) or `arrow-right` (moves to the next step).
4. **Spinner**: shown in place of the label while the action runs.

## Appearances

| Class | Use | Never |
| --- | --- | --- |
| `pp-button--primary` | The one main action in a view or dialog: "Send contract", "Save changes" | More than one per view region |
| `pp-button--default` | Secondary actions beside a primary: "Edit", "Cancel" | As the only action in a dialog that commits something |
| `pp-button--subtle` | Low-emphasis actions in toolbars, table rows, cards | For anything destructive |
| `pp-button--danger` | Destroys or reverses something people care about: "Withdraw offer", "Remove access" | Without a confirmation step that names what is lost |
| `pp-button--agent` | Approving something Batsi proposed, only inside an Agent proposal card or agent panel | Anywhere a person, not the agent, did the work (rule 1) |
| `pp-button--link` | An action that sits inside text or needs the least weight | For navigation (use a real link) |

No class gives the neutral filled button, for rare tertiary actions in dense UI.

## Sizes

| Class | Height | Use |
| --- | --- | --- |
| `pp-button--small` | 32px | Dense desktop tables and toolbars only. Keeps a 44px hit area on touch screens. |
| (default) | 40px | Desktop default |
| `pp-button--large` | 48px | Phone screens, the new employee portal, sign-in, one-action pages |
| `pp-button--block` | full width | Phone forms and the primary action of a bottom sheet |
| `pp-button--icon` | square | Icon-only. Must have `aria-label`, and should have a tooltip. |

## States

| State | How |
| --- | --- |
| Hover | Background moves one step (`*-hovered`), 100ms |
| Pressed | `*-pressed` background and scale to 0.97 (no scale under reduced motion) |
| Focus | 2px violet ring, 2px offset, keyboard focus only (`:focus-visible`, from base.css) |
| Selected (toggle) | `aria-pressed="true"`: selected background and border |
| Disabled | `disabled` or `aria-disabled="true"`: disabled fill and text. Prefer keeping the button enabled and explaining what is missing. |
| Working | `aria-busy="true"`: label fades and shrinks to 0.8 over 500ms, the spinner shows, the width never changes, clicks are ignored until the action lands (rule 8) |

## Behaviour

- Every button that calls the server goes to the working state at once and stays there until the response lands, then shows the result (a flag, a changed page or an inline error).
- Never disable a submit button to signal invalid fields; let the press run validation and show field messages.
- In a button group the primary sits last on desktop (right) and first on phone (top) with `pp-button-group--stack-phone`.
- A danger action that cannot be undone opens a Modal dialog that names the person and the consequence.

## Content

- Verb plus object, sentence case: "Send contract", "Approve 3 documents", "Add new employee".
- Never "OK", "Submit", "Yes", "Click here". In a confirm dialog, repeat the verb: "Withdraw offer" / "Keep offer".
- At most 3 words where possible; never wrap to two lines.

## Accessibility

- Use `<button type="button">` (or `type="submit"` in a form). Use `<a class="pp-button">` only when it navigates.
- Icon-only buttons need `aria-label` naming the action ("Remove Thandeka from the panel").
- Working state: `aria-busy="true"` on the button, and announce the outcome in a live region (the Flag does this).
- Label contrast is checked in CI for every appearance in both themes.

## PrimeNG mapping

> **Reference only.** In the Angular app this component is built in `src/app/ds` without PrimeNG. The mapping below describes the behaviour to match; it is not a dependency. The app uses no PrimeNG at all: the hard patterns are built on Angular Aria and the Angular CDK (see `docs/verify-design-angular.md`).

PrimeNG runs in unstyled mode; pass-through adds the Naleko People classes.

```ts
button: {
  root: ({ props }) => ({
    class: ['pp-button', {
      'pp-button--primary': !props.severity && !props.outlined && !props.text,
      'pp-button--default': props.outlined,
      'pp-button--subtle': props.text,
      'pp-button--danger': props.severity === 'danger',
      'pp-button--small': props.size === 'small',
      'pp-button--large': props.size === 'large',
      'pp-button--icon': !props.label,
    }],
    'aria-busy': props.loading || undefined,
  }),
}
```

`p-button [loading]` maps to the working state; never use PrimeNG's own loading icon.

## In Naleko People today

The registration form's "Register employee", candidate workspace "Advance stage", and the drawers' "Save" and "Cancel" pairs. Today these mix `p-button` severities with hand-styled `.btn-primary` classes and four different blues.

## Do and don't

- **Do** keep one primary per region. **Don't** put two violet buttons side by side.
- **Do** say what happens: "Send to Sipho for approval". **Don't** use "Submit".
- **Do** use the agent button only to approve the agent's own proposal. **Don't** make a mint button for "Run check" started by a person.
