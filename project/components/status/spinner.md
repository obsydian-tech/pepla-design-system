---
name: Spinner
group: status
status: ready
classes: pp-spinner
primeng: reference only (built without PrimeNG) — ProgressSpinner (p-progressspinner)
replaces: p-progressspinner, ad hoc "Loading..." text
---

# Spinner

A spinner says something is working and the wait is short or unknown. For content that is loading, use Skeleton instead, so the page keeps its shape.

## Anatomy

1. **Track**: a circle in `--color-border`.
2. **Arc**: a quarter of the circle in `--color-icon-brand`, turning once every 0.8s.

## Appearances

| Class | Use | Never |
| --- | --- | --- |
| `pp-spinner` | On surfaces, beside a short status line | As the only thing on a page for more than 1s |
| `pp-spinner--inverse` | Inside filled buttons; takes the label colour | On a plain surface |

## Sizes

| Class | Size | Use |
| --- | --- | --- |
| `pp-spinner--small` | 16px | Inline with body text, inside small buttons |
| (default) | 20px | Inside buttons and fields |
| `pp-spinner--large` | 32px | A panel that is waiting on a single answer |

## States

| State | How |
| --- | --- |
| Running | Turns continuously. Under reduced motion it turns three times slower instead of stopping, so it still reads as alive. |

## Behaviour

- Show it only after 300ms, so fast responses never flash.
- After 10s, add a line that says what is happening ("Still checking the ID with Home Affairs").
- Inside a Button, the button's working state shows and hides it (rule 8).

## Content

Pair a standalone spinner with a short line that names the work: "Checking the ID", not "Loading".

## Accessibility

- Decorative inside a busy button: `aria-hidden="true"` (the button carries `aria-busy`).
- Standalone: wrap it with its text in an element with `role="status"`.

## PrimeNG mapping

> **Reference only.** In the Angular app this component is built in `src/app/ds` without PrimeNG. The mapping below describes the behaviour to match; it is not a dependency. Only the date picker, autocomplete, multi-select and long tables wrap PrimeNG (see `docs/verify-design-angular.md`).

```ts
progressspinner: { root: { class: 'pp-spinner' }, spin: { style: 'display:none' } }
```

## In Pepla today

The employee dashboard shows a "Loading..." state while it fetches. Buttons that call the server have no working state today.

## Do and don't

- **Do** say what is being waited on. **Don't** show a page-filling spinner where a skeleton would keep the layout.
