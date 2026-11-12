---
name: Inline dialog
group: overlays
status: ready
classes: pp-inline-dialog, pp-inline-dialog-anchor
primeng: reference only (built without PrimeNG) — Popover (p-popover), ConfirmPopup (p-confirmpopup)
replaces: nothing yet; today there is no small anchored panel with actions
---

# Inline dialog

An inline dialog is a small panel that points at one control and says one thing about it: a heading, a sentence or two, and at most two actions. It does not block the page. Use it to explain a new control and offer to turn it on, to show a suggestion from Batsi next to the field it changes, or to check a small reversible step in place.

How it differs from its neighbours:

| | Inline dialog | Popup | Modal dialog |
| --- | --- | --- | --- |
| What it holds | A heading, short text, up to two actions | Content the person works with: filters, a list, an explainer | One decision or short task |
| Points at its control | Yes, with a beak | No | No, centred |
| Blocks the page | No | No | Yes, with a blanket |
| Example | "Remind new employees by SMS?" next to the reminders switch | "Show people in" country filter | "Withdraw Lerato Mokoena's offer?" |

## Anatomy

1. **Anchor**: the control it is about. `pp-inline-dialog-anchor` gives it a positioning box.
2. **Container**: overlay surface, 1px border, `--radius-large`, overlay shadow, 16px padding, 240px to 320px wide. Never scrolls.
3. **Beak**: a small pointer on the edge next to the anchor, so it is clear what the panel is about.
4. **Icon** (optional): 20px Lucide before the heading. `sparkles` in mint only when Batsi made the suggestion (rule 1).
5. **Heading**: `--font-heading-xsmall`, one line where possible.
6. **Text**: one or two sentences in `--font-body`, subtle colour.
7. **Actions**: at most two small buttons at the end, the main one last. A close button (`x`) is optional when there is a "Not now" action.

## Appearances

| Class | Use |
| --- | --- |
| (default) | Below the anchor, beak at its start |
| `pp-inline-dialog--end` | Aligned to the anchor's end, for controls near the right edge |
| `pp-inline-dialog--top` | Above the anchor, when there is no room below |
| `pp-inline-dialog--agent` | Batsi suggests something for this control. Mint border and `sparkles`; the action approves the agent's own proposal (rule 1, rule 2) |
| `pp-inline-dialog--inline` | Rendered in place, for docs only |
| `pp-inline-dialog--floating` | Placed by the app in a top-layer overlay (no absolute position of its own) |

## States

| State | How |
| --- | --- |
| Closed | Not rendered |
| Opening | Fades in and moves 4px towards its place over 200ms; under reduced motion it only fades |
| Open | The anchor has `aria-expanded="true"` when the anchor opened it |
| Working | The main action goes to its working state (rule 8); the panel stays open until it lands, then closes and a Flag confirms |
| Error | The text is replaced by what went wrong and how to fix it; the panel stays open |

## Behaviour

- Opens on click, or once on its own the first time a person meets a new control. Never on hover.
- Closes on Escape, on a click outside, on "Not now" and after its action lands. Focus returns to the anchor.
- A panel that opened on its own does not open again after it is dismissed. Batsi remembers per person.
- Flips above the anchor or to its end when it would leave the viewport, and the beak follows.
- One inline dialog at a time. Never open one from a popup or a dialog.
- Anything that cannot be undone uses a Modal dialog, not an inline dialog.
- On phone it stays anchored and spans the screen width less the 16px gutters. Buttons keep a 44px hit area.

## Content

- The heading names the thing or asks the small question: "Remind new employees by SMS?", "Suggested date: 1 Dec 2026".
- The text says why, in at most two sentences. For an agent suggestion, name the source: "Kagiso's resignation letter says his notice ends on 28 Nov."
- Actions repeat the verb: "Turn on reminders" and "Not now", "Use 1 Dec" and "Keep 17 Nov". Never "OK" or "Got it" next to a real choice.
- If there is nothing to decide, it is a Popup or a Tooltip, not an inline dialog.

## Accessibility

- `role="dialog"` with `aria-labelledby` on the heading and `aria-describedby` on the text. Not `aria-modal`: the page stays reachable.
- A panel opened by a click moves focus to its first action. A panel that opened on its own does not take focus; it is announced through a polite live region and reached with Tab from the anchor.
- The anchor has `aria-expanded` and `aria-controls` when it opens the panel.
- Escape closes it and returns focus to the anchor. No focus trap.
- The beak is decoration and is hidden from assistive tech.

## PrimeNG mapping

> **Reference only.** In the Angular app this component is built in `src/app/ds` without PrimeNG. The mapping below describes the behaviour to match; it is not a dependency. The app uses no PrimeNG at all: the hard patterns are built on Angular Aria and the Angular CDK (see `docs/verify-design-angular.md`).

PrimeNG v19 runs in unstyled mode; pass-through adds the Naleko People classes. A panel with your own content uses `p-popover`; a yes or no check about a reversible step can use `p-confirmpopup`. The pass-through key names below are to be checked against PrimeNG 19.

```ts
popover: {
  // shared with Popup: an inline dialog sets styleClass="pp-inline-dialog" and skips pp-popup
  root: ({ props }) => ({ class: props.styleClass?.includes('pp-inline-dialog') ? null : 'pp-popup' }),
},
confirmpopup: {
  root: { class: 'pp-inline-dialog', role: 'dialog' },          // to be checked
  content: { class: 'pp-inline-dialog__content' },               // to be checked
  message: { class: 'pp-inline-dialog__text' },                  // to be checked
  footer: { class: 'pp-inline-dialog__actions' },                // to be checked
  pcAcceptButton: { root: { class: 'pp-button pp-button--primary pp-button--small' } },
  pcRejectButton: { root: { class: 'pp-button pp-button--subtle pp-button--small' } },
}
```

```html
<button class="pp-button pp-button--default" (click)="tip.toggle($event)" [attr.aria-expanded]="tip.overlayVisible">SMS reminders</button>
<p-popover #tip styleClass="pp-inline-dialog">
  <div class="pp-inline-dialog__header"><h3 class="pp-inline-dialog__title" id="sms-t">Remind new employees by SMS?</h3></div>
  ...
</p-popover>
```

The function above keeps `pp-popup` off an inline dialog's root so the two components' padding and width don't mix. PrimeNG places the panel and draws its own arrow from `p-popover`'s `::before`; hide that arrow and keep the Naleko People beak. Both are to be checked in the app.

## In Naleko People today

There is no inline dialog in the app today. `p-popover` is used only for the SLA breach bell panels in the TalentFlow shell and the IT provisioning shell, and the shared `topbar` opens its notifications in a `p-overlayPanel`. None of them is a small anchored panel with actions, and `p-confirmPopup` is not used.

## Do and don't

- **Do** keep it to one heading, two sentences and two actions. **Don't** put a form in it (use a Popup or a Drawer).
- **Do** point it at the control it is about. **Don't** float it in the middle of the page.
- **Do** use the agent appearance only when Batsi made the suggestion. **Don't** make it mint for a tip written by the product team.
- **Do** use a Modal dialog for anything that cannot be undone. **Don't** confirm a deletion in an inline dialog.
