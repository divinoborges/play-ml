## ADDED Requirements

### Requirement: Dual language support
The application SHALL support two languages: English (EN) and Brazilian Portuguese (PT-BR). All UI text, algorithm explanations, metric labels, and dataset descriptions SHALL be available in both languages.

#### Scenario: Full Portuguese experience
- **WHEN** the user switches to PT-BR
- **THEN** all UI labels, section headers, algorithm descriptions, metric names, and dataset metadata display in Portuguese

#### Scenario: Algorithm names in English
- **WHEN** the locale is PT-BR
- **THEN** algorithm technical names (e.g., "Linear Regression", "KNN", "SVM") remain in English while descriptions are in Portuguese

### Requirement: Persistent language toggle
A language toggle SHALL be visible in the header of every page. The selected language SHALL persist in localStorage and apply immediately without a full page reload.

#### Scenario: Toggle visibility
- **WHEN** the user is on any page
- **THEN** the PT-BR / EN toggle is visible in the header

#### Scenario: Persistence across sessions
- **WHEN** the user selects PT-BR and returns to the site later
- **THEN** the site loads in PT-BR based on the stored localStorage preference

### Requirement: Browser language detection
On first visit (no stored preference), the system SHALL detect the browser's preferred language. If the browser language starts with "pt", the system SHALL default to PT-BR. Otherwise, it SHALL default to EN.

#### Scenario: Portuguese browser
- **WHEN** a new user visits with browser language "pt-BR"
- **THEN** the site loads in PT-BR

#### Scenario: Non-Portuguese browser
- **WHEN** a new user visits with browser language "fr"
- **THEN** the site loads in EN

### Requirement: Locale-based routing
The application SHALL use locale-prefixed routes (`/en/...`, `/pt-BR/...`). The URL SHALL reflect the current language, allowing direct linking to a specific language version.

#### Scenario: URL reflects locale
- **WHEN** the user is viewing the site in PT-BR
- **THEN** the URL path starts with `/pt-BR/`

#### Scenario: Direct locale link
- **WHEN** a user opens `/pt-BR/algorithms/linear-regression`
- **THEN** the page loads in Portuguese regardless of stored preference or browser language
