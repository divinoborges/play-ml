## MODIFIED Requirements

### Requirement: Deep learning training
The ML engine SHALL support training CNN, Transformers, RNN, and GAN models client-side. CNN SHALL train on a reduced image dataset. Transformers SHALL use a minimal encoder-only architecture (2 layers, ~5000 vocab, max 64 tokens). RNN SHALL use a simple recurrent architecture with configurable hidden units for time-series prediction. GAN SHALL train a Generator and Discriminator adversarially on a 2D point distribution.

#### Scenario: Train CNN model
- **WHEN** the engine receives the chest X-ray dataset with hyperparameters (epochs: 10, batch size: 16, learning rate: 0.001)
- **THEN** the engine trains a CNN model within 30 seconds and reports per-epoch progress

#### Scenario: Train Transformers model
- **WHEN** the engine receives the sentiment analysis dataset with hyperparameters (epochs: 5, learning rate: 0.001, attention heads: 2)
- **THEN** the engine trains a Transformer model within 30 seconds and reports per-epoch progress

#### Scenario: Train RNN model
- **WHEN** the engine receives the temperature time-series dataset with hyperparameters (epochs: 10, learning rate: 0.001, hidden units: 32, sequence length: 10)
- **THEN** the engine trains an RNN model within 30 seconds and reports per-epoch progress

#### Scenario: Train GAN model
- **WHEN** the engine receives the 2D ring dataset with hyperparameters (epochs: 500, learning rate: 0.01, hidden units: 16)
- **THEN** the engine trains Generator and Discriminator within 10 seconds and reports per-epoch progress

#### Scenario: Transformers fallback on slow hardware
- **WHEN** the first training epoch takes more than 10 seconds
- **THEN** the engine offers to switch to a pre-computed demo mode with pre-calculated results

### Requirement: Prediction inference
The ML engine SHALL support running predictions on a trained model given new input features. For classification, it SHALL return class labels with probability scores. For regression, it SHALL return the predicted numeric value. For clustering, it SHALL return the assigned cluster index and distance to centroid. For generative models, it SHALL generate new samples from the trained Generator.

#### Scenario: Classification prediction
- **WHEN** the engine receives input features for a trained Logistic Regression model
- **THEN** it returns the predicted class and probability scores for each class

#### Scenario: Regression prediction
- **WHEN** the engine receives input features for a trained Linear Regression model
- **THEN** it returns the predicted numeric value

#### Scenario: Clustering prediction
- **WHEN** the engine receives input features for a trained K-Means model
- **THEN** it returns the assigned cluster index and distance to the nearest centroid

#### Scenario: Generative sample generation
- **WHEN** the engine receives a trained GAN model with a generation request
- **THEN** it returns a batch of generated 2D sample coordinates

### Requirement: Model evaluation
The ML engine SHALL compute evaluation metrics on test data after training. For regression: MSE, RMSE, MAE, R². For classification: Accuracy, Precision, Recall, F1-Score, and confusion matrix data. For deep learning: additionally, per-epoch training and validation loss. For clustering: inertia and silhouette score. For generative models: generator loss and discriminator loss.

#### Scenario: Evaluate classification model
- **WHEN** the engine evaluates a trained Decision Tree on test data
- **THEN** it returns Accuracy, Precision, Recall, F1-Score, and a confusion matrix as structured data

#### Scenario: Evaluate regression model
- **WHEN** the engine evaluates a trained Linear Regression on test data
- **THEN** it returns MSE, RMSE, MAE, and R² as numeric values

#### Scenario: Evaluate clustering model
- **WHEN** the engine evaluates a trained K-Means model
- **THEN** it returns inertia (within-cluster sum of squares) and silhouette score (-1 to 1)

#### Scenario: Evaluate generative model
- **WHEN** the engine evaluates a trained GAN model
- **THEN** it returns generatorLoss and discriminatorLoss as numeric values

### Requirement: Hyperparameter configuration
Each algorithm SHALL expose a defined set of configurable hyperparameters with default values, min/max ranges, and step sizes for slider controls.

#### Scenario: Retrieve hyperparameters for KNN
- **WHEN** the system requests KNN's hyperparameter config
- **THEN** it returns K (default: 5, min: 1, max: 20, step: 1) and distance metric (options: euclidean, manhattan)

#### Scenario: Retrieve hyperparameters for GAN
- **WHEN** the system requests GAN's hyperparameter config
- **THEN** it returns Epochs (default: 500), Learning Rate (default: 0.01), and Hidden Units (default: 16)
