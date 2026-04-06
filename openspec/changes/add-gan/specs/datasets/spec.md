## MODIFIED Requirements

### Requirement: Themed datasets per algorithm
The system SHALL embed 11 static JSON datasets, one per algorithm, each themed to a real-world problem: Linear Regression (real estate), Logistic Regression (churn), Decision Tree (medical triage), KNN (movie recommendations), SVM (fraud detection), Random Forest (credit analysis), CNN (chest X-rays), Transformers (product review sentiment), K-Means (customer segmentation), RNN (daily temperature time-series), GAN (2D ring distribution for generative modeling).

#### Scenario: Dataset availability
- **WHEN** the system loads any algorithm page
- **THEN** the corresponding themed dataset is available from `/public/datasets/<algorithm-slug>.json`

#### Scenario: GAN dataset availability
- **WHEN** the system loads the GAN algorithm page
- **THEN** the 2D ring distribution dataset is available from `/public/datasets/gan.json`

## ADDED Requirements

### Requirement: GAN 2D ring distribution dataset
The GAN dataset SHALL contain ~200 synthetic 2D points sampled from a ring (circle) distribution with added Gaussian noise. The dataset SHALL follow the standard schema with `features: ["x", "y"]`, `target` set to `"label"` (all values `"real"` since these are the target distribution points), and a metadata description. The train/test split SHALL provide at least 150 training points and 50 test points.

#### Scenario: GAN dataset structure
- **WHEN** the system loads the GAN dataset
- **THEN** each sample contains x and y coordinates representing points on a noisy ring distribution
