---
name: Slider
group: forms
status: ready
classes: pp-slider
primeng: reference only (built without PrimeNG) — Slider (p-slider), or a plain input type="range" (preferred)
replaces: p-slider in the hiring manager scoring panel and the TalentFlow config hub
---

# Slider

A slider picks one value from a range by dragging, when the rough position matters more than the exact number: a score out of 10, a weight in percent. It is a native `<input type="range">` with the value always shown in words or numbers beside the label.

## Anatomy

1. **Label**: `pp-field__label`, on the left of the header row.
2. **Value**: `pp-slider__value`, an `<output>` on the right of the header row, in `--font-body-strong` with tabular figures: "7 out of 10, strong", "40%".
3. **Track**: 6px, `--radius-full`, `--color-background-neutral`; the part before the thumb in `--color-background-brand-bold`.
4. **Thumb**: 20px circle, raised surface, 2px violet border, raised shadow.
5. **Hit area**: the input is 44px tall across its full width (rule 9).
6. **Scale** (optional): `pp-slider__scale`, the two ends and their words under the track: "1 Weak", "10 Excellent".
7. **Help** (optional): from Field.

## When to use

| Use | Instead |
| --- | --- |
| A score or weight where people think in "about this much" | A Text field with `inputmode="numeric"` when the exact number matters, such as a salary or a notice period |
| Up to about 20 steps | A Select or Radio tiles for 2 to 5 named choices ("Poor", "Fair", "Good") |
| One value | Two text fields for a range ("from" and "to"); Pepla has no two-thumb slider |

## States

| State | How |
| --- | --- |
| Default | Filled to the value, thumb on the raised surface |
| Hover | Thumb grows to 1.1 times (not under reduced motion) |
| Dragging | Thumb stays large; the value updates as it moves |
| Focus | 2px violet ring around the thumb, 2px offset, keyboard focus only |
| Disabled | Grey fill and thumb, disabled value text. Say why in help text ("Scores lock once Sipho sends his review") |
| Error | Rare. Use the Field error under it, for example when weights do not add up |

## Behaviour

- Arrow keys move one step; Page Up and Page Down move 10% of the range; Home and End go to the ends. The native input does all of this.
- The value beside the label updates as the thumb moves, and the input's `aria-valuetext` says the same words.
- Drag sideways only: `touch-action: pan-y` lets the page still scroll up and down on phone.
- Set `--_pct` on the input when the value changes (0% to 100% of the range) so the filled part draws in Chrome and Safari. Firefox fills it without help.
- Save on release (`change`), not on every move (`input`), when saving calls the server.
- When values must add up (four weights to 100%), show what is left in help text and let the person fix it. Do not move the other sliders on their own.

## Content

- Label names what is scored: "Technical skills", "Communication". Sentence case.
- Value says the number and, for scores, a word: "7 out of 10, strong". Percentages use the % sign with no space: "40%".
- The scale names the ends, not every step: "1 Weak" and "10 Excellent".
- Words for scores out of 10: 1 to 2 weak, 3 to 4 fair, 5 to 6 good, 7 to 8 strong, 9 to 10 excellent. Use the same words everywhere a score shows.

## Accessibility

- Native `<input type="range">` with `<label for>`, so screen readers announce it as a slider with its name, and keyboard support comes for free.
- `aria-valuetext` gives the value in words ("7 out of 10, strong"); without it screen readers read only "7".
- The `<output for>` shows the value on screen; the scale under the track is `aria-hidden` because the value text already says it.
- The hit area is the full 44px height and width of the input, so the thumb is easy to catch on phone.
- The thumb border and the filled track reach 3:1 against the surface (non-text contrast).

## PrimeNG mapping

> **Reference only.** In the Angular app this component is built in `src/app/ds` without PrimeNG. The mapping below describes the behaviour to match; it is not a dependency. The app uses no PrimeNG at all: the hard patterns are built on Angular Aria and the Angular CDK (see `docs/verify-design-angular.md`).

Prefer the native input with Angular forms; it needs no PrimeNG component:

```html
<div class="pp-field pp-slider">
  <div class="pp-slider__header">
    <label class="pp-field__label" for="techScore">Technical skills</label>
    <output class="pp-slider__value" for="techScore">{{ scoreText(techScore()) }}</output>
  </div>
  <input class="pp-slider__input" id="techScore" type="range" min="1" max="10" step="1"
         formControlName="techScore" [style.--_pct.%]="(techScore() - 1) / 9 * 100"
         [attr.aria-valuetext]="scoreText(techScore())">
</div>
```

If `p-slider` stays, PrimeNG runs in unstyled mode and pass-through adds classes. It renders a `<span role="slider">`, not an input, so the native CSS above does not apply; the key names are to be checked:

```ts
slider: {
  root: { class: 'pp-slider__track' },   // to be checked; needs its own styles
  range: { class: 'pp-slider__range' },  // to be checked
  handle: { class: 'pp-slider__thumb' }, // to be checked
}
```

Pass `[ariaLabelledBy]` and set `aria-valuetext` on the handle. Moving to the native input is simpler and is the recommended path.

## In Pepla today

`p-slider` is used in 2 files under `src/app`:

- `hm-task-card.component.ts` (TalentFlow, hiring manager scoring panel): 4 sliders from 1 to 10 for Technical, Communication, Cultural Fit and Problem Solving. Each shows the bare number in a `hm-slider-value` span beside it.
- `config-hub-page.component.html` (TalentFlow config hub): one slider per scoring criterion from 0 to 100, with the value shown as "{n} pts".

The scoring weights page (`scoring-weights-page.component.html`) uses `p-inputNumber` with `suffix="%"` for the same weights, although its component comment says sliders. No file uses `input type="range"`.

## Do and don't

- **Do** show the value in words beside the label. **Don't** make people guess the number from the thumb's position.
- **Do** use a slider for "about this much". **Don't** use one for a salary or anything that needs an exact figure.
- **Do** keep the whole 44px row draggable. **Don't** make the thumb the only target.
