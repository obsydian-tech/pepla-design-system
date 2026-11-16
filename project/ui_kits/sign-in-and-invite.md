---
name: Sign-in and invite
device: desktop
order: 0
source: features/login, lambda/createEmployee (welcome email), Cognito
---

# Sign-in and invite

The screens a person sees before they are inside Naleko People, each at desktop and phone size, built on the Sign-in page layout. HR signs in with an email and password; any address works, Gmail included. A new employee gets a welcome email with a link, sets their own password, and goes straight to their onboarding. A used or old link shows a page that says who can send a new one.

## Screens

- **Sign in**. Email and password for Mokoena Logistics, with a "Forgot your password?" link under the button. Uses sign-in page, logo, field, text field, password, button, link.
- **Invite email**. The welcome email Ayanda Zulu gets, with one button to set a password, who sent it and when the link expires. Uses sign-in page, logo, button.
- **Set your password**. The email filled in and read-only, a new password with its help text. Uses sign-in page, field, text field, password, button.
- **Link expired**. No form; who can send a new link. Uses sign-in page, button.
- **Company ready email**. The email the company's first Admin gets after Naleko switches the company on: who they are, one button to set a password, who sent it and when the link expires (7 days). Uses sign-in page, logo, button.
- **Set up two-step sign-in**. The first sign-in for an Admin: scan a code with an authenticator app, then enter the 6-digit code it shows, with the setup key as text for anyone who cannot scan. Uses sign-in page, QR code, field, text field, button.
- **Reset your password**. Step 1 of a reset: the email, a button to send a 6-digit code, and a link back to Sign in. A second screen shows the "Too many attempts" message. Uses sign-in page, logo, field, text field, section message, button, link.
- **Enter the code**. Step 2: the 6-digit code, a new password with its help text, a "Send a new code" link and a link to use a different email. Further screens show a wrong code, an expired code, a new code sent (the link waits 30 seconds, with the time left), and a password that breaks a rule. Uses sign-in page, field, text field, password, inline message, button, link.
- **Sign in after a reset**. Sign in with a success message that the password is changed. Uses sign-in page, field, text field, password, section message, button, link.
- **Reset code email**. The email with the 6-digit code: it works for 1 hour, and says to ignore it if the person did not ask. Uses sign-in page, logo.

## Where the redraw changes today's app

- **No password by email (onboarding improvement 4).** Today createEmployee makes a permanent password and the welcome email carries it. The redraw sends a one-time link that expires after 7 days, and HR can resend it.
- **One layout for every page before sign-in.** Today's login page has its own colours and layout; it now uses the Sign-in page component.
- **The email matches the page it opens.** The welcome email uses the same layout, so the step reads as one.
- **Two-step sign-in for Admins.** Both user pools have it off today. The redraw makes every Admin set it up before the Admin area opens; the code is drawn on the page with the QR code component.
- **No work-email rule.** The email field is labelled "Email" and accepts any address, including Gmail and other personal addresses.
- **Reset your own password.** Today only an Admin can send a new link. The redraw lets anyone with a password reset it from Sign in with a code sent by email. The page says the same thing whether or not the email has an account, and a reset signs the person out everywhere else.
