---
name: Pagination
group: navigation
status: ready
classes: pp-pagination
primeng: reference only (built without PrimeNG) — Paginator (p-paginator)
replaces: p-paginator with "{first} - {last} of {totalRecords}", the "Load more" buttons on admin lists
---

# Pagination

Pagination splits a long list into pages and says, in words, which part of the list you are looking at. It sits under tables of people, candidates and documents.

## Anatomy

1. **Summary**: "Showing 21–40 of 132 people", with the numbers in tabular figures and the noun of the list.
2. **Previous**: `chevron-left` and the word "Previous".
3. **Pages**: the first, the last, the current and one each side, with an `ellipsis` gap between.
4. **Current page**: selected fill, violet text and a 1px violet ring.
5. **Next**: "Next" and `chevron-right`.
6. **Position** (phone only): "Page 2 of 7" between Previous and Next.

## States

| State | How |
| --- | --- |
| Hover | Neutral subtle hovered fill, 100ms |
| Focus | 2px violet ring, keyboard only |
| Current | `aria-current="page"`: selected fill, violet text, semibold |
| Disabled | Previous on the first page and Next on the last: disabled text, not clickable |
| Loading | The summary and pages stay; the table shows its loading state; the summary updates when the page lands |
| One page | The whole component hides; a summary line under the table is enough ("8 documents") |

## Behaviour

- 20 rows per page by default; the person can pick 20, 50 or 100 in the table toolbar, and Batsi remembers it.
- The page is in the URL (`?page=2`), so Back and shared links work.
- Moving to a page keeps filters and sort, scrolls to the top of the table and moves focus to the table's caption.
- On phone only Previous, "Page 2 of 7" and Next show, at 48px, centred under a full-width summary.

## Content

- The summary uses words: "Showing 21–40 of 132 people". Use an en dash for the range and the list's own noun: people, candidates, documents, requests.
- Numbers over 999 use a space: "Showing 1 201–1 220 of 4 380 events".
- Buttons say "Previous" and "Next", never only arrows.

## Accessibility

- `<nav>` with a label naming the list ("People pages").
- Page links have `aria-label="Page 3"`; the current one has `aria-current="page"`.
- The summary is `aria-live="polite"`, so the new range is announced after a page change.
- The gap is `aria-hidden`. Every page control has a 44px hit area on touch.

## PrimeNG mapping

> **Reference only.** In the Angular app this component is built in `src/app/ds` without PrimeNG. The mapping below describes the behaviour to match; it is not a dependency. The app uses no PrimeNG at all: the hard patterns are built on Angular Aria and the Angular CDK (see `docs/verify-design-angular.md`).

```ts
paginator: {
  root: { class: 'pp-pagination' },
  content: { style: 'display:contents' },
  current: { class: 'pp-pagination__summary', 'aria-live': 'polite' },
  pages: { class: 'pp-pagination__pages' },
  page: ({ context }) => ({ class: 'pp-pagination__page', 'aria-current': context.active ? 'page' : undefined }),
  prev: { class: 'pp-pagination__page' },
  next: { class: 'pp-pagination__page' },
  first: { style: 'display:none' },
  last: { style: 'display:none' },
}
```

```html
<p-paginator [rows]="20" [totalRecords]="132" [pageLinkSize]="3" [showCurrentPageReport]="true"
  currentPageReportTemplate="Showing {first}–{last} of {totalRecords} people" />
```

## In Naleko People today

Tables with paging use PrimeNG's built-in paginator (the verifications list, notifications and the HR dashboard home), each restyled in its own SCSS file. All move to this pagination with the summary in words.

## Do and don't

- **Do** say the range in words with the list's noun. **Don't** show "1 - 20 of 132" alone.
- **Do** keep "Previous" and "Next" as words. **Don't** use arrow-only buttons.
- **Do** hide pagination when there is one page. **Don't** show a lone "1".
