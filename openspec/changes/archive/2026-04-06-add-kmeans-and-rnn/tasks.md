## 1. Type System & Infrastructure

- [x] 1.1 Add `"clustering"` to `AlgorithmCategory` and `AlgorithmType` unions in `lib/registry.ts`
- [x] 1.2 Add `ClusteringMetrics` type to `components/shared/MetricsPanel` (inertia, silhouetteScore, numClusters)
- [x] 1.3 Update `TrainResult` metrics union in `lib/algorithms/types.ts` to include `ClusteringMetrics`
- [x] 1.4 Update `MetricsPanel` component to render clustering metrics (inertia, silhouette score)

## 2. K-Means Algorithm

- [x] 2.1 Create `lib/algorithms/kmeans.ts` implementing Lloyd's algorithm with iteration tracking
- [x] 2.2 Register K-Means module in `lib/algorithms/index.ts`
- [x] 2.3 Add K-Means config to `lib/registry.ts` (slug: `kmeans`, category: `clustering`, color: `#F59E0B`)
- [x] 2.4 Create `public/datasets/kmeans.json` (customer segmentation, ~200 samples, 3 features)
- [x] 2.5 Create `components/visualizations/KMeansViz.tsx` (scatter plot + Voronoi + centroid animation)
- [x] 2.6 Register KMeansViz in `components/visualizations/index.ts`
- [x] 2.7 Add K-Means math formulas to `lib/math-content.tsx` (objective, assignment, update, silhouette)
- [x] 2.8 Add K-Means pseudocode to `lib/code-content.ts`
- [x] 2.9 Add K-Means translations to `messages/en.json` (name, summary, context, features)
- [x] 2.10 Add K-Means translations to `messages/pt-BR.json`

## 3. RNN Algorithm

- [x] 3.1 Create `lib/algorithms/rnn.ts` implementing simple RNN/LSTM with TensorFlow.js
- [x] 3.2 Register RNN module in `lib/algorithms/index.ts`
- [x] 3.3 Add RNN config to `lib/registry.ts` (slug: `rnn`, category: `deepLearning`, color: `#8B5CF6`)
- [x] 3.4 Create `public/datasets/rnn.json` (temperature time-series, ~365 samples, windowed sequences)
- [x] 3.5 Create `components/visualizations/RNNViz.tsx` (unrolled RNN diagram + hidden state heatmap + prediction chart)
- [x] 3.6 Register RNNViz in `components/visualizations/index.ts`
- [x] 3.7 Add RNN math formulas to `lib/math-content.tsx` (hidden state update, output, MSE loss)
- [x] 3.8 Add RNN pseudocode to `lib/code-content.ts`
- [x] 3.9 Add RNN translations to `messages/en.json` (name, summary, context, features)
- [x] 3.10 Add RNN translations to `messages/pt-BR.json`

## 4. UI Integration

- [x] 4.1 Add "Clustering" category filter option to `AlgorithmCatalog` component
- [x] 4.2 Add clustering category translations to `messages/en.json` and `messages/pt-BR.json`
- [x] 4.3 Update `AlgorithmPageClient` to handle clustering prediction UI (show "Cluster Assignment" instead of "Prediction")
- [x] 4.4 Handle K-Means dataset display in DatasetTable (no target column for unsupervised data)

## 5. Validation & Testing

- [x] 5.1 Verify K-Means trains and converges on the customer segmentation dataset
- [x] 5.2 Verify RNN trains and produces predictions on the temperature dataset
- [x] 5.3 Verify both algorithm pages render correctly in en and pt-BR locales
- [x] 5.4 Verify homepage catalog shows all 10 algorithms with correct category filters
- [x] 5.5 Run full build (`next build`) and fix any type errors or build issues
