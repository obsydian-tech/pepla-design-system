---
name: Admin settings
device: desktop and phone
order: 6
source: features/talent-flow/shell/admin-shell, features/talent-flow/pages/admin/overview, features/talent-flow/pages/admin/users, features/talent-flow/pages/admin/tenant-settings, features/talent-flow/pages/admin/notifications, features/talent-flow/pages/admin/talentflow-config/intelligence-rules, features/talent-flow/pages/admin/talentflow-config/scoring-weights, features/talent-flow/pages/admin/talentflow-config/sla-thresholds, features/talent-flow/pages/admin/talentflow-config/stage-config, features/talent-flow/pages/admin/audit, features/talent-flow/pages/admin/components/config-version-badge
---

# Admin settings

Every screen sits in the one Naleko People sidebar (see "One Naleko People" in the readme); only the selected module changes.

Thandeka Dlamini's admin area for Mokoena Logistics, redrawn in Naleko People: the overview, users and roles with the add user and edit roles drawers, tenant settings with the branding preview and an approval chain drawer, notifications, intelligence rules, scoring weights, SLA thresholds, stage setup, and the audit log with one event open in a drawer. The content, fields and steps are the ones in today's Angular templates. Only the look and the rule-driven details change. The Hire module's settings are now one group, Recruitment settings, with an Agent keys page. The three IT setup pages stay in the navigation but are not drawn. Every screen is drawn on a phone as well.

## Screens

Every screen below has a desktop frame and a phone frame (title plus "(phone)"). A drawer on a desktop is a full page on a phone.

- **Overview**, **Users and roles**, **Add user**, **Edit roles**, **Notifications**, **Audit and compliance**, **Audit event detail**. As before, in the new shell: the Modules button first in the top bar, and the sidebar groups Workspace, Hire (Roles), Recruitment settings and Requests. Old words replaced with the approved group I wording.
- **Tenant settings**. Branding, approval chains for IT setup only, locale. Seniority levels moved to their own screen and the workflow templates are gone.
- **Edit an approval chain**. The IT setup chain only. Offers have one approver (see Templates).
- **Stage setup** (page "Stages"). One switch, "Use the Screening stage", and each stage's time limit.
- **Seniority levels** (new). Level, label, description and experience guide, moved from Tenant settings.
- **Interviews per level** (new). Interviews and panel size per level.
- **Scoring weights** (page "What the panel scores"). The criteria that are scored and the 1 to 5 scale in words. Weights are gone.
- **Not hired** (new). The eight reasons, each on or off.
- **SLA thresholds** (page "Time limits"). Time limits per step and one reminder level, "Due soon".
- **Intelligence rules** (page "Flags"). The 13 flags with threshold, who is told and an on or off switch.
- **Mood scale** (new). Mood on or off and its three values.
- **Offer template** (page "Templates"). Offer approval (one approver) and the offer template.
- **Keeping data** (new). "Remove Not hired candidates after 6 months".
- **Agent keys** (new). Keys with their scopes (Read, Draft, Propose), Create key and Revoke.
- **Create key** (new). The drawer, a full page on a phone.

Every Recruitment settings screen carries the config version badge, and every table stacks into cards on a phone. Screen titles stay as they were so card checks still match; the page headings use the approved Recruitment settings words.

## Where the redraw changes today's app

- **Status is an icon and a word (rule 4).** Today's "ACTIVE" and "INACTIVE" badges, the coloured tier dots on seniority and approval chains, the coloured category chips and priority pills, and the green, amber and red outcome tags all carry meaning by colour. The redraw uses lozenges with an icon and a word ("Active", "Deactivated", "Critical", "Not allowed"), and tags with the level's name.
- **Deadlines and limits in words (rule 5).** The overview's "Breached" badge becomes "Overdue by 2 days". SLA hours also say "3 days", and the warning percentage says when it fires ("after 2 days and 6 hours").
- **Counts, not percentages.** "SLA compliance 85%" becomes "11 of 13 within the time limit". Weights stay in percent, because they are settings that add up to 100.
- **Dates (content rules).** "2026-01-12" from `slice: 0 : 10`, "dd MMM, HH:mm:ss" and "25/01/2025" become "12 Jan 2026" and "11 Nov 2026, 09:12". The currency preview reads "R 120 000", not "R 120,000.00".
- **Config versions everywhere they exist.** Today's small "v3 · date" badge becomes the config version badge: version, Live, who published it and when, and Compare with the last version.
- **Errors say how to fix.** "5% over" becomes "The weights add up to 105. Take 5 off one of them to save", and Save says why it is off. The add user email error explains which addresses can sign in.
- **No capitals for emphasis.** The rule drawer's "RULE NAME", "VISIBLE TO" and "COOLDOWN (HOURS)", and the audit "SUCCESS", "FAILURE" and "PARTIAL", become sentence case words. Title Case labels such as "Users & Roles" and "Save All Chains" become "Users and roles" and "Apply changes".
- **Mint only for the agent (rule 1).** Only Batsi's own actions in the audit log carry the agent avatar. Today's teal, cyan and green buttons and chips are violet primary or default buttons.
- **Naleko People, not Naleko or TalentFlow.** The placeholder "Naleko Technologies (Pty) Ltd" and the "TalentFlow Config" heading become Mokoena Logistics and "Hiring setup".
- **POPIA in the audit log (rule 6).** The IP address is masked in the event detail. The raw JSON payload becomes labelled rows.
- **Roles as role pills.** Role pills keep an icon and a word, and the role a person is using now is marked. The add user role cards become a checkbox list with descriptions.
- **Branding preview.** The accent colour field shows the contrast check and a light and dark preview, so a colour that fails is kept off buttons and links.
- **Recruitment settings.** The Hire settings are one group in the sidebar, each section its own page with its own version, instead of six unrelated items. Weights, the ten stages and phases, workflow templates and the SLA words are gone.
- **Roles in the sidebar** under Hire, as in the other kits.
