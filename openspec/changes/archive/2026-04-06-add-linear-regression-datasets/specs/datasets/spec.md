## ADDED Requirements

### Requirement: Linear Regression multi-CSV dataset source
The Linear Regression algorithm SHALL source its data from three CSV files under `public/datasets/linear-regression/` instead of a single JSON file. The active dataset SHALL be selectable at runtime from this set: `salary.csv`, `graduate-admissions.csv`, `uber-fares.csv`.

#### Scenario: CSV files are the Linear Regression data source
- **WHEN** the Linear Regression page initializes
- **THEN** it SHALL fetch one of the three CSV files from `public/datasets/linear-regression/` based on the active selection, rather than `public/datasets/linear-regression.json`

#### Scenario: Standard shape after parsing
- **WHEN** a Linear Regression CSV is parsed
- **THEN** it SHALL be converted to the standard dataset shape (`features`, `target`, `trainData`, `testData`, `metadata`) consumed by the DatasetTable and ML engine, with at least 70% of rows in `trainData` and at least 20% in `testData`
