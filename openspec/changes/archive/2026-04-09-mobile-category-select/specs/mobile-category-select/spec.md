## ADDED Requirements

### Requirement: Mobile category select dropdown
On mobile viewports (`<768px`), the category filter SHALL render as a native `<select>` dropdown instead of pill buttons. The select SHALL contain all category options (All, Regression, Classification, Deep Learning, Clustering) with translated labels. Selecting an option SHALL filter the algorithm grid identically to the desktop buttons.

#### Scenario: Mobile user views category filter
- **WHEN** the user views the homepage on a viewport width <768px
- **THEN** the system displays a `<select>` dropdown for category filtering instead of pill buttons

#### Scenario: Mobile user filters by category
- **WHEN** the user selects "Classification" from the dropdown on mobile
- **THEN** only classification algorithm cards are displayed in the grid

#### Scenario: Mobile user selects All
- **WHEN** the user selects "All" from the dropdown on mobile
- **THEN** all algorithm cards are displayed in the grid

### Requirement: Desktop category buttons preserved
On desktop/tablet viewports (`≥768px`), the category filter SHALL continue to render as pill-shaped buttons with the existing styling and behavior.

#### Scenario: Desktop user views category filter
- **WHEN** the user views the homepage on a viewport width ≥768px
- **THEN** the system displays pill-shaped filter buttons (not a dropdown)

### Requirement: Select element styling
The mobile `<select>` element SHALL follow the neo-pop design system: thick border (`border-2 border-black`), rounded shape (`rounded-full`), heading font (`font-heading`), uppercase text, and appropriate padding.

#### Scenario: Select matches design system
- **WHEN** the mobile category select is rendered
- **THEN** it uses border-2 border-black, rounded-full, font-heading, text-sm, font-bold, and uppercase styling
