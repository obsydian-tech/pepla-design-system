# Pepla design system

Pepla is the HR platform for teams under 100 in South Africa, Zimbabwe and Zambia. Its AI agents do the paperwork; a person approves with one tap. This system is the only source of colour, type, spacing, shape, motion, icons, components and screen patterns for every Pepla surface: the HR web app, the new-hire and employee portal (phone first), the hiring-manager and IT views, and the marketing site.

**Read `tokens/` and this file before adding any colour, type, spacing, radius, shadow or motion.** Components use semantic tokens only (`--color-text-subtle`, `--elevation-surface-raised`, `--space-200`), never a palette step, never a hex.

## Sources

- Brand: the locked "Pepla: name, pitch and look" board (11 Nov 2026). Name, pitch, mark, palette and fonts are final.
- Structure: modelled on the structure and depth of large public design systems (Atlassian's in particular): layered tokens, foundations, component anatomy, content and accessibility rules. **No Atlassian code, styles, icons, assets or text are used**; their licence only covers products that integrate with Atlassian.
- Examples: the existing TalentFlow and Onboarding screens in `obsydian-tech/hr-portal`, redrawn in Pepla.

## The rules that govern everything

1. **Mint means the agent did it.** Mint is only for work Pepla's AI agents did or propose. Never success, never a link, never decoration.
2. **The agent proposes, a person approves.** Every agent action that changes a record shows what it will do, why now, what it read, and where the data goes. Approve, edit or decline; every decision is audited with who and when.
3. **Violet is for actions, coral is for warmth.** Coral is celebration and highlight, never an error or a warning. Danger is a crimson that differs from coral in lightness and hue (checked in CI).
4. **Status is an icon and a word.** Never colour alone: a lozenge, a deadline or a check result always carries both.
5. **Deadlines are said in words.** "Due in 2 days", "Overdue by 1 day", "Done 3 Nov". Never a bare date or a coloured dot.
6. **Personal data is hidden until needed (POPIA).** ID and passport numbers, bank details, tax numbers, health, salary and disciplinary records show masked. Revealing is a deliberate action, and it is logged.
7. **Nothing changes silently.** Edits keep who, when and why. Nothing is deleted without a trail; a correction sits beside the original.
8. **Every working button shows it is working.** The label fades while a spinner takes its place over 500ms. The button keeps its size and stays busy until the action lands.
9. **Phone first for employees.** New hires and staff can do everything on a phone. Anything tappable is at least 44px.
10. **One brand colour per customer, and buttons only get it if it passes.** A customer may set one brand colour, and it always shows on their logo area, header and sign-in page. It replaces violet on buttons and links only if it has 4.5:1 on white and is clearly different from mint and the error red. Pepla's mint and the status colours are never themeable.

## Content fundamentals

- **Voice:** a capable colleague. Warm, plain, brief. Say what happened and what to do next.
- **Person:** "you" for the reader; "Pepla" (not "the AI", not "the system") for the agent. "We" only for Pepla the company.
- **Case:** sentence case everywhere, including buttons and headings. The wordmark is always lowercase `pepla`; in sentences the name is "Pepla".
- **Buttons** are verbs that say the outcome: "Send contract", "Approve 3 documents". Never "OK", "Submit", "Click here".
- **Errors** say what went wrong and how to fix it, without blame: "That ID number has 12 digits. South African IDs have 13."
- **Words we use:** person, employee, new hire, candidate, manager, team. **Words we avoid:** resource, headcount (in UI), user (for employees), AI-powered, leverage, seamless.
- **Dates:** `3 Nov 2026`; with time `3 Nov 2026, 14:30` (24-hour). Relative for deadlines ("in 2 days"), absolute in records.
- **Money:** symbol before amount, thin no-break space, two decimals only when cents matter: `R 18 500`, `US$ 1 200`, `ZK 24 000`. One currency per record; never mix in a column.
- **Numbers:** tabular figures everywhere numbers line up (tables, metrics, money). Thousands with a space: `12 400`.
- **IDs:** shown masked by default: SA ID `•••••••••0876`, passport `••••6612`.

## Visual foundations

- **Ground** is cream (`--elevation-surface`), cards and panels are white (`--elevation-surface-raised`), overlays are white with the overlay shadow. Dark theme swaps to ink-night surfaces.
- **Type:** Manrope 700/800 for display, the four largest headings and metrics; Inter for everything else. Never Manrope below 16px.
- **Shape:** buttons, chips and lozenges are pills (`--radius-full`); tags are 8px rounded rectangles so they never read as a status; fields 12px; cards 16px; dialogs 24px.
- **Shadows** are ink-tinted, never black; most surfaces separate by colour and a 1px border, not shadow.
- **Focus:** a 2px violet ring with a 2px offset on every focusable element, keyboard focus only.
- **Motion** is quick and quiet: 100ms for colour, 200ms for small moves, 300ms for drawers. Respect reduced motion.

## Iconography

**Lucide only**, 1.75px stroke, sized with `--size-icon-*`. No emoji, no Unicode symbols as icons, no second set. One meaning has one icon everywhere:

| Meaning | Icon |
| --- | --- |
| Pepla (the agent) did or suggests this | `sparkles` |
| Approve / done | `check` / `circle-check` |
| Decline / remove | `x` / `circle-x` |
| Warning | `triangle-alert` |
| Error / blocked | `octagon-alert` |
| Information | `info` |
| Deadline, due | `clock` |
| Overdue | `clock-alert` |
| Document | `file-text` |
| Upload | `upload` |
| ID check / verification | `id-card` / `shield-check` |
| Personal data hidden / reveal | `eye-off` / `eye` |
| Locked (no permission) | `lock` |
| Audit trail | `history` |
| Person / people | `user` / `users` |
| Hire (candidates, pipeline) | `user-plus` |
| Onboard | `rocket` |
| Time off | `calendar-days` |
| Help desk | `life-buoy` |
| Move and exit | `door-open` |
| Comply | `scale` |
| Perform | `target` |
| Laptop and access (IT) | `laptop` |
| Payroll connection | `plug` |
| Settings | `settings` |
| Search | `search` |
| More actions | `ellipsis` |

## Index

| Folder | What |
| --- | --- |
| `tokens/` | CSS variables (generated) and `tokens.json`, light and dark |
| `assets/` | the mark, the app icon, light and dark |
| `components/` | components grouped as core, actions, forms, status, messages, overlays, navigation, data, agent, records |
| `guidelines/` | one page per foundation |
| `ui_kits/` | full example screens per product area |
| `SKILL.md` | how coding and design agents must use this system |
