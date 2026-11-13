---
name: Site risk list
group: site
status: ready
classes: pp-site-risk
primeng: none (public site only, no PrimeNG)
replaces: the public site's .rk, .rk-i and .cnt, which changed border, fill and pill colours by transition
---

# Site risk list

The candidates Batsi has flagged as at risk of dropping out, one row each with the reason and a status, under a count of how many are flagged. When the expiring offer is signed, its row turns mint and the count drops.

## Anatomy

1. **List** (`pp-site-risk`).
2. **Row** (`pp-site-risk__item`, with `pp-site-step`; `--fix` once resolved): a name (`pp-site-risk__name`), a line with the reason (`pp-site-risk__why`) and a status on the right.
3. **Count**: a [live status](site-state.html) in the panel's top ("None flagged", "1 flagged", "2 flagged", "3 flagged").
4. A [suggestion](site-suggest.html) under the list.

## States

| State | How |
| --- | --- |
| Waiting | Rows hidden, count "None flagged" |
| Flagging | Each row steps in 0.9s after the last and the count goes up by one |
| Suggested | The suggestion steps in |
| Resolved | `--fix`: a mint fill and border fade in on the offer row; its status becomes "Signed", its line becomes "Offer signed · Hired" and the count drops to "2 flagged" |
| Still | The resolved state shows |

## Behaviour

- Three rows arrive, then Batsi's suggestion, then the offer is signed 3.4s later.
- The count, the status and the line are stacks of states that crossfade; none changes colour by transition.
- The mint look is a layer that fades in (opacity).

## Content

- Copied from the approved page: "Candidates at risk", the three rows and their reasons, the statuses (Quiet, Missed, Expiring, Signed), the counts and the suggestion.
- Sample people are "Candidate N".

## Accessibility

- A change in the count is announced (the stack is a `role="status"`).
- Every row says its reason and status in words.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

The "Candidates at risk" list in Recruitment: no reply, missed interview, offer close to expiry.

## Do and don't

- Do say why a candidate is flagged and what HR could do.
- Don't present a flag as a decision. Flags are advice.
