## ADDED Requirements

### Requirement: Standardized 6-section layout
Each algorithm page SHALL follow a vertical scroll layout with exactly 6 sections in order: Real-World Context, Dataset, How It Works, Training, Prediction, Metrics.

#### Scenario: User navigates to an algorithm page
- **WHEN** the user opens `/[locale]/algorithms/[slug]`
- **THEN** the page renders all 6 sections in the defined order with consistent spacing and typography

### Requirement: Section 1 - Real-World Context
The Real-World Context section SHALL display a title describing the real problem the algorithm solves, a 2-3 paragraph description of a real-world scenario, and 2-3 additional application examples in smaller cards.

#### Scenario: User views context section
- **WHEN** the user scrolls to the Real-World Context section of Linear Regression
- **THEN** the system displays the real estate pricing scenario with additional examples like salary prediction and demand forecasting

### Requirement: Section 2 - Dataset
The Dataset section SHALL display an interactive table showing the algorithm's themed dataset with clear visual separation between training and test data (via tabs or color coding). It SHALL show the number of samples and features.

#### Scenario: User explores dataset
- **WHEN** the user views the Dataset section
- **THEN** the system displays a scrollable table with training data shown by default, a tab/toggle for test data, and a count of samples and features

#### Scenario: User switches to test data
- **WHEN** the user clicks the "Test" tab/toggle
- **THEN** the table updates to show only test data samples

### Requirement: Section 3 - How It Works visualization
The How It Works section SHALL display an interactive D3.js visualization specific to the algorithm, with at least one user-adjustable parameter. A collapsible "See the math" section SHALL show relevant formulas.

#### Scenario: User interacts with visualization
- **WHEN** the user adjusts a parameter (e.g., K slider for KNN)
- **THEN** the visualization updates in real-time to reflect the parameter change

#### Scenario: User expands math section
- **WHEN** the user clicks "See the math"
- **THEN** a collapsible section expands showing the algorithm's mathematical formulas

### Requirement: Section 4 - Training
The Training section SHALL display a hyperparameter panel with adjustable controls (sliders, dropdowns) and a "Train Model" button in a consistent position across all algorithms. Training SHALL show a progress indicator and display a success animation with metrics upon completion.

#### Scenario: User trains a model
- **WHEN** the user adjusts hyperparameters and clicks "Train Model"
- **THEN** the system shows a progress indicator, trains the model client-side, and upon completion displays a success animation followed by training metrics

#### Scenario: Training in progress
- **WHEN** training is running
- **THEN** the "Train Model" button is disabled and a progress bar or animation is visible

### Requirement: Section 5 - Prediction
The Prediction section SHALL display a form with input fields matching the algorithm's features (or image/text input for CNN/Transformers). A "Predict" button in a consistent position SHALL trigger inference and display the result with visual emphasis, including class probabilities for classification.

#### Scenario: User makes a prediction with custom input
- **WHEN** the user fills in feature values and clicks "Predict"
- **THEN** the system runs inference on the trained model and displays the predicted value or class with confidence scores

#### Scenario: User uses pre-filled test sample
- **WHEN** the user selects a pre-filled sample from test data
- **THEN** the input form is populated with that sample's feature values

#### Scenario: Prediction without trained model
- **WHEN** the user clicks "Predict" before training a model
- **THEN** the system displays a message prompting the user to train a model first

### Requirement: Section 6 - Metrics
The Metrics section SHALL display algorithm-appropriate metrics with visual representations. Regression algorithms SHALL show MSE, RMSE, MAE, R². Classification algorithms SHALL show Accuracy, Precision, Recall, F1-Score, and a visual confusion matrix. Deep learning algorithms SHALL additionally show loss curves.

#### Scenario: Metrics for classification algorithm
- **WHEN** the user has trained a Logistic Regression model
- **THEN** the Metrics section displays Accuracy, Precision, Recall, F1-Score as formatted values and a visual confusion matrix

#### Scenario: Metrics for regression algorithm
- **WHEN** the user has trained a Linear Regression model
- **THEN** the Metrics section displays MSE, RMSE, MAE, and R² as formatted values with visual bar/gauge representations

#### Scenario: Loss curves for deep learning
- **WHEN** the user has trained a CNN or Transformers model
- **THEN** the Metrics section additionally displays a training vs validation loss curve chart

### Requirement: Navigation between algorithm pages
Each algorithm page SHALL include navigation to return to the homepage catalog and optionally to navigate to the next/previous algorithm.

#### Scenario: User returns to catalog
- **WHEN** the user clicks the back/home navigation element
- **THEN** the system navigates back to the homepage algorithm catalog
