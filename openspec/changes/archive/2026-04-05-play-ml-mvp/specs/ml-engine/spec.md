## ADDED Requirements

### Requirement: Classical algorithm training
The ML engine SHALL support training 6 classical algorithms client-side: Linear Regression, Logistic Regression, Decision Tree, KNN, SVM, and Random Forest. Training SHALL accept a dataset and hyperparameters, and return a trained model object.

#### Scenario: Train Linear Regression
- **WHEN** the engine receives a real estate dataset with hyperparameters (learning rate: 0.01, iterations: 1000)
- **THEN** the engine trains a Linear Regression model and returns it within 5 seconds

#### Scenario: Train all classical algorithms
- **WHEN** the engine trains any of the 6 classical algorithms with their respective datasets
- **THEN** each model trains successfully within 5 seconds on a 2020+ laptop

### Requirement: Deep learning training
The ML engine SHALL support training CNN and Transformers models client-side via TensorFlow.js. CNN SHALL train on a reduced image dataset. Transformers SHALL use a minimal encoder-only architecture (2 layers, ~5000 vocab, max 64 tokens).

#### Scenario: Train CNN model
- **WHEN** the engine receives the chest X-ray dataset with hyperparameters (epochs: 10, batch size: 16, learning rate: 0.001)
- **THEN** the engine trains a CNN model within 30 seconds and reports per-epoch progress

#### Scenario: Train Transformers model
- **WHEN** the engine receives the sentiment analysis dataset with hyperparameters (epochs: 5, learning rate: 0.001, attention heads: 2)
- **THEN** the engine trains a Transformer model within 30 seconds and reports per-epoch progress

#### Scenario: Transformers fallback on slow hardware
- **WHEN** the first training epoch takes more than 10 seconds
- **THEN** the engine offers to switch to a pre-computed demo mode with pre-calculated results

### Requirement: Prediction inference
The ML engine SHALL support running predictions on a trained model given new input features. For classification, it SHALL return class labels with probability scores. For regression, it SHALL return the predicted numeric value.

#### Scenario: Classification prediction
- **WHEN** the engine receives input features for a trained Logistic Regression model
- **THEN** it returns the predicted class and probability scores for each class

#### Scenario: Regression prediction
- **WHEN** the engine receives input features for a trained Linear Regression model
- **THEN** it returns the predicted numeric value

### Requirement: Model evaluation
The ML engine SHALL compute evaluation metrics on test data after training. For regression: MSE, RMSE, MAE, R². For classification: Accuracy, Precision, Recall, F1-Score, and confusion matrix data. For deep learning: additionally, per-epoch training and validation loss.

#### Scenario: Evaluate classification model
- **WHEN** the engine evaluates a trained Decision Tree on test data
- **THEN** it returns Accuracy, Precision, Recall, F1-Score, and a confusion matrix as structured data

#### Scenario: Evaluate regression model
- **WHEN** the engine evaluates a trained Linear Regression on test data
- **THEN** it returns MSE, RMSE, MAE, and R² as numeric values

### Requirement: Hyperparameter configuration
Each algorithm SHALL expose a defined set of configurable hyperparameters with default values, min/max ranges, and step sizes for slider controls.

#### Scenario: Retrieve hyperparameters for KNN
- **WHEN** the system requests KNN's hyperparameter config
- **THEN** it returns K (default: 5, min: 1, max: 20, step: 1) and distance metric (options: euclidean, manhattan)
