## Why

PlayML currently covers regression, classification, and deep learning with 8 algorithms, but lacks two fundamental ML techniques: **K-Means Clustering** (unsupervised learning) and **Recurrent Neural Networks (RNN)** (sequential/time-series deep learning). Adding these introduces a new algorithm category (clustering/unsupervised) and strengthens the deep learning section, making the platform more comprehensive for learners exploring the ML landscape.

## What Changes

- Add **K-Means Clustering** algorithm — a new unsupervised learning algorithm with interactive cluster visualization, centroid animation, and iteration-based training
- Add **RNN (Recurrent Neural Network)** algorithm — a sequential deep learning model for time-series or sequence prediction with step-by-step hidden-state visualization
- Introduce a new **"Clustering"** algorithm category to the platform alongside existing regression, classification, and deep learning categories
- Create dedicated datasets for each algorithm (e.g., customer segmentation for K-Means, stock/temperature time-series for RNN)
- Add D3.js interactive visualizations for both algorithms
- Add mathematical formulas (KaTeX) and pseudocode content for both algorithms
- Add full i18n support (en + pt-BR) for both algorithms

## Capabilities

### New Capabilities
- `kmeans-algorithm`: K-Means clustering algorithm implementation, dataset, visualization, math/code content, and i18n translations. Introduces the "clustering" category.
- `rnn-algorithm`: Recurrent Neural Network algorithm implementation, dataset, visualization, math/code content, and i18n translations within the deep learning category.

### Modified Capabilities
- `ml-engine`: Add support for unsupervised learning workflows (K-Means does not have a traditional train/predict/evaluate cycle with labeled targets — needs clustering-specific metrics like inertia and silhouette score).
- `datasets`: New dataset files for K-Means (customer segmentation) and RNN (time-series prediction).

## Impact

- **Code**: New files in `lib/algorithms/`, `components/visualizations/`, `lib/registry.ts`, `lib/math-content.tsx`, `lib/code-content.ts`
- **Dependencies**: May need a lightweight library or custom implementation for K-Means and RNN (evaluate existing `ml-*` packages or implement from scratch for educational clarity)
- **UI**: New category filter ("Clustering") on homepage catalog; two new algorithm cards
- **Datasets**: Two new JSON files in `public/datasets/`
- **i18n**: New translation keys in `messages/en.json` and `messages/pt-BR.json`
- **Types**: May need to extend `AlgorithmModule` interface to support unsupervised learning patterns (no labeled target for K-Means)
