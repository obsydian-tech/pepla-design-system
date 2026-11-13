---
name: QR code
group: forms
status: ready
classes: pp-qr-code
primeng: none (plain Angular template)
replaces: nothing; today no screen shows a QR code
---

# QR code

The QR code is a square tile that holds a code to scan with a phone. Naleko People uses it once: when an Admin sets up two-step sign-in, the tile holds the code that an authenticator app scans. The tile is always a light surface with a dark code, in light and dark theme, because a scanner needs dark marks on a light ground.

## Anatomy

1. **Tile** (`pp-qr-code`): a square with a border, a small padding and a light ground. Set `data-theme="light"` on it so the ground stays light in dark theme.
2. **Image** (`pp-qr-code__image`): the code, drawn from the data the app generates (an `otpauth` address). Its `alt` says what the code is for.

## States

| State | How |
| --- | --- |
| Default | The tile with the code |
| Small | `pp-qr-code--small` where space is tight, such as a narrow phone |
| Cannot scan | Not a tile state. Show the setup key as text next to the tile ("Cannot scan it? Enter this key") |

## Behaviour

- The app draws the code on the page and never sends the secret to another service to draw it.
- The tile does not copy, download or print. The setup key beside it is the fallback.
- The code is shown once, during set-up. Opening set-up again makes a new one.

## Content

- The lead above the tile says what to scan with: "Scan this code with the app".
- The `alt` text names the purpose: "QR code for Naleko People in your authenticator app". It never repeats the secret.

## Accessibility

- A scan-only image needs a text route: always show the setup key as selectable text beside the tile.
- The tile has a visible border so it reads as an object in dark theme.

## PrimeNG mapping

> **Reference only.** The Angular app uses no PrimeNG (see `docs/verify-design-angular.md`).

None. It is a plain template around an image.

## In Naleko People today

Nothing. The platform has no two-step sign-in yet; both user pools have it off. This component is added for the Admin set-up (see the Admin company set-up kit).

## Do and don't

- **Do** show the setup key as text beside the code. **Don't** make a scan the only way in.
- **Do** keep the tile light in dark theme. **Don't** invert the code or tint it with the brand colour.
- **Do** draw the code in the browser. **Don't** load it from an outside code-drawing service.
