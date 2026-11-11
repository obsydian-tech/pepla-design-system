---
name: Tag
group: status
status: ready
classes: pp-tag, pp-tag-group
primeng: reference only (built without PrimeNG) — Chip (p-chip)
replaces: p-chip with default theme, skill pills on candidate create, coloured department labels
---

# Tag

A tag labels a person or a record with something that describes it: a skill, a department, a location. Tags are not statuses; they never say whether something is done or wrong. For status, use Lozenge.

## Anatomy

1. **Container**: 32px tall, `--radius-small` (squarer than a Lozenge, so the two are never confused), `--color-background-accent-<name>-subtler`.
2. **Text**: `--font-label` in `--color-text-accent-<name>`.
3. **Remove button** (optional): `x`, 24px inside the tag, 44px hit area on touch.

## Appearances

| Class | Use | Never |
| --- | --- | --- |
| `pp-tag` (gray) | Skills, languages, free-text labels | For a status |
| `pp-tag--blue`, `--sky`, `--violet`, `--magenta`, `--lime`, `--yellow` | Departments and locations, one colour per value, set once in settings and kept everywhere | To mean good or bad |
| `pp-tag--green`, `--amber`, `--red` | Only when a customer has no other colours left | For anything that could be read as success, warning or danger |
| `a.pp-tag` | A tag that filters the list by its value | For navigation to a new page |

There is no mint or coral tag: mint is Pepla's agent and coral is warmth, and neither is a label colour.

## Sizes

One size, 32px. On touch the remove button keeps a 44px hit area.

## States

| State | How |
| --- | --- |
| Static | No hover |
| Link hover | Underline |
| Remove hover | The remove button gets `--color-background-neutral-subtle-hovered` |
| Focus | 2px violet ring on the remove button or the link |

## Behaviour

- Removing a tag happens at once, with an undo in a Flag for 5 seconds. A tag on a saved record keeps a trail (rule 7).
- After removing, focus moves to the next tag's remove button, or to "Add skill" if it was the last.
- Department and location colours are chosen once per customer and stay the same on every screen.
- Long lists wrap; past two rows, show the first ones and "+ 6 more".

## Content

- Short nouns as people say them: "Payroll", "SARS eFiling", "isiZulu". Keep proper capitals; otherwise sentence case.
- No counts or verbs inside tags.

## Accessibility

- A group of tags is a list (`role="list"` or `<ul>`) with a name when the heading is not right above it.
- The remove button's label names the tag: "Remove Payroll".
- Colour only separates values for sighted people; the text is what carries the meaning, so two departments must never share a name.
- Text on every accent fill is checked for 4.5:1 in both themes.

## PrimeNG mapping

> **Reference only.** In the Angular app this component is built in `src/app/ds` without PrimeNG. The mapping below describes the behaviour to match; it is not a dependency. Only the date picker, autocomplete, multi-select and long tables wrap PrimeNG (see `docs/verify-design-angular.md`).

```ts
chip: {
  root: { class: 'pp-tag' },
  label: { class: 'pp-tag__text' },
  removeIcon: { class: 'pp-tag__remove' },
},
```

Add the colour with `styleClass="pp-tag--blue"`. Use a Lucide `x` in the `removeicon` template and give it an `aria-label`.

## In Pepla today

Tags today are `p-tag` with `severity="secondary"`, for example the role and module on admin audit events. They share the component with statuses, which is why tags and lozenges now look different.

## Do and don't

- **Do** keep a department's colour the same everywhere. **Don't** pick tag colours at random per page.
- **Do** use Lozenge for status. **Don't** use a red tag for "Rejected".
- **Do** name the tag in the remove button. **Don't** label every button "Remove".
