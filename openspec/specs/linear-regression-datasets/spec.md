# linear-regression-datasets Specification

## Purpose
Provide three real-world CSV datasets for the Linear Regression algorithm page, enabling users to choose between Salary, Graduate Admissions, and Uber Fares datasets, with browser-side parsing and training in TypeScript.

## Requirements

### Requirement: Three CSV datasets for Linear Regression
The system SHALL ship three CSV datasets for the Linear Regression page, stored under `public/datasets/linear-regression/`: `salary.csv` (Salary vs years of experience, target `Salary`), `graduate-admissions.csv` (Graduate Admissions, target `Chance of Admit`), and `uber-fares.csv` (Uber Fares, target `fare_amount`). Each file SHALL be a trimmed, numeric-ready subset of its Kaggle source.

#### Scenario: CSV files available at runtime
- **WHEN** the Linear Regression page loads
- **THEN** each of `public/datasets/linear-regression/salary.csv`, `graduate-admissions.csv`, and `uber-fares.csv` SHALL be fetchable from the browser

#### Scenario: Files are trimmed for browser delivery
- **WHEN** any of the three linear regression CSV files is served
- **THEN** its size SHALL NOT exceed ~200KB and its row count SHALL NOT exceed ~2000

### Requirement: Dataset selector on the Linear Regression page
The Linear Regression algorithm page SHALL display a selector allowing the user to choose one of the three datasets. Only one dataset SHALL be active at a time, and the default selection SHALL be `salary`.

#### Scenario: Default dataset
- **WHEN** the user first opens the Linear Regression page
- **THEN** the `salary` dataset SHALL be active and its data shown in the DatasetTable

#### Scenario: Switching datasets
- **WHEN** the user selects a different dataset from the selector
- **THEN** the DatasetTable, trained model, metrics, and Python snippet SHALL all update to reflect the newly selected dataset

### Requirement: Per-dataset description
Each dataset SHALL display a short description stating what the dataset is and which variable is being predicted after training.

#### Scenario: Description visibility
- **WHEN** a dataset is selected
- **THEN** a description block SHALL be visible on the page containing (a) a sentence describing the dataset and (b) the name of the target variable being predicted

#### Scenario: i18n for descriptions
- **WHEN** the locale is `pt-BR`
- **THEN** dataset titles and descriptions SHALL display in Portuguese
- **WHEN** the locale is `en`
- **THEN** dataset titles and descriptions SHALL display in English

### Requirement: TypeScript CSV loading and training
The Linear Regression page SHALL load the selected CSV in the browser, parse it in TypeScript, convert it to the standard dataset shape (`features`, `target`, `trainData`, `testData`, `metadata`), and train the in-app linear regression model on the resulting data. The application layer SHALL remain TypeScript; no Python SHALL execute at runtime.

#### Scenario: Parse and train from CSV
- **WHEN** a dataset is selected
- **THEN** the system SHALL fetch the corresponding `.csv`, parse it to numeric rows, perform an 80/20 train/test split, and train the in-app linear regression model on the training split

#### Scenario: Metrics reflect selected dataset
- **WHEN** training completes for the selected dataset
- **THEN** the displayed metrics and predictions SHALL be computed from that dataset's test split
