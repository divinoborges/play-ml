## 1. i18n Content

- [x] 1.1 Add metrics education page translation keys to `messages/en.json`: page title, section headers (Regression Metrics, Classification Metrics), and per-metric content (name, explanation, interpretation, whenToUse, whenNotToUse) for all 10 metrics (MSE, RMSE, MAE, R², Accuracy, Precision, Recall, F1, Confusion Matrix, ROC Curve / AUC)
- [x] 1.2 Add the same translation keys to `messages/pt-BR.json` with Portuguese translations
- [x] 1.3 Add "Understanding Metrics" link label to both locale files (`actions.understandingMetrics`)

## 2. Metrics Content File

- [x] 2.1 Create `lib/metrics-content.tsx` with `MathBlock` component (reuse pattern from `lib/math-content.tsx`) and `getMetricsEducationContent(algorithmType)` function
- [x] 2.2 Add regression metrics content: MSE, RMSE, MAE, R² — each with KaTeX formula, explanation, "when to use" real-world scenario, and "when NOT to use" real-world scenario
- [x] 2.3 Add classification metrics content: Accuracy, Precision, Recall, F1-Score, Confusion Matrix, ROC Curve / AUC — each with KaTeX formula, explanation, "when to use" scenario, and "when NOT to use" scenario with emphasis on real-world consequences (medical triage, fraud, spam, credit scoring, etc.)

## 3. Metrics Page

- [x] 3.1 Create `app/[locale]/metrics/page.tsx` server component with `generateStaticParams` for locale routing
- [x] 3.2 Create `app/[locale]/metrics/MetricsPageClient.tsx` client component with back navigation, page title, and two sections (`#regression`, `#classification`) rendering metric cards from `getMetricsEducationContent`
- [x] 3.3 Style metric cards following neo-pop design system: formula in sand-light box, explanation text, green-accented "when to use" block, red-accented "when NOT to use" block

## 4. Navigation Link

- [x] 4.1 Add "Understanding Metrics" link in `AlgorithmPageClient.tsx` below `MetricsPanel` in the training section, visible only when `trainResult` exists, linking to `/metrics#${algorithm.algorithmType}`

## 5. Verification

- [x] 5.1 Type-check the project with `npx tsc --noEmit`
- [x] 5.2 Build the project with `npx next build` to verify static generation of metrics page for both locales
