## MODIFIED Requirements

### Requirement: Hero section
The homepage SHALL display a hero section above the algorithm grid with the platform name, a value proposition statement, and a call-to-action directing users to explore algorithms. The hero section SHALL render a decorative ML-themed visual backdrop (e.g., faint grid, glowing accent blobs, and a sparse neural-graph motif) behind the text content instead of a plain solid-color background. The backdrop SHALL be purely decorative (`aria-hidden`), SHALL NOT capture pointer events, and SHALL preserve WCAG AA contrast for the headline, subheadline, and CTA. Any backdrop motion SHALL be disabled when the user has `prefers-reduced-motion: reduce`.

#### Scenario: Hero section renders
- **WHEN** the user loads the homepage
- **THEN** the system displays the platform name, tagline, and a CTA button/link to the algorithm catalog section

#### Scenario: Decorative backdrop is visible
- **WHEN** the user loads the homepage on any supported viewport
- **THEN** a decorative ML-themed visual is rendered behind the hero text instead of a plain black background

#### Scenario: Backdrop does not interfere with interactions
- **WHEN** the user hovers or clicks anywhere inside the hero area
- **THEN** pointer events are handled only by the hero text and CTA, never intercepted by the backdrop layer

#### Scenario: Hero text remains legible
- **WHEN** the hero is rendered over the decorative backdrop
- **THEN** the headline, subheadline, and CTA maintain WCAG AA contrast against the composited background

#### Scenario: Reduced motion preference
- **WHEN** the user's system reports `prefers-reduced-motion: reduce`
- **THEN** the backdrop renders without any animation
