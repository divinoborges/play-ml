## Why

After training a model, users see metric values (MSE, R², Accuracy, Precision, Recall, F1, etc.) but have no way to understand what those numbers mean, why they matter, or when one metric is more appropriate than another. In real-world ML applications, choosing the wrong metric can lead to dangerous outcomes — for example, optimizing for accuracy in an imbalanced medical dataset may miss critical positive cases. Users need a dedicated educational resource that explains metrics with mathematical rigor and real-world decision-making context.

## What Changes

- **New "Understanding Metrics" page** at `/[locale]/metrics` — a standalone educational page with:
  - Metrics grouped by algorithm type (regression, classification, deep learning), including ROC Curve / AUC for classification
  - Mathematical formulas for each metric using KaTeX (same pattern as "See the Math")
  - Real-world scenarios explaining when to use (and when NOT to use) each metric, grounded in practical problems (medical triage, fraud detection, pricing, etc.)
- **"Understanding Metrics" link** added to the training section of algorithm detail pages, appearing after metrics are displayed post-training. Links to the metrics page filtered/scrolled to the relevant algorithm type.
- **i18n support** for all metrics page content in EN and PT-BR

## Capabilities

### New Capabilities
- `metrics-education-page`: Standalone page with metric definitions, math formulas, and real-world usage guidance categorized by algorithm type
- `metrics-navigation`: Link from algorithm training section to the metrics education page

### Modified Capabilities

_(none)_

## Impact

- **New route**: `app/[locale]/metrics/page.tsx` and client component
- **New content file**: `lib/metrics-content.tsx` with KaTeX formulas and educational content per metric
- **Modified component**: `AlgorithmPageClient.tsx` — add "Understanding Metrics" link after MetricsPanel
- **i18n**: New translation keys in both locale files for page title, section headers, metric explanations, and real-world scenarios
- **Navigation**: Optional link from Header or accessible from training section
- **No breaking changes** to existing functionality
