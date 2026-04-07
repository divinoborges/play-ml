## MODIFIED Requirements

### Requirement: Linear Regression code snippet uses scikit-learn
The `linear-regression` entry in `codeContent` SHALL display a Python code snippet that uses `sklearn.linear_model.LinearRegression` instead of a from-scratch numpy implementation.

The snippet SHALL be organized into three commented sections:
1. **# Load Data** — load the California Housing dataset via `sklearn.datasets.fetch_california_housing` and split into train/test
2. **# Build a Linear Regression Model** — create and fit the `LinearRegression` model
3. **# Predict using the Model** — make predictions and evaluate with R² score

#### Scenario: Code snippet has three clear sections
- **WHEN** user views the "See the Code" tab on the Linear Regression algorithm page
- **THEN** the code contains three commented sections: `# Load Data`, `# Build a Linear Regression Model`, and `# Predict using the Model`

#### Scenario: Code snippet is complete and runnable
- **WHEN** user copies the displayed code snippet
- **THEN** the code is a valid, runnable Python script (given sklearn and numpy are installed)
