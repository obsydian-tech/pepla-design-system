---
name: Site leave approval
group: site
status: ready
classes: pp-site-approval
primeng: none (public site only, no PrimeNG)
replaces: the public site's .ap-meta, .chipst, .decide and .logline on the Leave page, which changed a chip's colour by transition and used a literal green box
---

# Site leave approval

The line manager's side of a leave request: the dates and working days, Batsi's reminder, Approve and Decline, and the log line.

## Anatomy

1. **Block** (`pp-site-approval`) holds the lines below the panel top.
2. **Status** in the panel top: a [live status](site-state.html) (`pp-site-state--end` pushes it to the right) with four states: "No request", "Waiting for approval", "Approved" and "Declined with a reason".
3. **Meta** (`pp-site-approval__meta`): the dates, the working days and "Line manager approval".
4. **Reminder**: a [suggestion](site-suggest.html) with the lead "Batsi.".
5. **Decision** (`pp-site-approval__decide`, `--done` after approval): Approve and Decline buttons and the accepted line (`pp-site-approval__accepted`) with the tick.
6. **Log** (`pp-site-approval__log`): "Logged: annual leave approved, 4 days deducted".

## States

| State | How |
| --- | --- |
| No request | Status "No request", both buttons disabled, no reminder |
| Waiting | Status "Waiting for approval" (amber), both buttons enabled |
| Reminded | The reminder steps in |
| Approved | `--done`: the buttons are replaced by "Approved by the line manager, 10:05", status "Approved" (green), the log line steps in |
| Declined | Status "Declined with a reason" (violet), both buttons disabled |
| Still | The approved state shows |

## Behaviour

- Waiting at 0.7s, the reminder at 2.3s, approved by itself at 5.2s. A click on Approve or Decline stops the timers and decides at once. Approve presses (a small scale) for 0.3s first.
- The status is a stack of states that crossfade. The reminder and the log line are demo steps.
- Only opacity and transform move.

## Content

- Copied from the approved page: "John Doe · Annual leave", "14 to 18 Dec · 4 working days · Line manager approval", "Batsi. Waiting 1 day. Reminder sent to the line manager.", "Approve", "Decline", "Approved by the line manager, 10:05" and "Logged: annual leave approved, 4 days deducted".
- Batsi never approves: the person does.

## Accessibility

- The status is a polite live region. The approval line says who approved and when, in words.
- Approve and Decline are real buttons.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

The approval card a line manager sees in Leave Management.

## Do and don't

- Do say who decided and log it.
- Don't let Batsi decide a request.
