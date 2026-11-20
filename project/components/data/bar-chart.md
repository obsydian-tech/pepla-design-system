---
name: Bar chart
group: data
status: ready
classes: pp-bar-chart
primeng: none
replaces: nothing (new for Batsi's answers, CHAT-08)
---

# Bar chart

A few counts side by side, drawn as horizontal bars, so a person sees at a glance where most people are. Every bar carries its words and its number, so the chart reads without colour.

## Anatomy

1. **Title**: what is counted, as a figure caption: "People by step".
2. **Row**: the bar's words, the bar on a track, and the number.
3. **Screen-reader table**: the same words and numbers in a visually hidden table; the drawn bars are hidden from screen readers.

## Appearances

| Class | Use | Never |
| --- | --- | --- |
| `pp-bar-chart` | 2 to 9 counts that compare (steps, departments, risk checks) | For one number (use a stat card), or for amounts over time |

## States

| State | How |
| --- | --- |
| All zero or one bar | Not drawn: the answer says it in a sentence instead |
| Long words | Wrap in the words column; the bar keeps its width |

## Behaviour

- Bars are in the order the data gives (steps in step order, departments largest first, "Other" last).
- The longest bar fills the track; the others are in proportion. The component sets each bar's share as `--_share` (a percentage).
- Nothing moves: no transition, no animation, no hover effect.

## Content

- Title is a noun phrase in sentence case: "People by step", "People by department", "Risk checks".
- Numbers are whole numbers written as digits.

## Accessibility

- The drawn bars are `aria-hidden`; the hidden table (caption, one row per bar) is what a screen reader reads.
- Words and number are always text, never colour alone. One colour for every bar.
- On a phone the row fits the screen: the words column shrinks and wraps.

## PrimeNG mapping

None. Plain markup in an Angular component (`pp-bar-chart`), no chart library.

## In Naleko People today

New with CHAT-08: Batsi draws a chart when an answer counts people by step, by department or by risk check.

## Do and don't

- **Do** write the number next to each bar. **Don't** make people read a length.
- **Do** keep one colour. **Don't** colour bars by meaning without words.
- **Do** leave the chart out when every count is 0. **Don't** draw an empty chart.
