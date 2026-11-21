---
name: Modules
device: desktop and phone
order: 20
source: ds/navigation/shell, core/launcher
---

# Modules

The module launcher. The Modules button at the left end of the top navigation opens one list of every module, in a fixed order, with where each one stands for the signed-in person. On desktop it is a popup under the button; on a phone it is a full-height drawer opened by the icon alone. The sidebar stays the everyday way in. Ask Batsi is its own row on top.

Built only from existing parts (popup, drawer, card, icon tile, lozenge, top navigation). No new component and no kit styles.

## Screens

- **Modules** and **Modules (phone).** A person who can open Employee Records, Hire and Onboard. Leave, Comply, Help desk and Perform show "Coming soon".
- **Modules, other states** and **Modules, other states (phone).** The same list for a person with less: Hire is "Not switched on" (the company does not have it), Onboard is "No access" with "Ask an Admin." and a lock icon (the company has it, the person's role does not).

## The four states

- **Open.** An interactive card that goes to the module's first page.
- **No access.** Not interactive. Lock icon, "No access" lozenge and "Ask an Admin."
- **Not switched on.** Subtle card with a "Not switched on" lozenge. An Admin also sees a link to the public module page.
- **Coming soon.** Subtle card with a "Coming soon" lozenge. Nothing to tap.

## Words

"Modules", "No access", "Not switched on", "Ask an Admin." and "Coming soon" are the approved launcher wording. Module names are Hire, Onboard, Leave, Comply, Help desk and Perform (the sidebar group names); one-line descriptions are the approved site lines, except that "masked" reads "hidden" (Iggie's rule: Hidden, never Masked). The employee's own-pages tile ("My details") is a build detail and is not drawn here.
