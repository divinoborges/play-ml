## MODIFIED Requirements

### Requirement: Category filter
The homepage SHALL provide filter controls to filter algorithms by category: All, Regression, Classification, Deep Learning, Clustering. On mobile viewports (`<768px`), the filter SHALL render as a native `<select>` dropdown. On desktop/tablet viewports (`≥768px`), the filter SHALL render as pill-shaped buttons.

#### Scenario: User filters by category
- **WHEN** the user selects "Deep Learning" filter
- **THEN** only Deep Learning algorithm cards are displayed

#### Scenario: User clears filter
- **WHEN** the user selects "All" filter
- **THEN** all algorithm cards are displayed

#### Scenario: Mobile filter rendering
- **WHEN** the user views the homepage on a viewport width <768px
- **THEN** the category filter is displayed as a `<select>` dropdown

#### Scenario: Desktop filter rendering
- **WHEN** the user views the homepage on a viewport width ≥768px
- **THEN** the category filter is displayed as pill-shaped buttons
