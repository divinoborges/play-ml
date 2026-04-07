## ADDED Requirements

### Requirement: Naive Bayes spam-detection dataset
The system SHALL ship a themed Naive Bayes dataset at `public/datasets/naive-bayes.json` containing ~200 synthetic spam-detection samples following the standardized dataset schema (`features`, `target`, `trainData`, `testData`, `metadata`). Features SHALL be numeric: `word_freq_free`, `word_freq_money`, `num_exclamations`, `message_length`. Target SHALL be `is_spam` (0 or 1). The train split SHALL contain at least 70% of samples and the test split at least 20%.

#### Scenario: Naive Bayes dataset availability
- **WHEN** the system loads the Naive Bayes algorithm page
- **THEN** the dataset is available from `/public/datasets/naive-bayes.json`

#### Scenario: Naive Bayes dataset structure
- **WHEN** the DatasetTable receives the Naive Bayes dataset
- **THEN** it renders four numeric feature columns and the `is_spam` target column
