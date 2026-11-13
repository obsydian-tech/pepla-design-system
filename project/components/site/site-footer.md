---
name: Site footer
group: site
status: ready
classes: pp-site-footer
primeng: none (public site only, no PrimeNG)
replaces: the public site's own footer CSS, which animated its top line and used literal colours, sizes and 14px tap targets
---

# Site footer

The bottom of every public page: who Naleko People is, the same lists as the menu plus Company, and the legal links.

## Anatomy

1. **Footer** (`pp-site-footer`): a `<footer aria-label="Site footer">` on the raised surface. Its first child is the Naleko gradient line (`pp-site-gradient-line`).
2. **Inner** (`pp-site-footer__inner`): content at most `--layout-site-max` wide inside the site gutters.
3. **Brand** (`pp-site-footer__brand`): the Logo (`pp-site-footer__logo`), one sentence about the product (`pp-site-footer__about`) and the data promise (`pp-site-footer__pin`, an icon and "All data stays in South Africa").
4. **Lists** (`pp-site-footer__cols`): five columns (`pp-site-footer__col`), each a heading (`pp-site-footer__heading`, an `h2`) and a list (`pp-site-footer__list`) of links (`pp-site-footer__link`). A link that is not built yet carries `pp-site-footer__soon`, the words "Coming soon".
5. **Bottom row** (`pp-site-footer__bottom`): the copyright (`pp-site-footer__copy`) and the legal links (`pp-site-footer__legal`, `pp-site-footer__legal-link`).

The layout follows the footer's own width (a container query): two list columns under 768px, three from 768px, and brand beside five columns from 1080px.

## States

| State | How |
| --- | --- |
| Link, rest | Text colour, no underline |
| Link, hover | Underlined |
| Link, focus | The Naleko focus ring |
| Not built yet | The words "Coming soon" after the link, in the quietest text colour |

## Behaviour

None. The footer is static: no animation, no script. The gradient line does not move.

## Content

- About line: "HR administration for South African companies: hiring, onboarding, leave and compliance in one app, with Ask Batsi built in."
- Data promise: "All data stays in South Africa". The AWS cost review confirms it, so it can be claimed.
- Lists: Product (Employee Records, Recruitment, Onboarding and Offboarding, Leave Management, Compliance Management, HR Help Desk and Performance Management marked Coming soon, Platform), Ask Batsi, Integrations (API, MCP server, Events and webhooks, Payroll providers and Verification providers marked Coming soon), Learn, Company.
- Copyright: "© 2026 Naleko Digital Solutions".
- Legal links: Privacy notice, Terms of use, PAIA manual, Cookie notice. These are placeholders until the legal text supplier is named; they link nowhere yet.

## Accessibility

- A `<footer>` landmark named "Site footer"; the list block is a `<nav aria-label="Footer">`, so the page has two named navigation landmarks (Main, Footer).
- List headings are real headings, so a screen reader can jump between them.
- Every link is 44px tall on a phone (`--size-touch-target`) and 32px from 768px wide, where a pointer is the norm, including the legal links.
- Text on the raised surface is 4.5:1 or better; the quietest text (headings, "Coming soon") is not carrying anything that is not repeated elsewhere.
- The gradient line is decoration (`aria-hidden`).

## PrimeNG mapping

None. In Angular, `<pp-site-footer>` wraps the same classes and takes the lists as data.

## In Naleko People today

Not in the signed-in app. Source: the footer of the approved public site (Concept D), rewritten with tokens: it used a looping gradient on its top line, literal colours and 14px links, and a mint chip for the data promise.

## Do and don't

- Do keep the same five lists on every page.
- Do say "Coming soon" in words, never as a pill.
- Don't add pricing, a newsletter box or social icons here.
- Don't animate the line.
- Don't link the legal placeholders to real pages until the text exists.
