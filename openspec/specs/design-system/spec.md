## ADDED Requirements

### Requirement: Neo-pop color palette
The Tailwind theme SHALL define these custom colors: sand (#E8D5B7), sand-light (#F2E8D5), blue-electric (#1185F7), yellow-pop (#FFE500), orange-pop (#FF6B00), magenta (#FF00E5), lime-pop (#00E537), sky-pop (#39A0ED), orange-badge (#FF8C00), red-pop (#FF3B3B).

#### Scenario: Custom colors available in Tailwind
- **WHEN** a component uses `bg-blue-electric` or `text-magenta`
- **THEN** the correct hex color is applied

### Requirement: Typography with Space Mono and DM Sans
The app SHALL use Space Mono (weight 700) as `font-heading` for all headings and labels, and DM Sans (weights 400, 500, 700) as `font-body` for all body text. Both SHALL be loaded via `next/font/google`.

#### Scenario: Heading renders in Space Mono
- **WHEN** a heading element has class `font-heading`
- **THEN** it renders in Space Mono Bold

#### Scenario: Body text renders in DM Sans
- **WHEN** a paragraph element has class `font-body`
- **THEN** it renders in DM Sans Regular

### Requirement: Display font sizes
The theme SHALL define four display sizes: display-xl (4.5rem, line-height 1), display-lg (3.5rem, line-height 1.05), display-md (2.5rem, line-height 1.1), display-sm (1.75rem, line-height 1.15).

#### Scenario: Display size applied
- **WHEN** a heading uses `text-display-xl`
- **THEN** it renders at 4.5rem with line-height 1

### Requirement: Heavy border width
The theme SHALL define a `border-3` utility for 3px borders.

#### Scenario: 3px border applied
- **WHEN** an element uses `border-3`
- **THEN** a 3px solid border is rendered

### Requirement: Decorative color border strip
The app layout SHALL include a horizontal multi-color stripe at the top of the page, composed of equally-sized segments of: magenta, yellow-pop, red-pop, blue-electric, lime-pop, orange-pop, magenta, yellow-pop.

#### Scenario: Color border visible
- **WHEN** the user loads any page
- **THEN** a 3px-tall multi-color stripe is visible at the very top of the viewport

### Requirement: BrowserFrame component
A `<BrowserFrame />` component SHALL render a faux browser chrome with traffic light dots (red, yellow, green), a URL bar, and a bordered content area. It SHALL accept children to render inside.

#### Scenario: Visualization wrapped in browser frame
- **WHEN** the "How It Works" section renders a D3 visualization
- **THEN** it is wrapped in a BrowserFrame with traffic light dots and URL bar visible above the visualization
