---
name: Site trust strip
group: site
status: ready
classes: pp-site-strip
primeng: none (public site only, no PrimeNG)
replaces: the public site's .lm-trust strip, which drew its own icons
---

# Site trust strip

One line of short facts under the Ask Batsi band on a Learn more page: who decides, what is logged, POPIA and where the data stays. A link to Security and POPIA sits at the end.

## Anatomy

1. **Section** (`pp-site-strip`, `aria-label="Trust"`): the raised surface with a rule under it.
2. **Inner** (`pp-site-strip__inner`, with `pp-site-wrap`): the facts in one row that wraps.
3. **Fact** (`pp-site-strip__item`): a violet icon and a few words. Icons: check, file-text, lock, map-pin.
4. **Link** (optional): a standalone [Link](link.html) with an arrow, pushed to the end of the row.

## States

| State | How |
| --- | --- |
| Default | Facts in a row; on a phone they wrap one under the other |
| Without link | The Security page itself has no link: the facts only |
| Still | Nothing moves, so there is nothing to stop |

## Behaviour

- Nothing moves. The link is the only control.
- The link is at least 40px tall on a phone.

## Content

- Four facts, copied from the approved page. The first changes per page ("A person makes every hiring decision", "A person accepts every renewal" and so on).
- The link reads "Security and POPIA".

## Accessibility

- The section is named "Trust". The icons are decoration; the words carry the fact.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

Not in the signed-in app. Source: the approved Learn more pages' trust strip (`lm-trust`).

## Do and don't

- Do keep each fact to a few words.
- Don't add a fifth fact or a second link.
