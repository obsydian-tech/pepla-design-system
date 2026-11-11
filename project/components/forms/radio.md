---
name: Radio
group: forms
status: ready
classes: pp-radio, pp-radio--tile
primeng: reference only (built without PrimeNG) — RadioButton (p-radiobutton)
replaces: p-radiobutton with default theme, button-like toggles used as single choice
---

# Radio

A radio group picks exactly one option from two to six that should all be visible at once. More than six, use Select.

## Anatomy

1. **Circle**: 20px, 2px `--color-border-input`.
2. **Dot**: when chosen the circle fills violet with a white ring inside, so the centre reads as a dot.
3. **Label**: `--font-body`, clickable.
4. **Description** (optional): a second line in `--font-body-small`.
5. **Group**: a `fieldset.pp-field` with a `legend.pp-field__label` and a `pp-field__options` list.

## Appearances

| Class | Use | Never |
| --- | --- | --- |
| `pp-radio` | Most single choices, stacked | For a setting that applies at once (use Toggle or a segmented button) |
| `pp-field__options--inline` | Two or three very short options: "Yes" and "No" | When labels are longer than two words |
| `pp-radio--tile` | Choices that each need a sentence, on onboarding and setup screens | In dense drawers and tables |

## States

| State | How |
| --- | --- |
| Unchosen | Input background, bold input border |
| Hover | `--color-background-input-hovered`; a tile moves to `--elevation-surface-raised-hovered` |
| Chosen | Violet fill with a white inner ring; a chosen tile gets a 2px `--color-border-selected` edge and `--color-background-selected` |
| Focus | 2px violet ring, 2px offset, on the circle |
| Error | `aria-invalid="true"` on each input of the group, danger border, one message under the group |
| Disabled | Disabled fill and text, and a description that says why |

## Behaviour

- Arrow keys move the choice within the group; Tab leaves the group. This is native behaviour; do not override it.
- Start with nothing chosen when the answer matters and there is no safe default (employment history). Pre-choose only a true default ("Permanent").
- Choosing an option can reveal a follow-up field right under it ("Fixed term" reveals the end date). Never hide fields above.
- A whole tile is the hit area. On touch every row is at least 44px tall.

## Content

- The legend is the question: "Has Sipho worked for you before?"
- Options are short and parallel: "Permanent", "Fixed term". Put detail in the description, not the label.
- The error says what to do and why it matters: "Choose yes or no. It decides whether his old leave balance carries over."

## Accessibility

- Native `<input type="radio">` with a shared `name`, each with `<label for>`.
- `<fieldset>` and `<legend>` name the group. `role="radiogroup"` on the options list is optional; the fieldset is enough.
- Put `aria-describedby` with the error id on every input in the group, so the error is read whichever is focused.
- Chosen is shown by a fill and a dot, not by colour alone.

## PrimeNG mapping

> **Reference only.** In the Angular app this component is built in `src/app/ds` without PrimeNG. The mapping below describes the behaviour to match; it is not a dependency. Only the date picker, autocomplete, multi-select and long tables wrap PrimeNG (see `docs/verify-design-angular.md`).

```ts
radiobutton: {
  root: { class: 'pp-radio', style: 'display:contents' },
  input: ({ props }) => ({ class: 'pp-radio__input', 'aria-invalid': props.invalid || undefined }),
  box: { style: 'display:none' },
  icon: { style: 'display:none' },
},
```

Wrap each `p-radiobutton` and its `<label class="pp-radio__label">` in a `div.pp-radio` (add `pp-radio--tile` for tiles).

## In Pepla today

No radio buttons are used today. Single choices are made with selects or button pairs. Use this when there are 2 to 5 options that people should see at once.

## Do and don't

- **Do** show all the options when there are six or fewer. **Don't** hide two choices in a select.
- **Do** leave it unchosen when guessing would be wrong. **Don't** pre-choose "No" to save a click.
- **Do** keep tiles to two to four. **Don't** make a wall of tiles.
