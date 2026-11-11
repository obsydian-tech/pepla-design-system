---
name: Lozenge
group: status
status: ready
classes: pp-lozenge
primeng: reference only (built without PrimeNG) — Tag (p-tag)
replaces: p-tag with severities, coloured status dots, .badge-success and similar hand-styled pills
---

# Lozenge

A lozenge shows the status of one thing: a document, a check, a candidate, a deadline. It is always an icon and a word (rule 4), so it reads without colour.

## Anatomy

1. **Container**: pill (`--radius-full`), 24px tall.
2. **Icon**: Lucide, 16px, before the word. The icon follows the meaning table in the readme: `circle-check` done, `clock` due, `clock-alert` overdue, `triangle-alert` warning, `octagon-alert` blocked, `info` information, `sparkles` Pepla.
3. **Word**: one to four words, `--font-heading-xxsmall` (12px, 600), sentence case.

## Appearances

| Class | Use | Never |
| --- | --- | --- |
| `pp-lozenge` (neutral) | Not started, draft, locked, archived | For anything that needs action |
| `pp-lozenge--information` | In progress, in review, sent, waiting on someone else | For success |
| `pp-lozenge--success` | Done, verified, approved, hired | For something Pepla's agent did (use agent) |
| `pp-lozenge--warning` | Due soon, needs a look, partly done | For errors |
| `pp-lozenge--danger` | Overdue, failed, blocked, does not match | For celebration or emphasis |
| `pp-lozenge--agent` | Work Pepla's agent did or proposes: "Checked by Pepla", "Drafted by Pepla", "Pepla suggests" | For anything a person did, or as decoration (rule 1) |
| `pp-lozenge--bold` | Add to any of the above for the one status per screen that matters most | On every row of a table |

There is no coral lozenge. Coral is warmth, never a status (rule 3).

## Sizes

| Class | Height | Use |
| --- | --- | --- |
| (default) | 24px | Tables, lists, cards |
| `pp-lozenge--large` | 32px | Page headers and the top of a record |

## States

| State | How |
| --- | --- |
| Static | A lozenge is not interactive. It has no hover, focus or pressed state. |
| Truncated | Wrap the word in `pp-lozenge__text` to cut long words with an ellipsis; put the full text in a tooltip |

## Behaviour

- A lozenge only shows status. To change status, use a button or a Select beside it.
- Deadlines inside a lozenge are in words and change as time passes: "Due in 2 days", then "Due today", then "Overdue by 1 day" (rule 5).
- When a person approves something Pepla checked, the lozenge changes from agent to success: "Checked by Pepla" becomes "Approved 3 Nov". Pepla's check stays in the history.
- One status per thing. If a document is both uploaded and checked, show the latest step.

## Content

- One to four words, sentence case, no full stop: "Verified", "Due in 2 days", "Checked by Pepla".
- Name Pepla, never "AI" or "the system": "Drafted by Pepla", not "AI draft".
- Dates in a lozenge are short: "Approved 3 Nov". Add the year only if it is not this year.
- Avoid "Pending"; say what it is waiting for: "Waiting on Sipho", "In review".

## Accessibility

- The word is real text; the icon is `aria-hidden` (inlined Lucide icons are by default).
- Contrast of the word on each fill is checked in CI in both themes.
- In a table, the column header names what the status is ("ID check"), so the lozenge does not need to repeat it.
- If a lozenge is cut short, the full text must be reachable: a tooltip on a focusable parent, or the word in the row's accessible name.

## PrimeNG mapping

> **Reference only.** In the Angular app this component is built in `src/app/ds` without PrimeNG. The mapping below describes the behaviour to match; it is not a dependency. Only the date picker, autocomplete, multi-select and long tables wrap PrimeNG (see `docs/verify-design-angular.md`).

```ts
tag: {
  root: ({ props }) => ({
    class: ['pp-lozenge', {
      'pp-lozenge--information': props.severity === 'info',
      'pp-lozenge--success': props.severity === 'success',
      'pp-lozenge--warning': props.severity === 'warn',
      'pp-lozenge--danger': props.severity === 'danger',
      'pp-lozenge--agent': props.severity === 'agent',
    }],
  }),
  icon: { 'aria-hidden': 'true' },
  label: { class: 'pp-lozenge__text' },
},
```

`p-tag` must always have an `icon` (a Lucide template). A `p-tag` without an icon fails review. Bold is `styleClass="pp-lozenge--bold"`. The `agent` severity is Pepla's own; `secondary` and `contrast` are not used.

## In Pepla today

`p-tag` is used in 21 templates, including the verifications list, verification detail, employee detail, notifications and the support inbox. Severities are picked per page (for example "Ready" as info), so the same status can show in different colours.

## Do and don't

- **Do** pair every status with an icon and a word. **Don't** use a coloured dot or a colour-only pill.
- **Do** use the agent lozenge only for what Pepla did. **Don't** show "Verified" in mint because it looks friendly.
- **Do** say the deadline in words: "Overdue by 1 day". **Don't** show a red date.
