## Context

PlayML is an educational ML platform with 8 algorithms across 3 categories (regression, classification, deep learning). All training runs client-side in the browser. The platform uses a pluggable `AlgorithmModule` interface (`train`, `predict`, `evaluate`) with typed results, a central registry, D3.js visualizations, KaTeX math formulas, and full i18n (en + pt-BR).

The current type system assumes all algorithms are either "regression" or "classification" (`AlgorithmType`), and the `AlgorithmCategory` union is `"regression" | "classification" | "deepLearning"`. K-Means clustering is an unsupervised algorithm that doesn't fit the existing supervised learning patterns — it has no labeled target variable and uses different metrics (inertia, silhouette score instead of accuracy/F1).

## Goals / Non-Goals

**Goals:**
- Add K-Means as a fully interactive clustering algorithm with a new "clustering" category
- Add RNN as a deep learning algorithm for time-series/sequence prediction
- Extend the type system to support unsupervised learning without breaking existing algorithms
- Provide educational visualizations: animated centroid convergence for K-Means, hidden-state flow for RNN
- Keep all training client-side with sub-30s training times

**Non-Goals:**
- Supporting arbitrary unsupervised algorithms beyond K-Means (e.g., DBSCAN, hierarchical clustering)
- Full TensorFlow.js RNN implementation — a lightweight custom or simplified approach is preferred for educational clarity and performance
- Real-time streaming data for RNN
- GPU acceleration requirements

## Decisions

### 1. Extend type system for unsupervised learning

**Decision**: Add `"clustering"` to both `AlgorithmCategory` and `AlgorithmType`. Introduce a `ClusteringMetrics` type (inertia, silhouetteScore, numClusters) alongside existing `RegressionMetrics` and `ClassificationMetrics`. The `AlgorithmModule` interface stays the same — K-Means will use the `target` parameter as a hint but internally ignore labels.

**Alternatives considered**:
- Separate `UnsupervisedModule` interface — rejected because it doubles the integration surface and the existing interface is flexible enough (model is `unknown`, metrics union can be extended).
- Treat K-Means as classification — rejected because it misrepresents the algorithm's nature and confuses learners.

**Rationale**: Minimal type changes, no breaking changes to existing code, MetricsPanel just needs a new branch for clustering metrics.

### 2. K-Means implementation: custom from scratch

**Decision**: Implement K-Means from scratch (Lloyd's algorithm) rather than using an external library.

**Alternatives considered**:
- `ml-kmeans` npm package — exists but adds a dependency for a ~50-line algorithm.
- TensorFlow.js — overkill for K-Means.

**Rationale**: K-Means is simple enough that a custom implementation is more educational (students can see the actual code), has zero dependency overhead, and allows step-by-step iteration tracking for the visualization.

### 3. RNN implementation: simplified custom with TensorFlow.js

**Decision**: Implement a simple vanilla RNN (or LSTM cell) using TensorFlow.js for time-series prediction. The dataset will be temperature or stock-like synthetic data where the model predicts the next value in a sequence.

**Alternatives considered**:
- Pure custom implementation without TensorFlow.js — rejected because matrix operations for backpropagation through time are complex and error-prone in vanilla JS.
- Using the existing Transformers pattern (which already uses TF.js) — good precedent, RNN follows the same deep learning training pattern with epochs and batch progress.

**Rationale**: TF.js is already a project dependency (used by CNN and Transformers). RNN fits the existing deep learning training pattern with epochs, batch size, and progress callbacks.

### 4. K-Means visualization: animated Voronoi + centroid convergence

**Decision**: D3.js scatter plot showing data points colored by cluster assignment, with Voronoi regions and animated centroid movement across iterations. Users can step through iterations or auto-play.

**Rationale**: Centroid convergence is the most educational aspect of K-Means — seeing clusters form iteration by iteration builds intuition.

### 5. RNN visualization: sequence flow with hidden state

**Decision**: D3.js diagram showing the unrolled RNN processing a sequence step by step, with hidden state vectors visualized as heatmaps at each timestep. Includes a prediction chart showing actual vs. predicted values.

**Rationale**: The hidden state is what makes RNNs unique — visualizing how information flows through time steps is the key educational insight.

### 6. K-Means dataset: customer segmentation

**Decision**: Synthetic customer segmentation dataset with 2-3 numeric features (e.g., annual spending, visit frequency, avg purchase value). 200 samples with natural cluster structure.

**Rationale**: Customer segmentation is a classic, relatable K-Means use case. Using 2-3 features keeps the scatter plot visualization meaningful.

### 7. RNN dataset: temperature time-series

**Decision**: Synthetic daily temperature dataset with a clear seasonal pattern. Features: day-of-year, previous N temperatures. Target: next-day temperature.

**Rationale**: Temperature prediction is intuitive, has clear sequential patterns, and avoids the complexity of financial data while demonstrating RNN's strength with temporal dependencies.

### 8. New "clustering" category color

**Decision**: Use an orange/amber accent color (`#F59E0B`) for the clustering category, distinct from blue (regression), green (classification), and purple (deep learning).

**Rationale**: Follows the Neo-Pop bold color palette. Orange is visually distinct from existing category colors.

## Risks / Trade-offs

- **[K-Means predict semantics]** K-Means "prediction" means assigning a new point to the nearest centroid, which differs from supervised prediction. → Mitigation: The predict function assigns the nearest cluster; the UI labels this as "Cluster Assignment" rather than "Prediction".

- **[RNN training performance]** RNN training in the browser may be slow on older hardware. → Mitigation: Use small sequence lengths (10-20 steps), limited hidden units (16-32), and implement the same fallback pattern used by Transformers (pre-computed demo mode if first epoch > 10s).

- **[MetricsPanel changes]** Adding clustering metrics requires MetricsPanel to handle a third metric type. → Mitigation: Add a simple conditional branch; clustering metrics are simpler than classification (no confusion matrix needed, just inertia + silhouette score).

- **[Category filter on homepage]** Adding a fourth category requires updating the AlgorithmCatalog filter buttons. → Mitigation: The filter already uses `getAlgorithmsByCategory` dynamically — just needs the new category option added to the filter UI and translations.
