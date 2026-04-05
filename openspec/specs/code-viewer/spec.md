## ADDED Requirements

### Requirement: Python code display per algorithm
The system SHALL display Python implementation code for each algorithm. Code content SHALL be provided via a `getCodeContent(slug)` function in `lib/code-content.ts`, returning a Python code string for the given algorithm slug.

#### Scenario: View Python code for an algorithm
- **WHEN** user navigates to an algorithm detail page
- **THEN** a "See the Code" button SHALL be visible next to the "See the Math" button in the How It Works section

#### Scenario: Toggle code visibility
- **WHEN** user clicks the "See the Code" button
- **THEN** the Python code panel SHALL expand below, displaying the algorithm's Python implementation in a monospace code block
- **WHEN** user clicks the "See the Code" button again
- **THEN** the code panel SHALL collapse

#### Scenario: Independent toggle from math
- **WHEN** user expands the code panel
- **THEN** the math panel state SHALL NOT change (both can be open simultaneously)

### Requirement: Copy code to clipboard
The system SHALL provide a copy-to-clipboard button within the code display panel.

#### Scenario: Copy code successfully
- **WHEN** user clicks the "Copy" button inside the code panel
- **THEN** the full Python code text SHALL be copied to the clipboard using the Clipboard API
- **AND** the button text SHALL change to "Copied!" for 2 seconds before reverting to "Copy"

#### Scenario: Code panel closed
- **WHEN** the code panel is collapsed
- **THEN** the copy button SHALL NOT be visible

### Requirement: Code content for all algorithms
The system SHALL provide Python code content for every algorithm in the registry.

#### Scenario: All algorithms have code content
- **WHEN** `getCodeContent(slug)` is called with any valid algorithm slug
- **THEN** it SHALL return a non-empty Python code string

### Requirement: Internationalization of code viewer labels
The system SHALL support i18n for all code viewer UI labels ("See the Code", "Copy", "Copied!").

#### Scenario: Labels in Portuguese
- **WHEN** the locale is set to pt-BR
- **THEN** the button labels SHALL display in Portuguese ("Ver o Código", "Copiar", "Copiado!")

#### Scenario: Labels in English
- **WHEN** the locale is set to en
- **THEN** the button labels SHALL display in English ("See the Code", "Copy", "Copied!")
