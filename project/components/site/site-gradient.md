---
name: Site gradient
group: site
status: ready
classes: pp-site-gradient-text, pp-site-gradient-line
primeng: none (public site only, no PrimeNG)
replaces: the public site's --naleko gradient, written as a literal
---

# Site gradient

The Naleko Digital Solutions gradient: navy, blue, sky, violet and magenta in one line. It marks the company on the public site and nowhere else. The page stays light; the gradient is an accent.

## Anatomy

1. **Text** (`pp-site-gradient-text`): the company name in a heading or a line of text. It is static. Colour comes from the `--color-site-gradient-*` tokens.
2. **Line** (`pp-site-gradient-line`): a one-pixel rule, used above the footer.

## States

| State | How |
| --- | --- |
| Default | Static gradient |
| Forced colours | The text falls back to the system link colour, so it stays readable |

## Behaviour

- Not interactive and not animated. A slow flowing gradient on text needs a paint on every frame, so the design system does not offer one.

## Content

- Only the words "Naleko Digital Solutions". Never a product name, a status or a number.

## Accessibility

- Every stop of the text gradient reaches 3:1 against white and cream (the WCAG minimum for large text), so use it only for a heading of 24px and up. The brand sky stop is only 2:1, so the text version swaps in a darker sky (`--color-site-gradient-text-3`). The hairline keeps the brand sky because it carries no words.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

Not in the signed-in app. Source: the approved public site, About band and footer.

## Do and don't

- Do use it for the company name in a heading, and for the footer hairline.
- Don't use it for body text, buttons, status or Batsi (Batsi is mint).
- Don't recolour it per customer. Customer brand colours never touch the public site.
