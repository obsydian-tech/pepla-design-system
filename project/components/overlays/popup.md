---
name: Popup
group: overlays
status: ready
classes: pp-popup, pp-popup-anchor
primeng: reference only (built without PrimeNG) — Popover (p-popover)
replaces: p-overlaypanel, hand-placed absolute panels for filters and help
---

# Popup

A popup is a small floating panel tied to the control that opened it: a filter, a short explainer, a picker. It does not block the page. Dropdown menu, the notification list and the avatar menu are popups with set content.

## Anatomy

1. **Anchor**: the button that opens it, with `aria-expanded`. `pp-popup-anchor` gives it a positioning box.
2. **Container**: overlay surface, `--radius-large`, overlay shadow, 16px padding, 240px to 360px wide, scrolls past 480px tall.
3. **Header** (optional): a short title.
4. **Content**: anything small: checkboxes, a paragraph, a list.
5. **Footer** (optional): actions at the end, above a border.

## Appearances

| Class | Use |
| --- | --- |
| (default) | Opens below the anchor, aligned to its start |
| `pp-popup--end` | Aligned to the anchor's end, for controls at the right edge |
| `pp-popup--top` | Above the anchor, when there is no room below |
| `pp-popup--flush` | No padding: lists that run edge to edge (notifications); header and footer get their own padding and borders |
| `pp-popup--wide` | Up to 420px, for the notification list |
| `pp-popup--inline` | Rendered in place, for docs only |

## States

| State | How |
| --- | --- |
| Closed | Not rendered |
| Opening | Fades in and drops 4px over 200ms; under reduced motion it only fades |
| Open | The anchor shows `aria-expanded="true"` |

## Behaviour

- Opens on click, never on hover.
- Closes on Escape, on a click outside, and when its action runs. Focus returns to the anchor.
- Flips above the anchor or to its end when it would leave the viewport.
- On phone, a popup with a form or a long list opens as a bottom sheet (Modal dialog, sheet) instead.
- Never opens a popup from a popup.

## Content

- Titles are short and say what the panel is for: "Show people in".
- Filter footers say the outcome with a count: "Show 31 people", not "Apply".
- Explainers answer one question in two sentences at most.

## Accessibility

- The anchor has `aria-expanded` and `aria-controls`. A popup with form controls has `role="dialog"` and a label; a plain list uses Dropdown menu instead.
- Focus moves to the first control inside on open. Tab moves through it; tabbing out closes it.
- Escape closes and returns focus to the anchor.
- Not modal: no focus trap, the page stays reachable.

## PrimeNG mapping

> **Reference only.** In the Angular app this component is built in `src/app/ds` without PrimeNG. The mapping below describes the behaviour to match; it is not a dependency. The app uses no PrimeNG at all: the hard patterns are built on Angular Aria and the Angular CDK (see `docs/verify-design-angular.md`).

```ts
popover: {
  root: { class: 'pp-popup' },
}
```

```html
<button class="pp-button pp-button--default pp-button--small" (click)="country.toggle($event)" [attr.aria-expanded]="country.overlayVisible">Country</button>
<p-popover #country styleClass="pp-popup--end">...</p-popover>
```

PrimeNG positions the popover itself; the `pp-popup` placement modifiers are for plain templates.

## In Pepla today

`p-popover` is used in the TalentFlow shell and the IT provisioning shell, and the shared topbar uses an overlay for its menu. Each is placed and styled separately.

## Do and don't

- **Do** keep a popup small and about one thing. **Don't** put a full form in it (use a Drawer).
- **Do** close it on Escape and return focus. **Don't** open it on hover.
- **Do** name the outcome in filter buttons. **Don't** write "Apply".
