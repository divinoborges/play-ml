## MODIFIED Requirements

### Requirement: Dataset table displays data with scroll
The dataset table SHALL display 10 rows visible at a time with vertical scroll to browse the remaining rows. The table header SHALL remain sticky during scrolling.

#### Scenario: Initial table display
- **WHEN** the dataset table is rendered
- **THEN** it SHALL show the first 10 rows of data in the visible area
- **AND** the table container SHALL have a fixed visible height

#### Scenario: Scrolling through data
- **WHEN** user scrolls vertically within the table
- **THEN** additional rows SHALL become visible
- **AND** the table header (column names) SHALL remain fixed/sticky at the top

#### Scenario: All data accessible
- **WHEN** user scrolls to the bottom of the table
- **THEN** all rows in the dataset (train or test, depending on active tab) SHALL be accessible
- **AND** the previous limit of 50 rows SHALL be removed (all data is rendered)

#### Scenario: Tab switching resets scroll
- **WHEN** user switches between train and test tabs
- **THEN** the scroll position SHALL reset to the top
