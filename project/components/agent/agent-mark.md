---
name: Agent mark
group: agent
status: ready
classes: pp-agent-mark
primeng: none (plain Angular template with the Tooltip directive)
replaces: pi-sparkles icons placed by hand, AI badges with no tooltip, and AI output shown with no marker at all
---

# Agent mark

The agent mark says "Batsi did this". It sits inline on a record value, a table cell or a timeline item that Batsi filled in, checked or changed, and its tooltip says what Batsi did and when. Together with the Agent proposal card it is the only mint in the product (rule 1).

## Anatomy

1. **Icon**: Lucide `sparkles`, 16px, in `--color-icon-agent`. This is the agent's one icon everywhere.
2. **Word** (optional): "Batsi" (default) or "Suggested by Batsi" (`pp-agent-mark--suggested`), `--font-label-small` in `--color-text-agent`. When a row or card already has its one status lozenge, Batsi's part is said with the mark instead of a second lozenge: "Checked by Batsi", "Drafted by Batsi from Office starter".
3. **Tooltip**: what Batsi did, from what, and when. If a person approved it, who.

The mark is never an image and never the Naleko People logo. It is always the Lucide `sparkles` icon.

## Appearances

| Class | Use | Never |
| --- | --- | --- |
| `pp-agent-mark` | After a value Batsi filled in or changed: "Tax number ••••4821 *Batsi*" | On a value a person typed, even if Batsi later checked it (use a lozenge "Checked by Batsi", or this mark with those words when the row already has its status) |
| `pp-agent-mark--suggested` | A value Batsi proposes that no one has approved yet, shown in place: "Suggested by Batsi" | Once a person has approved or edited it; then it becomes the plain mark or goes away |
| `pp-agent-mark--icon` | Dense table cells and timeline rows where the word does not fit. Needs `aria-label` | As the only sign in a place people scan for agent work; prefer the word |

## States

| State | How |
| --- | --- |
| Default | Icon and word in mint, no background |
| Hover and focus | The tooltip opens (after 300ms on hover, at once on keyboard focus) |
| Suggested | Dotted underline under the word: the value is not approved yet |
| Edited by a person | The mark goes away. The record's history keeps that Batsi filled it first (rule 7) |

## Behaviour

- The mark is focusable (`tabindex="0"`) so keyboard users can open the tooltip. It is not a button and does nothing on press.
- On touch screens tooltips do not show. Put the same "what and when" in the record's history, and on phone show the word, not the icon alone.
- When a person edits a value Batsi filled, the mark is removed from that value. It is never moved onto the new value.
- One mark per value. If Batsi filled a whole section, put one mark in the section heading, not one per row.

## Content

- Word: "Naleko People". Where the verb helps, "Drafted by Batsi" or "Suggested by Batsi". Never "AI", "Bot", "Auto" or "the system".
- Tooltip: what Batsi did, then from what, then when: "Batsi read this from the bank letter, 3 Nov 2026, 10:20." If approved: "Approved by Thandeka Dlamini."
- Dates in the tooltip are absolute, with a 24-hour time.

## Accessibility

- The icon is decoration (`aria-hidden="true"`); the word "Naleko People" is the text. The icon-only mark has `aria-label="Filled in by Batsi"`.
- The tooltip is linked with `aria-describedby`, so screen readers read "Naleko People" then what and when.
- Mint text on white and on cream passes 4.5:1 in both themes (checked in CI with the other text pairs).

## PrimeNG mapping

No PrimeNG component. It is a plain Angular template; the tooltip uses the `pTooltip` directive with the Tooltip pass-through (see Tooltip).

```html
<span class="pp-agent-mark" tabindex="0" [pTooltip]="markText(field)" tooltipPosition="top">
  <svg lucideSparkles aria-hidden="true"></svg><span>Batsi</span>
</span>
```

`markText()` builds "Batsi read this from the bank letter, 3 Nov 2026, 10:20" from the field's audit entry.

## In Naleko People today

There is no "Batsi did this" marker in `hr-portal/src/app`. What exists:

- PrimeIcons `pi-sparkles` is used as the AI icon on the "Ask AI" button in `features/talent-flow/shell/talent-flow-shell.component.html`, in `features/hr-dashboard/components/ai-mode-panel/ai-mode-panel.component.html`, in `features/talent-flow/components/ai-chat-panel/ai-chat-panel.component.html` and in `shared/components/chat-widget/chat-widget.component.html`. Each marks the AI tool, not the AI's output.
- The employee detail page shows a risk band that `shared/models/employee.model.ts` describes as "risk classification produced by Bedrock". `features/hr-dashboard/components/employee-detail/employee-detail.component.html` shows it as an emoji dot and "LOW Risk" (or MEDIUM, HIGH), with the reason in a `title` attribute. Nothing says the agent produced it.
- `ActivityEntry.actorType` in `features/talent-flow/models/talent-flow.models.ts` can be `'AGENT'`, but the candidate workspace activity list prints `ev.actor` as plain text (`candidate-workspace-page.component.html`), with no mark.

## Do and don't

- **Do** put the mark on values Batsi filled in. **Don't** put it on a person's work, and don't use mint for anything else.
- **Do** say what and when in the tooltip. **Don't** leave a bare sparkle with nothing behind it.
- **Do** remove the mark when a person edits the value. **Don't** leave it on a value Batsi no longer owns.
