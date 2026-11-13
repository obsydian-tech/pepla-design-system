---
name: Sign-in page
group: navigation
status: ready
classes: pp-sign-in
primeng: none (plain Angular template)
replaces: the old login page (features/login) and its hand-made layout
---

# Sign-in page

The sign-in page is the layout for every screen a person sees before they are inside Naleko People: signing in, setting a password from an invite link, and a link that has expired. It is one narrow card on the sunken background, with the logo above it. The welcome email that carries the invite link uses the same layout, so the email and the page it opens look like one step.

## Anatomy

1. **Panel** (`pp-sign-in__panel`): a column up to 400px wide, centred.
2. **Logo**: the Naleko People lockup (`pp-logo`), or the company's own logo when it has one, above the card.
3. **Card** (`pp-sign-in__card`): the heading, the form or message, and the actions.
4. **Heading** (`pp-sign-in__heading`): the title (`pp-sign-in__title`), and a lead line (`pp-sign-in__lead`) or the company name (`pp-sign-in__company`).
5. **Actions** (`pp-sign-in__actions`): one primary button at full width, and at most one link or default button under it.
6. **Footer** (`pp-sign-in__footer`): who sent the link, when it expires, or how to get help. Outside the card.

## States

| State | How |
| --- | --- |
| Default | The form with its fields and one primary button |
| Error | A field error under the field, or an inline message above the actions when the whole attempt failed ("That email and password do not match") |
| Link expired | No form. The card says the link has expired and who can send a new one; the action asks for a new link |
| Phone | `pp-sign-in--phone`: less space above the panel and a smaller card padding |

## Behaviour

- Sign-in asks only for the work email and password, then the second step when the account has one. Admins always have a second step.
- An invite link opens Set your password with the email filled in and read-only. The link works once and expires after 7 days (a company setting).
- After the password is set, the person goes straight into Naleko People: HR to Today, a new employee to their own home.
- An expired or used link shows the Link expired state. It never shows a form that will fail.

## Content

- Titles say the task: "Sign in", "Set your password", "This link has expired".
- The footer names the person who sent the link and the date it expires, with the date written out ("16 Nov 2026").
- Never put a password in an email or on a screen.
- Use "Naleko People" for the product, and the company's own name where the person knows it better.

## Accessibility

- One `h1` per page: the card title.
- Fields use `pp-field` with visible labels; password fields use `pp-password` with a Show button.
- Errors are announced: field errors are tied with `aria-describedby`, a whole-form error uses `role="alert"`.
- The primary button is the last control in the form, so Enter submits.

## PrimeNG mapping

> **Reference only.** In the Angular app this layout is built in `src/app/ds` without PrimeNG. The app uses no PrimeNG at all (see `docs/verify-design-angular.md`).

None. It is a plain template around Field, Text field, Password and Button.

## In Naleko People today

The old app has one login page (`features/login`) with its own layout and colours, and no page for setting a password: today the new employee gets a permanent password by email. This layout replaces the login page and adds the invite link screens.

## Do and don't

- **Do** keep one primary button per card. **Don't** add sign-up or marketing links here; the public site has those.
- **Do** say who sent an invite and when it expires. **Don't** show the password, even masked.
- **Do** use the Link expired state for a used or old link. **Don't** let the person fill a form that cannot work.
