## ADDED Requirements

### Requirement: RNN algorithm implementation
The system SHALL implement a Recurrent Neural Network (vanilla RNN or LSTM) in `lib/algorithms/rnn.ts` using TensorFlow.js. The model SHALL process sequential input (windowed time-series) and predict the next value. Training SHALL report per-epoch progress via the onProgress callback.

#### Scenario: Train RNN on temperature data
- **WHEN** the engine receives the temperature time-series dataset with hyperparameters (epochs: 10, learningRate: 0.001, hiddenUnits: 32, sequenceLength: 10)
- **THEN** the engine trains an RNN model within 30 seconds and reports per-epoch progress

#### Scenario: RNN fallback on slow hardware
- **WHEN** the first training epoch takes more than 10 seconds
- **THEN** the engine offers to switch to a pre-computed demo mode with pre-calculated results

### Requirement: RNN prediction
The system SHALL support predicting the next value in a sequence given a trained RNN model and input sequence. The prediction result SHALL return the predicted numeric value.

#### Scenario: Predict next temperature
- **WHEN** the engine receives a sequence of 10 temperature values for a trained RNN model
- **THEN** it returns the predicted next temperature value as a numeric result

### Requirement: RNN evaluation metrics
The system SHALL compute regression metrics (MSE, RMSE, MAE, R²) for the RNN model on test data, since RNN performs time-series regression. Additionally, it SHALL return per-epoch training loss history.

#### Scenario: Evaluate RNN model
- **WHEN** the engine evaluates a trained RNN on test sequences
- **THEN** it returns MSE, RMSE, MAE, R², and a training loss history array

### Requirement: RNN registry configuration
The system SHALL register RNN in the algorithm registry with slug `rnn`, category `deepLearning`, algorithmType `regression`, dataset path `/datasets/rnn.json`, and color `#8B5CF6`. Hyperparameters: Epochs (default: 10, min: 1, max: 30, step: 1), Learning Rate (default: 0.001, min: 0.0001, max: 0.01, step: 0.0001), Hidden Units (default: 32, min: 8, max: 128, step: 8), Sequence Length (default: 10, min: 5, max: 30, step: 1).

#### Scenario: RNN appears in algorithm catalog
- **WHEN** the homepage loads the algorithm catalog
- **THEN** RNN appears under the "Deep Learning" category with the purple accent color

### Requirement: RNN visualization
The system SHALL provide an interactive D3.js visualization (`components/visualizations/RNNViz.tsx`) showing: (1) an unrolled RNN diagram with hidden state vectors visualized as heatmaps at each timestep, and (2) a line chart comparing actual vs. predicted values on the test set.

#### Scenario: Visualize RNN architecture
- **WHEN** an RNN model finishes training
- **THEN** the visualization shows the unrolled network processing a sample sequence with hidden state heatmaps

#### Scenario: View prediction chart
- **WHEN** the user views the RNN visualization after training
- **THEN** a line chart displays actual values (solid line) vs. predicted values (dashed line) for the test set

### Requirement: RNN math content
The system SHALL display KaTeX-rendered mathematical formulas for RNN including: the hidden state update equation (h_t = tanh(W_h * h_{t-1} + W_x * x_t + b)), the output equation (y_t = W_y * h_t + b_y), and the loss function (MSE).

#### Scenario: View RNN formulas
- **WHEN** the user expands the math section on the RNN page
- **THEN** the hidden state update, output, and loss function formulas render correctly via KaTeX

### Requirement: RNN code content
The system SHALL provide pseudocode for the RNN forward pass, showing the sequential processing of input through hidden states and the prediction output.

#### Scenario: View RNN pseudocode
- **WHEN** the user expands the code section on the RNN page
- **THEN** pseudocode for the RNN forward pass is displayed with syntax highlighting

### Requirement: RNN i18n
The system SHALL provide translations in English and Portuguese (pt-BR) for all RNN content: algorithm name, summary, real-world context title and description, feature descriptions, and UI labels.

#### Scenario: RNN page in Portuguese
- **WHEN** the user switches to pt-BR locale on the RNN page
- **THEN** all text content displays in Portuguese including algorithm name, summary, and context description
