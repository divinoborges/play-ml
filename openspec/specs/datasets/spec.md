## ADDED Requirements

### Requirement: Themed datasets per algorithm
The system SHALL embed 11 static JSON datasets, one per algorithm, each themed to a real-world problem: Linear Regression (real estate), Logistic Regression (churn), Decision Tree (medical triage), KNN (movie recommendations), SVM (fraud detection), Random Forest (credit analysis), CNN (chest X-rays), Transformers (product review sentiment), K-Means (customer segmentation), RNN (daily temperature time-series), GAN (2D ring distribution for generative modeling).

#### Scenario: Dataset availability
- **WHEN** the system loads any algorithm page
- **THEN** the corresponding themed dataset is available from `/public/datasets/<algorithm-slug>.json`

#### Scenario: K-Means dataset availability
- **WHEN** the system loads the K-Means algorithm page
- **THEN** the customer segmentation dataset is available from `/public/datasets/kmeans.json`

#### Scenario: RNN dataset availability
- **WHEN** the system loads the RNN algorithm page
- **THEN** the temperature time-series dataset is available from `/public/datasets/rnn.json`

#### Scenario: GAN dataset availability
- **WHEN** the system loads the GAN algorithm page
- **THEN** the 2D ring distribution dataset is available from `/public/datasets/gan.json`

### Requirement: Standardized dataset schema
Each dataset JSON file SHALL follow a standardized schema with fields: `features` (array of feature names), `target` (target variable name), `trainData` (array of training samples), `testData` (array of test samples), and `metadata` (object with `description` and `featureDescriptions`). For clustering datasets (K-Means), the `target` field SHALL contain a placeholder value (e.g., `"cluster"`) since clustering is unsupervised.

#### Scenario: Parse any dataset
- **WHEN** the DatasetTable component receives any algorithm's dataset
- **THEN** it can render the data without algorithm-specific parsing logic

#### Scenario: Parse K-Means dataset
- **WHEN** the DatasetTable component receives the K-Means dataset
- **THEN** it renders the feature columns without displaying a target column (since clustering has no labeled target)

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

### Requirement: GAN 2D ring distribution dataset
The GAN dataset SHALL contain ~200 synthetic 2D points sampled from a ring (circle) distribution with added Gaussian noise. The dataset SHALL follow the standard schema with `features: ["x", "y"]`, `target` set to `"label"` (all values `"real"` since these are the target distribution points), and a metadata description. The train/test split SHALL provide at least 150 training points and 50 test points.

#### Scenario: GAN dataset structure
- **WHEN** the system loads the GAN dataset
- **THEN** each sample contains x and y coordinates representing points on a noisy ring distribution

### Requirement: Linear Regression multi-CSV dataset source
The Linear Regression algorithm SHALL source its data from three CSV files under `public/datasets/linear-regression/` instead of a single JSON file. The active dataset SHALL be selectable at runtime from this set: `salary.csv`, `graduate-admissions.csv`, `uber-fares.csv`.

#### Scenario: CSV files are the Linear Regression data source
- **WHEN** the Linear Regression page initializes
- **THEN** it SHALL fetch one of the three CSV files from `public/datasets/linear-regression/` based on the active selection, rather than `public/datasets/linear-regression.json`

#### Scenario: Standard shape after parsing
- **WHEN** a Linear Regression CSV is parsed
- **THEN** it SHALL be converted to the standard dataset shape (`features`, `target`, `trainData`, `testData`, `metadata`) consumed by the DatasetTable and ML engine, with at least 70% of rows in `trainData` and at least 20% in `testData`

### Requirement: Naive Bayes spam-detection dataset
The system SHALL ship a themed Naive Bayes dataset at `public/datasets/naive-bayes.json` containing ~200 synthetic spam-detection samples following the standardized dataset schema (`features`, `target`, `trainData`, `testData`, `metadata`). Features SHALL be numeric: `word_freq_free`, `word_freq_money`, `num_exclamations`, `message_length`. Target SHALL be `is_spam` (0 or 1). The train split SHALL contain at least 70% of samples and the test split at least 20%.

#### Scenario: Naive Bayes dataset availability
- **WHEN** the system loads the Naive Bayes algorithm page
- **THEN** the dataset is available from `/public/datasets/naive-bayes.json`

#### Scenario: Naive Bayes dataset structure
- **WHEN** the DatasetTable receives the Naive Bayes dataset
- **THEN** it renders four numeric feature columns and the `is_spam` target column
