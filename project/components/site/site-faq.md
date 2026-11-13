---
name: Site questions
group: site
status: ready
classes: pp-site-faq
primeng: none (public site only, no PrimeNG)
replaces: the public site's .lm-faq and .qa, which used drawn plus signs, colour transitions and unlabelled buttons
---

# Site questions

The last section before the closing band on a module page: a headline and a line on one side and the questions on the other. One answer is open at a time.

## Anatomy

1. **Section** (`pp-site-faq`): a container on the raised surface.
2. **Inner** (`pp-site-faq__inner`, with `pp-site-wrap`): one column on a phone; from 1024px the side takes 40% and the list 60%.
3. **Side** (`pp-site-faq__side`): the headline (`pp-site-faq__title`, an `h2`, `--font-site-faq`), one line (`pp-site-faq__lead`) and a standalone [Link](link.html) "Book a demo" with an arrow.
4. **List** (`pp-site-faq__list`) of **items** (`pp-site-faq__item`, `--open` when open), with a rule above and below each.
5. **Question** (`pp-site-faq__q`, a `button` with `aria-expanded` and `aria-controls`, inside `pp-site-faq__heading`, an `h3`): the question and the **mark** (`pp-site-faq__mark`, with two `pp-site-faq__bar`, one `--v`): a plus that turns into a minus.
6. **Answer** (`pp-site-faq__a`, `role="region"` named by its question) holding `pp-site-faq__a-in` and the text (`pp-site-faq__a-text`).

## States

| State | How |
| --- | --- |
| Closed | The answer's row is 0 high and its text is clear |
| Open | The item has `--open`: the mark turns half a turn, the plus becomes a minus and its ring takes a violet tint, the row grows to fit and the text fades in after a short delay |
| Focus | The Naleko focus ring on the question |
| Still | `data-site-still`: no transitions |

## Behaviour

- Opening one question closes the others. Clicking the open one closes it. The first question starts open.
- The answer opens by easing its height over 450ms and its text fades in over 350ms. The height is a `grid-template-rows` transition on `pp-site-faq__a`. It is the only layout transition the site check allows, because it runs once per click and never in a loop; the check permits it on this one selector and fails it anywhere else.
- Scripts only toggle `pp-site-faq__item--open` and `aria-expanded`.

## Content

- Headline: "Questions". The line and the six questions are copied from the approved page.
- Every answer is one to three short sentences. Answers about what Batsi does say a person decides.

## Accessibility

- Each question is a real button; Enter and Space toggle it, and `aria-expanded` follows the state.
- The answer is a region named by its question.
- The question row is at least 44px tall; the ring is 28px but the whole row is the target.

## PrimeNG mapping

None. The public site does not use PrimeNG. The signed-in app's [Accordion](accordion.html) is a different component: a card of detail panels inside a screen.

## In Naleko People today

Not in the signed-in app. Source: the approved public site's questions section (`lm-faq`).

## Do and don't

- Do keep the first question open so the section is never a column of closed rows.
- Do write questions the way a visitor would ask them.
- Don't put a form or a button inside an answer.
- Don't add a second layout transition anywhere else on the site.
