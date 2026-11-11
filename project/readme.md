# Pepla design system

Pepla is the HR platform for teams under 100 in South Africa, Zimbabwe and Zambia. Its AI agents do the paperwork; a person approves with one tap. This system is the only source of colour, type, spacing, shape, motion, icons, components and screen patterns for every Pepla surface: the HR web app, the new-hire and employee portal (phone first), the hiring-manager and IT views, and the marketing site.

**Read `tokens/` and this file before adding any colour, type, spacing, radius, shadow or motion.** Components use semantic tokens only (`--color-text-subtle`, `--elevation-surface-raised`, `--space-200`), never a palette step, never a hex.

## Sources

- Brand: the locked "Pepla: name, pitch and look" board (11 Nov 2026). Name, pitch, mark, palette and fonts are final.
- Structure: modelled on the structure and depth of large public design systems (Atlassian's in particular): layered tokens, foundations, component anatomy, content and accessibility rules. **No Atlassian code, styles, icons, assets or text are used**; their licence only covers products that integrate with Atlassian.
- Examples: the existing TalentFlow and Onboarding screens in `obsydian-tech/hr-portal`, redrawn in Pepla.

## The only way to build UI

Every Pepla surface is built from this system and nothing else. There is no second style, no one-off and no "just this once". A screen that looks right but was built around the system is wrong, because the next screen will copy it.

1. **Compose components.** A screen is `pp-*` components and the Layout primitives (`pp-stack`, `pp-inline`, `pp-columns`, `pp-grid`, `pp-gap-*`). Screens style nothing else.
2. **A missing component is added here first.** If nothing fits, do not build it in the screen. Add the component, or a modifier to an existing one, with its spec (anatomy, states, behaviour, content, accessibility) and an example. Then use it.
3. **Layout only, with tokens.** Arranging, spacing and sizing come from Layout and component modifiers. No `style=""`: the only inline values are component inputs named `--_*` (a progress `--_pct`, a frame `--_height`).
4. **Every value comes from a token or the vocabulary.** Colour, type, space, radius, shadow, motion, layer and icon each have one source: `tokens/` and the icon vocabulary below. A value that is not there is added there first, with a name that says its use.
5. **A part stays in its component.** `pp-form__footer` lives in a `pp-form`, `pp-tabs__tab` in `pp-tabs`. Borrowing a part for another meaning is a one-off; use the component that means it, or add one.
6. **The spec and the code agree.** Every class a spec names exists, and every kit screen follows the spec. When they differ, fix one of them in the same change.

### Calm screens

Using only Pepla components is not enough: a screen made of correct parts can still shout. Pepla is calm. A person should see the one thing that needs them before anything else.

1. **One primary button per screen.** A dialog, drawer or the agent panel may have its own. The top navigation never holds one.
2. **A lozenge marks what needs someone.** One status per row, card or header. A row that is on track shows no lozenge. Stage, department, seniority, category and sentiment are plain text, not chips.
3. **Say it once.** A fact in the header is not repeated in a summary card below it, and a count in the header is not repeated in a bar under it.
4. **One stepper per screen.** Progress inside a step is a list or a progress bar, not a second stepper.
5. **One Pepla notice per screen.** If Pepla has several things to say, they go in one proposal list. The agent panel is its own surface.
6. **Headers stay short.** A title, one line of facts, at most one lozenge, and at most two buttons; the rest go in a "More actions" menu.
7. **Stats are a label and a number.** At most two stat cards in a row carry a meta line, and only when it asks for attention.
8. **One row of filters.** Search and the one filter people use most stay visible; the rest go behind a "Filters" button.
9. **No box in a box.** A card does not hold raised cards or stat cards. Inside a card, group with a sunken card, a list or a divider.
10. **No disabled buttons as decoration.** If someone cannot use an action, leave it out, or say why next to it.

`scripts/calm-audit.mjs` checks these on every kit screen as part of `verify:design`.

### Enforced in CI

`npm run verify:design` (`scripts/verify-design.mjs`) runs first in `npm run build`, and `npm test` runs it with the other checks, so a violation fails the build. There is no ignore comment and no allowlist in screens. Never weaken a check to get green.

| Check | Fails on |
| --- | --- |
| Colour | A hex, `rgb()`, `hsl()`, `oklch()` or named colour anywhere; a palette step (`--palette-*`) in a component or screen |
| Type | A font family, size, weight, line height or letter spacing that is not a token (`em` sizes inside a component are allowed) |
| Shape | A border radius that is not a `--radius-*` token (0 and 50% allowed) |
| Motion | A literal easing or duration; animations use `--motion-*` |
| Layers | A `z-index` that is not a `--layer-*` token |
| Markup | Any static `style=""` (only `--_*` inputs); a `<style>` or `<script>` block in a screen; a class that is not `pp-` or that no component defines; a `<button>`, `<input>`, `<select>`, `<textarea>` or `<table>` without its `pp-` class |
| Anatomy | A part (`pp-block__part`) outside its block (`pp-block`) |
| Icons | A glyph or emoji used as an icon; an arrow character used as an icon; a hand-written `<svg>` (the mark is `<i data-pepla-mark></i>`); a Lucide name not in the vocabulary |
| Specs | A spec that names a `pp-` class no CSS defines |
| Content (`scripts/content-audit.mjs`) | A lozenge without an icon and a word, or with an icon that does not fit its status; a deadline that is not a `<time>` said in words; an icon-only button without a name; "OK", "Submit" or capitals on a button; a form that mixes `*` and "(optional)"; a word we avoid; a date not in the house format; an unmasked 13-digit ID |
| Calm (`scripts/calm-audit.mjs`) | More than one primary button on a surface, or any in the top navigation; a role pill in the top navigation; more than one lozenge, tag or confidence chip in one row, card or header; a header with more than two buttons, or a summary card that repeats it; two steppers; two Pepla notices; more than two stat meta lines in a row; more than one visible row of filters; a card or stat card inside a card; a disabled button with no reason |
| Contrast | Any promised colour pair below WCAG 2.2 AA, light or dark; coral too close to danger |

The Angular app runs the same rules on its templates and stylesheets, plus a ban on PrimeNG outside the few components that wrap it: see [`docs/verify-design-angular.md`](../docs/verify-design-angular.md).

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

**Lucide only**, 1.75px stroke, sized with `--size-icon-*`. No emoji, no Unicode symbols as icons, no second set. **One meaning has one icon everywhere, and this table is the whole vocabulary**: CI fails a component example or UI kit that uses a Lucide icon not listed here. To add one, add its row here first.

**Pepla and the agent**

| Meaning | Icon |
| --- | --- |
| Pepla (the agent) did or suggests this | `sparkles` |
| The agent is working right now (animated only) | `loader` |
| Pepla could not tell | `circle-help` |
| The system did this (not a person, not the agent) | `server` |
| Where data is stored | `database` |

**Places and modules**

| Meaning | Icon |
| --- | --- |
| Today, where everything starts | `house` |
| People | `users` |
| Hire | `user-plus` |
| Candidates | `user-search` |
| Pipeline, board view | `columns-3` |
| Offers | `handshake` |
| Interviews and conversations | `messages-square` |
| Onboard | `rocket` |
| Time off | `calendar-days` |
| Help desk | `life-buoy` |
| Requests and queues | `inbox` |
| Move and exit | `door-open` |
| Comply | `scale` |
| Perform | `target` |
| Laptop and access (IT) | `laptop` |
| Payroll connection | `plug` |
| Settings | `settings` |
| Overview | `layout-dashboard` |
| Company or department | `building-2` |

**Roles (matches the role pill)**

| Meaning | Icon |
| --- | --- |
| HR admin, HR director | `user-cog` |
| Hiring manager | `user-plus` |
| TA specialist | `user-search` |
| IT admin | `laptop` |
| Workspace admin | `shield` |
| Employee | `user` |

**Status**

| Meaning | Icon |
| --- | --- |
| Approve / done | `check` / `circle-check` |
| Decline / remove | `x` / `circle-x` |
| Not started | `circle-dashed` |
| In progress | `circle-dot-dashed` |
| Waiting on someone else | `hourglass` |
| Paused | `circle-pause` |
| Warning | `triangle-alert` |
| Error / blocked | `octagon-alert` |
| Information | `info` |
| Deadline, due | `clock` |
| Overdue | `clock-alert` |
| Time limit (SLA) | `timer` |
| Deactivated | `circle-slash` |
| Deactivate / reactivate a user | `user-x` / `user-check` |
| Locked (no permission) | `lock` |

**Records and documents**

| Meaning | Icon |
| --- | --- |
| Document | `file-text` |
| Templates | `files` |
| Upload / download | `upload` / `download` |
| ID check / verification | `id-card` / `shield-check` |
| Personal data hidden / reveal | `eye-off` / `eye` |
| Audit trail, versions | `history` |
| Compare versions | `git-compare` |
| Bank details | `landmark` |
| Qualification | `graduation-cap` |
| Address, location | `map-pin` |
| Email / phone call | `mail` / `phone` |
| Note | `message-square` |
| Reference number | `hash` |
| Decision | `gavel` |
| Claim a task | `hand` |
| Hand over to a person | `forward` |
| Snooze | `alarm-clock` |
| Schedule / cancel a meeting | `calendar-plus` / `calendar-x` |
| Equipment bundle | `package` |
| Software / system access | `app-window` / `key-round` |
| Furniture | `armchair` |
| Phone (device) | `smartphone` |
| Journey | `map` |
| Fulfilment notes | `notebook-pen` |

**Scoring and rules**

| Meaning | Icon |
| --- | --- |
| Positive / negative | `thumbs-up` / `thumbs-down` |
| Neutral | `minus` |
| Excited | `laugh` |
| Sentiment scales | `smile` |
| Default | `star` |
| Technical skills | `code` |
| Problem solving | `lightbulb` |
| Culture and engagement | `heart` |
| Weights and thresholds | `sliders-horizontal` |
| Intelligence rules | `zap` |
| Routing rules | `git-fork` |
| Approval chains | `git-pull-request-arrow` |
| Workflow templates | `workflow` |
| Steps in order | `list-ordered` |
| Checklist or rules list | `list-checks` |
| List view | `list` |
| Seniority levels | `layers` |
| Locale and region | `globe` |
| People’s actions | `mouse-pointer-click` |

**Actions and navigation**

| Meaning | Icon |
| --- | --- |
| Add | `plus` |
| Edit | `pencil` |
| Delete | `trash-2` |
| Copy | `copy` |
| Undo / reset to defaults | `undo-2` / `rotate-ccw` |
| Refresh | `refresh-cw` |
| Send | `send` |
| Filter | `filter` |
| Opens somewhere else | `external-link` |
| Back / next | `arrow-left` / `arrow-right` |
| Move up / down | `arrow-up` / `arrow-down` |
| Move to another stage | `arrow-right-left` |
| Skip | `skip-forward` |
| Drag to reorder | `grip-vertical` |
| Open / expand | `chevron-right` / `chevron-down` |
| Previous page | `chevron-left` |
| Switch (company, select) | `chevrons-up-down` |
| Collapse the sidebar | `panel-left` |
| Menu (phone) | `menu` |
| Notifications | `bell` |
| Sign out | `log-out` |
| Take a photo | `camera` |
| Search | `search` |
| More actions | `ellipsis` |

## One Pepla: how the platform fits together

Pepla is one product with modules inside it, not a set of apps. Every module feels the same because it is built from the same shell, components and patterns.

- **One way in.** The marketing site, then one sign-in, then **Today**: what needs the person across every module (approvals, Pepla's proposals, people starting soon, overdue items).
- **One sidebar.** Today and People, then a section per module in a fixed order (Hire, Onboard, Time off, Requests, Help desk, Move and exit, Comply), then Settings at the bottom. A person sees only the modules their company has and their role allows. See Side navigation and App shell.
- **One set of patterns.** A list, a record page, a drawer to edit, an Agent proposal card, a Deadline chip and an Audit event row look and behave the same in every module.
- **Names.** "Pepla Hire" and "Pepla Onboard" are what a company buys. On screen the module is just "Hire" or "Onboard" under the Pepla mark.
- **The switcher** at the top of the sidebar changes company, for people who belong to more than one. With one company it is just the name.
- **Journeys and screens** (sign-up, company setup, sign-in, Today, each module's flows on web and phone) are designed on the product canvas from this system. The UI kits here are today's screens redrawn as reference; the journey designs are the target.

## Index

| Folder | What |
| --- | --- |
| `tokens/` | CSS variables (generated) and `tokens.json`, light and dark |
| `assets/` | the mark, the app icon, light and dark |
| `components/` | components grouped as core, layout, actions, forms, status, messages, overlays, navigation, data, agent, records |
| `ui_kits/` | full example screens per product area |
| `SKILL.md` | how coding and design agents must use this system |
