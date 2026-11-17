---
name: Site Ask Batsi page
device: desktop
order: 40
preview: site-sections, site-header, site-demos, site-landing-sections, site-onboarding, site-security, site-leave, site-pages
source: landing-concepts/naleko-concept-d.html (the Ask Batsi section) and the Onboarding, Security and Leave pages in landing-concepts/site/out; the code in hr-portal (nalekoAiChat, talentFlowAiChat, the agent API)
---

# Site Ask Batsi page

The Ask Batsi Learn more page, the one the landing's "Learn more about Ask Batsi" link points to. It has the same frame as the other Learn more pages: header, page top with its card, sub-menu, demo sections, trust strip, "Works together with", questions, closing band and footer. It is shown at desktop width and at 390px. Ask Batsi is a top level menu entry, so the breadcrumb reads Home, Ask Batsi.

## Screens

- **Ask Batsi page**. Answers, Documents read, Approvals, Audit trail, Limits, Questions.

Uses Site header, Site menu, Site sheet, Site hero, Site form page, Site Ask Batsi (the landing band with its question tabs and chat), Site sub-menu, Site demo, Site read, Site log, Site approval queue, Site trust strip, Site related modules, Site module cards, Site questions, Site closing band and Site footer. Nothing new is added to the component set.

## Where the words come from

Approved wording is reused as it stands: the landing's Ask Batsi headline, lead, three questions, three facts and chat; the Onboarding "Documents read and matched" section; the Security "Approvals" and "Audit trail" sections; the Security trust strip, two "Works together with" lines and the "Can Batsi act without approval?" answer. Every other line on the page was proposed and approved on 17 Nov 2026. The lines are listed in `site-kit/ASK-BATSI-WORDING.md`, section A.

## What the page claims, and where it is true in the code

- Answers come from the organisation's records: employees, document checks, risk results and the audit log (`nalekoAiChat`), candidates, the hiring pipeline, reviewer votes and deadlines (`talentFlowAiChat`).
- Scheduling an interview, flagging a deadline risk, changing a setting and creating an employee return as drafts or pending approval. Nothing is written until a person approves it.
- Batsi declines work outside HR, and does not give salary benchmarks, employment law advice or individual performance ratings (the system prompts of both assistants).
- ID numbers, phone numbers and bank account numbers are removed from Batsi's answers (`pii-sanitiser.mjs`).
- Every question and answer is written to the audit table with who asked and when.

## Where the redraw changes the other pages

- **The demo scripts of other modules drive the cloned demos.** Documents read (Onboarding), Approvals and Audit trail (Security) and Limits (the Leave types panel) keep their original demo names, so each demo section carries its module's name on the section itself. The Angular site reuses the same four demo components.
- **Section ids carry the page and width** (`#approvals-askd`), as on the other pages.
- **Links to other pages point at `#`** on the kit page.
