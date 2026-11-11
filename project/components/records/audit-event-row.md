---
name: Audit event row
group: records
status: ready
classes: pp-audit-log, pp-audit-event, pp-audit-event__summary, __when, __what, __sentence, __where, __outcome, __chevron, __details, __change
primeng: reference only (built without PrimeNG) — Table (p-table) with row expansion, or plain markup
replaces: the admin audit table rows and the event detail drawer's first view
---

# Audit event row

One line in the audit trail: who did what to which record, when, from where, and whether it worked. Open the row to see details: what changed, why, and what Pepla read. Every agent action shows the agent mark.

## Anatomy

**Summary** (always shown)

1. **When** (`__when`): "11 Nov 2026, 09:12".
2. **What** (`__what`): the actor's avatar (Pepla's agent avatar for agent actions) and one sentence: "**Lerato Mokoena** changed the start date on Kagiso Molefe's record".
3. **Where** (`__where`): the app and place ("Web app · Durban") or "Pepla agent · Offers".
4. **Outcome** (`__outcome`): a lozenge.
5. **Chevron**: shows the row opens.

**Details** (`__details`, when open)

- **Change** (`__change`): old value struck through, an arrow, the new value.
- **Facts** (`pp-dl`): record, why, done by, approved by, what Pepla read, where data went, device, masked IP, event ID.

## States

| Outcome | Lozenge |
| --- | --- |
| Done | success, `circle-check`, "Done" |
| Partly done | warning, `triangle-alert`, "2 of 3 done" |
| Failed | danger, `octagon-alert`, "Failed" |
| Not allowed | danger, `lock`, "Not allowed" |

| Row | How |
| --- | --- |
| Closed | `<details>` without `open` |
| Open | `open`: sunken details panel, chevron turns |
| Hover | raised-hovered background |
| Agent action | agent avatar, "Pepla" as actor, and in details who approved it (rules 1 and 2) |

## Behaviour

- Rows are newest first and never edited or deleted (rule 7). A correction is a new row.
- The row uses native `<details>`, so it opens with Enter or Space and needs no script.
- Revealing personal data is itself an event: "Thandeka Dlamini showed Chipo Banda's salary".
- IP addresses and email addresses are masked in the row and the details; an HR admin can export the full log.
- The log is a size container: below 720px the summary stacks into three lines.

## Content

- One sentence, past tense, actor first: "**Pepla** sent Kagiso Molefe's offer letter, approved by Thandeka Dlamini".
- Name the record by the person it is about, not by an ID.
- Outcomes in words: "Done", "2 of 3 done", "Not allowed". Never "SUCCESS" or "PARTIAL".

## Accessibility

- The log is a `<ul>` with `aria-label`. Each row is a `<details>` whose `<summary>` reads as one line.
- The change has hidden words: "Start date changed from 9 Nov 2026 to 16 Nov 2026".
- The chevron and avatars are `aria-hidden`; the sentence names the actor.

## PrimeNG mapping

> **Reference only.** In the Angular app this component is built in `src/app/ds` without PrimeNG. The mapping below describes the behaviour to match; it is not a dependency. Only the date picker, autocomplete, multi-select and long tables wrap PrimeNG (see `docs/verify-design-angular.md`).

For large logs with sorting and paging, use `p-table` with row expansion and the Table pass-through; the expanded row holds `pp-audit-event__details` (expansion keys to be checked). For short logs on a record page, use the plain `<details>` markup.

```ts
table: { root: { class: 'pp-table-wrap' }, table: { class: 'pp-table' } }
```

## In Pepla today

- `admin-audit-page.component.html` shows events in a `p-table` with columns Timestamp, User, Role, Action, Entity, Module and Outcome. Role and outcome are `p-tag`s; a row click opens a drawer.
- `AuditEvent` in `admin.models.ts` has `userFullName`, `userEmail`, `role`, `action`, `entityLabel`, `module`, `outcome` (SUCCESS, FAILURE or PARTIAL), `ipAddress`, `correlationId`, and a `diff` for config changes.
- `event-detail-drawer.component.html` shows a Before and After table for config changes and the IP address unmasked.
- `AuditRole` is TA, HM, IT, Admin or System, and `AuditModule` includes System. There is no value for actions taken by an agent.

## Do and don't

- **Do** write one plain sentence per event. **Don't** show "UPDATE Candidate#a81f".
- **Do** mark every agent action with the agent avatar and name the approver. **Don't** log agent actions as "SYSTEM".
- **Do** mask IPs and emails. **Don't** show them in full in the row.
