## Why

The homepage hero section currently sits on a plain black background, which feels flat and uninviting for an educational ML playground. A playful, thematic background would better communicate the "learn by doing" vibe and make the landing more memorable.

## What Changes

- Replace the solid black background behind the homepage hero ("PlayML — Learn Machine Learning by doing...") with a decorative, ML-themed visual backdrop.
- Visual should be subtle enough not to hurt legibility of the headline, subheadline, and "Explore Algorithms" CTA.
- Must respect the existing dark theme, remain performant (no heavy assets), and be responsive across breakpoints.
- Respect `prefers-reduced-motion` if any motion is introduced.

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `homepage`: Hero section background requirement changes from solid black to a decorative ML-themed visual backdrop while preserving text contrast and accessibility.

## Impact

- Affected code: homepage hero component in the Next.js `app/` route (and any shared hero styling).
- No new runtime dependencies expected; prefer CSS/SVG or a lightweight canvas effect.
- Must keep Lighthouse performance and accessibility scores intact.
