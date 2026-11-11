---
name: Password
group: forms
status: ready
classes: pp-password, pp-password-strength, pp-password-caps
primeng: Password (p-password)
replaces: p-password with toggleMask and PrimeNG's own strength panel on the sign-in and set new password forms
---

# Password

A password field is a Text field whose value is hidden as it is typed, with an eye button to show it. When someone sets a new password, a strength hint under it says in words how good it is.

## Anatomy

1. **Field**: a `pp-text-field` wrapper with `pp-password`, holding a `pp-text-field__input` of `type="password"`. Label, help and error come from Field.
2. **Show/hide button**: a `pp-text-field__action` with `eye` (show) or `eye-off` (hide). 32px, 44px hit area on touch, 48px on phone.
3. **Help** (new passwords): the rule, said once: "At least 12 characters."
4. **Strength hint** (new passwords): `pp-password-strength`, four bars and a line with an icon and a word.
5. **Caps Lock notice** (optional): `pp-password-caps`, `triangle-alert` and "Caps Lock is on".

## Strength

| Level | `data-strength` | Bars | Icon and word |
| --- | --- | --- | --- |
| Too short | `1` | 1, danger | `octagon-alert` "Too short." plus how many characters so far: "8 of 12 characters." |
| Weak | `2` | 2, warning | `triangle-alert` "Weak." plus why: "It is a common password." |
| Good | `3` | 3, success | `check` "Good." |
| Strong | `4` | 4, success | `circle-check` "Strong." |

The word carries the meaning; the bars only repeat it (rule 4). Score with a library that checks common and breached passwords, not with rules about symbols and capitals.

## States

| State | How |
| --- | --- |
| Hidden (default) | `type="password"`, button labelled "Show password" with `eye`, `aria-pressed="false"` |
| Shown | `type="text"`, button labelled "Hide password" with `eye-off`, `aria-pressed="true"` |
| Focus, hover, disabled | As Text field |
| Error | `aria-invalid="true"` on the input, and the Field error under it |
| Caps Lock on | The notice shows while the field has focus and Caps Lock is on |

## Behaviour

- Never block paste, and never block autofill. People paste from password managers; blocking it makes passwords weaker.
- Never block typing past a length, and never trim spaces. Spaces are allowed, so a sentence works as a password.
- The eye button switches the input between `password` and `text` and keeps the cursor where it was. Focus stays in the input.
- The password hides again when the form is submitted or the person leaves the page.
- Strength updates as the person types, at most every 300ms. Show it only for new passwords, never on sign in.
- Check the minimum length on blur and on submit, and say what is missing: "Use at least 12 characters. You have 8."
- Confirming a new password is optional. If you ask for it, compare on blur of the second field, and suggest showing both to compare.
- Sign-in errors never say which part was wrong: "That employee number or password is not right."

## Content

- Labels: "Password" on sign in; "New password" and "Confirm new password" when setting one. No placeholder.
- Help states the rule once, as a fact: "At least 12 characters. A short sentence is easy to remember."
- Do not list rules people cannot see being met. If there is a rule, show its progress in the strength line.
- Button labels: "Show password" and "Hide password". If a form has two password fields, name them: "Show new password".

## Accessibility

- `<label for>` on the input; help and strength ids in `aria-describedby`, error first.
- `autocomplete="current-password"` on sign in and `autocomplete="new-password"` when setting one, so password managers fill and save correctly.
- The show/hide button is a toggle: `aria-pressed`, `aria-controls` the input, and a label that changes with it. It is a real `<button type="button">`, in the tab order after the input.
- The strength line is `aria-live="polite"`, so screen readers hear "Weak. It is a common password." without losing their place. The bars are `aria-hidden`.
- When shown, the input gets `spellcheck="false"` and `autocapitalize="off"` so the browser does not send or change the password.

## PrimeNG mapping

PrimeNG runs in unstyled mode; pass-through adds the Pepla classes. PrimeNG's own strength panel is a pop-over with colours only, so switch it off and render `pp-password-strength` under the field instead. Key names follow PrimeNG 19 and are to be checked:

```ts
password: {
  root: { class: 'pp-text-field pp-password' },
  pcInputText: { root: { class: 'pp-text-field__input' } },
  maskIcon: { class: 'pp-text-field__action' },      // to be checked: PrimeNG renders an icon, not a button
  unmaskIcon: { class: 'pp-text-field__action' },    // to be checked
  overlay: { style: 'display:none' },                // the strength pop-over; to be checked
}
```

```html
<p-password inputId="newPassword" formControlName="newPassword" [feedback]="false" [toggleMask]="true"
            autocomplete="new-password" [attr.aria-describedby]="'newPassword-help newPassword-strength'" />
```

If the PrimeNG toggle cannot be made a labelled `<button>` with `aria-pressed`, use `pInputText` with `type` bound to a signal and a plain `pp-text-field__action` button instead.

## In Pepla today

`p-password` is used only in `login.component.html`, 3 times: "Password" on sign in (`[feedback]="false"`, `[toggleMask]="true"`), and "New Password" and "Confirm Password" on the first-login set new password form. The new password field leaves `feedback` on, so it shows PrimeNG's own strength pop-over. `login.component.ts` rejects a new password shorter than 12 characters with "Password must be at least 12 characters." No file uses `type="password"` directly.

## Do and don't

- **Do** let people paste. **Don't** block paste or autofill on any password field.
- **Do** say the rule once and show progress against it. **Don't** list symbol and capital rules that make passwords harder to remember and no safer.
- **Do** say "Weak. It is a common password." **Don't** show a red bar with no words.
