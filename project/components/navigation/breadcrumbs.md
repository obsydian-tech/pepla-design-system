---
name: Breadcrumbs
group: navigation
status: ready
classes: pp-breadcrumbs
primeng: Breadcrumb (p-breadcrumb)
replaces: p-breadcrumb, "Back" links built per page
---

# Breadcrumbs

Breadcrumbs show where a page sits and give a way back up. They sit above the page title in the Page header and end at the parent; the title is the current page.

## Anatomy

1. **Trail**: an ordered list of links, `--font-body`, subtle text.
2. **Separator**: a `/` in the subtlest text colour, drawn by CSS and hidden from screen readers.
3. **More** (optional): an `ellipsis` button that stands in for middle levels on long paths.

## States

| State | How |
| --- | --- |
| Default | Subtle text, no underline |
| Hover | Full-strength text and an underline |
| Focus | 2px violet ring, keyboard only |
| Collapsed | Paths deeper than 4 show the first level, the more button and the last 2 levels. The button expands the trail in place |

## Behaviour

- Breadcrumbs end at the parent page. The page title below them is the current page, so it is not repeated.
- Each crumb is a link to that level, never plain text.
- On phone only the parent shows, so the trail stays one line and reads as "back to Finance team".
- Long names truncate at 240px with an ellipsis; the full name shows in a tooltip.

## Content

- Use the names people see on those pages: "Hire", "Bookkeeper", "Candidates". Not route names or IDs.
- No "Home" crumb; the side navigation already does that.

## Accessibility

- `<nav aria-label="Breadcrumb">` around an `<ol>`.
- The separator uses `content: "/" / ""`, so screen readers skip it.
- If the trail ever includes the current page, mark that link with `aria-current="page"`.
- The more button has `aria-label="Show 2 more levels"`; links get a 44px hit area on touch.

## PrimeNG mapping

```ts
breadcrumb: {
  root: { class: 'pp-breadcrumbs', 'aria-label': 'Breadcrumb' },
  list: { class: '' },
  item: { class: 'pp-breadcrumbs__item' },
  itemLink: { class: '' },
  itemLabel: { class: '' },
  separator: { style: 'display:none' },
}
```

Leave `home` unset. PrimeNG's own separator is hidden; the CSS draws the `/`.

## In Pepla today

`p-breadcrumb` is used on one page, the hiring manager bundle progress page. Other pages have no trail or build their own "Back" link. All move to this trail inside the Page header.

## Do and don't

- **Do** end at the parent and let the title name the current page. **Don't** repeat the title as the last crumb.
- **Do** use the names on the pages. **Don't** show IDs like "CAND-0042".
- **Do** keep breadcrumbs for pages two or more levels deep. **Don't** add them to top-level pages.
