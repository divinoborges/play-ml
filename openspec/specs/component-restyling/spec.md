## ADDED Requirements

### Requirement: Header restyled with neo-pop
The Header SHALL use black background, white text, font-heading for the logo, pill-shaped nav items with accent colors, and the language toggle as a pill button with border-2 border-white.

#### Scenario: Header appearance
- **WHEN** the user views any page
- **THEN** the header has a black background, the logo is in Space Mono white text, and nav items are pill-shaped

### Requirement: Homepage hero with black background
The homepage hero section SHALL use a black background with white text. The heading SHALL use font-heading text-display-xl uppercase. The CTA button SHALL be a pill with bg-yellow-pop text-black border-2 border-black, inverting to bg-black text-yellow-pop on hover.

#### Scenario: Hero section appearance
- **WHEN** the user loads the homepage
- **THEN** the hero has a black background, large monospace heading, and a yellow pill CTA button

### Requirement: Algorithm cards with outlines and hover inversion
Algorithm cards SHALL have border-2 border-black, rounded-2xl, and bg-sand background. The category tag SHALL be a pill with the category's accent color. On hover, cards SHALL invert to bg-black with white text.

#### Scenario: Card hover effect
- **WHEN** the user hovers over an algorithm card
- **THEN** the card background transitions to black and the text becomes white

### Requirement: Algorithm catalog on sand background
The algorithm catalog section SHALL have bg-sand as its background, with cards arranged in a grid.

#### Scenario: Catalog background
- **WHEN** the user scrolls to the algorithm catalog
- **THEN** the section has a sand-colored background

### Requirement: Algorithm page sections with alternating backgrounds
Each of the 6 sections on an algorithm page SHALL have a distinct background color cycling through the palette: Section 1 (Context) → black with white text, Section 2 (Dataset) → blue-electric, Section 3 (How It Works) → yellow-pop, Section 4 (Training) → sand, Section 5 (Prediction) → orange-pop, Section 6 (Metrics) → blue-electric.

#### Scenario: Section background cycling
- **WHEN** the user scrolls through a Linear Regression algorithm page
- **THEN** each section has a different vibrant background color

### Requirement: Shared components with thick outlines
DatasetTable, HyperparameterPanel, MetricsPanel, and PredictionForm SHALL use border-2 border-black and rounded-2xl styling. Table headers SHALL use font-heading. Metric value cards SHALL use stat badge styling (number in bg-yellow-pop rounded-2xl).

#### Scenario: DatasetTable with outlines
- **WHEN** the dataset table renders
- **THEN** it has a 2px black border and rounded corners

### Requirement: Train and Predict buttons as neo-pop pills
TrainButton SHALL be a pill with bg-yellow-pop text-black border-2 border-black font-heading uppercase. PredictButton SHALL be a pill with bg-lime-pop text-black border-2 border-black font-heading uppercase. Both SHALL invert on hover.

#### Scenario: Train button appearance
- **WHEN** the Train button renders
- **THEN** it is a yellow pill with black text and thick border

### Requirement: Comparison page with vibrant sections
The comparison page SHALL use alternating backgrounds for its sections (selection → sand, results → blue-electric) with stat badges for metric values and the educational insight in a sand card with rounded-3xl.

#### Scenario: Comparison results display
- **WHEN** comparison results are shown
- **THEN** the results section has a blue-electric background with stat badges and sand cards
