## ADDED Requirements

### Requirement: Per-algorithm interactive visualization
Each of the 8 algorithms SHALL have a dedicated D3.js visualization that illustrates its core mechanism. Each visualization SHALL have at least one interactive parameter the user can adjust in real-time.

#### Scenario: Linear Regression visualization
- **WHEN** the user views the Linear Regression "How It Works" section
- **THEN** the system displays an animated scatter plot with a regression line fitting to data points, showing visible residuals

#### Scenario: Logistic Regression visualization
- **WHEN** the user views the Logistic Regression "How It Works" section
- **THEN** the system displays a sigmoid curve with a threshold slider and a 2D decision boundary plot

#### Scenario: Decision Tree visualization
- **WHEN** the user views the Decision Tree "How It Works" section
- **THEN** the system displays an animated tree building node by node, showing splits and Gini impurity values

#### Scenario: KNN visualization
- **WHEN** the user adjusts the K slider in the KNN visualization
- **THEN** the system updates the neighbor circles around the query point in real-time

#### Scenario: SVM visualization
- **WHEN** the user adjusts the C parameter slider in the SVM visualization
- **THEN** the hyperplane, support vectors, and margin update in real-time

#### Scenario: Random Forest visualization
- **WHEN** the user views the Random Forest "How It Works" section
- **THEN** the system displays multiple trees appearing and "voting", with an ensemble result visualization

#### Scenario: CNN visualization
- **WHEN** the user views the CNN "How It Works" section
- **THEN** the system displays an image passing through convolution layers with visible feature maps and animated kernels

#### Scenario: Transformers visualization
- **WHEN** the user views the Transformers "How It Works" section
- **THEN** the system displays an attention heatmap between tokens and a simplified encoder architecture diagram

### Requirement: Visualization responsiveness
Visualizations SHALL render correctly on desktop viewports (>=1024px). On smaller viewports, visualizations SHALL simplify (e.g., reduce dimensions, use smaller SVG sizes) while remaining functional.

#### Scenario: Desktop rendering
- **WHEN** the viewport width is >=1024px
- **THEN** the visualization renders at full size with all interactive controls visible

#### Scenario: Mobile rendering
- **WHEN** the viewport width is <768px
- **THEN** the visualization renders at a reduced size with simplified controls

### Requirement: Visualization cleanup
Each visualization component SHALL properly clean up D3.js-created SVG elements and event listeners when the component unmounts, preventing memory leaks.

#### Scenario: Component unmount
- **WHEN** the user navigates away from an algorithm page
- **THEN** all D3.js SVG elements and event listeners created by the visualization are removed
