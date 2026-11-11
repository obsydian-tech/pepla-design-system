---
name: Person progress
group: records
status: ready
classes: pp-person-progress-list, pp-person-progress, pp-person-progress__deadline
primeng: none (plain Angular template of pp-person, pp-progress-bar and pp-deadline)
replaces: nothing yet; new for the Today and Onboard screens
---

# Person progress

One row per person in lists such as "Starting soon": who they are, how far their documents are, and the next deadline in words. Used on Today and on Onboard.

## Anatomy

1. **Person**: `pp-person` with a 40px avatar, the name as a link to their page, and one meta line ("Bookkeeper · Starts Mon 16 Nov").
2. **Progress**: a small `pp-progress-bar` labelled "Documents" with the count in words: "5 of 6 documents".
3. **Deadline** (`__deadline`): a deadline chip for the next thing due, or a success lozenge "Ready" when nothing is left.

## States

| State | Progress bar | Deadline |
| --- | --- | --- |
| On track | default (violet) | neutral "Due in 13 days" |
| Something due soon | `--warning` | warning "Bank letter due in 2 days" |
| Overdue | `--danger` | danger "ID overdue by 1 day" |
| All in | `--success`, "All 6 documents" | success "Ready" |
| Loading | skeleton row | none |

The bar's colour always matches the deadline beside it, so the colour never stands alone.

## Behaviour

- The whole name is the link; the row itself is not clickable.
- Rows sort by the nearest deadline, overdue first.
- The list is a size container: below 560px the bar moves to its own line under the name and the deadline.
- Show at most 5 rows in a Today card, then "See all".

## Content

- Meta: role, place when the team works in more than one country, and "Starts Mon 16 Nov".
- Count: "5 of 6 documents", and what is next when one thing matters: "5 of 6 documents · Next: bank letter". When complete, "All 6 documents".
- Deadline: keep the chip short, "Due in 2 days". Name the thing in the count line, not in the chip, so the name never gets cut on a narrow panel.

## Accessibility

- The list is a `<ul>`; each row is an `<li>`.
- The `<progress>` element is labelled by "Documents" and described by the count in words.
- Deadline chips are `<time>` elements with the full date in `title`.

## PrimeNG mapping

No PrimeNG component. Use `@for` over the starters and compose `pp-person`, `pp-progress-bar` (native `<progress>`, or `p-progressBar` with the Progress bar pass-through) and the deadline pipe.

## In Pepla today

There is no such row. `hr-dashboard-home.component.html` lists employees in a `p-table` with columns Employee Name, Email, Department, HR Partner, Stage, Risk, Start Date and Actions, with no document progress. `employee-detail.component.html` shows one person's "Completion" as a percentage with a `p-progressBar`.

## Do and don't

- **Do** say "5 of 6 documents". **Don't** show "83%".
- **Do** show the next deadline in words. **Don't** show the start date as the only signal of urgency.
- **Do** keep one row per person. **Don't** add actions to every row; open the person instead.
