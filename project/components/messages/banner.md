---
name: Banner
group: messages
status: ready
classes: pp-banner
primeng: none (plain Angular template above the app shell)
replaces: ad hoc coloured strips on the trial and payroll pages
---

# Banner

A banner tells everyone using the app about a problem or change that affects the whole product. It sits full width at the very top, above the top navigation, and stays until the problem is fixed.

## Anatomy

1. **Container**: full width, at least 48px tall, a bold fill.
2. **Icon**: Lucide, 20px, before the text. `triangle-alert` for warning, `octagon-alert` for error, `info` for announcement.
3. **Text**: one sentence, `--font-body-strong`, centred on desktop, left aligned on phone.
4. **Link** (optional): inline, underlined, takes the text colour. It goes to the place where the problem is fixed.
5. **Dismiss** (announcement only): a 32px round icon button with a 44px hit area on touch.

## Appearances

| Class | Use | Never |
| --- | --- | --- |
| (default) warning | Something will break soon or works only in part: payroll sync stopped, trial ending | For a problem on one record (use Section message) |
| `pp-banner--error` | Something is broken for the whole company and blocks work: contracts can't be sent | For a form error |
| `pp-banner--announcement` | A product change everyone should know about | For marketing or upsell; for anything urgent |

There is no success or agent banner. Success is a Flag; work Batsi did is an Agent proposal or a Section message.

## States

| State | How |
| --- | --- |
| Shown | Pushes the page down; it never covers content |
| Dismissed | Announcement only. The dismiss button removes it and the choice is remembered per person |
| Resolved | Warning and error banners disappear on their own once the cause is fixed, and a success Flag says so |

## Behaviour

- One banner at a time. If two apply, show the error and queue the warning.
- Warning and error banners cannot be dismissed: they go when the problem goes.
- The banner sits above the top navigation and scrolls away with the page; it does not stick.
- On phone the text wraps and aligns left; the dismiss button stays top right.

## Content

- Say what is wrong and what to do, in one sentence: "The payroll connection stopped at 06:00. November payslips won't sync until you reconnect payroll."
- Name the time or date in words or a full date: "expired on 31 Oct 2026", "ends in 3 days".
- The link names the fix: "Reconnect payroll", "Upload the new one". Never "Learn more" on a warning.

## Accessibility

- Warning and error: `role="alert"` only when the banner appears after the page loads; on first render use `role="region"` with an `aria-label`, so screen readers don't interrupt.
- Announcement: `role="region"` and `aria-label="Announcement"`.
- Status is the icon and the words, never only the colour (rule 4). Text on each fill passes 4.5:1 in both themes (checked in CI through the on-bold pairs).
- The dismiss button has `aria-label="Dismiss announcement"`; after dismiss, focus moves to the top navigation's first control.

## PrimeNG mapping

No PrimeNG component. Render the banner in the app shell template, above `pp-top-navigation`:

```html
<div class="pp-banner pp-banner--error" role="region" aria-label="Problem with your account">
  <i-lucide name="octagon-alert" />
  <p class="pp-banner__text">You can't send contracts: the company registration expired on 31 Oct 2026. <a routerLink="/settings/company">Upload the new one</a></p>
</div>
```

Do not use `p-message` for this; it is styled as an in-page message.

## In Naleko People today

There is no shared banner. Each feature builds its own strip: `tf-connectivity-banner` in the TalentFlow shell, `guidance-banner` in the employee onboarding stepper, `hitl__banner` on the AI confirm step and `ai-error-banner` in the AI mode panel. One banner slot in the shared shell replaces the shell-level ones; the in-page ones become Section messages.

## Do and don't

- **Do** use a banner only for something that affects the whole company. **Don't** use one for a single person's missing document.
- **Do** link to the fix. **Don't** stack two banners.
- **Do** keep it to one sentence. **Don't** put buttons in it; a link is enough.
