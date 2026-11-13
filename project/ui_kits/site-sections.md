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

- **The light is CSS, not a canvas.** The hero drew its three lights with a script on a canvas. Now they are three circles that drift and swell by transform, in the Site lights component. The lights are a little softer at the edges and move in a calmer loop.
- **The shine is the same slide, drawn differently.** The old accent line slid a gradient across the words by animating `background-position`, which repaints on every frame. Now a soft window slides across the words with a mint copy sliding the opposite way inside it. It looks the same and runs on the compositor.
- **No grain, no blur, no scroll cue.** The hero's moving noise layer, the blur on arrival and the "Scroll" cue are left out. Grain and blur each repaint every frame, and the cue is hidden on a phone anyway.
- **The closing wash is still.** The band's background used to flow with `background-position`. The wash is fixed and the lights move over it.
- **Real components.** Buttons are the Button component. The "Batsi" tag is the agent Lozenge. The old page drew its own.
- **The fluid headline follows the section, not the window.** It is sized in `cqw`, so a phone-sized preview on a wide screen sets type like a phone.
