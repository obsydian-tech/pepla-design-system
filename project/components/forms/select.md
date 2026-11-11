---
name: Select
group: forms
status: ready
classes: pp-select, pp-select-panel, pp-select-option
primeng: Select (p-select, formerly p-dropdown), MultiSelect (p-multiselect)
replaces: p-dropdown with default theme, raw select elements, the stage selector's custom menu
---

# Select

A select picks one value from a list someone already knows: a department, a country, a pipeline stage. Use the native select for short fixed lists and PrimeNG Select when the list needs search, groups or a second line.

## Anatomy

1. **Box**: the same box as Text field: 40px (48px on phone), `--radius-medium`, `--color-border-input`.
2. **Value**: the chosen option, or a placeholder in `--color-text-subtlest`.
3. **Chevron**: Lucide `chevron-down`, 20px, `--color-icon-subtle`; turns over when the list is open.
4. **Panel** (PrimeNG only): an overlay, `--radius-large`, `--elevation-surface-overlay` and `--elevation-shadow-overlay`, at most 320px tall.
5. **Filter** (optional): a small Text field pinned to the top of the panel.
6. **Group heading** (optional): `--font-heading-xxsmall` in `--color-text-subtlest`.
7. **Option**: 40px row (48px on phone), optional leading icon, a second line for context, and a check on the chosen one.

## Appearances

| Class | Use | Never |
| --- | --- | --- |
| `pp-select` + native `<select>` | Up to about 10 fixed options; the phone shows its own picker | When options need a second line or an icon |
| `pp-select` + `pp-select-panel` | PrimeNG Select: long lists, people, grouped stages, search | For two or three options (use Radio) |

## Sizes

| Class | Height | Use |
| --- | --- | --- |
| `pp-select--small` | 32px | Table toolbars and filters on desktop |
| (default) | 40px | Forms and drawers |
| (phone, automatic) | 48px | Every select below 768px |
| `pp-select--fit` | content | Inline, such as "Show 25 per page" |

## States

| State | How |
| --- | --- |
| Hover | `--color-background-input-hovered` |
| Focus or open | 2px `--color-border-focused` ring; `pp-select--open` while the panel shows |
| Error | `aria-invalid="true"` on the control: 2px danger border and the Field message |
| Disabled | Disabled fill and text; help says why ("Set for everyone in payroll settings") |
| Option focused | `pp-select-option--focused` (keyboard) or hover: `--color-background-neutral-subtle-hovered` |
| Option selected | `aria-selected="true"`: `--color-background-selected`, `--color-text-selected`, check icon |
| Option disabled | `aria-disabled="true"` and a second line that says when it becomes available |

## Behaviour

- Open on click, Enter, Space or Down arrow. Type-ahead jumps to the first match. Escape closes and keeps the old value.
- The panel opens below the box, or above when there is no room, and is at least as wide as the box.
- Add a filter when the list is longer than 10. The filter matches anywhere in the label and the second line.
- On phone, PrimeNG Select opens as a bottom sheet (see Overlays), not a floating panel.
- Choosing an option that changes something for another person, such as moving a candidate's stage, still needs a confirm step outside the select.

## Content

- Placeholder says the action: "Choose a manager". Never "Select...".
- Options in sentence case. Order by the order people meet them (pipeline stages, days) or alphabetically, never by database id.
- A disabled option says why in its second line: "After the offer is signed".
- An empty filter result: "No one called 'Thembi'. Check the spelling or add them first."

## Accessibility

- Native select: `<label for>` and nothing else needed.
- PrimeNG Select: the value is `role="combobox"` with `aria-expanded`, `aria-controls` and `aria-activedescendant`; the list is `role="listbox"`; options are `role="option"` with `aria-selected`.
- Group headings are `role="presentation"` inside the list, or use `role="group"` with `aria-labelledby`.
- The chosen option is marked by weight, colour and a check, never colour alone.

## PrimeNG mapping

```ts
select: {
  root: ({ props, state }) => ({
    class: ['pp-select', { 'pp-select--open': state.overlayVisible, 'pp-select--small': props.size === 'small' }],
  }),
  label: ({ props }) => ({ class: ['pp-select__value', { 'pp-select__value--placeholder': !props.modelValue }] }),
  dropdown: { style: 'display:contents' },
  overlay: { class: 'pp-select-panel' },
  header: { class: 'pp-select-panel__filter' },
  pcFilter: { root: { class: 'pp-text-field pp-text-field--small' } },
  list: { class: 'pp-select-panel__list' },
  optionGroup: { class: 'pp-select-panel__group' },
  option: ({ context }) => ({
    class: ['pp-select-option', { 'pp-select-option--focused': context.focused }],
  }),
  optionCheckIcon: { class: 'pp-select-option__check' },
  emptyMessage: { class: 'pp-select-panel__empty' },
},
multiselect: { /* same keys; options carry a pp-checkbox instead of the check */ },
```

Set `dropdownIcon` to the Lucide `chevron-down` template; never PrimeIcons.

## In Pepla today

`p-select` is used in 14 templates: the verifications list and HR dashboard home filters, new employee registration, candidate create, the AI mode panel and most TalentFlow config pages and drawers (routing rules, queue, template, approval chain, locale and branding cards).

## Do and don't

- **Do** use Radio for two or three choices so all are visible. **Don't** hide "Yes / No" in a select.
- **Do** give a disabled option a reason. **Don't** remove options without saying why they are missing.
- **Do** use the native select on phone where the list is short. **Don't** rebuild the phone's own picker.
