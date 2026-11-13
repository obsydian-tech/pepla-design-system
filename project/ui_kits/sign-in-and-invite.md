---
name: Sign-in and invite
device: desktop
order: 0
source: features/login, lambda/createEmployee (welcome email), Cognito
---

# Sign-in and invite

The screens a person sees before they are inside Naleko People, each at desktop and phone size, built on the Sign-in page layout. HR signs in with a work email and password. A new employee gets a welcome email with a link, sets their own password, and goes straight to their onboarding. A used or old link shows a page that says who can send a new one.

## Screens

- **HR sign in**. Work email and password for Mokoena Logistics. Uses sign-in page, logo, field, text field, password, button.
- **Invite email**. The welcome email Ayanda Zulu gets, with one button to set a password, who sent it and when the link expires. Uses sign-in page, logo, button.
- **Set your password**. The email filled in and read-only, a new password with its help text. Uses sign-in page, field, text field, password, button.
- **Link expired**. No form; who can send a new link. Uses sign-in page, button.

## Where the redraw changes today's app

- **No password by email (onboarding improvement 4).** Today createEmployee makes a permanent password and the welcome email carries it. The redraw sends a one-time link that expires after 7 days, and HR can resend it.
- **One layout for every page before sign-in.** Today's login page has its own colours and layout; it now uses the Sign-in page component.
- **The email matches the page it opens.** The welcome email uses the same layout, so the step reads as one.
