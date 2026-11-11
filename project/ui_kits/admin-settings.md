---
name: Admin settings
device: desktop
order: 6
source: features/talent-flow/shell/admin-shell, features/talent-flow/pages/admin/overview, features/talent-flow/pages/admin/users, features/talent-flow/pages/admin/tenant-settings, features/talent-flow/pages/admin/notifications, features/talent-flow/pages/admin/talentflow-config/intelligence-rules, features/talent-flow/pages/admin/talentflow-config/scoring-weights, features/talent-flow/pages/admin/talentflow-config/sla-thresholds, features/talent-flow/pages/admin/talentflow-config/stage-config, features/talent-flow/pages/admin/audit, features/talent-flow/pages/admin/components/config-version-badge
---

# Admin settings

Every screen sits in the one Pepla sidebar (see "One Pepla" in the readme); only the selected module changes.

Thandeka Dlamini's admin area for Mokoena Logistics, redrawn in Pepla: the overview, users and roles with the add user and edit roles drawers, tenant settings with the branding preview and an approval chain drawer, notifications, intelligence rules, scoring weights, SLA thresholds, stage setup, and the audit log with one event open in a drawer. The content, fields and steps are the ones in today's Angular templates. Only the look and the rule-driven details change. Panel rules, sentiment scales and the three IT setup pages stay in the navigation but are not drawn.

## Screens

- **Overview** (`overview/admin-overview-page.component.html`). The four counts and the overdue candidates. Uses app shell, side and top navigation, role pill, page header, stat card, card, table, person, deadline chip, lozenge.
- **Users and roles** (`users/admin-users-page.component.html`, `users/components/role-pill`). Search, the status filter, and every user with roles, status, the date added and actions. Uses page header, search, button (pressed buttons as filter chips), table, person, role pill, lozenge, button.
- **Add user** (`users/components/add-user-drawer`). Work email with an error, first and last name, and the roles, over the users list. Uses drawer, field, text field, field error, checkbox, button.
- **Edit roles** (`users/components/edit-roles-drawer`). The person's roles, and what happens to the role they use now. Uses drawer, checkbox, inline message, button.
- **Tenant settings** (`tenant-settings/admin-tenant-settings.component.html` and its five cards). Branding and identity with the logo and the accent colour preview, seniority levels, workflow templates, approval chains and locale. Uses card, icon tile, avatar, form layout, text field, select, tenant branding preview, table, tag, role pill, config version badge, inline message.
- **Edit an approval chain** (`tenant-settings/components/approval-chain-drawer`). The senior offer and IT setup chains, step by step. Uses drawer, select, checkbox, badge, button, inline message.
- **Notifications** (`notifications/admin-notifications-page.component.html`). Triggers by module with recipients and an on or off switch, escalation paths with the locked first step, and the message templates. Uses card, table, role pill, toggle, section message, lozenge, tag, button.
- **Intelligence rules** (`talentflow-config/intelligence-rules`). The version, the category filter, the signal thresholds open, and the six rules with when, what Pepla does, the cooldown and who sees it. Uses config version badge, button (pressed), badge, card, text field, description list, lozenge, role pill, toggle.
- **Scoring weights** (`talentflow-config/scoring-weights`). The four weights adding up to 105, with the error and Save turned off. Uses config version badge, card, icon tile, text field, progress bar, field error, form footer.
- **SLA thresholds** (`talentflow-config/sla-thresholds`). The five time limits in hours, said in days too, and the warning and urgent levels. Uses config version badge, card, form layout, text field.
- **Stage setup** (`talentflow-config/stage-config`). The ten stages by phase, one turned off, and what that does to candidates already there. Uses config version badge, card, form section, toggle, section message.
- **Audit and compliance** (`audit/admin-audit-page.component.html`). The four counts, the filters, the log with one event open, and pages. Uses stat card, card, select, date picker, search, audit event row, avatar, lozenge, pagination.
- **Audit event detail** (`audit/components/event-detail-drawer`). What changed before and after, who, the record and the technical detail. Uses drawer (large), tag, lozenge, table, description list, role pill.

## Where the redraw changes today's app

- **Status is an icon and a word (rule 4).** Today's "ACTIVE" and "INACTIVE" badges, the coloured tier dots on seniority and approval chains, the coloured category chips and priority pills, and the green, amber and red outcome tags all carry meaning by colour. The redraw uses lozenges with an icon and a word ("Active", "Deactivated", "Critical", "Not allowed"), and tags with the level's name.
- **Deadlines and limits in words (rule 5).** The overview's "Breached" badge becomes "Overdue by 2 days". SLA hours also say "3 days", and the warning percentage says when it fires ("after 2 days and 6 hours").
- **Counts, not percentages.** "SLA compliance 85%" becomes "11 of 13 within the time limit". Weights stay in percent, because they are settings that add up to 100.
- **Dates (content rules).** "2026-01-12" from `slice: 0 : 10`, "dd MMM, HH:mm:ss" and "25/01/2025" become "12 Jan 2026" and "11 Nov 2026, 09:12". The currency preview reads "R 120 000", not "R 120,000.00".
- **Config versions everywhere they exist.** Today's small "v3 · date" badge becomes the config version badge: version, Live, who published it and when, and Compare with the last version.
- **Errors say how to fix.** "5% over" becomes "The weights add up to 105. Take 5 off one of them to save", and Save says why it is off. The add user email error explains which addresses can sign in.
- **No capitals for emphasis.** The rule drawer's "RULE NAME", "VISIBLE TO" and "COOLDOWN (HOURS)", and the audit "SUCCESS", "FAILURE" and "PARTIAL", become sentence case words. Title Case labels such as "Users & Roles" and "Save All Chains" become "Users and roles" and "Apply changes".
- **Mint only for the agent (rule 1).** Only Pepla's own actions in the audit log carry the agent avatar. Today's teal, cyan and green buttons and chips are violet primary or default buttons.
- **Pepla, not Naleko or TalentFlow.** The placeholder "Naleko Technologies (Pty) Ltd" and the "TalentFlow Config" heading become Mokoena Logistics and "Hiring setup".
- **POPIA in the audit log (rule 6).** The IP address is masked in the event detail. The raw JSON payload becomes labelled rows.
- **Roles as role pills.** Role pills keep an icon and a word, and the role a person is using now is marked. The add user role cards become a checkbox list with descriptions.
- **Branding preview.** The accent colour field shows the contrast check and a light and dark preview, so a colour that fails is kept off buttons and links.
