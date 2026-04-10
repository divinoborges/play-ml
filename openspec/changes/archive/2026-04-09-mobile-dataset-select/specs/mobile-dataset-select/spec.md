## ADDED Requirements

### Requirement: Mobile dataset selector renders as native select
The LinearRegressionDatasetSelector component SHALL render a native `<select>` element for dataset selection on viewports below the `md` breakpoint (< 768px). The `<select>` SHALL be hidden on `md` and above.

#### Scenario: Mobile viewport shows select dropdown
- **WHEN** the viewport width is below 768px
- **THEN** a native `<select>` element is visible with all dataset options listed
- **AND** the pill-button tab list is hidden

#### Scenario: Desktop viewport shows pill tabs
- **WHEN** the viewport width is 768px or above
- **THEN** the pill-button tab list is visible
- **AND** the native `<select>` element is hidden

### Requirement: Mobile select reflects current dataset
The native `<select>` SHALL display the currently selected dataset and update the active dataset when the user selects a different option.

#### Scenario: Selecting a dataset via mobile dropdown
- **WHEN** the user selects a dataset from the `<select>` dropdown on mobile
- **THEN** the active dataset updates to the selected value
- **AND** the description card below updates to show the selected dataset's title, description, and target

#### Scenario: Initial state matches active dataset
- **WHEN** the component mounts on a mobile viewport
- **THEN** the `<select>` value SHALL match the currently active dataset (`value` prop)

### Requirement: Mobile select uses translated dataset names
The native `<select>` options SHALL use the same translated dataset names as the pill-button tabs, via the existing `titleKey` translation keys.

#### Scenario: Translated option labels
- **WHEN** the component renders on mobile in any supported locale (en, pt-BR)
- **THEN** each `<option>` in the `<select>` displays the dataset name in the active locale

### Requirement: Mobile select is styled consistently
The native `<select>` SHALL be styled with borders, rounded corners, and typography consistent with the component's existing design system (border-2 border-black, rounded, font-heading).

#### Scenario: Visual consistency with design system
- **WHEN** the `<select>` renders on mobile
- **THEN** it uses border-2 border-black, rounded corners, and the heading font family
