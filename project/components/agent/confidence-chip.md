---
name: Confidence chip
group: agent
status: ready
classes: pp-confidence, pp-confidence-sources
primeng: none (a button that opens a Popover, p-popover)
replaces: bare percentages such as "87%" in the verifications list, the verification detail and the notifications table
---

# Confidence chip

The confidence chip says in words how sure Batsi is about a check or a proposal, and how many sources it read. Pressing it opens a popup that lists those sources. It never shows a bare percentage: people read "87%" as "nearly certain", and it hides what Naleko People actually looked at.

## Anatomy

1. **Chip**: a small pill button, 32px tall.
2. **Icon**: `file-text` for high confidence (it rests on documents), `triangle-alert` for "Check this", `circle-help` for "Batsi could not tell".
3. **Words**: the level, then the source count: "High confidence · 3 sources".
4. **Chevron**: `chevron-down`, because it opens a popup.
5. **Sources popup** (`pp-confidence-sources`): a title, one line on why, and the list of sources Batsi read. Each source is a link to the document or record, with what Batsi found in it ("Name and date of birth match").

## Appearances

| Class | Words | Use |
| --- | --- | --- |
| `pp-confidence--high` | "High confidence" | Every source agrees. Neutral colours: confidence is not success. |
| `pp-confidence--check` | "Check this" | Sources disagree or one is unclear. Warning colours, so it reads as "look before you approve". |
| `pp-confidence--unsure` | "Batsi could not tell" | Not enough to go on. Batsi does not propose an action at this level; it asks a person instead. |

The chip is not mint. Only the agent mark and the proposal card are mint (rule 1).

## States

| State | How |
| --- | --- |
| Hover | Background moves one step, 100ms |
| Open | `aria-expanded="true"`; the popup shows below, or above near the bottom edge |
| Focus | 2px violet ring, keyboard focus only |
| Loading | Not shown: the chip appears with the proposal, never before Batsi has finished |

## Behaviour

- The app turns the model's score into one of the three levels. The cut-offs are set per check type in one place (the agent service), never in a component. The number never reaches the screen.
- Until the API sends levels, one Angular pipe (`ppConfidence`) maps the number to the level. No template may print the number.
- The popup lists every source Batsi read, in the order it read them. A source that disagrees is listed first, with what did not match.
- Personal data in the source list stays masked (rule 6): "SA ID ending 0876", never the full number.
- Escape or a press outside closes the popup and returns focus to the chip.

## Content

- Levels in words only: "High confidence", "Check this", "Batsi could not tell".
- Count sources in words and digits: "1 source", "3 sources".
- Popup title: "Sources". Then one line on why: "The name, date of birth and photo match on all three."
- For "Check this", say what to check: "The surname on the bank letter is Moyo-Ncube; the ID says Moyo."

## Accessibility

- The chip is a `<button type="button">` with `aria-haspopup="dialog"`, `aria-expanded` and `aria-controls`.
- Its accessible name is the full text: "High confidence, 3 sources".
- The popup is `role="dialog"` labelled by its title. Sources are a list of links.
- Level is never colour alone: each has its own icon and words (rule 4).

## PrimeNG mapping

The chip is a plain `<button>`; the popup is `p-popover` with the Popover pass-through (see Popup).

```html
<button class="pp-confidence" [class.pp-confidence--check]="level === 'check'" type="button"
        aria-haspopup="dialog" [attr.aria-expanded]="op.overlayVisible" (click)="op.toggle($event)">
  <svg [lucideIcon]="icon(level)" aria-hidden="true"></svg>
  <span>{{ level | ppConfidenceLabel }} · {{ sources.length }} sources</span>
  <svg lucideChevronDown aria-hidden="true"></svg>
</button>
<p-popover #op><div class="pp-confidence-sources">...</div></p-popover>
```

## In Naleko People today

Confidence is shown as a bare number in three places:

- `features/hr-dashboard/components/verifications-list/verifications-list.component.html` has a "Confidence" column showing `{{ v.confidence }}%`.
- `features/hr-dashboard/components/verification-detail/verification-detail.component.html` shows `{{ v.confidence }}%` in a `confidence-badge` next to the decision tag.
- `features/hr-dashboard/components/notifications/notifications.component.html` has a "Confidence" column with a `p-tag` (severity `warn`) whose value comes from `formatConfidence()` in `notifications.component.ts`, which returns the score times 100 with a `%` sign.

None of them lists what was read. `confidence: number` comes from `core/services/hr-api.service.ts` and `shared/models/employee.model.ts`.

## Do and don't

- **Do** say the level in words and the number of sources. **Don't** show "87%" or a score bar.
- **Do** list the sources and the result for each. **Don't** say "High confidence" with nothing behind it.
- **Do** say what to check at "Check this". **Don't** colour the chip mint or green.
