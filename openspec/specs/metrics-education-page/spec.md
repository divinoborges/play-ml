## ADDED Requirements

### Requirement: Metrics education page exists
The system SHALL provide a standalone page at `/[locale]/metrics` that educates users about ML evaluation metrics.

#### Scenario: Page accessible via URL
- **WHEN** user navigates to `/en/metrics` or `/pt-BR/metrics`
- **THEN** the metrics education page SHALL render with all content in the corresponding locale

#### Scenario: Static generation
- **WHEN** the app is built
- **THEN** the metrics page SHALL be statically generated for each locale

### Requirement: Metrics grouped by algorithm type
The page SHALL organize metrics into sections by algorithm type: Regression and Classification.

#### Scenario: Regression metrics section
- **WHEN** user views the regression section
- **THEN** it SHALL contain explanations for: MSE, RMSE, MAE, and R²

#### Scenario: Classification metrics section
- **WHEN** user views the classification section
- **THEN** it SHALL contain explanations for: Accuracy, Precision, Recall, F1-Score, Confusion Matrix, and ROC Curve / AUC

#### Scenario: Anchor navigation
- **WHEN** user navigates to `/metrics#regression`
- **THEN** the page SHALL scroll to the regression metrics section
- **WHEN** user navigates to `/metrics#classification`
- **THEN** the page SHALL scroll to the classification metrics section

### Requirement: Mathematical formula for each metric
Each metric SHALL include its mathematical formula rendered with KaTeX, following the same visual pattern as the "See the Math" feature on algorithm pages.

#### Scenario: Formula display
- **WHEN** a metric card is rendered
- **THEN** it SHALL display the metric's formula using `BlockMath` component with proper LaTeX notation

#### Scenario: Formula visual consistency
- **WHEN** the formula is rendered
- **THEN** it SHALL use the same styling (sand-light background, rounded border, monospace label) as the `MathBlock` component in `lib/math-content.tsx`

### Requirement: Plain-language explanation for each metric
Each metric SHALL include a concise plain-language explanation of what the metric measures and how to interpret its values.

#### Scenario: Explanation present
- **WHEN** a metric card is rendered
- **THEN** it SHALL include a text explanation below the formula describing what the metric measures
- **AND** it SHALL include guidance on how to interpret the metric's value range (e.g., "R² ranges from 0 to 1, where 1 is perfect")

### Requirement: Real-world "when to use" guidance
Each metric SHALL include a real-world scenario where the metric is the right choice, explaining why.

#### Scenario: Positive use case
- **WHEN** a metric card is rendered
- **THEN** it SHALL include a "When to use" section with a concrete real-world problem where this metric is valuable
- **AND** it SHALL explain WHY this metric is appropriate for that scenario

### Requirement: Real-world "when NOT to use" guidance
Each metric SHALL include a real-world scenario where relying on the metric would be misleading or dangerous, explaining why.

#### Scenario: Negative use case for Accuracy
- **WHEN** the Accuracy metric card is rendered
- **THEN** its "When NOT to use" section SHALL explain that accuracy is misleading for imbalanced datasets
- **AND** it SHALL use a real-world example (e.g., rare disease detection where 99% accuracy can mean missing all positive cases)

#### Scenario: Negative use case for Precision
- **WHEN** the Precision metric card is rendered
- **THEN** its "When NOT to use" section SHALL explain that precision alone is dangerous when missing positive cases has severe consequences
- **AND** it SHALL use a real-world example (e.g., emergency room triage where a false negative means a critical patient is sent home)

#### Scenario: Negative use case for Recall
- **WHEN** the Recall metric card is rendered
- **THEN** its "When NOT to use" section SHALL explain that recall alone can lead to too many false positives
- **AND** it SHALL use a real-world example (e.g., spam detection where high recall blocks legitimate emails)

#### Scenario: ROC Curve / AUC explanation
- **WHEN** the ROC Curve / AUC metric card is rendered
- **THEN** it SHALL include the mathematical definition of TPR (True Positive Rate) and FPR (False Positive Rate) with KaTeX formulas
- **AND** it SHALL explain that the ROC curve plots TPR vs FPR at different classification thresholds
- **AND** it SHALL explain AUC (Area Under the Curve) as a single-number summary of the ROC curve (0.5 = random, 1.0 = perfect)

#### Scenario: Positive use case for ROC/AUC
- **WHEN** the ROC Curve / AUC metric card is rendered
- **THEN** its "When to use" section SHALL explain that AUC is threshold-independent and useful for comparing models across all operating points
- **AND** it SHALL use a real-world example (e.g., comparing credit scoring models where the business will later choose its own risk threshold)

#### Scenario: Negative use case for ROC/AUC
- **WHEN** the ROC Curve / AUC metric card is rendered
- **THEN** its "When NOT to use" section SHALL explain that AUC can be misleading on highly imbalanced datasets where FPR denominator is very large
- **AND** it SHALL use a real-world example (e.g., rare fraud detection where even a small FPR translates to thousands of false alerts)

### Requirement: Internationalization
All text content on the metrics page SHALL be internationalized using next-intl, supporting EN and PT-BR locales. Mathematical formulas are universal and do not require translation.

#### Scenario: English content
- **WHEN** locale is `en`
- **THEN** all prose text, section headers, and scenario descriptions SHALL display in English

#### Scenario: Portuguese content
- **WHEN** locale is `pt-BR`
- **THEN** all prose text, section headers, and scenario descriptions SHALL display in Portuguese

### Requirement: Page styling consistency
The metrics page SHALL follow the app's neo-pop design system.

#### Scenario: Visual design
- **WHEN** the metrics page is rendered
- **THEN** it SHALL use the app's color palette, typography (Space Mono headings, DM Sans body), and border/rounded styling consistent with other pages
