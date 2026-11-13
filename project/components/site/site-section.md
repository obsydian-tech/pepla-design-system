---
name: Site section
group: site
status: ready
classes: pp-site-wrap, pp-site-eyebrow, pp-site-section, pp-site-stage
primeng: none (public site only, no PrimeNG)
replaces: the public site's .wrap, .sec-eb and per-section padding, background and headline CSS, which used literal colours, sizes and paddings
---

# Site section

The block every landing section is built from: a full-width ground, content at most 1200px wide, a small label, a headline and a line under it. Each module section, the platform section and the About section use it; what goes inside is that section's own demo.

## Anatomy

1. **Section** (`pp-site-section`): full width, 64px of padding above and below on a phone, 104px from 768px. It is its own container, so its layout follows its own width.
2. **Wrap** (`pp-site-wrap`): holds the content, at most `--layout-site-max` wide inside the site gutters (16px on a phone, 40px from 768px). The hero and the closing band use it too.
3. **Head** (`pp-site-section__head`): a grid for the label, headline and lead. One column, then two from 1024px with the lead sitting low beside the headline.
4. **Eyebrow** (`pp-site-eyebrow`): the small label above a headline, in capitals with a short rule before it. Names the section: "Recruitment", "Platform".
5. **Title** (`pp-site-section__title`): the headline, `--font-site-title`, 32px on a phone growing to 56px.
6. **Lead** (`pp-site-section__lead`): one or two sentences, 46 characters wide, subtle text.
7. **Stage** (`pp-site-stage`, `--desktop`, `--phone`): a box that stands in for the browser window on kit and spec pages, as tall as its content. The site does not use it.

## Grounds

| Class | Ground | Use |
| --- | --- | --- |
| (none) | White | The default. Most sections. |
| `pp-site-section--cream` | Cream | Every second section, so neighbours differ. |
| `pp-site-section--violet` | Violet wash | The Ask Batsi section and the Trust section's end. |
| `pp-site-section--mint` | Mint wash | A section about something Batsi did. |
| `pp-site-section--coral` | Coral wash | Overdue and urgent only. Not yet used on the site. |

`pp-site-section--clip` clips anything a section draws outside itself (a soft light, a ring) and lets a sticky demo card inside keep sticking.

## States

| State | How |
| --- | --- |
| Default | White ground |
| Arriving | Each part may carry `pp-site-reveal` with a `--_i` position; the parts fade up one after the other (see Site motion) |
| Still | `data-site-still` on a page or wrapper: everything shown, nothing moves |

## Behaviour

- The section is a container: the head turns to two columns when the section is 1024px wide, not when the window is. A 390px stage on a wide screen therefore lays out like a phone.
- `scroll-margin-top` equals the header height, so a link to `#recruitment` lands with the headline below the header, not under it.
- No motion of its own.

## Content

- Eyebrow: the section's name as a noun, in the words of the menu. Never a sentence.
- Title: factual, the product as the subject ("One app. Modules switched on per company."). No "you" or "your team", no question.
- Lead: at most two short sentences. No pricing, no client names, no statistics.
- Sample people are John Doe and Jane Smith only; candidates are "Candidate N".

## Accessibility

- One `h2` per section, and the section is named by it (`aria-labelledby`). The hero holds the page's only `h1`.
- Text is `--color-text` on white, cream and the washes (13:1 or better); the eyebrow is `--color-text-brand` (6:1 on white, 5:1 on the violet wash).
- The grounds are not meaning. Nothing relies on telling cream from white.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

Not in the signed-in app, which uses [Layout](../layout/layout.html). Source: the approved public site, Module row, Recruitment and Platform sections.

## Do and don't

- Do alternate white and cream for neighbouring sections.
- Do put the section's demo and its [Site capabilities](site-caps.html) inside the wrap, under the head.
- Don't set a width, padding or colour on a section with a style attribute. Use a ground class.
- Don't use a wash for decoration. A wash says what the section is about.
- Don't use dark grounds. The only dark surface on the site is the code editor.
