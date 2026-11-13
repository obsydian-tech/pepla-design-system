---
name: Site scorecard
group: site
status: ready
classes: pp-site-score
primeng: none (public site only, no PrimeNG)
replaces: the public site's .sc, .sc-r, .sc-note and .decide, which used literal sizes, colour transitions and inline svg ticks
---

# Site scorecard

An interview scorecard for one candidate: each panel member's score for each criterion, the average per criterion, and the overall score. A short note says the scores are advice, and Jane Smith makes the decision.

## Anatomy

1. **Scorecard** (`pp-site-score`).
2. **Table** (`pp-site-score__table`): rows (`pp-site-score__row`, with `--head` for the header and `--total` for the overall row) of cells (`pp-site-score__cell`).
3. **Score** (`pp-site-score__v`, `--in` once shown; `--avg` for an average): a small violet square with the number, or a mint pill for an average.
4. **Note** (`pp-site-score__note`, with `pp-site-step`): "Scores are advice. Jane Smith decides."
5. **Decision** (`pp-site-score__decide`, `--done` after the decision, with `pp-site-step`): [Buttons](button.html) "Move to Offer" and "Not hired", then "Moved to Offer by Jane Smith, reason recorded" (`pp-site-score__decided`).

## States

| State | How |
| --- | --- |
| Waiting | The page has set `data-site-live`: scores are hidden and small |
| Scoring | Scores arrive a column at a time, 1s apart: each fades in and scales up from 70% |
| Scored | The averages have arrived; the note steps in and the top status says "Scored by 3 of 3" |
| Deciding | The decision steps in; "Move to Offer" presses (`pp-button--pressed`) |
| Decided | `--done`: the buttons give way to the line "Moved to Offer by Jane Smith, reason recorded" |
| Still | Every score shows and the decision is made |

## Behaviour

- Panel 1, Panel 2, Panel 3 and the average arrive one after another; the overall score arrives with the average column.
- A visitor can press "Move to Offer" themselves; the demo then stops.
- Only opacity and transform move. The table is a grid; under 520px the criteria column and the numbers tighten.

## Content

- Copied from the approved page: the criteria (Sales experience, Communication, Product knowledge), the scores, the averages, the note and both button labels.
- The panel's top status steps through "Scoring", "Scored by 3 of 3" and "Moved to Offer".
- The sample candidate is "Candidate 2"; the decider is Jane Smith.

## Accessibility

- The table is a grid of text; every score is a number in the cell and the column headings say whose.
- "Not hired" is not reachable by keyboard in the sample (`tabindex="-1"`), as on the approved page.
- Status words carry the meaning, never colour alone.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

The interview scorecard in Recruitment: panel scores per criterion, averages, and the person's decision.

## Do and don't

- Do say that scores are advice, and name the person who decides.
- Don't reject a candidate from a score. Nothing on the site does.
