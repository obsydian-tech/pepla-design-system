---
name: Site hiring board
group: site
status: ready
classes: pp-site-board
primeng: none (public site only, no PrimeNG)
replaces: the public site's .rb, .rb-board, .rb-col and .cand, which changed border colours by transition and drew the board from a script
---

# Site hiring board

One hiring board for one role: six stage columns, a card for each candidate. Candidates move across the board, each move carries a reason, and the count at the top of each column follows. A line under the board says what was logged.

## Anatomy

1. **Board** (`pp-site-board`): the columns and the foot.
2. **Columns** (`pp-site-board__cols`): a white card that holds six columns side by side. It scrolls sideways under 1080px and fills the width above it. It is a named group and can take focus, so a keyboard can scroll it.
3. **Column** (`pp-site-board__col`): a heading (`pp-site-board__head`, a `h3`) with the stage name and the count (`pp-site-board__count`), then the cards.
4. **Card** (`pp-site-board__card`): name (`pp-site-board__name`), a line (`pp-site-board__note`) and a reason chip (`pp-site-board__why`) that shows only after a move. `--moved` for a candidate who moved, `--win` for the one who was hired.
5. **Foot** (`pp-site-board__foot`): the log line (`pp-site-board__log`, `--in` once shown) and "Play again" ([Site demo](site-demo.html)).

## States

| State | How |
| --- | --- |
| At rest | Eight candidates across the columns, no reasons |
| Moving | The card is placed in its new column and slides there from its old place (transform, 700ms) |
| Moved | `--moved`: a violet border fades in over the grey one and the reason chip pops in |
| Hired | `--win`: a mint border and a mint chip |
| Logged | The log line fades in and "Play again" appears |
| Still | Cards stay in their final columns, with their reasons; nothing slides |

## Behaviour

- Three moves play, 1.2s apart: Candidate 4 to Interview, Candidate 1 to Hired, Candidate 5 to Not hired.
- The preview script moves the card in the page and slides it from its old position with a transform. The Angular site does the same. A card is inserted at the top of its new column.
- The counts are text and change at once, as on the approved page.
- Border colours are layers that fade in (opacity), never a colour transition.

## Content

- Copied from the approved Recruitment page: the six stage names, the eight candidates and their lines, the three reasons and the log line.
- Sample people are "Candidate N" and Jane Smith. No real names.

## Accessibility

- The columns are a `role="group"` named "Sample hiring board for a Sales Consultant role, with six stages", with `tabindex="0"` so the sideways scroll works from the keyboard.
- Every stage is a heading and every card says its candidate, its line and its reason in words.
- The log line says what happened in words.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

The Recruitment board in the signed-in app (one board per role, six stages, every move recorded).

## Do and don't

- Do give every move a reason, and show "Not hired" with its reason.
- Do keep the columns scrolling sideways on a phone; a stage is never hidden.
- Don't animate a card's height or position with `top` or `left`. Slide it by transform.
