## ADDED Requirements

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
