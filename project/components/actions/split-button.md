---
name: Split button
group: actions
status: ready
classes: pp-split-button
primeng: SplitButton (p-splitbutton)
replaces: nothing yet (no split buttons in the app today)
---

# Split button

A split button joins the most likely action to a menu of other ways to do it: "Send contract" now, or send it on the start date, or send it for approval first. It is two Buttons side by side with a Dropdown menu behind the chevron.

## Anatomy

1. **Main action**: a `pp-button` with `pp-split-button__main`. Its label is the default choice and runs on one press.
2. **Trigger**: a `pp-button` with `pp-split-button__trigger`, holding only `chevron-down`. The chevron turns when the menu is open.
3. **Join**: the two buttons share one pill shape. Their inner corners are `--radius-xsmall`, with a 2px gap between them.
4. **Menu**: a `pp-dropdown-menu`, aligned to the end of the trigger, with 2 to 5 items.

Both buttons take the same appearance and size class. Use primary or default only.

## Appearances

| Class | Use | Never |
| --- | --- | --- |
| `pp-split-button` + `pp-button--primary` on both | The main action of a page or dialog, when a few people need a variant of it | Beside another primary button |
| `pp-split-button` + `pp-button--default` on both | A secondary action with variants, in a toolbar or card | With danger or agent appearance |
| `pp-split-button--small` | With `pp-button--small` on both, in dense desktop toolbars | On phone |
| `pp-split-button--block`, `pp-split-button--block-phone` | The main action of a phone screen or bottom sheet: the main part grows, the trigger keeps its size | On desktop forms |

## States

| State | How |
| --- | --- |
| Hover, pressed, focus | Each half has its own Button states and its own focus ring |
| Open | Trigger has `aria-expanded="true"`; the chevron turns 180 degrees (no turn under reduced motion) |
| Working | The main half has `aria-busy="true"` and shows the spinner (rule 8). The trigger gets `aria-disabled="true"` until the action lands |
| Disabled | Both halves disabled. Prefer leaving it enabled and explaining what is missing |

## Behaviour

- The main half runs its action at once, like any Button. The trigger only opens the menu; it never runs anything itself.
- The menu follows Dropdown menu: Down arrow or Enter opens it, focus moves to the first item, Escape closes it and returns focus to the trigger.
- A menu item runs its action and goes straight to the working state on the main half, so the person sees one place where the work happens.
- Do not remember the last choice and swap the main label. The main action stays the same every time, so people can trust it.
- On phone the menu opens as a bottom sheet, as Dropdown menu does.

## Content

- Main label: verb plus object, the default way: "Send contract".
- Menu items: the other ways, each a full action that reads on its own: "Send on start date", "Send to Sipho for approval first". Not "Later" or "Other".
- Trigger label (hidden): "More ways to send the contract".
- Never put a danger action in a split button menu. Removing or withdrawing goes in a separate danger Button.

## Accessibility

- Wrap the pair in `role="group"` with an `aria-label` naming the action.
- The trigger is a separate `<button>` with `aria-haspopup="menu"`, `aria-expanded` and `aria-controls`, and its own `aria-label`.
- Both halves are in the tab order. Tab goes main, then trigger.
- On touch screens the trigger is at least 44px wide. On phone use `pp-button--large` on both halves, so both are 48px tall (rule 9).

## PrimeNG mapping

PrimeNG runs in unstyled mode; pass-through adds the Pepla classes. `p-splitbutton` renders a main button, a menu button and a `p-tieredmenu`. The key names below follow PrimeNG 19 and are to be checked:

```ts
splitbutton: {
  root: ({ props }) => ({
    class: ['pp-split-button', { 'pp-split-button--small': props.size === 'small' }],
    role: 'group',
  }),
  // the next three keys are to be checked
  pcButton: { root: ({ props }) => ({
    class: ['pp-button', 'pp-split-button__main', props.outlined ? 'pp-button--default' : 'pp-button--primary'],
  }) },
  pcDropdown: { root: ({ props }) => ({
    class: ['pp-button', 'pp-split-button__trigger', props.outlined ? 'pp-button--default' : 'pp-button--primary'],
  }) },
  pcMenu: { root: { class: 'pp-dropdown-menu pp-dropdown-menu--end' } },
}
```

Use `<p-splitbutton label="Send contract" [model]="sendOptions" (onClick)="send()" appendTo="body">` and pass the Lucide `chevron-down` through the dropdown icon template. Map `[loading]` on the main half to `aria-busy`, as Button does.

## In Pepla today

Nothing. No file under `src/app` uses `p-splitbutton` or `SplitButtonModule`. The only `p-menu` is on the TalentFlow intelligence tile (`intelligence-tile.component.html`).

## Do and don't

- **Do** use it when one way is clearly the most common. **Don't** use it when the options are equal; use a Select or Radio tiles.
- **Do** keep the main label fixed. **Don't** swap it to the last item someone picked.
- **Do** put destructive actions in their own Button. **Don't** hide "Withdraw offer" in the menu.
