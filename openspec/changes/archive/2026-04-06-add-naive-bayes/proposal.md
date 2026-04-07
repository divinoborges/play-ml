## Why

PlayML currently covers logistic regression, decision tree, KNN, SVM, and random forest for classification, but lacks Naive Bayes — a foundational probabilistic classifier whose simplicity and text-classification heritage make it a core piece of any ML learning catalog. Adding it rounds out the classification set and lets learners contrast generative (Naive Bayes) vs discriminative classifiers already on the platform.

## What Changes

- Add a new Naive Bayes algorithm page at `/algorithms/naive-bayes` following the same structure as the other classification algorithms (context → dataset → how it works → training → prediction).
- Implement a Gaussian Naive Bayes module under `lib/algorithms/naive-bayes.ts` conforming to the existing `AlgorithmModule` interface (`train`, `predict`, `evaluate`) and returning class probabilities.
- Ship a themed dataset at `public/datasets/naive-bayes.json` (spam detection — numeric features like word_freq, message_length, etc.) following the standard dataset schema.
- Register the algorithm in `lib/registry.ts`, `lib/algorithms/index.ts`, and add it to the homepage catalog.
- Add a Naive Bayes visualization component (`components/visualizations/NaiveBayesViz.tsx`) showing per-class Gaussian distributions.
- Add math content (Bayes' theorem + Gaussian likelihood) and a Python code snippet using `sklearn.naive_bayes.GaussianNB`.
- Add i18n strings (en + pt-BR) for name, context, hyperparameter labels, and math/code labels.

## Capabilities

### New Capabilities
- `naive-bayes-algorithm`: end-to-end Naive Bayes capability on PlayML — page, module, dataset, visualization, math/code content, hyperparameters.

### Modified Capabilities
- `ml-engine`: registry, algorithm index, and homepage catalog gain a `naive-bayes` entry.
- `datasets`: add the spam-detection themed dataset for Naive Bayes under the existing standardized schema.
- `code-viewer`: add Python code content for the `naive-bayes` slug.

## Impact

- Code: `lib/registry.ts`, `lib/algorithms/index.ts`, new `lib/algorithms/naive-bayes.ts`, new `components/visualizations/NaiveBayesViz.tsx`, `lib/code-content.ts`, `lib/math-content.ts`, `components/visualizations/index.ts`, homepage catalog list.
- Assets: new `public/datasets/naive-bayes.json`.
- i18n: `messages/en.json`, `messages/pt-BR.json` — `algorithms.naive-bayes.*` keys.
- No new runtime dependencies required (Gaussian NB is trivial to implement from scratch).
