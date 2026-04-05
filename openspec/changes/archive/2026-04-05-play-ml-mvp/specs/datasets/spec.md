## ADDED Requirements

### Requirement: Themed datasets per algorithm
The system SHALL embed 8 static JSON datasets, one per algorithm, each themed to a real-world problem: Linear Regression (real estate), Logistic Regression (churn), Decision Tree (medical triage), KNN (movie recommendations), SVM (fraud detection), Random Forest (credit analysis), CNN (chest X-rays), Transformers (product review sentiment).

#### Scenario: Dataset availability
- **WHEN** the system loads any algorithm page
- **THEN** the corresponding themed dataset is available from `/public/datasets/<algorithm-slug>.json`

### Requirement: Standardized dataset schema
Each dataset JSON file SHALL follow a standardized schema with fields: `features` (array of feature names), `target` (target variable name), `trainData` (array of training samples), `testData` (array of test samples), and `metadata` (object with `description` and `featureDescriptions`).

#### Scenario: Parse any dataset
- **WHEN** the DatasetTable component receives any algorithm's dataset
- **THEN** it can render the data without algorithm-specific parsing logic

### Requirement: Train/test split
Each dataset SHALL include a pre-defined train/test split. The training set SHALL contain at least 70% of the data and the test set at least 20%.

#### Scenario: Dataset split verification
- **WHEN** the system loads the Linear Regression dataset
- **THEN** trainData contains at least 70% of total samples and testData contains at least 20%

### Requirement: CNN image dataset
The CNN dataset SHALL contain ~100-200 chest X-ray images at 64x64 resolution, base64-encoded within a JSON file. Total file size SHALL NOT exceed 2MB. Images SHALL be lazy-loaded.

#### Scenario: CNN dataset loading
- **WHEN** the user navigates to the CNN algorithm page
- **THEN** the image dataset loads asynchronously without blocking page render

### Requirement: Transformers text dataset
The Transformers dataset SHALL contain product review texts with sentiment labels (positive/negative). Texts SHALL be limited to 64 tokens maximum with a vocabulary of ~5000 unique tokens.

#### Scenario: Transformers dataset structure
- **WHEN** the system loads the Transformers dataset
- **THEN** each sample contains a text string and a binary sentiment label
