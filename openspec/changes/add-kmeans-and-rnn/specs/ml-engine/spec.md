## MODIFIED Requirements

### Requirement: Classical algorithm training
The ML engine SHALL support training 6 classical algorithms client-side: Linear Regression, Logistic Regression, Decision Tree, KNN, SVM, and Random Forest. Training SHALL accept a dataset and hyperparameters, and return a trained model object. Additionally, the engine SHALL support training K-Means clustering, which follows the same `AlgorithmModule` interface but returns `ClusteringMetrics` instead of classification or regression metrics.

#### Scenario: Train Linear Regression
- **WHEN** the engine receives a real estate dataset with hyperparameters (learning rate: 0.01, iterations: 1000)
- **THEN** the engine trains a Linear Regression model and returns it within 5 seconds

#### Scenario: Train all classical algorithms
- **WHEN** the engine trains any of the 6 classical algorithms with their respective datasets
- **THEN** each model trains successfully within 5 seconds on a 2020+ laptop

#### Scenario: Train K-Means clustering
- **WHEN** the engine trains K-Means with the customer segmentation dataset and hyperparameters (k: 3, maxIterations: 100)
- **THEN** the engine returns a trained model with ClusteringMetrics (inertia, silhouetteScore) within 5 seconds

### Requirement: Deep learning training
The ML engine SHALL support training CNN, Transformers, and RNN models client-side via TensorFlow.js. CNN SHALL train on a reduced image dataset. Transformers SHALL use a minimal encoder-only architecture (2 layers, ~5000 vocab, max 64 tokens). RNN SHALL use a simple recurrent architecture with configurable hidden units for time-series prediction.

#### Scenario: Train CNN model
- **WHEN** the engine receives the chest X-ray dataset with hyperparameters (epochs: 10, batch size: 16, learning rate: 0.001)
- **THEN** the engine trains a CNN model within 30 seconds and reports per-epoch progress

#### Scenario: Train Transformers model
- **WHEN** the engine receives the sentiment analysis dataset with hyperparameters (epochs: 5, learning rate: 0.001, attention heads: 2)
- **THEN** the engine trains a Transformer model within 30 seconds and reports per-epoch progress

#### Scenario: Train RNN model
- **WHEN** the engine receives the temperature time-series dataset with hyperparameters (epochs: 10, learning rate: 0.001, hidden units: 32, sequence length: 10)
- **THEN** the engine trains an RNN model within 30 seconds and reports per-epoch progress

#### Scenario: Transformers fallback on slow hardware
- **WHEN** the first training epoch takes more than 10 seconds
- **THEN** the engine offers to switch to a pre-computed demo mode with pre-calculated results

### Requirement: Prediction inference
The ML engine SHALL support running predictions on a trained model given new input features. For classification, it SHALL return class labels with probability scores. For regression, it SHALL return the predicted numeric value. For clustering, it SHALL return the assigned cluster index and distance to centroid.

#### Scenario: Classification prediction
- **WHEN** the engine receives input features for a trained Logistic Regression model
- **THEN** it returns the predicted class and probability scores for each class

#### Scenario: Regression prediction
- **WHEN** the engine receives input features for a trained Linear Regression model
- **THEN** it returns the predicted numeric value

#### Scenario: Clustering prediction
- **WHEN** the engine receives input features for a trained K-Means model
- **THEN** it returns the assigned cluster index and distance to the nearest centroid

### Requirement: Model evaluation
The ML engine SHALL compute evaluation metrics on test data after training. For regression: MSE, RMSE, MAE, R². For classification: Accuracy, Precision, Recall, F1-Score, and confusion matrix data. For deep learning: additionally, per-epoch training and validation loss. For clustering: inertia and silhouette score.

#### Scenario: Evaluate classification model
- **WHEN** the engine evaluates a trained Decision Tree on test data
- **THEN** it returns Accuracy, Precision, Recall, F1-Score, and a confusion matrix as structured data

#### Scenario: Evaluate regression model
- **WHEN** the engine evaluates a trained Linear Regression on test data
- **THEN** it returns MSE, RMSE, MAE, and R² as numeric values

#### Scenario: Evaluate clustering model
- **WHEN** the engine evaluates a trained K-Means model
- **THEN** it returns inertia (within-cluster sum of squares) and silhouette score (-1 to 1)

### Requirement: Hyperparameter configuration
Each algorithm SHALL expose a defined set of configurable hyperparameters with default values, min/max ranges, and step sizes for slider controls.

#### Scenario: Retrieve hyperparameters for KNN
- **WHEN** the system requests KNN's hyperparameter config
- **THEN** it returns K (default: 5, min: 1, max: 20, step: 1) and distance metric (options: euclidean, manhattan)

#### Scenario: Retrieve hyperparameters for K-Means
- **WHEN** the system requests K-Means's hyperparameter config
- **THEN** it returns K (default: 3, min: 2, max: 10, step: 1) and Max Iterations (default: 100, min: 10, max: 500, step: 10)

#### Scenario: Retrieve hyperparameters for RNN
- **WHEN** the system requests RNN's hyperparameter config
- **THEN** it returns Epochs (default: 10), Learning Rate (default: 0.001), Hidden Units (default: 32), and Sequence Length (default: 10)
