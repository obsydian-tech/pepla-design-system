---
name: Toggle
group: forms
status: ready
classes: pp-toggle, pp-toggle--end
primeng: reference only (built without PrimeNG) — ToggleSwitch (p-toggleswitch, formerly p-inputswitch)
replaces: p-inputswitch with default theme, checkboxes that save on click
---

# Toggle

A toggle switches a setting on or off, and the change applies at once. If the change waits for a Save button, use Checkbox.

## Anatomy

1. **Track**: 40 by 24px pill. Off: `--color-border-input`. On: `--color-background-brand-bold`.
2. **Thumb**: a 16px circle in `--color-icon-inverse` that slides 16px to the right when on.
3. **Label**: what the setting does, `--font-body`.
4. **Description** (optional): who it affects or why it is locked, `--font-body-small`.

## Appearances

| Class | Use | Never |
| --- | --- | --- |
| `pp-toggle` | Switch first, label after: inside forms and cards | In a long settings list, where switches should line up |
| `pp-toggle--end` | Label first, switch at the right edge: settings pages and config drawers | When the label is very short and the row is wide; the eye cannot connect them |

## States

| State | How |
| --- | --- |
| Off | Bold grey track, thumb left |
| Hover | Track darkens (off) or moves to `*-hovered` (on) |
| On | Violet track, thumb right, 200ms spring; instant under reduced motion |
| Focus | 2px violet ring, 2px offset |
| Saving | `aria-busy="true"`: the thumb dims and the description says "Saving" until the server answers |
| Failed | The toggle springs back and the description shows a Field error: "Could not save. Try again." |
| Disabled | Disabled track and thumb; the description says what unlocks it |

## Behaviour

- A toggle saves the moment it moves. Show "Saving" in the description, then nothing (success is the switch staying put) or the error and the old position.
- A toggle that affects other people (managers, the whole team) records who changed it and when (rule 7), shown in the setting's history.
- Never put toggles in a form that has a Save button.
- On touch every row is at least 44px tall; the label is part of the hit area.

## Content

- The label states the setting when on, as a positive: "Remind new hires about missing documents". Not "Disable reminders".
- Do not add "On" and "Off" text beside the switch; the label plus the switch position says it.
- The description says who it affects: "Pepla sends a WhatsApp message 2 days before the deadline".

## Accessibility

- A native checkbox with `role="switch"`; screen readers announce "on" and "off".
- `<label for>`; the description in `aria-describedby`.
- The "Saving" description is a `role="status"` so the result is announced.
- On is shown by position and fill, not colour alone.

## PrimeNG mapping

> **Reference only.** In the Angular app this component is built in `src/app/ds` without PrimeNG. The mapping below describes the behaviour to match; it is not a dependency. Only the date picker, autocomplete, multi-select and long tables wrap PrimeNG (see `docs/verify-design-angular.md`).

```ts
toggleswitch: {
  root: { class: 'pp-toggle', style: 'display:contents' },
  input: { class: 'pp-toggle__input', role: 'switch' },
  slider: { style: 'display:none' },
  handle: { style: 'display:none' },
},
```

Wrap each `p-toggleswitch` and its `<label class="pp-toggle__label">` in a `div.pp-toggle`.

## In Pepla today

No toggle switch is used today; settings that apply at once are checkboxes in the config drawers. Use a toggle only where the change applies the moment it is flipped.

## Do and don't

- **Do** apply the change at once and say it is saving. **Don't** put a toggle in a form with a Save button.
- **Do** phrase the label as the on state. **Don't** write "Disable" labels, which make off mean on.
- **Do** say why a toggle is locked. **Don't** grey it out with no reason.
