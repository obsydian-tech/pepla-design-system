---
name: Site hero
group: site
status: ready
classes: pp-site-hero
primeng: none (public site only, no PrimeNG)
replaces: the public site's .hero, .hero-top, .hero-main and .bullets, which drew its light on a canvas with a script and used literal sizes and colours
---

# Site hero

The top of the landing page: what the product is in one sentence, the four regulations it is built for, the headline, a line under it, and two buttons. The header floats over its top edge, and soft lights drift behind.

## Anatomy

1. **Hero** (`pp-site-hero`): full width, white, a container. Its top padding is the header height, so the [Site header](site-header.html) floats over it. The ground fades to white at the bottom, where the first section starts.
2. **Lights** (`pp-site-lights` with up to three `pp-site-light`): behind everything, each with a thin ring inside. See [Site lights](site-lights.html). **Grain** (`pp-site-hero__grain`): a fine noise tile at 5% opacity that jitters in steps, as in the approved hero.
3. **Intro** (`pp-site-hero__intro`): a sentence naming the product and what it does, with the built-for chips beside it from 1024px, below it before that. The product name is `<strong>`.
4. **Chips** (`pp-site-hero__chips`, `pp-site-hero__chip`): a list: BCEA, UIF, SARS, POPIA. A violet dot and the name; they are not links.
5. **Main** (`pp-site-hero__main`, with `pp-site-wrap`): a column holding the next four parts.
6. **Eyebrow** (`pp-site-eyebrow`): "People, risk and compliance platform".
7. **Title** (`pp-site-hero__title`, `pp-site-hero__line`): the only `h1` on the page. Two lines; the second is an accent line with [Site shine](site-shine.html). Size is `--font-site-hero`: 46px on a phone, growing with the width to 140px.
8. **Lead** (`pp-site-hero__lead`): one sentence, 56 characters wide.
9. **Actions** (`pp-site-hero__actions`): a large dark [Site button](site-button.html) "Book a demo" with `arrow-right`, and a large line Site button "Ask Batsi" with `sparkles`. They stack, full width, below 520px.
10. **Cue** (`pp-site-hero__cue`): the word "Scroll" and a line that draws itself downward, from 768px.

## States

| State | How |
| --- | --- |
| Arriving | Intro, eyebrow, title, lead and actions carry `pp-site-reveal` with `--_i` 1 to 5 and arrive in order |
| Default | Lights drift, the accent line shines |
| Still | `data-site-still`: everything shown, nothing moves |

## Behaviour

- Layout follows the hero's own width: two columns for the intro from 1024px, stacked buttons below 520px, and the headline sized by `cqw`.
- "Ask Batsi" opens the sample conversation (a later chunk). In this chunk it is a button only.
- The arrival uses opacity and a short rise. The approved site also blurred the text while it arrived. That one effect is not restored: a blur animates on the main thread, and the site check allows only transform and opacity. It waits for Iggie's decision.

## Content

- Intro: starts with "Naleko People" and states what it runs, for whom, what Batsi does and that HR approves every action. Three short sentences at most.
- Chips: regulations only, in capitals, South Africa first: BCEA, UIF, SARS, POPIA.
- Title: the outcome, never the document check ("Every employee hired, onboarded and compliant."). The accent line is the second half.
- Lead: one sentence about the single record and what Batsi does between modules.
- Buttons: "Book a demo" and "Ask Batsi". No pricing anywhere.

## Accessibility

- The `h1` is split into two spans, not two headings. The accent line's glow copies are hidden from assistive technology.
- The section is labelled by the `h1` (`aria-labelledby`).
- The chips are a labelled list ("Built for"), not decoration.
- Lights are `aria-hidden`. Body text is subtle text on white (9:1) and never sits on a light's centre at full strength.
- Buttons are 58px tall (large), well above the 44px touch minimum. The cue and the grain are `aria-hidden`.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

Not in the signed-in app. Source: the approved public site, the top of the page.

## Do and don't

- Do lead with the outcome, in the product's voice.
- Do keep the two buttons: one dark, one line.
- Don't add a third button, a video or a screenshot to the hero.
- Don't use the shine anywhere else on the page except the closing band.
- Don't add another noise layer. The grain stops under reduced motion.
