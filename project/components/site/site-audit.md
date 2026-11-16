---
name: Site audit log
group: site
status: ready
classes: pp-site-audit, pp-site-audit--card, pp-site-audit__list--hero
primeng: none (public site only, no PrimeNG)
replaces: the public site's .log, .log-head, .log-body, .lrow and .log-foot on the Security page and the landing page's Trust section, which used literal colours and sizes and a pending row tinted with a literal colour
---

# Site audit log

The audit log filling in front of the visitor: each entry has a time, who did it (a person or Batsi) and what happened. On the landing page one entry waits for Jane Smith's approval with an Approve button, and the log ends with Export to CSV.

## Anatomy

1. **Block** (`pp-site-audit`): the list and its foot. Inside a demo panel it has no frame of its own; `pp-site-audit--card` makes it a card with a head line (the landing page's Trust section).
2. **Head** (`pp-site-audit__head`, card only): the title (`__title`, "Audit log · John Doe") and the note (`__note`, "Sample data").
3. **List** (`pp-site-audit__list`, an `<ol>`, `--tall` keeps room for six entries): framed entries.
4. **Entry** (`pp-site-audit__row`): the time (`__time`, a `<time>`), a [who did it](site-who.html) tag and what happened (`__what`). `--waiting` washes the entry in amber while it waits; `--new` makes an entry pop in when a script adds it.
5. **Foot** (`pp-site-audit__foot`): "Every entry kept with a name and a time" and Export to CSV (`__export`, with `download`).

## States

| State | How |
| --- | --- |
| Filling | Entries are added one by one with `--new`: each pops in (opacity and transform) |
| Waiting | `--waiting` on an entry: amber wash, a "Waiting for approval" status and a small Approve button in `__what` |
| Approved | `--waiting` comes off (the wash fades out) and the entry reads "Drafted a reminder to Candidate 3"; a new entry says Jane Smith approved and sent it |
| Still | Every entry shows, nothing moves |

## Behaviour

- Security page: six entries, 0.7s apart, starting at 0.5s.
- Landing page: five entries 0.65s apart from 0.4s; then Batsi's drafted reminder waits; 2.2s later Approve is pressed and the approval is logged; 1.8s after that the ID number is shown and the view is logged (see [hidden personal data](site-hidden.html)).
- A click on Approve approves at once.
- On phones (a section narrower than 641px) what happened moves under the time and the name.

## Content

- Copied from the approved pages: "Asked John Doe for his UIF reference number", "Gave POPIA consent", "Uploaded ID document", "Read ID document, suggested Matches", "Accepted ID document", "Drafted a reminder to Candidate 3", "Approved and sent the reminder to Candidate 3", "Viewed John Doe’s ID number", with their times (09:00 to 09:45).
- "Every entry kept with a name and a time", "Export to CSV".

## Accessibility

- The list is a polite live region, so each new entry is read once.
- Times are `<time>` elements. Who did it is written out ("Agent Batsi", "Person Jane Smith").
- Approve is a real button. Export to CSV is shown as a label only, because the sample exports nothing.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

The audit log on an employee record and the audit event row in Records.

## Do and don't

- Do give every entry a name, a time and who did it.
- Don't let Batsi approve its own entry.
