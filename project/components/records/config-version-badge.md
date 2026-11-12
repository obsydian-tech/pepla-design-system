---
name: Config version badge
group: records
status: ready
classes: pp-config-version, pp-config-version__version, __meta, __actions, pp-config-version--boxed, pp-config-version--draft
primeng: none (plain Angular template)
replaces: tf-config-version-badge
---

# Config version badge

Shows which version of a setting is in use (scoring weights, SLA rules, approval chains), whether it is live or a draft, who published it and when, and lets an HR admin compare or roll back.

## Anatomy

1. **Version** (`__version`): `history` icon and "Version 4".
2. **State lozenge**: "Live" or "Draft". A draft Batsi proposed uses the agent lozenge "Drafted by Batsi".
3. **Meta** (`__meta`): who and when: "Published by Thandeka Dlamini, 3 Nov 2026, 14:30".
4. **Actions** (`__actions`, optional): "Compare with version 3", "Roll back"; on a draft, "Compare with live" and "Publish" or "Review changes".

## States

| State | Lozenge | Meta | Actions |
| --- | --- | --- | --- |
| Live | success, `circle-check`, "Live" | "Published by {name}, {date, time}" | Compare with previous, Roll back |
| Draft | neutral, `pencil`, "Draft"; dashed box | "Edited by {name}, {date, time} · Not live yet" | Compare with live, Publish |
| Drafted by Batsi | agent, `sparkles` (rule 1) | what Naleko People based it on, when | Compare with live, Review changes |
| Rolled back | success "Live" | "Rolled back from version 3 by {name}, {date}" | Compare |
| First version | success "Live" | "Published by {name}" | none |

`--boxed` puts it in a bordered box at the top of a settings page; without it, it sits inline in a header.

## Behaviour

- Publishing makes a new version; nothing is overwritten (rule 7).
- "Roll back" opens a confirmation that names the version and says what changes, then publishes the older version as a new version.
- "Compare" opens a side-by-side of the two versions with changed values marked with words, not colour alone.
- A Batsi draft is never published by Batsi. A person reviews and publishes it (rule 2).

## Content

- "Version 4", never "v4" or a hash.
- Names, not email addresses: "Thandeka Dlamini".
- Dates with time: "3 Nov 2026, 14:30".

## Accessibility

- Action buttons name the version they act on: "Compare with version 3".
- The draft's dashed box is extra; the "Draft" lozenge carries the meaning.

## PrimeNG mapping

No PrimeNG component. The roll-back confirmation uses `p-confirmDialog` with the Modal dialog pass-through (to be checked). Buttons are `p-button` with the Button pass-through.

## In Naleko People today

- `config-version-badge.component.ts` (`tf-config-version-badge`) takes `version`, `changedBy` and `changedAt` and shows a `pi-history` icon, the version, the changer and the date (`d MMM yyyy, HH:mm`), separated by dots.
- It is used in 12 admin templates, including scoring weights, SLA thresholds, panel rules, stage config, intelligence rules, sentiment scales and the routing rules page.
- The usage example in the component passes an email address as `changedBy`.
- There is no draft state, compare or roll-back action in these templates.

## Do and don't

- **Do** show who published and when. **Don't** show an email address or user ID.
- **Do** roll back by publishing a new version. **Don't** delete the newer one.
- **Do** mark Batsi's drafts with the agent lozenge. **Don't** let a draft look live.
