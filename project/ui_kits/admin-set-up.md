---
name: Admin company set-up
device: desktop
order: 7
source: lambda/adminCreateUser, lambda/adminUpdateUser, lambda/adminDeactivateUser, lambda/adminGetUsers, features/talent-flow/pages/admin/users, features/talent-flow/pages/admin/tenant-settings, features/talent-flow/pages/admin/audit
---

# Admin company set-up

John Doe registered Mokoena Logistics, so he is its Admin; he may not be HR. After Naleko switches the company on, he sets up the company, its brand, and its people, each screen at desktop and phone size. Naleko switches modules on; the Admin only sees them. The screens reshape Admin settings for the self-service Admin and use the same Admin sidebar, with Set-up first. The first sign-in screens (the email, the password, two-step sign-in) are in the Sign-in and invite kit.

## Screens

- **Set-up list**. Six steps to a working company with the number done, and the modules Naleko has switched on, read-only. Uses page header, checklist, progress bar, button, lozenge, card, icon tile, table.
- **Company and branding**. Name, logo and accent colour with the light and dark preview, a locked "Powered by Naleko People" note, and locale. Uses card, icon tile, avatar, text field, select, tenant branding preview, section message, config version badge, inline message.
- **Company colour kept for the header**. A colour that is too light for buttons: it stays on the header and sign-in page, buttons stay violet, and a darker colour is suggested. Uses tenant branding preview, button.
- **Invite a person**. Email, name, one or more of the five roles, and extra access (Recruitment, Approve offers, Laptop and access, which is off when Naleko has not switched it on). Uses drawer, field, text field, checkbox, button.
- **Users and roles, invite sent**. The list with an Invited status and its expiry date, with Resend invite. Uses table, person, role pill, lozenge, button, section message.
- **Users and roles, link expired**. A Link expired status with Resend invite as the default button. Uses table, person, role pill, lozenge, button.
- **Edit roles, two Admins**. Removing Admin is refused because a company needs at least two Admins; Save is off and says why. Uses drawer, checkbox, inline message, button.
- **Audit log**. Every change to users, roles, sign-in and company settings, filtered to Admin events. Uses stat card, card, select, date picker, search, audit event row, avatar, lozenge.
- **Audit event detail**. Before and after for one change, who made it, the record and the technical detail with the IP address masked. Uses drawer, table, description list, role pill.

## Where this changes today's app

- **Five roles and extra access.** Admin, HR, Manager, Employee and Guest, with Recruitment, Approve offers and Laptop and access as ticks on a role. Today's Users and roles screens in Admin settings still show the old Admin, Hiring manager, IT admin and TA specialist roles; this kit replaces them when the Angular screens are built.
- **Invite link, no password by email.** Today an added user is created with no email and no password, so they cannot sign in. Every invite is a one-time link that expires after 7 days; the Admin can resend or cancel it.
- **At least two Admins.** The last two Admins cannot be removed or deactivated.
- **Any email address.** The invite field is "Email", not "Work email", and accepts Gmail and other personal addresses.
- **Modules are Naleko's switch.** The Admin sees which modules are on and cannot change them.
- **Every change audited.** Invites, role changes, branding and sign-in set-up are written to an audit log that cannot be changed.
- **Branding keeps Naleko People's frame.** "Powered by Naleko People", the mint colour and the status colours stay; a colour that fails contrast stays off buttons and links.
