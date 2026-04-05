## ADDED Requirements

### Requirement: Algorithm catalog display
The homepage SHALL display all 8 available algorithms in a grid of cards. Each card SHALL show the algorithm name, a category tag (Regression, Classification, or Deep Learning), and a one-line real-world use case summary. Clicking a card SHALL navigate to that algorithm's page.

#### Scenario: User views homepage
- **WHEN** the user loads the homepage
- **THEN** the system displays 8 algorithm cards in a responsive grid layout

#### Scenario: User clicks an algorithm card
- **WHEN** the user clicks on a card (e.g., "Linear Regression")
- **THEN** the system navigates to `/[locale]/algorithms/linear-regression`

### Requirement: Hero section
The homepage SHALL display a hero section above the algorithm grid with the platform name, a value proposition statement, and a call-to-action directing users to explore algorithms.

#### Scenario: Hero section renders
- **WHEN** the user loads the homepage
- **THEN** the system displays the platform name, tagline, and a CTA button/link to the algorithm catalog section

### Requirement: Category filter
The homepage SHALL provide filter controls to filter algorithms by category: All, Supervised (Regression), Supervised (Classification), Deep Learning.

#### Scenario: User filters by category
- **WHEN** the user selects "Deep Learning" filter
- **THEN** only CNN and Transformers cards are displayed

#### Scenario: User clears filter
- **WHEN** the user selects "All" filter
- **THEN** all 8 algorithm cards are displayed

### Requirement: Language toggle
The homepage header SHALL include a visible PT-BR / EN language toggle that persists the selection in localStorage and applies immediately without page reload.

#### Scenario: User switches language
- **WHEN** the user clicks the language toggle from EN to PT-BR
- **THEN** all UI text updates to Portuguese and the preference is stored in localStorage

#### Scenario: Language auto-detection
- **WHEN** a new user visits the homepage with no stored preference
- **THEN** the system detects the browser's preferred language and sets the locale accordingly (defaulting to EN if unsupported)

### Requirement: Responsive layout
The homepage SHALL be desktop-first with a responsive layout that functions on mobile devices. The algorithm grid SHALL adjust from multi-column on desktop to single-column on mobile.

#### Scenario: Mobile viewport
- **WHEN** the user views the homepage on a viewport width <768px
- **THEN** the algorithm cards stack in a single column with full-width cards
