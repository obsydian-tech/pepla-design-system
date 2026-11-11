---
name: Deadline chip
group: records
status: ready
classes: pp-deadline, pp-deadline--inline (with pp-lozenge)
primeng: none (plain Angular template and a pipe)
replaces: SLA bars and "SLA BREACHED", "AT RISK", "ON TRACK" labels; bare due dates
---

# Deadline chip

A deadline chip says when something is due, in words, with a clock: "Due in 2 days", "Due today", "Overdue by 1 day". It is rule 5 made into a component. Never show a bare date, a coloured dot or a bar on its own.

## Anatomy

1. **Lozenge**: a `pp-lozenge` with `pp-deadline` added, so it has the same pill, size and colours as every other status.
2. **Icon**: `clock` while it is due, `clock-alert` once it is overdue, `circle-check` when done, `circle-pause` when paused.
3. **Words**: what is left or how late it is. The thing that is due can go first: "Bank letter due in 2 days".
4. **Exact date**: in `datetime` and `title` on the `<time>` element, for people who want it.

## States

| State | Class | Icon | Words |
| --- | --- | --- | --- |
| Later (on track) | `pp-lozenge pp-deadline` | `clock` | "Due in 12 days" |
| Soon (at risk) | `pp-lozenge--warning` | `clock` | "Due in 2 days", "Due in 3 hours" |
| Today | `pp-lozenge--warning` | `clock` | "Due today" |
| Overdue (breached) | `pp-lozenge--danger` | `clock-alert` | "Overdue by 1 day", "Overdue by 2 hours" |
| Done | `pp-lozenge--success` | `circle-check` | "Done 3 Nov" |
| Paused | `pp-lozenge pp-deadline` | `circle-pause` | "Paused until Lerato replies" |
| Inline | add `pp-deadline--inline` | same | same, without the pill, for meta lines |

"Soon" starts when the SLA rule says the item is at risk. Without a rule, it starts 3 days before the deadline.

## Behaviour

- Count in whole days. Under one day, count in hours. Never show minutes.
- The chip updates when the page refreshes its data; it does not tick live.
- Weekends count unless the SLA rule says working days; then say so: "Due in 2 working days".
- When the work is done, the chip turns into "Done 3 Nov" and stays, so the record shows it was on time.

## Content

- Lead with the verb: "Due in", "Overdue by", "Done". Say what is due when the row does not: "Scorecard overdue by 1 day".
- Numbers as figures, singular when it is one: "1 day", "2 days".
- Never "SLA", "breached" or "at risk" in the UI. Say the time.

## Accessibility

- Use `<time datetime="2026-11-13">` and put the full date in `title`.
- The icon is decorative; the words carry the meaning, so colour is never the only signal (rule 4).
- Do not announce chip changes in a live region; they change on refresh, not while someone reads.

## PrimeNG mapping

No PrimeNG component. An Angular pipe turns a due date and an SLA status into words and a variant:

```ts
// {{ task.dueAt | ppDeadline: task.slaStatus }} → { text: 'Due in 2 days', variant: 'warning', icon: 'clock' }
// ON_TRACK → '' (neutral), AT_RISK → 'warning', BREACHED → 'danger'
```

Where a `p-tag` shows SLA today, replace it with this chip. PrimeNG pass-through is not needed.

## In Pepla today

- `provisioning-bundle-card.component.ts` shows SLA as upper-case words ("SLA BREACHED", "AT RISK", "ON TRACK", "REVIEW OVERDUE", "REVIEW DUE TODAY"), a coloured bar and a second label, coloured by `slaStatus`.
- `it-queue-page.component.html` shows an SLA badge ("SLA Breached", "At Risk") and an "SLA progress" bar with `role="progressbar"`.
- `pipeline-page.component.html` and `candidate-workspace-page.component.html` show an SLA bar (`tf-sla-bar`) whose fill is coloured by `slaStatus`, and the pipeline header counts "SLA breaches".

None of these says how much time is left in words.

## Do and don't

- **Do** say "Due in 2 days". **Don't** show "13 Nov" alone or a red dot.
- **Do** keep "Done 3 Nov" after the work is done. **Don't** remove the chip.
- **Do** use danger only once it is overdue. **Don't** turn a chip red days early.
