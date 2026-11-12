---
name: Tabs
group: navigation
status: ready
classes: pp-tabs
primeng: reference only (built without PrimeNG) — Tabs (p-tabs, p-tablist, p-tab, p-tabpanels, p-tabpanel)
replaces: p-tabView in the candidate workspace, hand-built tab bars on the profile pages
---

# Tabs

Tabs split one record into views of the same level: a candidate's profile, CV, interviews and offer. Only one panel shows at a time. They sit at the bottom of the Page header.

## Anatomy

1. **Tab list**: a row of tabs on a 1px border, scrolls sideways when it overflows.
2. **Tab**: label in `--font-label`, an optional 16px Lucide icon before it, an optional count after it. 40px tall; 44px on touch; 48px on phone.
3. **Indicator**: a 2px violet line under the selected tab.
4. **Panel**: the content, 24px below the list.

## States

| State | How |
| --- | --- |
| Default | Subtle text |
| Hover | Neutral subtle hovered fill, full-strength text, 100ms |
| Focus | Ring drawn inside the tab, keyboard only |
| Selected | `aria-selected="true"`: violet text, semibold, the indicator, the count turns selected |
| Locked | `aria-disabled="true"` with the `lock` icon: the person has no permission. Still focusable; a tooltip says who can give access |

## Behaviour

- Selecting a tab swaps the panel without reloading the page and updates the URL (`?tab=interviews`), so the view can be shared and Back works.
- Arrow keys move between tabs and select them at once (automatic activation); Home and End jump to the ends.
- When tabs overflow on phone, the list scrolls sideways and the selected tab scrolls into view.
- Counts show only what needs attention or a short total (documents, notes); they hide at 0.
- Use 2 to 7 tabs. If one view is used far more than others, it goes first.

## Content

- One or two words, nouns, sentence case: "Profile", "Interviews", "Leave".
- No icons on some tabs and not others: all or none.

## Accessibility

- `role="tablist"` with a label (the record's name), `role="tab"` on each tab with `aria-selected` and `aria-controls`, `role="tabpanel"` with `aria-labelledby`.
- Roving `tabindex`: only the selected tab is in the tab order (`tabindex="-1"` on the rest). The panel has `tabindex="0"` when it has no focusable content.
- The indicator is not the only cue: the selected tab also changes weight and colour.

## PrimeNG mapping

> **Reference only.** In the Angular app this component is built in `src/app/ds` without PrimeNG. The mapping below describes the behaviour to match; it is not a dependency. The app uses no PrimeNG at all: the hard patterns are built on Angular Aria and the Angular CDK (see `docs/verify-design-angular.md`).

PrimeNG v19's new Tabs components, unstyled, with pass-through:

```ts
tabs: { root: { class: 'pp-tabs' } },
tablist: {
  root: { class: '' },
  content: { class: '' },
  tabList: { class: 'pp-tabs__list' },
  activeBar: { style: 'display:none' },
  prevButton: { class: 'pp-button pp-button--subtle pp-button--icon pp-button--small' },
  nextButton: { class: 'pp-button pp-button--subtle pp-button--icon pp-button--small' },
},
tab: { root: { class: 'pp-tabs__tab' } },
tabpanel: { root: { class: 'pp-tabs__panel' } },
```

Bind `value` to the `tab` query parameter. PrimeNG's active bar is hidden; the tab's `::after` draws the indicator.

## In Naleko People today

Tabs appear only on the hiring manager dashboard, using PrimeNG tabs. Other multi-part pages show everything on one long page. New tabs should keep the selected tab in the URL.

## Do and don't

- **Do** use tabs for views of one record. **Don't** use tabs to move between areas of the product (that is the side navigation).
- **Do** keep the tab in the URL. **Don't** reset to the first tab on refresh.
- **Do** show a lock and say who can give access. **Don't** hide a tab the person can't open without explanation.
