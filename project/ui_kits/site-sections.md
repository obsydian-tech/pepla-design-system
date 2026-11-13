---
name: Site hero and sections
device: desktop
order: 22
preview: site-sections
source: landing-concepts/naleko-concept-d.html (the approved public site's hero, module sections, capability columns and closing band)
---

# Site hero and sections

The top of the landing page, the four section grounds with their capability columns, and the closing band, at desktop and phone width. Every frame is as tall as its content, so each shows whole. The parts arrive as they scroll into view, the lights drift and the accent lines shine. The behaviour of the page (arrival on scroll, fitting a desktop frame to a small screen) comes from a preview-only script that is not part of the site or the components. The header is static here; its behaviour is on the Site header kit.

## Screens

- **Hero (desktop)**. Header over the hero: intro sentence, the four regulation chips, headline with the accent line, lead, and two buttons, on soft drifting lights. Uses Site hero, Site lights, Site shine, Site header, Button.
- **Sections and capability columns (desktop)**. Four sections: white with four columns (Recruitment), cream with four columns (Compliance Management), a violet wash and a mint wash with a headline only. Uses Site section, Site capabilities, Lozenge.
- **Closing band (desktop)**. "Naleko People." set very large, the lead, two buttons and the note. Uses Site closing band, Site lights, Site shine, Button.
- **Hero (phone)**. The same at 390px: chips under the sentence, 46px headline, stacked full-width buttons.
- **Sections and capability columns (phone)**. One column of capabilities, 64px section padding.
- **Closing band (phone)**. 52px headline, stacked buttons.

## Where the redraw changes the approved site

- **The hero light is CSS, not a canvas.** Three circles with a thin ring each drift and swell by transform, in the Site lights component.
- **The shine, the closing wash, the grain and the scroll cue are all drawn from transforms and opacity.** Same look as the approved site; the old versions animated `background-position`, which repaints on every frame. The shine is a window sliding over the words with a mint copy sliding the other way inside it. The wash is a gradient three times the band's width, slid sideways.
- **Buttons are the Site button component:** dark with the mint dot that grows into an arrow circle, and the white line button. The dot grows by scale, not by width.
- **Not restored: the blur on arrival.** The parts fade and rise but do not blur, because blur animates on the main thread and the site check allows only transform and opacity. This one needs Iggie's decision.
- **The fluid headline follows the section, not the window.** It is sized in `cqw`, so a phone-sized preview on a wide screen sets type like a phone.
