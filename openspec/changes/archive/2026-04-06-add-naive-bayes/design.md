## Context

PlayML exposes each algorithm through a common contract: an `AlgorithmConfig` entry in `lib/registry.ts`, an `AlgorithmModule` in `lib/algorithms/<slug>.ts` (train/predict/evaluate), a JSON dataset under `public/datasets/<slug>.json`, a D3 visualization component, and math/code content strings. Adding Naive Bayes means plugging into every layer of that contract without disturbing other algorithms.

## Goals / Non-Goals

**Goals:**
- Ship a Gaussian Naive Bayes classifier usable end-to-end in the browser.
- Match the UX and file structure of existing classification algorithms (logistic regression, decision tree, KNN).
- Support binary classification (spam vs ham) with returned class probabilities so the existing `MetricsPanel` and prediction UI render correctly.
- Provide an educational visualization of the per-class Gaussian distributions for a single selected feature.
- Keep the implementation dependency-free (no new npm packages).

**Non-Goals:**
- Multinomial / Bernoulli Naive Bayes variants (Gaussian only).
- Real text tokenization — the dataset ships pre-computed numeric features.
- Multi-class (>2) in v1; binary is enough for the spam theme.
- Laplace smoothing UI — a fixed small epsilon floor on variance is fine for learners.

## Decisions

### 1. Gaussian NB implemented from scratch in ~60 lines
Rationale: the math (per-class mean/variance + log-likelihood) is trivial and avoids pulling in an additional ML library. Existing algorithms like `decision-tree.ts` also ship hand-rolled implementations.
Alternative: `ml-naivebayes` package — rejected to keep the bundle lean and the code readable for learners who open DevTools.

### 2. Model shape
```ts
type NaiveBayesModel = {
  classes: number[];              // e.g. [0, 1]
  priors: Record<number, number>; // P(class)
  means: Record<number, number[]>;    // mean per feature per class
  variances: Record<number, number[]>; // variance per feature per class
  features: string[];
};
```
`train` computes this in a single pass; `predict` computes `log P(class) + Σ log N(x_i | μ, σ²)` for each class and returns the argmax plus softmax-normalized probabilities. A variance floor of `1e-6` prevents divide-by-zero on constant features.

### 3. Hyperparameters
Only one knob: `varSmoothing` (slider, default `1e-9`, min `1e-12`, max `1e-3`). This mirrors scikit-learn's `GaussianNB(var_smoothing=...)` and lets learners see how smoothing affects classification. Sliders use a logarithmic-friendly range.

### 4. Dataset: spam detection (numeric features)
Themed as "Spam Detection". ~200 synthetic samples with 4 numeric features: `word_freq_free`, `word_freq_money`, `num_exclamations`, `message_length`. Target: `is_spam` (0/1). Class-conditional means are set so the two classes are separable but overlap enough for a meaningful NB demo. Standard 80/20 train/test split.

### 5. Visualization
`NaiveBayesViz.tsx` renders the two class-conditional Gaussian curves for a single feature (default: `word_freq_money`) over the range of the training data, overlayed with tick marks for actual training points colored by class. This communicates the probabilistic intuition directly.

### 6. Registry entry
```ts
{
  slug: "naive-bayes",
  category: "classification",
  algorithmType: "classification",
  datasetPath: "/datasets/naive-bayes.json",
  color: "#10B981",            // same green as other classification algos
  hyperparameters: [{ key: "varSmoothing", ... }],
}
```
Inserted after `random-forest` in the classification group so the catalog ordering stays grouped.

### 7. Code snippet
Python snippet uses `sklearn.naive_bayes.GaussianNB`, reads an in-memory feature matrix, fits the model, and prints accuracy — consistent with how the other algorithm pages present their Python equivalent.

## Risks / Trade-offs

- **Numerical underflow on log-probabilities with many features** → use log-space from the start (`log(prior) + Σ log N(...)`), which is what we'd do anyway.
- **Gaussian assumption doesn't fit all features** → acceptable for an educational demo; variance floor prevents blow-up.
- **Binary-only limits reusability** → v1 scope. A future change can extend to multi-class by generalizing `argmax` (already generalized in practice) and updating probabilities output.
- **Dataset synthesis bias** → the synthetic spam dataset is crafted, not real; we document this in metadata description so learners understand it's illustrative.
