---
name: Offer summary
group: records
status: ready
classes: pp-offer, pp-offer__section, __section-title, __salary, __salary-note (with pp-card, pp-dl, pp-approval-chain--compact)
primeng: none (plain Angular template); Card pass-through if p-card is used
replaces: the offer tab's summary blocks
---

# Offer summary

A card with an offer's details: role, start date, salary (hidden until someone chooses to see it), benefits, status, approvals and the next actions.

## Anatomy

1. **Card header**: the candidate's avatar, "Offer for Lerato Mokoena", role and place, and the status lozenge in `pp-card__aside`.
2. **Facts** (`pp-dl`): Role, Start date, Salary, Benefits, and the expiry or reply deadline.
3. **Salary** (`__salary`): masked by default, with a "Show salary" link button. After reveal: the amount, "Hide salary" and a note that it is logged.
4. **Approvals** (`__section`): a compact Approval chain while the offer waits.
5. **Footer**: actions for the current status.

## States

| Status | Lozenge | Footer actions |
| --- | --- | --- |
| Draft | neutral, `pencil`, "Draft" | Send for approval (primary), Edit |
| Waiting for approval | information, `clock` | Edit offer, Remind (approver) |
| Approved | success, `circle-check` | Send offer (primary) |
| Sent | information, `send`; a reply deadline chip | Mark as accepted, Withdraw offer (danger) |
| Accepted | bold success, `circle-check`, "Accepted 12 Nov" | Start onboarding (primary) |
| Declined by the candidate | danger, `circle-x`, with their reason | Close |
| Expired | warning, `calendar-x`, "Expired 10 Nov" | Send again |
| Withdrawn | neutral, `circle-x`, "Withdrawn" | none |

## Behaviour

- Salary shows masked (`R ••• •••`) for everyone, including people allowed to see it (rule 6). "Show salary" reveals it in place and logs who and when; it hides again when they leave the page.
- People without salary permission see "Hidden" with a `lock` icon and no button.
- "Withdraw offer" opens a confirmation that names the candidate and says they will be told.
- Editing an offer that is waiting for approval sends it back to the first approver.

## Content

- Money: symbol, space, amount with space thousands: "R 18 500 a month", "ZK 24 000 a month", "US$ 1 200 a month". One currency per offer.
- Dates: "1 Dec 2026". The reply deadline in words: "Reply due in 2 days".
- Benefits as a short comma list, not a paragraph.

## Accessibility

- The reveal button says what it reveals ("Show salary") and becomes "Hide salary". Announce nothing else; the amount appears where focus already is.
- The masked text is read as is; add `aria-label="Salary hidden"` on the masked span in the app.
- Section titles are headings so screen-reader users can jump to "Approvals".

## PrimeNG mapping

No PrimeNG component of its own. The card can be `p-card` with the Card pass-through, or plain markup. Buttons are `p-button` with the Button pass-through. The salary follows the Masked field pattern.

## In Pepla today

- `offer-tab.component.html` has four states: "Offer Created", "In Approval", "Offer Sent" and "Offer Accepted".
- In the summary, Salary shows `{{ o.currency }} {{ o.baseSalary | number }}` unmasked, beside Start Date and Expiry.
- The create form has "CTC / Salary *", a benefits text area and "Submit for Approval".
- The "Offer Accepted" state shows Accepted, Start Date and Sentiment.
- The `offers` route page (`offers-page.component.ts`) is a placeholder.

## Do and don't

- **Do** hide the salary until someone asks, and log it. **Don't** show the amount in a list or a header.
- **Do** write "R 18 500". **Don't** write "ZAR18500.00" or "R18,500".
- **Do** keep one primary action for the current status. **Don't** show "Send" while approvals are waiting.
