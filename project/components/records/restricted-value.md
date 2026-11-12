---
name: Restricted value
group: records
status: ready
classes: pp-restricted, pp-restricted--block
primeng: none (plain Angular template)
replaces: blank cells, "N/A" and dashes where a viewer has no permission, and whole-page "access" screens for a single field
---

# Restricted value

A restricted value stands in for data the viewer may not see: someone else's salary, a disciplinary record, health notes. It says so plainly with a lock and the word "Restricted", says why, and offers a way to ask for access. It never pretends the value is empty.

If the viewer may see the value but it is hidden for privacy, use Masked field instead.

## Anatomy

1. **Label** (`pp-restricted__label`): `lock` and "Restricted".
2. **Reason** (`pp-restricted__reason`): who can see it, in one short sentence.
3. **Request access** (optional): a link, or a Default small button in the block variant.
4. **Status** (after a request): `clock` and who was asked, when.

The block variant (`pp-restricted--block`) adds a large lock, a title and the actions, on a sunken surface with a dashed border.

## Appearances

| Class | Use | Never |
| --- | --- | --- |
| `pp-restricted` | One value in a record, description list or table cell | When the viewer may see it (use Masked field) |
| `pp-restricted--block` | A whole section or tab the viewer may not see: health, disciplinary, payroll | For a single field |

## States

| State | How |
| --- | --- |
| Restricted | Label, reason, and Request access when the viewer's role can ask |
| No way to ask | Label and reason only. The reason names who to talk to |
| Requested | The request link becomes a status line: "You asked Lerato Mokoena for access, 11 Nov 2026, 10:20" |
| Granted | The value appears as a Masked field. The grant is in the record's history |

## Behaviour

- The API never sends a restricted value to the browser. The component shows only what the API says: that the field exists, why it is restricted, and whether the viewer can ask.
- Request access sends a request to the person who can grant it (shown by name) and writes an audit entry. The viewer gets a notification when it is decided.
- Access granted this way can be time-limited. The status says until when.
- In tables, a restricted cell shows only the lock and "Restricted"; the reason goes in a tooltip and in the row's detail view.

## Content

- Label: "Restricted". Never "N/A", "—", "Hidden" or "Access denied".
- Reason says who can see it, not who cannot: "Only payroll admins see salaries."
- Name a real person to ask where you can: "Ask Thandeka Dlamini".
- Action: "Request access".

## Accessibility

- The lock icon is decoration; "Restricted" is the text.
- The request link is described by the reason (`aria-describedby`), so it reads "Request access, only payroll admins see salaries".
- The requested status is a polite live region.
- The block is a region labelled by its title.

## PrimeNG mapping

No PrimeNG component. A plain Angular template; the block's button is `p-button` (outlined, small) through the Button pass-through, and a table cell's reason uses the `pTooltip` directive.

```html
<span class="pp-restricted">
  <span class="pp-restricted__label"><svg lucideLock aria-hidden="true"></svg>Restricted</span>
  <span class="pp-restricted__reason" [id]="id">{{ field.restrictedReason }}</span>
  @if (field.canRequest) { <a class="pp-link" [routerLink]="requestLink" [attr.aria-describedby]="id">Request access</a> }
</span>
```

## In Naleko People today

There is no field-level restricted state in `hr-portal/src/app`. The closest thing is a whole page: `features/platform/unauthorised.component.ts` shows a `pi-lock` icon, "Access Not Configured", "Your account doesn't have access to any modules yet. Please contact your HR administrator to be assigned to a team." and a "Back to Platform Home" button. Access is otherwise handled by route guards (`app.routes.ts`, `features/talent-flow/talent-flow.routes.ts`), so a field a person may not see is simply not shown.

## Do and don't

- **Do** say the value exists and why it is restricted. **Don't** leave a blank or a dash that reads as "no salary".
- **Do** name who can see it and who to ask. **Don't** write "You don't have permission".
- **Do** keep restricted values off the client. **Don't** send the value and hide it with CSS.
