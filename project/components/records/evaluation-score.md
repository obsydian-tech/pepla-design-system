---
name: Evaluation score
group: records
status: ready
classes: pp-scorecard, pp-scorecard__overall, __total, __value, __out-of, __word, __criteria, __criterion, __label, __name, __weight, __bar, __fill, __score, __note, __footer, __when
primeng: none (plain Angular template)
replaces: tf-evaluation-scoring-panel and tf-evaluation-summary (read-only parts)
---

# Evaluation score

A summary of an interview interview feedback: each criterion's score in words, as a number and as a bar, the overall score, the recommendation and who scored. A panel version shows averages across interviewers.

## Anatomy

1. **Card header**: the interview and the candidate, with the recommendation lozenge in `pp-card__aside`.
2. **Overall** (`__overall`): the weighted score ("7.4 out of 10") and a word ("Strong overall").
3. **Criteria** (`__criteria`): one row each: name and weight ("Counts for 30%"), a bar, and "8 of 10, strong".
4. **Note** (`__note`, optional): the interviewer's words.
5. **Footer**: who scored and when. On the panel version: the avatar group and a reminder for missing interview feedback.

## States

| Recommendation | Lozenge |
| --- | --- |
| Strong yes | bold success, `thumbs-up`, "Strong yes" |
| Yes | bold success, `thumbs-up`, "Yes, hire" |
| No | bold danger, `thumbs-down`, "No" |
| Strong no | bold danger, `thumbs-down`, "Strong no" |
| Not scored yet | neutral, `circle-dashed`, "Not scored"; with a deadline chip when due |

Score words, used everywhere a score appears:

| Score | Word |
| --- | --- |
| 9 to 10 | excellent |
| 7 to 8.9 | strong |
| 5 to 6.9 | fair |
| 3 to 4.9 | weak |
| 0 to 2.9 | poor |

## Behaviour

- Scores run from 0 to 10, the scale the app uses today. The overall score is weighted by the tenant's scoring weights and shown to one decimal.
- Bars are neutral, not green or red: a score is a judgement, not a status. Only the recommendation uses status colours, with an icon and a word.
- Hide other panel members' scores from an interviewer until they have submitted their own (to be checked with the hiring team's rules).
- The panel version averages submitted interview feedback only and says how many: "average of 3".

## Content

- Criterion names in sentence case: "Technical ability", "Culture fit".
- Weights as "Counts for 30%".
- Score lines read "8 of 10, strong"; overall reads "7.4 out of 10".

## Accessibility

- Bars are `aria-hidden`; the words beside them carry the score.
- The criteria list has an `aria-label` ("Scores by criterion").
- The avatar group has one label naming who scored and who has not.

## PrimeNG mapping

No PrimeNG component for the summary. Scoring input (not this component) uses `p-inputNumber` or a Slider with their pass-through (to be checked). Buttons are `p-button` with the Button pass-through.

## In Naleko People today

- `evaluation-scoring-panel.component.html` ("Evaluation Interview feedback") scores four criteria from 0 to 10 with minus and plus buttons and a number input (`min="0"`, `max="10"`), shows a "Weighted Score" out of 10, and colours each bar by score (7 and up, 5 to 7, under 5).
- The criteria are Technical Ability, Communication, Cultural Fit and Problem Solving; `DEFAULT_SCORING_WEIGHTS` in `talent-flow.models.ts` is 30, 25, 25 and 20.
- The decision buttons are "Strong No", "No", "Yes" and "Strong Yes".
- `evaluation-summary-widget.component.html` shows vote counts, the average of each criterion as "/10", a weighted average and each vote with the panel member's ID and time.
- Neither `tf-evaluation-scoring-panel` nor `tf-evaluation-summary` is used in any template today.

## Do and don't

- **Do** say "8 of 10, strong". **Don't** show a bare number or a coloured bar alone.
- **Do** keep bars neutral. **Don't** colour a 5 red; it is fair, not an error.
- **Do** show names of interviewers. **Don't** show internal IDs.
