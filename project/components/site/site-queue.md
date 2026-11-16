---
name: Site approval queue
group: site
status: ready
classes: pp-site-queue
primeng: none (public site only, no PrimeNG)
replaces: the public site's .qgrid and .qi on the Security page, which used literal colours and a status that changed colour by transition
---

# Site approval queue

What waits for a person to approve: Batsi's drafted reminder and a write that came in through the API, side by side in one queue. Under the queue sit Approve and Reject, the approved line and the log line, which are the decision and log line of [Site leave approval](site-approval.html).

## Anatomy

1. **Block** (`pp-site-queue`): the items, one under the other.
2. **Item** (`pp-site-queue__item`, `--agent` for Batsi's, in mint): a top row (`__row`), the name (`__name`) and a note (`__note`).
3. **Top row**: a [who did it](site-who.html) tag and a [live status](site-state.html) ("Waiting for approval", then "Approved"), or a name and a plain status ("API key").
4. **Decision**: `pp-site-approval` with `pp-site-approval__decide` (Approve, Reject, "Approved by Jane Smith, 09:44. Reminder sent.") and `pp-site-approval__log` ("Logged: reminder approved by Jane Smith").

## States

| State | How |
| --- | --- |
| Waiting | Items not in yet (`pp-site-step`), Batsi's status "Waiting for approval" |
| Waiting for a decision | Both items and the buttons are in |
| Approved | Approve presses, the buttons give way to the approved line, Batsi's status crossfades to "Approved", the log line steps in |
| Still | The approved state shows |

## Behaviour

- Batsi's item at 0.5s, the API item at 1.4s, the buttons at 2.3s, approved by itself at 4.8s. A click on Approve stops the timers and approves at once.
- Reject is shown but takes no action in the sample.
- Only opacity and transform move.

## Content

- Copied from the approved page: "Approval queue", "Reminder to Candidate 3", "Bank letter and matric missing. Drafted 09:43.", "HR system sync", "API key", "Check documents · John Doe · 10:12", "Approve", "Reject", "Approved by Jane Smith, 09:44. Reminder sent." and "Logged: reminder approved by Jane Smith".

## Accessibility

- The status is a live region. The approved line says who approved and when, in words.
- Approve and Reject are real buttons; Reject is out of the tab order in the sample.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

The agent proposal cards HR approves in the app, and writes from the API waiting in the same queue.

## Do and don't

- Do put Batsi's drafts and outside writes in the same queue.
- Don't show anything as sent before a person approves it.
