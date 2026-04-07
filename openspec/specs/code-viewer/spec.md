## ADDED Requirements

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

### Requirement: Dataset-aware Python snippet for Linear Regression
The code viewer SHALL display a Python snippet for the Linear Regression algorithm that matches the currently selected dataset. Each of the three datasets (`salary`, `graduate-admissions`, `uber-fares`) SHALL have its own Python snippet that reads the corresponding `.csv` file with pandas, selects the same feature and target columns used by the in-app TypeScript loader, trains `sklearn.linear_model.LinearRegression`, and prints an `r2_score`.

#### Scenario: Snippet matches selected dataset
- **WHEN** the user selects a dataset on the Linear Regression page and opens "See the Code"
- **THEN** the displayed Python snippet SHALL reference the selected dataset's `.csv` filename and its exact feature and target columns

#### Scenario: Switching updates the snippet
- **WHEN** the user changes the selected dataset while "See the Code" is open
- **THEN** the displayed Python snippet SHALL update without requiring the panel to be reopened

### Requirement: `getCodeContent` accepts a variant parameter
The `getCodeContent` function in `lib/code-content.ts` SHALL accept an optional `variant` parameter. For `slug === "linear-regression"`, `variant` SHALL be the dataset id and SHALL select the corresponding Python snippet. For other algorithm slugs, `variant` SHALL be ignored and existing behavior preserved.

#### Scenario: Backward compatible for other algorithms
- **WHEN** `getCodeContent("logistic-regression")` is called without a variant
- **THEN** it SHALL return the existing logistic regression snippet unchanged

#### Scenario: Variant dispatch for linear regression
- **WHEN** `getCodeContent("linear-regression", "uber-fares")` is called
- **THEN** it SHALL return the Uber Fares pandas snippet, not the default one

### Requirement: Python code content for Naive Bayes
`getCodeContent("naive-bayes")` SHALL return a non-empty Python snippet that uses `sklearn.naive_bayes.GaussianNB` to train and evaluate a classifier, consistent in style with the other algorithm snippets in `lib/code-content.ts`.

#### Scenario: Naive Bayes snippet available
- **WHEN** `getCodeContent("naive-bayes")` is called
- **THEN** it SHALL return a Python string importing `GaussianNB`, calling `.fit`, `.predict`, and printing an accuracy score
