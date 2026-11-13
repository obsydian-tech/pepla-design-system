---
name: Site form page
group: site
status: ready
classes: pp-site-form-page, pp-site-crumb, pp-site-next
primeng: none (public site only, no PrimeNG)
replaces: the public site's .fm-hero grid, .crumb and .fm-next, which used inline styles, hand-written svg and literal sizes
---

# Site form page

The top of Get started and Book a demo: a breadcrumb, the headline, a lead, three short facts and the form card beside them, with the three "what happens next" lines under the intro. It sits inside a [Site hero](site-hero.html), on the same soft lights.

## Anatomy

1. **Hero** (`pp-site-hero`, with `pp-site-lights pp-site-lights--plain`): the ground, the header's room and the lights, without their rings. No grain and no scroll cue.
2. **Grid** (`pp-site-form-page__grid`, with `pp-site-wrap`): one column on a phone, two from 1024px (intro and next steps on the left, the card on the right, top-aligned).
3. **Breadcrumb** (`pp-site-crumb`): "Home", a chevron, and the current page with `aria-current="page"`.
4. **Eyebrow** (`pp-site-eyebrow`): the page name.
5. **Title** (`pp-site-form-page__title`, `--font-site-page`): 40px on a phone growing to 84px. The second half is `pp-site-shine pp-site-shine--inline`.
6. **Lead** (`pp-site-form-page__lead`): up to three sentences.
7. **Facts** (`pp-site-form-page__facts` on a `pp-site-hero__chips` list): three short chips with a violet dot.
8. **Card** (`pp-site-form-page__card`): holds a [Site form card](site-form-card.html).
9. **Next steps** (`pp-site-next`, with `pp-site-form-page__next`): three numbered lines, each a bold title and one sentence.

## States

| State | How |
| --- | --- |
| Arriving | Each part carries `pp-site-reveal` with `--_i` 1 to 5, in reading order |
| Default | Lights drift, the accent words shine |
| Still | `data-site-still`: nothing moves |

## Behaviour

- The layout follows the hero's own width (container queries), not the window's.
- On a phone the order is intro, card, next steps. From 1024px the next steps move under the intro.
- The page has no script of its own. Choosing, checking and sending are on the form card.

## Content

- Eyebrow, headline, lead, facts and next steps are copied from the approved pages. Get started: "Create a company account in two minutes." Book a demo: "See Naleko People on a 30-minute call."
- Facts say what a visitor needs to know before they start: cost, a call, any email address. No pricing.
- Next steps are nouns and verbs a person can follow: "The account is created", "The onboarding call", "Modules are switched on".

## Accessibility

- The breadcrumb is a `nav` named "Breadcrumb". Each link is at least 44px tall.
- The title is the page's `h1`. The card's heading is an `h2`.
- The facts list is named "Good to know" and the next steps "What happens next".
- The lights are decorative and hidden from assistive technology.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

Not in the signed-in app. Source: the approved public site, the Get started and Book a demo pages.

## Do and don't

- Do keep the card beside the intro on desktop, so the form is in view on arrival.
- Do keep the facts to three.
- Don't put a price or a trial length in the facts.
- Don't add a second form or a video to this hero.
