---
name: Agent activity log
group: agent
status: ready
classes: pp-agent-log
primeng: Timeline (p-timeline), as in Timeline
replaces: nothing today: there is no list of what the agent did
---

# Agent activity log

The agent activity log lists everything Pepla did or proposed, newest first, and how each one ended: approved by a person, declined, done on its own under a rule someone set up, expired, or failed. It answers "what has Pepla been doing?" for an HR admin, and it is the agent's slice of the audit trail. It reuses the Timeline.

## Anatomy

1. **Filters** (`pp-agent-log__filters`): toggle buttons with counts: All, Approved, Declined, Done by a rule, Expired or failed.
2. **Timeline** (`pp-timeline`): grouped by day.
3. **Marker**: the agent avatar (`pp-avatar--agent`, `sparkles`) on every event.
4. **Summary**: "**Pepla** sent Kagiso Molefe's bank details to payroll" for done work; "**Pepla** suggested ..." for a proposal that was not carried out.
5. **Outcome** (`pp-agent-log__outcome`): an icon and words saying how it ended and who decided.
6. **Reason** (optional): a declined proposal's reason, in the timeline's quote style.
7. **Time**: in words, full date in the tooltip, as in Timeline.

## Appearances

| Use | How |
| --- | --- |
| Admin page "What Pepla did" | Full timeline with filters, 20 events at a time |
| On a record (a person, a candidate) | Compact timeline (`pp-timeline--compact`) without filters, only that record's agent events. Usually merged into the record's full history instead |

## States

| Outcome | Icon | Words |
| --- | --- | --- |
| Approved | `circle-check` (success) | "Approved by Thandeka Dlamini" |
| Done by a rule | `list-checks` | "Done on its own under the rule *Remind about missing documents*, set up by Lerato Mokoena" |
| Waiting | `info` (information) | "Waiting for you. Review" |
| Declined | `circle-x` | "Declined by Sipho Ndlovu", then the reason |
| Expired | `clock-alert` | "Expired. No one decided by 9 Nov, 17:00" |
| Failed | `octagon-alert` (danger) | "Approved by Thandeka Dlamini, but payroll refused the account number" |

Loading, empty and error follow Timeline. The filtered empty state says what the filter found nothing of: "Nothing declined this month."

## Behaviour

- Every agent event has an outcome line. An event with no person behind it must name the rule that allowed it and who set the rule up (rule 2).
- Filters are toggle buttons (`aria-pressed`); one is on at a time. Counts cover the period shown.
- A waiting proposal links to its proposal card. Decided events link to the record that changed.
- Events are never edited or removed. A correction is a new event (rule 7).
- Personal data stays masked in summaries (rule 6).

## Content

- Lead with "Pepla" and a past-tense verb: "Pepla sent", "Pepla reminded", "Pepla suggested".
- Outcome names the person: "Approved by Thandeka Dlamini". Never "Approved by admin" or "Auto-approved".
- Rule names are the names people gave them, as links.

## Accessibility

- As Timeline: `<ol>` with `aria-label`, markers hidden, times in `<time>` with a title.
- Filters sit in a `role="group"` labelled "Show". The count is part of each button's name ("Declined 3").
- Outcomes are an icon and words; the icon is hidden from screen readers.

## PrimeNG mapping

Uses `p-timeline` with the Timeline pass-through. The filters are `p-button` toggles (`[attr.aria-pressed]`) through the Button pass-through. The outcome line is a plain template in the event content.

```html
<p-timeline [value]="events()" aria-label="What Pepla did">
  <ng-template #content let-e>
    <span class="pp-timeline__summary"><strong>Pepla</strong> {{ e.what }}</span>
    <span class="pp-agent-log__outcome" [class]="'pp-agent-log__outcome--' + e.outcome">...</span>
  </ng-template>
</p-timeline>
```

## In Pepla today

There is no list of what the agent did in `hr-portal/src/app`. Agent events exist in the data but are not shown as such: `features/talent-flow/models/talent-flow.models.ts` has `actor: string; // 'SYSTEM' | 'HUMAN' | 'AGENT'` on candidate events and `actorType: 'SYSTEM' | 'HUMAN' | 'AGENT'` on `ActivityEntry`. The candidate workspace's activity list (`features/talent-flow/pages/candidate-workspace/candidate-workspace-page.component.html`) prints `ev.actor` as text, with filters for all, interviews, scores and sentiment, and none for agent work. The admin Audit page uses a `p-table` (see Timeline).

## Do and don't

- **Do** show how every agent event ended and who decided. **Don't** list "Pepla did X" with no outcome.
- **Do** name the rule and its owner for work done without a person. **Don't** write "Automatic".
- **Do** keep declined and expired proposals in the log. **Don't** show only the approved ones.
