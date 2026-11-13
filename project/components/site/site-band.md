---
name: Site closing band
group: site
status: ready
classes: pp-site-band
primeng: none (public site only, no PrimeNG)
replaces: the public site's .cl closing band, which moved its wash with background-position and used literal sizes and colours
---

# Site closing band

The last section before the footer: the product name set very large, one sentence, two buttons and a line about what happens after Get started.

## Anatomy

1. **Band** (`pp-site-band`): full width, a container, with a one-pixel rule above. Its ground is a wash that runs violet, white, mint, cream, violet and slowly flows sideways.
2. **Lights** (`pp-site-lights`, `pp-site-light`): drift over the wash. See [Site lights](site-lights.html).
3. **Inner** (`pp-site-band__inner`, with `pp-site-wrap`): a grid, content on the left.
4. **Eyebrow** (`pp-site-eyebrow`): "Book a demo".
5. **Title** (`pp-site-band__title`): "Naleko People.", `--font-site-band`: 52px on a phone growing to 168px. "People." is `pp-site-shine pp-site-shine--inline`.
6. **Lead** (`pp-site-band__lead`): one sentence naming the modules and Ask Batsi.
7. **Actions** (`pp-site-band__actions`): a large dark [Site button](site-button.html) "Book a demo" with `arrow-right`, and a large line Site button "Get started". They stack, full width, below 520px.
8. **Note** (`pp-site-band__note`): one line: what Get started creates and that the Naleko team calls every new company.

## States

| State | How |
| --- | --- |
| Arriving | Each part carries `pp-site-reveal` with `--_i` 0 to 4 |
| Default | Lights drift, "People." shines |
| Still | `data-site-still`: nothing moves |

## Behaviour

- The wash is a gradient three times the band's width, slid sideways by `transform` (16 seconds, there and back). The approved site moved it with `background-position`, which repaints every frame; this looks the same and stays on the compositor.
- The band carries `id="demo"` on the page, so every "Book a demo" link on the landing page scrolls to it. `scroll-margin-top` keeps the headline below the header.

## Content

- Title: the product name and nothing else.
- Lead: "Every employee hired, onboarded and compliant. One app for Recruitment, Onboarding and Offboarding, Leave Management and Compliance Management, with Ask Batsi built in."
- Note: "Get started creates a company account. The Naleko team calls every new company." No pricing, no trial length.

## Accessibility

- The title is the `h2` that names the band (`aria-labelledby`).
- Violet words on the wash: at least 5:1. Body text on the mint wash: 11:1.
- Buttons are 48px tall; the touch target is the whole button.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

Not in the signed-in app. Source: the approved public site, the closing band.

## Do and don't

- Do keep it the last section before the footer, once per page.
- Do keep the same two buttons as the hero, with "Get started" as the second.
- Don't add a form here. The forms are their own pages.
- Don't add logos, statistics or a price.
