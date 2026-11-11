---
name: Search
group: forms
status: ready
classes: pp-search, pp-search__clear, pp-search__results
primeng: IconField with InputText (p-iconfield, pInputText), AutoComplete (p-autocomplete) for suggestions
replaces: p-iconfield with PrimeIcons, hand-built search boxes with a magnifier image, the browser's own clear cross
---

# Search

Search finds people, candidates, documents or verifications by typing. It filters the list on the page as you type, and says how many match.

## Anatomy

1. **Box**: a Text field (`pp-text-field pp-search`), same heights and states.
2. **Search icon**: Lucide `search`, 16px, in the prefix.
3. **Input**: `type="search"`, with a placeholder that says what can be searched.
4. **Clear button**: `x`, inside the right edge; only shows when there is text.
5. **Spinner** (optional): replaces the clear button while results load.
6. **Result line**: "3 candidates match 'Ndlovu'", under the box, a polite live region.

## Sizes

| Class | Height | Use |
| --- | --- | --- |
| `pp-text-field--small` | 32px | Table toolbars on desktop |
| (default) | 40px | Page-level search, list pages |
| (phone, automatic) | 48px | Every search below 768px |

## States

| State | How |
| --- | --- |
| Empty | Icon and placeholder; no clear button |
| Typing | Clear button appears (CSS shows it when `:placeholder-shown` is false, so the input needs a `placeholder`) |
| Focus | 2px `--color-border-focused` ring inside the border |
| Searching | `aria-busy="true"` on the box: the spinner replaces the clear button; result line says "Searching" |
| Results | The list updates and the result line says how many match |
| No results | Result line says what was searched and what to try |

## Behaviour

- Filter as people type, 250ms after the last key. On a server search, show the spinner only if it takes longer than 300ms.
- Clear empties the box, restores the full list and keeps focus in the box. Escape does the same.
- Search matches anywhere in names, job titles and email, ignoring case and accents ("Sipho" finds "Siphó").
- Keep the query in the page address so back and refresh keep the filtered list.
- Personal data stays masked in results: searching by ID number finds the person but shows `•••••••••0876`.
- For suggestions in a dropdown (pick a person to add), use Select with a filter or AutoComplete, not this.

## Content

- Placeholder says what is searched: "Search people by name or job title". Not "Search..." alone.
- Result line: "3 candidates match 'Ndlovu'". One: "1 candidate matches". None: "No one called 'Thembi'. Check the spelling, or search by job title."
- Clear button label: "Clear search" (or "Clear filter" in a table toolbar).

## Accessibility

- Wrap it in `role="search"` (or a `<search>` element). The input keeps a label; use `pp-field__label--hidden` when the page heading already names the list.
- `aria-describedby` points to the result line; the result line is `role="status"` so counts are announced without moving focus.
- The clear button is a real button with `aria-label`; the browser's own clear cross is hidden so there is one, consistent control.
- The spinner is `aria-hidden`; "Searching" in the result line is what is announced.

## PrimeNG mapping

```ts
iconfield: { root: { class: 'pp-text-field pp-search' } },
inputicon: { root: { class: 'pp-text-field__prefix' } },
inputtext: { root: { class: 'pp-text-field__input' } },   // inside p-iconfield only
autocomplete: {
  root: { class: 'pp-text-field pp-search' },
  pcInputText: { root: { class: 'pp-text-field__input' } },
  overlay: { class: 'pp-select-panel' },
  option: { class: 'pp-select-option' },
},
```

Add the clear button as a template after the input; PrimeNG does not ship one for `p-iconfield`.

## In Pepla today

Search boxes appear in 6 places, including the topbar, the support inbox, the HR dashboard home, the admin users page and the admin audit page, each built separately.

## Do and don't

- **Do** say how many match. **Don't** leave an empty list with no explanation.
- **Do** keep focus in the box after clearing. **Don't** move focus to the list.
- **Do** keep masked data masked in results. **Don't** show a full ID because someone searched for it.
