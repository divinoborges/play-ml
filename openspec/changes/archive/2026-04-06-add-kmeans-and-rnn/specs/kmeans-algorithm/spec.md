## ADDED Requirements

### Requirement: K-Means algorithm implementation
The system SHALL implement the K-Means clustering algorithm (Lloyd's algorithm) from scratch in `lib/algorithms/kmeans.ts`. The implementation SHALL support configurable K (number of clusters), max iterations, and initialization method. It SHALL track centroid positions at each iteration for visualization.

#### Scenario: Train K-Means on customer segmentation data
- **WHEN** the engine receives the customer segmentation dataset with hyperparameters (k: 3, maxIterations: 100)
- **THEN** the engine assigns each data point to a cluster, returns centroid positions, and completes within 5 seconds

#### Scenario: K-Means convergence
- **WHEN** centroids stop moving (distance change < 0.001) before reaching maxIterations
- **THEN** the algorithm terminates early and reports the actual number of iterations used

### Requirement: K-Means prediction (cluster assignment)
The system SHALL support assigning new data points to the nearest cluster centroid after training. The prediction result SHALL return the cluster label (0-based index) and the distance to the assigned centroid.

#### Scenario: Assign new point to cluster
- **WHEN** the engine receives a new data point for a trained K-Means model
- **THEN** it returns the nearest cluster index and distance to that cluster's centroid

### Requirement: K-Means evaluation metrics
The system SHALL compute clustering-specific evaluation metrics: inertia (within-cluster sum of squares) and silhouette score (cohesion vs. separation). These SHALL be displayed in a `ClusteringMetrics` format compatible with MetricsPanel.

#### Scenario: Evaluate K-Means model
- **WHEN** the engine evaluates a trained K-Means model
- **THEN** it returns inertia (numeric) and silhouette score (range -1 to 1) as structured metrics

### Requirement: K-Means registry configuration
The system SHALL register K-Means in the algorithm registry with slug `kmeans`, category `clustering`, algorithmType `clustering`, dataset path `/datasets/kmeans.json`, and color `#F59E0B`. Hyperparameters: K (default: 3, min: 2, max: 10, step: 1), Max Iterations (default: 100, min: 10, max: 500, step: 10).

#### Scenario: K-Means appears in algorithm catalog
- **WHEN** the homepage loads the algorithm catalog
- **THEN** K-Means appears under a "Clustering" category filter with the orange accent color

### Requirement: K-Means visualization
The system SHALL provide an interactive D3.js visualization (`components/visualizations/KMeansViz.tsx`) showing a 2D scatter plot of data points colored by cluster assignment, Voronoi regions around centroids, and animated centroid movement across training iterations. Users SHALL be able to step through iterations or auto-play the convergence animation.

#### Scenario: Visualize cluster formation
- **WHEN** a K-Means model finishes training
- **THEN** the visualization shows data points colored by cluster, centroid markers, and Voronoi boundary regions

#### Scenario: Iterate through training steps
- **WHEN** the user clicks the step/play controls on the visualization
- **THEN** centroids animate to their next position and point colors update to reflect new assignments

### Requirement: K-Means math content
The system SHALL display KaTeX-rendered mathematical formulas for K-Means including: the objective function (minimize within-cluster sum of squares), the assignment step formula, the update step formula, and silhouette score formula.

#### Scenario: View K-Means formulas
- **WHEN** the user expands the math section on the K-Means page
- **THEN** the objective function, assignment step, and update step formulas render correctly via KaTeX

### Requirement: K-Means code content
The system SHALL provide pseudocode for the K-Means algorithm showing initialization, the assignment-update loop, and convergence check.

#### Scenario: View K-Means pseudocode
- **WHEN** the user expands the code section on the K-Means page
- **THEN** pseudocode for Lloyd's algorithm is displayed with syntax highlighting

### Requirement: K-Means i18n
The system SHALL provide translations in English and Portuguese (pt-BR) for all K-Means content: algorithm name, summary, real-world context title and description, feature descriptions, and UI labels.

#### Scenario: K-Means page in Portuguese
- **WHEN** the user switches to pt-BR locale on the K-Means page
- **THEN** all text content displays in Portuguese including algorithm name, summary, and context description
