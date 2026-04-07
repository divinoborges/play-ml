## MODIFIED Requirements

### Requirement: Python code display per algorithm
The system SHALL display Python implementation code for each algorithm. Code content SHALL be provided via a `getCodeContent(slug)` function in `lib/code-content.ts`, returning a Python code string for the given algorithm slug. Code SHALL be rendered using the `PythonHighlighter` component with Dracula theme syntax highlighting instead of plain monospace text.

#### Scenario: View Python code for an algorithm
- **WHEN** user navigates to an algorithm detail page
- **THEN** a "See the Code" button SHALL be visible next to the "See the Math" button in the How It Works section

#### Scenario: Toggle code visibility
- **WHEN** user clicks the "See the Code" button
- **THEN** the Python code panel SHALL expand below, displaying the algorithm's Python implementation with Dracula-themed syntax highlighting
- **WHEN** user clicks the "See the Code" button again
- **THEN** the code panel SHALL collapse

#### Scenario: Independent toggle from math
- **WHEN** user expands the code panel
- **THEN** the math panel state SHALL NOT change (both can be open simultaneously)
