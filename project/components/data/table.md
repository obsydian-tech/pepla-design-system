---
name: Dynamic table
group: data
status: ready
classes: pp-table, pp-table-wrap
primeng: Table (p-table)
replaces: p-table (7 uses: candidates, verifications, IT queue, users, audit log, queues, templates)
---

# Dynamic table

Rows of the same kind of thing, to scan, sort, select and open. Pepla's tables are short and lead with what needs attention.

## Anatomy

1. **Wrapper**: raised surface with border and radius; scrolls sideways inside itself, never the page.
2. **Header row**: small caps-free headings in subtlest text; sortable columns are buttons.
3. **Rows**: 48px tall by default; the first column names the thing (usually a Person).
4. **Cells**: status as a Lozenge, deadlines as a Deadline chip, numbers right-aligned in tabular figures, restricted values with a lock.
5. **Actions column** (optional): one subtle icon button opening a menu.
6. **Footer** (optional): Pagination.

## Appearances

| Class | Use | Never |
| --- | --- | --- |
| `pp-table` | Lists of people, documents, requests | Layout |
| `pp-table--compact` | Admin config lists with many short rows | People-facing lists on phone |
| `pp-table--stack` | Rows become stacked cards under 768px; each `td` gets `data-label` | Tables with more than 6 columns (make a card list instead) |

## States

| State | How |
| --- | --- |
| Hover row | Raised-hovered background |
| Selected row | `aria-selected="true"` with selected wash and a checked checkbox |
| Sorted | `aria-sort` on the `th`; arrow icon shows direction |
| Loading | 5 skeleton rows keep the layout |
| Empty | One row with an Empty state message and the action that fills it |
| Filtered to nothing | "No people match these filters" and a "Clear filters" button |
| Restricted value | Lock icon and "Hidden", never blank, never 0 (POPIA, rule 6) |

## Behaviour

- Default sort puts what needs action first: overdue, then due soon, then the rest.
- Clicking the first-column name opens the record; the whole row is not a link (it would trap the action buttons).
- Bulk actions appear in a bar above the table when rows are selected: "3 selected · Send reminder".
- Page size 20; Pagination says "Showing 21 to 40 of 132 people".

## Content

- Column headings are nouns, sentence case: "Start date", "Documents", "Status".
- Dates in rows: "17 Nov 2026"; deadlines as words via the Deadline chip.
- Empty cells show an en rule only when a value is genuinely not applicable; "Not set" when it should be set.

## Accessibility

- Real `<table>` with `<th scope="col">` and a `<caption>` (visually hidden if a page heading already names it).
- Sort buttons inside `th`, with `aria-sort` on the `th`.
- Row checkboxes are labelled with the row's name: "Select Thandeka Dlamini".
- The stacked phone layout repeats the column name per cell via `data-label`.

## PrimeNG mapping

```ts
datatable: {
  root: { class: 'pp-table-wrap' }, table: { class: 'pp-table' },
  headerCell: ({ context }) => ({ class: { 'pp-table__num': context?.numeric } }),
  bodyRow: ({ context }) => ({ 'aria-selected': context.selected || undefined }),
  emptyMessage: { class: 'pp-table__empty' },
}
```

## In Pepla today

Candidates, verifications list, IT queue, users admin, the audit log and the queue and template config lists. They use `p-table` with different row heights, and status shown as coloured text.

## Do and don't

- **Do** sort by urgency by default. **Don't** sort by created date when people need to act.
- **Do** show "Hidden" with a lock for restricted data. **Don't** leave the cell blank.
- **Do** keep one action menu per row. **Don't** fill rows with four icon buttons.
