---
name: Badge
group: status
status: ready
classes: pp-badge, pp-badge-anchor
primeng: reference only (built without PrimeNG) — Badge (p-badge, pBadge)
replaces: p-badge with default theme, counts in brackets after nav labels, red notification dots
---

# Badge

A badge is a count: how many things wait in a list, a tab or a nav item. It is a number, not a status; the label next to it says what is counted.

## Anatomy

1. **Bubble**: pill, 20px tall, at least 20px wide, `--font-heading-xxsmall` with tabular figures.
2. **Number**: up to two digits; 100 and more shows "99+".
3. **Hidden label** (optional): `pp-badge__label`, read by screen readers only, says what is counted.
4. **Anchor** (optional): `pp-badge-anchor` places the badge on the corner of an icon button, with a ring in the page colour.

## Appearances

| Class | Use | Never |
| --- | --- | --- |
| `pp-badge` (neutral) | Plain totals: 28 candidates, 4 documents | For things that need action |
| `pp-badge--primary` | New or unread things the person should open | On every nav item at once |
| `pp-badge--danger` | A count of overdue or failed things, beside a label that says so ("Overdue documents") | Without a label that names the problem (rule 4) |
| `pp-badge--agent` | A count of Pepla's proposals waiting for approval | For anything a person did (rule 1) |
| `pp-badge--subtle` | Counts inside filters and tab labels where weight would compete | For anything new |
| `pp-badge--dot` | "Something new" on an icon only, with the meaning in the button's label | As a status or a count |

## States

| State | How |
| --- | --- |
| Static | A badge is not interactive; the link or button it sits in is |
| Inside a selected tab or nav item | A primary badge turns neutral-bold so it does not vanish into the selected fill |
| Zero | Hidden. A zero never shows, except in a filter where "0" is the answer. |
| Over 99 | "99+"; the hidden label gives the real number |

## Behaviour

- The count updates live when the list changes; it does not animate or bounce.
- Opening the list it counts clears "new" counts (primary, dot); totals (neutral) stay.
- Do not add up counts from different places into one badge on a parent item.

## Content

- Numbers only, no words inside the bubble. Thousands use a space: `1 200` (but over 99 shows `99+`).
- The words go in the label beside it ("Overdue documents") or in the hidden label ("3 overdue").

## Accessibility

- A bare number is meaningless to a screen reader. Either the link text already says it ("Overdue documents 3") or add `pp-badge__label` with the words.
- On an icon button, the button's `aria-label` includes the count ("Help desk, 2 new questions") and the badge is `aria-hidden`.
- Danger and agent badges are never the only signal: the label carries the meaning.

## PrimeNG mapping

> **Reference only.** In the Angular app this component is built in `src/app/ds` without PrimeNG. The mapping below describes the behaviour to match; it is not a dependency. Only the date picker, autocomplete, multi-select and long tables wrap PrimeNG (see `docs/verify-design-angular.md`).

```ts
badge: {
  root: ({ props }) => ({
    class: ['pp-badge', {
      'pp-badge--primary': !props.severity,
      'pp-badge--danger': props.severity === 'danger',
      'pp-badge--agent': props.severity === 'agent',
      'pp-badge--subtle': props.severity === 'secondary',
      'pp-badge--dot': props.value == null,
    }],
  }),
},
overlaybadge: { root: { class: 'pp-badge-anchor' } },
```

## In Pepla today

`p-badge` appears on the IT queue page and the admin notifications page, and the TalentFlow and IT provisioning shells restyle it for their navigation.

## Do and don't

- **Do** put the meaning in the label. **Don't** rely on a red bubble to say "overdue".
- **Do** hide zero. **Don't** fill the navigation with "0" bubbles.
- **Do** use the agent badge for Pepla's waiting proposals. **Don't** use it for unread messages.
