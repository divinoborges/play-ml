## ADDED Requirements

### Requirement: Naive Bayes algorithm page
The system SHALL provide a Naive Bayes algorithm page at `/[locale]/algorithms/naive-bayes` following the same section layout as other classification algorithm pages (real-world context, dataset, how it works + math + code, training, prediction).

#### Scenario: Page renders
- **WHEN** the user navigates to `/algorithms/naive-bayes`
- **THEN** the page renders the real-world context, dataset table, visualization, training controls, and prediction form without errors

#### Scenario: Listed on homepage
- **WHEN** the user opens the homepage
- **THEN** Naive Bayes appears in the classification section with a link to its page

### Requirement: Gaussian Naive Bayes module
The system SHALL expose a `naive-bayes` algorithm module implementing `AlgorithmModule` (`train`, `predict`, `evaluate`) using Gaussian Naive Bayes over numeric features. The module SHALL support binary classification and return class probabilities from `predict`.

#### Scenario: Train and evaluate
- **WHEN** the user clicks Train on the Naive Bayes page with the default hyperparameters
- **THEN** a model is trained on the train split and classification metrics (accuracy, precision, recall, F1) are computed on the test split

#### Scenario: Prediction with probabilities
- **WHEN** the user submits a sample to the prediction form
- **THEN** the returned `PredictionResult` contains a `value` (predicted class) and a `probabilities` object with an entry for each class summing to ~1.0

#### Scenario: Variance smoothing hyperparameter
- **WHEN** the user changes the `varSmoothing` hyperparameter and retrains
- **THEN** the model training uses the new smoothing value and metrics may change accordingly

### Requirement: Spam-detection themed dataset
The Naive Bayes dataset SHALL contain ~200 synthetic spam-detection samples following the standardized dataset schema, with numeric features (`word_freq_free`, `word_freq_money`, `num_exclamations`, `message_length`) and a binary target `is_spam`. The train split SHALL contain at least 70% of samples and the test split at least 20%.

#### Scenario: Dataset loads
- **WHEN** the Naive Bayes page initializes
- **THEN** the dataset at `/datasets/naive-bayes.json` loads and is rendered by the DatasetTable with the feature columns and `is_spam` as the target

### Requirement: Probability visualization
The Naive Bayes page SHALL include a visualization showing the per-class Gaussian distributions for a selected feature, with training points from each class plotted underneath.

#### Scenario: Visualization renders
- **WHEN** the How It Works section is visible
- **THEN** two Gaussian curves (one per class) are rendered along with training point markers colored by class

### Requirement: Math and code content
The system SHALL provide math content (Bayes' theorem + Gaussian likelihood) and a Python code snippet (using `sklearn.naive_bayes.GaussianNB`) accessible through the "See the Math" and "See the Code" toggles.

#### Scenario: Math toggle
- **WHEN** the user clicks "See the Math" on the Naive Bayes page
- **THEN** an explanation of Bayes' theorem and the Gaussian likelihood is displayed

#### Scenario: Code toggle
- **WHEN** the user clicks "See the Code" on the Naive Bayes page
- **THEN** a Python snippet using `sklearn.naive_bayes.GaussianNB` is displayed with Dracula-themed syntax highlighting

### Requirement: Internationalization
All user-facing strings for the Naive Bayes page (name, context, hyperparameter labels, dataset descriptions) SHALL be provided in both `en` and `pt-BR` locales.

#### Scenario: Portuguese labels
- **WHEN** the locale is `pt-BR`
- **THEN** the Naive Bayes page renders its name, context, and labels in Portuguese
