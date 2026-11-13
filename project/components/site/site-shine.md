---
name: Site shine
group: site
status: ready
classes: pp-site-shine
primeng: none (public site only, no PrimeNG)
replaces: the public site's .shine, which moved a gradient with background-position on every frame
---

# Site shine

A light that passes over the accent line of a headline: "hired, onboarded and compliant." in the hero, "People." in the closing band. The words stay violet; a mint glow travels across them.

## Anatomy

1. **Shine** (`pp-site-shine`): the accent words. It is a block (a whole line), or inline with `pp-site-shine--inline` (a few words inside a line).
2. **Glow** (`pp-site-shine__glow`): a window 40% as wide as the words, with soft edges, hidden from assistive technology. It slides from left to right across the words.
3. **Copy** (`pp-site-shine__copy`): inside the window, a mint copy of the same words, as wide as the whole shine. It slides the opposite way at the same speed, so it stays still while the window passes over it. Only the part inside the window shows, so a mint band seems to travel across the violet words.

## States

| State | How |
| --- | --- |
| Default | Violet words, a glow passing left to right every 5.2 seconds (it travels for 70% of that and rests) |
| Reduced motion | Same. A soft light is ambient, so it keeps playing |
| Still | `data-site-still`: plain violet, no glow |
| Forced colours | The system link colour, no glow |

## Behaviour

- The old shine slid a gradient across the text by animating `background-position`, which repaints the text on every frame and stutters on a phone. This one animates two `transform`s only, so it runs on the compositor and looks the same as the approved site.
- The copy must hold exactly the same words as the shine, or the glow shows other words.

## Content

- Only the accent words of a headline, at most six words. Never a whole headline, a number or a status.
- The copy repeats the words exactly.

## Accessibility

- The words are violet on white or cream: 5.9:1 and 5.3:1, better than the 3:1 a headline needs. The mint glow is brief and decorative; the words never depend on it, and the glow is `aria-hidden` so the words are read once.
- No flashing: one soft pass every 5.2 seconds.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

Not in the signed-in app. Source: the approved public site's hero and closing band headline.

## Do and don't

- Do use it once in the hero and once in the closing band.
- Don't use it on body text, a button or a heading in the middle of the page.
- Don't put other words in the copy than the shine holds.
- Don't combine it with the Naleko Digital Solutions gradient (see [Site gradient](site-gradient.html)). The shine is for the product; the gradient is for the company.
