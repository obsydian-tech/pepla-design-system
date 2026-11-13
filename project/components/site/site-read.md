---
name: Site document read
group: site
status: ready
classes: pp-site-read
primeng: none (public site only, no PrimeNG)
replaces: the public site's .idrow, .idcard, .flds, .cks and .sugg, which used a scan light that moved by `top`, colour transitions and inline svg ticks
---

# Site document read

Batsi reads an ID document in front of the visitor. A scan light passes over the document twice, the fields fill in, three checks tick, Batsi suggests a result with the reason, and Jane Smith accepts it. The decision is logged.

## Anatomy

1. **Row** (`pp-site-read__row`): the document and its fields, side by side. Below 440px wide they stack.
2. **Document** (`pp-site-read__doc`, `--go` while scanning): a drawn ID card with the **scan light** (`pp-site-read__scan`).
3. **Fields** (`pp-site-read__fields`): rows (`pp-site-read__field`) with a label (`pp-site-read__label`) and a value (`pp-site-read__value`, `--in` once filled).
4. **Checks** (`pp-site-read__checks`, `pp-site-read__check`): each with a mint tick circle (`pp-site-ok`).
5. **Suggestion** (`pp-site-read__suggest`): "Suggested by Batsi" with the sparkles icon (`pp-site-read__who`), the result and confidence as [status pills](site-demo.html), and the reason (`pp-site-read__why`).
6. **Decision** (`pp-site-read__decide`, `--done` after accepting): [Buttons](button.html) "Accept document" and "Ask for a new one", then "Accepted by Jane Smith, 09:42" (`pp-site-read__accepted`).
7. **Log line** (`pp-site-read__log`): "Logged: Batsi suggested, Jane Smith decided".

## States

| State | How |
| --- | --- |
| Scanning | `pp-site-read__doc--go`: the light travels down the document, twice (1.3s each) |
| Filling | Each value gets `pp-site-read__value--in` in turn: it fades and slides in from the right |
| Checking | Each check steps in, then its tick scales in |
| Suggested | The suggestion steps in and the top status becomes "Matches" |
| Deciding | The decision steps in; "Accept document" presses (`pp-button--pressed`) |
| Accepted | `--done`: the buttons give way to the accepted line; the log line steps in; status "Accepted" |
| Still | Everything shows and nothing moves |

## Behaviour

- The scan light is a band that moves by transform. It is not a loop: two passes, then it rests out of sight.
- Visitors can press "Accept document" themselves; the demo then stops.
- Only opacity and transform move.

## Content

- Copied from the approved page: the field names and values, the three checks, "Suggested by Batsi", "Matches", "Confidence: High", the reason, both button labels, "Accepted by Jane Smith, 09:42" and the log line.
- The ID number is always hidden: "Hidden · ends 0861". The sample person is John Doe; the decider is Jane Smith.

## Accessibility

- The drawn document is `aria-hidden`; the fields say everything it shows.
- Checks and the suggestion say their result in words.
- "Ask for a new one" is not reachable by keyboard in the sample (`tabindex="-1"`), as on the approved page.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

The HR document check in the signed-in kits (ID read, checks, Batsi's suggestion and HR's decision).

## Do and don't

- Do show Batsi's suggestion with its reason, and a person's decision after it.
- Do hide the ID number.
- Don't let Batsi accept on its own.
