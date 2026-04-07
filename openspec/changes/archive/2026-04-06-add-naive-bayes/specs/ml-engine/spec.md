## ADDED Requirements

### Requirement: Naive Bayes registered in ML engine
The ML engine SHALL register a `naive-bayes` entry in `lib/registry.ts` (with category `classification`, algorithmType `classification`, datasetPath `/datasets/naive-bayes.json`, and at least the `varSmoothing` hyperparameter) and a corresponding module in `lib/algorithms/index.ts`.

#### Scenario: Resolve via registry
- **WHEN** `getAlgorithm("naive-bayes")` is called
- **THEN** it SHALL return a valid `AlgorithmConfig` with the naive-bayes slug and hyperparameters

#### Scenario: Resolve via algorithm index
- **WHEN** `getAlgorithmModule("naive-bayes")` is called
- **THEN** it SHALL return the Naive Bayes `AlgorithmModule` implementation
