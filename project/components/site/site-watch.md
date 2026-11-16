---
name: Site watch
group: site
status: ready
classes: pp-site-watch, pp-site-watch__side, pp-site-watch__renew, pp-site-watch__renew--on, pp-site-watch__who, pp-site-watch__idle, pp-site-watch__line
primeng: none (public site only, no PrimeNG)
replaces: the landing page's .c-grid, .c-side and .rnw
---

# Site watch

The landing Compliance section's layout: the register, and beside it Not cleared to work and Batsi's renewal card.

## Anatomy

1. **Grid** (`pp-site-watch`): a Site ledger, and a side column (`__side`) from 1080px.
2. **Side**: a Site clearance box, the renewal card and a Site replay.
3. **Renewal card** (`__renew`, a polite live region): "Batsi" (`__who`), the waiting line (`__idle`), two lines with a tick (`__line`, Site steps) and a Site document read with Batsi's suggestion, Accept certificate and the reason (`pp-site-read__why`).

## States

| State | How |
| --- | --- |
| Watching | The card at 35% opacity with "Watching expiry dates on 4 certificates." |
| On (`--on`) | The card fades in fully; lines, the licence and the suggestion arrive one by one |
| Accepted | The button goes and "Accepted by Jane Smith, 11:24" shows |

## Behaviour

- After the countdown: Batsi asks at +0.5s, the upload line at +1.5s, the licence at +2.3s, the fields from +3s, the suggestion at +4.6s, Accept at +6.3s. Accepting renews the row and clears John Doe.

## Content

- Copied from the approved page.

## Accessibility

- The card and the clearance box are polite live regions, so changes are read.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

Batsi reads renewals in Compliance Management; HR accepts each one.

## Do and don't

- Do keep HR's acceptance before a renewal counts.
- Don't show the card fully before Batsi acts.
