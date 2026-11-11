---
name: Role pill
group: records
status: ready
classes: pp-role, pp-role__text, pp-role--current, pp-role-group
primeng: none (plain Angular template)
replaces: tf-role-pill
---

# Role pill

A small label for a person's role or permission in Pepla: HR admin, Hiring manager, IT, Employee. It says what someone can do. It is not a status, so it never uses status colours.

## Anatomy

1. **Container**: an 8px rounded rectangle with a 1px border on the raised surface. The rectangle tells it apart from status lozenges, which are pills.
2. **Icon**: one per role.
3. **Text** (`__text`): the role name.

| Role | Icon | What it allows |
| --- | --- | --- |
| Workspace admin | `shield` | Workspace settings, users and roles |
| HR admin, HR director | `user-cog` | Everything, including settings, salaries and the audit log |
| Hiring manager | `user-plus` | Their roles' candidates, scorecards, offers and new starters |
| TA specialist | `user-search` | Candidates, pipelines and interviews across roles |
| IT admin | `laptop` | IT setup bundles and their items |
| Employee | `user` | Their own record, documents and requests |

## States

| State | How |
| --- | --- |
| Default | Neutral border, subtle text |
| Current (`--current`) | The role the person is acting as now: selected border and wash, plus hidden text "(acting as)" |
| Group | `pp-role-group`: a `<ul>` of roles, wraps |

There are no hover or pressed states. To change roles, use a button or a menu beside the pills.

## Behaviour

- A person can hold several roles; show them all in a group, the current one first.
- Roles change only in Settings, by an HR admin. The change is audited (rule 7).
- Tenants cannot recolour roles (rule 10).

## Content

- Sentence case, short: "HR admin", "Hiring manager", "IT", "Employee".
- Never internal codes such as "ADMIN", "HM", "TA" or Cognito group names.

## Accessibility

- A group is a `<ul>` with an `aria-label` naming the person: "Thandeka Dlamini's roles".
- The icon is decorative. The current role has hidden text, so it is not shown by colour alone.

## PrimeNG mapping

No PrimeNG component. Do not use `p-tag` or `p-chip` with a severity for roles: severity means status. Plain Angular `@for` over the roles.

## In Pepla today

- `role-pill.component.ts` (`tf-role-pill`) is used in `admin-users-page.component.html`. It takes all of a user's roles and the active role, gives each pill a class per role (`tf-role-pill--{role}`) and a ring on the active one.
- The roles are `ADMIN`, `HM`, `IT` and `TA`, labelled "Admin", "Hiring Manager", "IT Admin" and "TA Specialist" in `ROLE_LABELS` (`admin.models.ts`).
- Approval chain roles use separate labels and `p-tag` severities in `APPROVAL_ROLE_COLOURS` (TA secondary, HM info, HR director primary, Finance warn).
- The admin audit table shows the role in a `p-tag` with `severity="secondary"`.

## Do and don't

- **Do** use the rectangle shape and neutral colours. **Don't** colour roles green, amber or red.
- **Do** show every role a person holds. **Don't** hide all but one.
- **Do** say "Hiring manager". **Don't** say "HM".
