---
name: Tenant branding preview
group: records
status: ready
classes: pp-brand-preview
primeng: none (plain Angular template with Text field and Button)
replaces: nothing today: tenant branding has a logo and names but no colour
---

# Tenant branding preview

An admin picks one accent colour for their company. The preview shows a header, a link and a button in that colour in light and dark theme, live as they type. A colour that fails WCAG AA on white is refused in place, with its contrast in numbers and the nearest colour that passes (rule 10).

## Anatomy

1. **Swatch**: 40px square of the colour being checked.
2. **Hex field**: a Text field with a `#` prefix, 6 characters.
3. **Result** (`pp-brand-preview__result`): passes, with the ratio; or refused, with the ratio, what is needed and why.
4. **Suggestion** (refused only): a small swatch, the nearest passing hex, its ratio, and "Use [hex]".
5. **Preview panes**: light and dark, each with a header strip, a line of text, a link and a button in the accent.
6. **Note**: the dark partner colour and its ratio, and that mint and status colours do not change.
7. **Actions**: "Save accent colour" (primary) and "Use Pepla's violet" (subtle, resets).

## Appearances

| Use | How |
| --- | --- |
| Admin, tenant settings, Branding | The full component, beside the logo upload |
| Onboarding a new company | The same, with "Skip for now" in place of "Use Pepla's violet" |

## States

| State | How |
| --- | --- |
| Not set | Swatch and preview in Pepla's violet; the field is empty with "Pepla's violet" as help text |
| Typing | The check runs once 6 valid hex characters are in; before that the result line says "Enter 6 characters, like 00668D" |
| Passes | Result with `circle-check`; the preview updates; Save is ready |
| Refused | Field `aria-invalid`; danger result with `octagon-alert`; the suggestion; the preview keeps the last colour that passed |
| Saving | Save is busy until stored (rule 8), then a Flag "Accent colour saved" |
| Saved | Help text under the field: "Set by Lerato Mokoena, 11 Nov 2026". The change is in the audit trail (rule 7) |

## Behaviour

**How the app computes contrast.** The same function runs in the browser, for the live check, and on the server, which refuses to save a failing colour whatever the browser says.

1. Parse the hex into sRGB channels from 0 to 1.
2. Linearise each channel: `c ≤ 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ^ 2.4`.
3. Relative luminance `L = 0.2126 R + 0.7152 G + 0.0722 B`.
4. Ratio `(L_lighter + 0.05) / (L_darker + 0.05)`, against white (`L = 1`).
5. Pass at 4.5 or more. Show the ratio rounded **down** to one decimal ("6.3 to 1"), so 4.49 never shows as 4.5.

This is WCAG 2.x contrast, the same maths as `scripts/contrast.test.mjs` in this repo (culori's `wcagContrast`).

**Nearest passing suggestion.** Convert the colour to OKLCH, keep its hue, and lower its lightness in steps of 0.01 (reducing chroma only if the colour leaves sRGB) until the ratio on white reaches 4.5. Offer the first colour that passes. It keeps the hue the admin chose, so the suggestion still looks like their brand.

**Dark partner.** In dark theme the accent sits on `--elevation-surface-raised`. Pepla raises the colour's OKLCH lightness, keeping hue, until it reaches 4.5:1 against that surface, and uses it there. Button text is `--color-text-inverse` in both themes, and its contrast on the accent is checked too.

**Other refusals.** A colour too close to Pepla's mint (`--color-brand-mint`) or to the danger crimson is refused even if it passes, with "This is too close to Pepla's mint, which marks the agent's work" (rules 1 and 10). The threshold is to be agreed.

**About the examples.** Examples may only use Pepla tokens, so the tenant colours shown are accent tokens standing in (sky for the saved colour, amber for the refused one and its suggestion). Their ratios are the real ratios of those tokens. The picker swatches carry `data-theme="light"` so they show the colour as typed in both themes; in the app the swatch gets the typed hex directly. In the app, the suggestion and the dark partner come from the searches above, so they sit just past 4.5 to 1.

**What the accent changes.** Saving sets the tenant's brand tokens on the app root: `--color-background-brand-bold`, its hovered and pressed steps (derived by OKLCH lightness steps), `--color-text-brand`, `--color-link` and the header strip. Mint, status colours and the focus ring are never themed.

## Content

- Ratios as "6.3 to 1", not "6.3:1" in running text.
- Refusal says what is wrong, why it matters and the fix: "Pepla can't use this colour. It has 1.7 to 1 on white, so text and buttons in it would be hard to read. Buttons and links need 4.5 to 1."
- Suggestion: "Try 825100, a darker amber" and a button "Use 825100".
- Hex values in uppercase, without the `#` in the field (the prefix shows it).

## Accessibility

- The field is labelled "Accent colour". The result line is linked with `aria-describedby`: a polite status when it passes, an alert when refused.
- Swatches are decoration (`aria-hidden`); the hex and the words carry the meaning, so colour-blind admins can use it.
- The preview panes are groups labelled "Preview in light theme" and "Preview in dark theme". Their links and buttons are pictures, not controls.
- "Use 825100" puts the value in the field and moves focus there.

## PrimeNG mapping

No PrimeNG component. A plain Angular template composed from `pp-text-field` (`pInputText`), `pp-field`, `pp-button` (`p-button`) and a contrast utility. Do not use `p-colorpicker`: it offers colours with no contrast check and no hex field that reads well on phone.

```ts
// one function, shared with the API
export function contrastOnWhite(hex: string): number { /* steps 1 to 4 above */ }
export function nearestPassing(hex: string, against = '#ffffff', min = 4.5): string { /* OKLCH lightness search */ }
```

## In Pepla today

Verified in `hr-portal/src/app`: `features/talent-flow/pages/admin/tenant-settings/components/branding-card/` (`tf-branding-card`) is titled "Branding & Identity" with "Your organisation's display name, logo and classification shown across the platform." It has a logo upload ("Upload Logo", PNG or SVG, max 2 MB), company name, trading name, industry and company size. `TenantProfile` in `features/talent-flow/models/admin.models.ts` has no colour field. There is no accent colour, no contrast check and no theme preview anywhere in the app.

## Do and don't

- **Do** refuse a failing colour and offer the nearest one that passes. **Don't** accept it with a warning.
- **Do** say the contrast in numbers and words. **Don't** say only "Invalid colour".
- **Do** preview light and dark together. **Don't** let a tenant theme mint or the status colours.
