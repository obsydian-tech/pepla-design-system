---
name: Logo
group: core
status: ready
classes: pp-logo, pp-app-icon
primeng: none
replaces: the old Naleko wordmark images in the sidebar, login and landing page
---

# Logo

Three people side by side, coral, violet and mint, and the lowercase wordmark `naleko people`. The logo is locked: never redraw, recolour or stretch it.

## Anatomy

1. **Mark**: three overlapping circles of equal size (radius 18 on a 76 by 64 grid). Coral left, violet raised in the middle, mint right.
2. **Wordmark**: `naleko people`, lowercase, Manrope 800, tracking -0.04em.
3. **Gap**: 0.32 of the type size between mark and word.

Never draw the mark by hand. In this repo a page writes `<i data-pepla-mark></i>` and the build puts in the one SVG (`MARK` in `scripts/lib.mjs`), with circles `pp-logo__coral`, `pp-logo__violet` and `pp-logo__mint`, so its colours come from `--color-brand-*` and the violet lifts in dark theme by itself. In the app it is `<pp-logo>`. `npm run verify:design` fails any hand-written `<svg>`.

## Appearances

| Class | Use | Never |
| --- | --- | --- |
| `pp-logo` | Sidebar top, sign-in, marketing header, emails | Inside body copy |
| `pp-logo--mark-only` | Collapsed sidebar, favicon, loading screen; the word stays for screen readers | As a bullet or decoration |
| `pp-app-icon` | Phone home screen, app switcher, notifications | With a different background colour |

## Sizes

| Class | Type size | Use |
| --- | --- | --- |
| `pp-logo--small` | 18px | Collapsed sidebar, footers |
| (default) | 24px | App sidebar and top bar |
| `pp-logo--large` | 40px | Sign-in page, marketing hero |

The mark is never smaller than 20px wide.

## States

| State | How |
| --- | --- |
| Light | Violet `#5b4bd6` on any light surface |
| Dark | Violet lifts to `#7d6ff0`; the word turns cream |
| Link | When the logo links home, hover does not change its colour; focus shows the standard ring |

## Behaviour

- In the app, the logo links to the person's home (HR home, or My onboarding for a new employee).
- Clear space around the lockup is one circle radius on every side.
- A customer's own logo (tenant theming) sits beside Naleko People's in the sidebar header, never replaces it in the product chrome.

## Content

- In text the product is "Naleko People"; only the wordmark is lowercase.
- Never write "Naleko People AI", "NALEKO PEOPLE" or "naleko.com" as a logo.

## Accessibility

- A linked logo needs an accessible name: `aria-label="Naleko People home"` on the link.
- Mark-only keeps the word in the DOM, visually hidden, so it is still read.
- The mark's circles are decorative; the SVG carries `aria-hidden="true"`.

## PrimeNG mapping

None. Use the markup from the examples in an Angular component (`<pp-logo size="large">`).

## In Naleko People today

The current sidebar, login and landing page show the Naleko name and a navy logo. All of them change to this lockup.

## Do and don't

- **Do** use the SVG with the three classes so it follows the theme. **Don't** paste hex colours into the SVG.
- **Do** keep the word lowercase. **Don't** put the logo on coral or mint backgrounds.
- **Do** keep at least one circle radius of space around it. **Don't** add a tagline inside the lockup.
