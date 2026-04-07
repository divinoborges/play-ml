## 1. Dataset

- [x] 1.1 Generate `public/datasets/naive-bayes.json` with ~200 synthetic spam-detection samples (features: `word_freq_free`, `word_freq_money`, `num_exclamations`, `message_length`; target: `is_spam`) and an 80/20 train/test split
- [x] 1.2 Fill in `metadata.description` and `metadata.featureDescriptions` in en-friendly terms

## 2. Algorithm module

- [x] 2.1 Create `lib/algorithms/naive-bayes.ts` implementing `AlgorithmModule` with Gaussian NB (train computes class priors, means, variances; predict uses log-likelihood; evaluate uses `computeClassificationMetrics`)
- [x] 2.2 Apply variance floor using the `varSmoothing` hyperparameter to avoid divide-by-zero
- [x] 2.3 Return softmax-normalized class probabilities from `predict`
- [x] 2.4 Register the module in `lib/algorithms/index.ts`

## 3. Registry and catalog

- [x] 3.1 Add a `naive-bayes` entry to `lib/registry.ts` after `random-forest` with classification metadata, color, and `varSmoothing` slider
- [x] 3.2 Ensure Naive Bayes appears on the homepage catalog listing under classification

## 4. Visualization

- [x] 4.1 Create `components/visualizations/NaiveBayesViz.tsx` rendering two Gaussian curves (one per class) over a selected feature with training points as ticks
- [x] 4.2 Register the viz in `components/visualizations/index.ts` (or equivalent getter) for the `naive-bayes` slug

## 5. Content (math + code)

- [x] 5.1 Add Naive Bayes math content to `lib/math-content.ts` (Bayes' theorem + Gaussian likelihood)
- [x] 5.2 Add Naive Bayes Python snippet (sklearn `GaussianNB`) to `lib/code-content.ts`

## 6. i18n

- [x] 6.1 Add `algorithms.naive-bayes.*` keys in `messages/en.json` (name, summary, contextTitle, contextDescription, 6 contextExtras, hyperparameter label)
- [x] 6.2 Mirror the same keys in `messages/pt-BR.json`

## 7. Verification

- [x] 7.1 Run `npx tsc --noEmit` and fix any errors
- [x] 7.2 Manually verify the page renders, trains, predicts, and switches locale

## 8. Commit

- [x] 8.1 Create atomic commits using conventional commits (e.g., `feat: add naive bayes dataset`, `feat: add naive bayes algorithm module`, `feat: add naive bayes page registration and viz`)
