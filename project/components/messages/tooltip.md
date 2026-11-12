---
name: Tooltip
group: messages
status: ready
classes: pp-tooltip, pp-tooltip-anchor
primeng: reference only (built without PrimeNG) — Tooltip (pTooltip)
replaces: pTooltip with default styling, title attributes on icon buttons
---

# Tooltip

A tooltip names an icon-only control or shows the rest of a cut-off label. It is a short hint on hover and keyboard focus, never the only place for information.

## Anatomy

1. **Container**: neutral bold fill (ink in light, cream in dark), `--radius-small`, 4px by 8px padding, 240px wide at most.
2. **Text**: `--font-body-small`, inverse text colour, one line where possible.
3. **Shortcut** (optional): a `kbd` after the text.

## Appearances

| Class | Use |
| --- | --- |
| `pp-tooltip` | Above the anchor, centred (default) |
| `pp-tooltip--bottom` | Below, when the anchor sits near the top edge |
| `pp-tooltip--end` | To the right, for collapsed side navigation |
| `pp-tooltip--inline` | Rendered in place, for docs only |
| `pp-tooltip--floating` | Placed by the app in a top-layer overlay; the app shows it on hover (after 300ms) and focus, and hides it on Escape |

## States

| State | How |
| --- | --- |
| Hidden | Not visible, not in the accessibility tree as text the person must read |
| Shown on hover | After 300ms, fades in over 100ms |
| Shown on focus | At once, on keyboard focus |
| Touch | Never shown; the control's visible label or a Popup does the job |

## Behaviour

- Escape hides it while focus stays on the anchor.
- It never holds links, buttons or anything to click. Use a Popup for that.
- Moving between anchors in a toolbar shows the next tooltip with no delay.
- Under reduced motion it appears with no fade.

## Content

- Name the action, the same words as the `aria-label`: "View audit trail". Sentence case, no full stop.
- For a cut-off label, show the full text: "Thandeka Dlamini, Finance manager, Johannesburg".
- A tooltip may explain a rule in a few words: "Showing the ID is logged" (rule 6).

## Accessibility

- The tooltip has `role="tooltip"` and an `id`; the anchor references it with `aria-describedby` when it adds to the name, or the tooltip is `aria-hidden` when it repeats the `aria-label`.
- Show on focus as well as hover; hide on Escape (WCAG 1.4.13).
- The tooltip itself never takes focus.
- Text on the neutral bold fill passes 4.5:1 in both themes.

## PrimeNG mapping

> **Reference only.** In the Angular app this component is built in `src/app/ds` without PrimeNG. The mapping below describes the behaviour to match; it is not a dependency. The app uses no PrimeNG at all: the hard patterns are built on Angular Aria and the Angular CDK (see `docs/verify-design-angular.md`).

```ts
tooltip: {
  root: { class: 'pp-tooltip' },
  arrow: { style: 'display:none' },
}
```

```html
<button class="pp-button pp-button--subtle pp-button--icon" aria-label="View audit trail"
        pTooltip="View audit trail" tooltipPosition="top" [showDelay]="300">
  <i-lucide name="history" />
</button>
```

Naleko People tooltips have no arrow. Leave `tooltipEvent` on its default so focus also shows it.

## In Naleko People today

`pTooltip` is used in 19 components, including the shared sidebar, the support inbox, the employee detail and the TalentFlow intelligence tile. Some icon buttons rely on `title` attributes instead (the chat widget, the pipeline page, two config drawers), which never show on keyboard focus.

## Do and don't

- **Do** give every icon-only button a tooltip with its name. **Don't** use `title`.
- **Do** keep it to a few words. **Don't** put a paragraph or a link in a tooltip.
- **Do** keep needed information visible on the page. **Don't** hide a deadline or an error inside a tooltip.
