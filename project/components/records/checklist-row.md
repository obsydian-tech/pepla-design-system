---
name: Checklist row
group: records
status: ready
classes: pp-checklist, pp-checklist__header, __title, __count, __list, pp-checklist-row, pp-checklist-row__mark, __body, __label, __owner, pp-checklist-row--done, --agent, --overdue
primeng: none (plain Angular template)
replaces: nothing yet; new for the hiring manager's "starts Monday" card and Onboard
---

# Checklist row

A step a new starter needs before day 1, with a lozenge that says it is done or when it is due. A **checklist** groups the rows under a count: "4 of 6 ready". It is read-only: people do the step elsewhere, and the row reports it.

## Anatomy

**Row**

1. **Mark** (`__mark`): `circle-check` when done, `sparkles` when Batsi did it, `circle-dashed` when not done.
2. **Label** (`__label`): the step: "Laptop and accounts".
3. **Owner** (`__owner`, optional): who does it: "IT, Sipho Ndlovu".
4. **Lozenge**: "Done 3 Nov", "Done by Batsi 9 Nov", or a deadline chip.

**Checklist**

1. **Header**: title ("Ready for day 1") and the count in words ("4 of 6 ready").
2. **Progress bar** (optional): small, coloured like the most urgent row.
3. **List**: one row per step.

## States

| State | Class | Mark | Lozenge |
| --- | --- | --- | --- |
| Not done, on track | none | `circle-dashed` | neutral deadline "Due in 5 days" |
| Due soon or today | none | `circle-dashed` | warning "Due in 2 days", "Due today" |
| Overdue | `--overdue` | `circle-dashed`, danger colour | danger "Overdue by 1 day" |
| Done by a person | `--done` | `circle-check` | success "Done 3 Nov" |
| Done by Batsi | `--agent` | `sparkles` | agent "Done by Batsi 9 Nov" (rule 1) |

## Behaviour

- Order follows the work, not the status, so people learn where each step sits.
- The count counts done steps (by people or by Batsi): "4 of 6 ready". When all are done: "All 6 ready".
- Rows are at least 44px tall (rule 9).
- If a row links somewhere, make the label a link; never the whole row.
- Below 360px the lozenge moves under the label.

## Content

- Labels are nouns or short outcomes: "Contract signed", "Bank letter", "Laptop and accounts".
- Owner is a team and a name when it helps: "IT, Sipho Ndlovu".
- "Ready" for steps, "verified" for documents. Do not mix them in one count.

## Accessibility

- The list is a `<ul>` labelled by the checklist title.
- The mark is decorative (`aria-hidden`); the lozenge words carry the status.
- The progress bar is labelled by the title and its text says the count in words.

## PrimeNG mapping

No PrimeNG component. A plain Angular `@for` of rows composed of `pp-lozenge` and the deadline pipe. Do not use `p-checkbox`: people do not tick these rows.

## In Naleko People today

There is no day-1 checklist. The nearest is the "Readiness strip" in `provisioning-tab.component.html`: three numbers labelled "COMPLETE", "BREACHED" and "READY" (a percentage), and a readiness bar, for the IT items of one hire.

## Do and don't

- **Do** say "4 of 6 ready". **Don't** show "67%".
- **Do** mark steps Batsi did with the agent lozenge. **Don't** show them as plain green.
- **Do** keep rows read-only. **Don't** add checkboxes that people expect to tick.
