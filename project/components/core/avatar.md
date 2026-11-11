---
name: Avatar
group: core
status: ready
classes: pp-avatar, pp-avatar-group, pp-person
primeng: reference only (built without PrimeNG) — Avatar, AvatarGroup (p-avatar, p-avatar-group)
replaces: p-avatar (6 uses), hand-made initials circles in the candidate identity card and topbar
---

# Avatar

A small picture of a person: their photo, or their initials on a colour. Paired with a name it becomes a Person, the most repeated pattern in Pepla.

## Anatomy

1. **Circle**: the person's photo, or two initials.
2. **Colour**: an accent chosen from the person's ID, so the same person always gets the same colour.
3. **Presence dot** (optional): online or away, only where people chat.
4. **Person** (`pp-person`): avatar + name + one line of meta (role, team or start date). When the name links to the record it is not underlined, so a list of people stays quiet; the underline shows on hover and focus.

## Appearances

| Class | Use | Never |
| --- | --- | --- |
| `pp-avatar` + accent (`--blue`, `--green`, `--amber`, `--magenta`, `--violet`, `--sky`, default gray) | Every person: employees, candidates, managers | A colour that means something; avatar colour is identity only |
| `pp-avatar--agent` | Pepla's agent, with the `sparkles` icon | For a person, ever (rule 1) |
| `pp-avatar--square` | A team, department or company (tenant logo) | For a person |
| `pp-avatar-group` | Interview panels, approvers, a team | More than 5 avatars; show "+3" after 4 |

## Sizes

| Class | Size | Use |
| --- | --- | --- |
| `pp-avatar--xsmall` | 20px | Inside lozenges and dense table cells |
| `pp-avatar--small` | 24px | Comments, activity rows |
| (default) | 32px | Tables, lists, the top bar |
| `pp-avatar--large` | 40px | Cards, the person column of the pipeline |
| `pp-avatar--xlarge` | 64px | Person header on employee and candidate pages |
| `pp-avatar--xxlarge` | 96px | Profile photo upload, new-hire welcome |

## States

| State | How |
| --- | --- |
| Photo | `<img>` fills the circle |
| No photo | Initials from first and last name; one initial if only one name |
| Image fails | Falls back to initials, never a broken image |
| Presence | `pp-avatar__presence` (online) or `--away` |

## Behaviour

- Colour is picked by hashing the person's ID into the six accents plus gray, so it is stable everywhere.
- A clickable avatar opens the person's page; give the link the person's name.
- In a group, the last item is a "+N" circle that opens the full list.

## Content

- Initials: first letter of first name and last name, uppercase: Thandeka Dlamini is "TD".
- Meta line: one fact, most useful first: "HR manager", "Starts 17 Nov", "Candidate · Stage 3 of 5".

## Accessibility

- An avatar next to a visible name is decorative: `aria-hidden="true"` or empty `alt`.
- An avatar alone needs the name as `alt` (photo) or `aria-label` with `role="img"` (initials).
- Initials and accent pairs pass 4.5:1 in both themes (CI checks the accent text on its subtler wash).

## PrimeNG mapping

> **Reference only.** In the Angular app this component is built in `src/app/ds` without PrimeNG. The mapping below describes the behaviour to match; it is not a dependency. Only the date picker, autocomplete, multi-select and long tables wrap PrimeNG (see `docs/verify-design-angular.md`).

```ts
avatar: { root: ({ props }) => ({ class: ['pp-avatar', { 'pp-avatar--large': props.size === 'large', 'pp-avatar--xlarge': props.size === 'xlarge', 'pp-avatar--square': props.shape === 'square' }] }) },
avatargroup: { root: { class: 'pp-avatar-group' } }
```

## In Pepla today

The candidate identity card, the hiring-manager task card panel list, the users admin table and the topbar menu. Each draws initials differently today.

## Do and don't

- **Do** derive the colour from the ID. **Don't** use colour to show status or seniority.
- **Do** use the agent avatar only for Pepla. **Don't** give the agent a human face or name.
- **Do** keep the name beside the avatar in lists. **Don't** rely on faces alone to identify people.
