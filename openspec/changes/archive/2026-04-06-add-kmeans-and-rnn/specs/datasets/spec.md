## MODIFIED Requirements

### Requirement: Themed datasets per algorithm
The system SHALL embed 10 static JSON datasets, one per algorithm, each themed to a real-world problem: Linear Regression (real estate), Logistic Regression (churn), Decision Tree (medical triage), KNN (movie recommendations), SVM (fraud detection), Random Forest (credit analysis), CNN (chest X-rays), Transformers (product review sentiment), K-Means (customer segmentation), RNN (daily temperature time-series).

#### Scenario: Dataset availability
- **WHEN** the system loads any algorithm page
- **THEN** the corresponding themed dataset is available from `/public/datasets/<algorithm-slug>.json`

#### Scenario: K-Means dataset availability
- **WHEN** the system loads the K-Means algorithm page
- **THEN** the customer segmentation dataset is available from `/public/datasets/kmeans.json`

#### Scenario: RNN dataset availability
- **WHEN** the system loads the RNN algorithm page
- **THEN** the temperature time-series dataset is available from `/public/datasets/rnn.json`

### Requirement: Standardized dataset schema
Each dataset JSON file SHALL follow a standardized schema with fields: `features` (array of feature names), `target` (target variable name), `trainData` (array of training samples), `testData` (array of test samples), and `metadata` (object with `description` and `featureDescriptions`). For clustering datasets (K-Means), the `target` field SHALL contain a placeholder value (e.g., `"cluster"`) since clustering is unsupervised; the actual cluster labels are not present in the raw data.

#### Scenario: Parse any dataset
- **WHEN** the DatasetTable component receives any algorithm's dataset
- **THEN** it can render the data without algorithm-specific parsing logic

#### Scenario: Parse K-Means dataset
- **WHEN** the DatasetTable component receives the K-Means dataset
- **THEN** it renders the feature columns without displaying a target column (since clustering has no labeled target)

## ADDED Requirements

### Requirement: K-Means customer segmentation dataset
The K-Means dataset SHALL contain ~200 synthetic customer records with 2-3 numeric features (annual spending, visit frequency, average purchase value) exhibiting natural cluster structure (3-5 implicit groups). The dataset SHALL follow the standard schema with `target` set to `"cluster"`.

#### Scenario: K-Means dataset structure
- **WHEN** the system loads the K-Means dataset
- **THEN** each sample contains numeric features for spending, frequency, and purchase value without pre-assigned cluster labels

### Requirement: RNN temperature time-series dataset
The RNN dataset SHALL contain ~365 synthetic daily temperature records with a clear seasonal pattern. Features SHALL include windowed previous temperatures (e.g., previous 10 days). Target SHALL be the next-day temperature. The dataset SHALL be pre-processed into sequence windows for the train/test split.

#### Scenario: RNN dataset structure
- **WHEN** the system loads the RNN dataset
- **THEN** each sample contains a sequence of previous temperature values as features and the next temperature as the target
