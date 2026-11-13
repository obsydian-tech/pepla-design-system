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

1. **Shine** (`pp-site-shine`): the accent words. It is a block (a whole line), or inline with `pp-site-shine--inline` (a few words inside a line). It needs `data-text` with the same words, because the glow is drawn by two pseudo-elements that copy them.
2. **Glow**: two copies of the words, each with a mint band at a different place (left, right). They fade in and out in turn, half a loop apart, so the band seems to travel. The copies have an empty accessible name (`content: ... / ""`), so a screen reader reads the words once.

## States

| State | How |
| --- | --- |
| Default | Violet words, glow passing every 5.2 seconds |
| Reduced motion | Same. The glow is a soft fade, not movement |
| Still | `data-site-still`: plain violet, no glow |
| Forced colours | The system link colour, no glow |

## Behaviour

- The old shine moved a gradient across the text by animating `background-position`, which repaints the text on every frame and stutters on a phone. This one animates `opacity` only, so it runs on the compositor.
- It seems to travel because the two bands overlap in time. It does not slide continuously; that is the one visible difference from the approved site.

## Content

- Only the accent words of a headline, at most six words. Never a whole headline, a number or a status.
- `data-text` repeats the words exactly. If they differ the glow shows a second set of words.

## Accessibility

- The words are violet on white or cream: 5.9:1 and 5.3:1, better than the 3:1 a headline needs. The mint glow is brief and decorative; the words never depend on it.
- No flashing: a fade in and out every 2.6 seconds, far below three flashes a second.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

Not in the signed-in app. Source: the approved public site's hero and closing band headline.

## Do and don't

- Do use it once in the hero and once in the closing band.
- Don't use it on body text, a button or a heading in the middle of the page.
- Don't set `data-text` to something other than the words inside.
- Don't combine it with the Naleko Digital Solutions gradient (see [Site gradient](site-gradient.html)). The shine is for the product; the gradient is for the company.
