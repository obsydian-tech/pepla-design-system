---
name: Site button
group: site
status: ready
classes: pp-site-button
primeng: none (public site only, no PrimeNG)
replaces: the public site's .btn, .btn.dark, .btn.line and .btn .dot, which grew the dot by animating width, height, margin and right
---

# Site button

The button on the public site: dark with a small mint dot that grows into a circle holding an arrow when the pointer arrives, or a white line button. It is the hero's and the closing band's pair of buttons.

## Anatomy

1. **Button** (`pp-site-button`): a pill, 44px tall, or 58px with `pp-site-button--large`. A link or a `<button>`.
2. **Dark** (`pp-site-button--dark`): the main action: ink ground, white label, the dot at the right and an `arrow-right` icon as the last child, hidden until hover.
3. **Line** (`pp-site-button--line`): the second action: white ground, a border, no dot. May carry a `sparkles` icon before the label for Ask Batsi.

## States

| State | How |
| --- | --- |
| Default | Dark: a 9px mint dot with a glow. Line: bordered |
| Hover, focus | Dark: the dot grows into a 32px circle (44px large) and the arrow slides in. Line: the border turns to the text colour |
| Focus | A 2px focus ring |
| Still | `data-site-still`: no transitions |
| Forced colours | The dot is hidden and the arrow always shows |

## Behaviour

- The dot is a circle held at a quarter of its size and scaled up on hover (`transform`). The glow is a second small dot that fades (`opacity`). Nothing changes width, height, margin or position, so the hover stays smooth on a phone.
- On a phone there is no hover: the dot stays small. The button works the same.
- Below 520px wide the pair stacks and each button fills the width (set by the hero and the band).

## Content

- A verb phrase in sentence case: "Book a demo", "Get started", "Ask Batsi".
- One dark button per view region.

## Accessibility

- White on ink is 15:1. The arrow is decoration; the label names the action.
- 44px tall at minimum, 58px for the hero and band, above the 44px touch minimum.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

Not in the signed-in app, which uses [Button](../actions/button.html). Source: the approved public site, `.btn`.

## Do and don't

- Do use one dark and, at most, one line button together.
- Don't use it inside the signed-in app.
- Don't put a label longer than three words on it.
