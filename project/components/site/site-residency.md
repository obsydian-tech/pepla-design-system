---
name: Site data residency
group: site
status: ready
classes: pp-site-residency, pp-site-residency--card
primeng: none (public site only, no PrimeNG)
replaces: the public site's .pin, .rs and .rs-row on the Security page and the .res card on the landing page, whose live dot grew a box-shadow
---

# Site data residency

Where the data is kept: a pin with a live dot and "South Africa", then what is stored there.

## Anatomy

1. **Block** (`pp-site-residency`). `pp-site-residency--card` makes it a card with a title (`__title`, `map-pin` icon, "Where the data is kept") and a sentence (`__text`) for the landing page.
2. **Pin** (`pp-site-residency__pin`): the live dot (`__dot`) and the place, in mint.
3. **List** (`pp-site-residency__list`, Security page): rows (`__row`) with what is stored and a success status "South Africa".

## States

| State | How |
| --- | --- |
| Live | The dot's ring grows and fades every 2.2s |
| Rows arriving | Rows step in one by one (`pp-site-step`) |
| Still | All rows in, no ring |

## Behaviour

- Rows step in 0.6s apart from 0.6s.
- The ring is a copy of the dot that scales to 2.6 times and fades (transform and opacity). The approved site grew a box-shadow, which the site check does not allow; the look is the same. Under reduced motion it keeps playing.

## Content

- Copied from the approved pages: "Where the data is kept", "South Africa", "Employee records", "Documents", "Audit history" and "Employee records, documents and audit history are stored and processed in South Africa."

## Accessibility

- The dot is decorative. The place is written out.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

Hosting in the AWS Cape Town region (af-south-1). The kit names only the country.

## Do and don't

- Do name the country the data is kept in.
- Don't name a city or a data centre on the site.
