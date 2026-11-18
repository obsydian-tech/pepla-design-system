---
name: Ask Batsi company switch
device: desktop and phone
order: 6
source: features/admin (settings)
---

# Ask Batsi: company switch (Admin)

One screen under Workspace in Admin where a company admin turns Ask Batsi on or off for the company. Off by default. The emergency off switch (`AI_CALLS_ENABLED`) stays separate and overrides it.

Every screen is shown on desktop and phone, in the Admin shell (Back to Today, Workspace, Ask Batsi selected).

- **Admin: Ask Batsi switch**. One card with the switch "Use Ask Batsi" (off), and a table with who can use it (HR staff) and how long past chats are kept (until the person deletes them).

Built from existing components only: page header, breadcrumbs, card, toggle, table. Wording for this screen is in `words.json` (P28 to P35); P28 and P33 reuse existing names, the rest is proposed until Iggie approves it.
