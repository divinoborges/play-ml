## Context

PlayML is an interactive ML learning platform. After training an algorithm, users see numeric metric values (MSE, R², Accuracy, Precision, Recall, F1, confusion matrix, loss charts) via `MetricsPanel`. However, there is no educational content explaining what these metrics mean, their mathematical definitions, or — critically — when one metric is appropriate vs. misleading for a given real-world problem.

The app already has a pattern for math-rich educational content: `lib/math-content.tsx` uses KaTeX (`BlockMath`/`InlineMath` components) to render formulas. The metrics page will follow this same pattern.

Algorithm types and their metrics:
- **Regression** (`algorithmType: "regression"`): MSE, RMSE, MAE, R²
- **Classification** (`algorithmType: "classification"`): Accuracy, Precision, Recall, F1, Confusion Matrix, ROC Curve / AUC
- **Deep Learning** (still classification type but with `TrainingHistory`): Same classification metrics + Loss curves

## Goals / Non-Goals

**Goals:**
- Create a standalone `/[locale]/metrics` page with math formulas and real-world guidance for every metric
- Group content by algorithm type (regression, classification) so users see relevant metrics
- Provide "when to use / when NOT to use" guidance with concrete real-world scenarios
- Link from the training section post-training, with the link pointing to the relevant algorithm type section
- Full i18n support (EN and PT-BR)

**Non-Goals:**
- Interactive metric calculators or live demos on the metrics page
- Video content or external resources
- Metric content for algorithms not in the registry
- Customizable metric thresholds or recommendations

## Decisions

### 1. Content architecture: single TSX content file

**Decision**: Create `lib/metrics-content.tsx` following the exact pattern of `lib/math-content.tsx`. Export a `getMetricsEducationContent(algorithmType)` function that returns React nodes with KaTeX formulas and educational text.

**Rationale**: Maintains consistency with the existing math content pattern. Content is co-located and easy to update. TSX allows mixing KaTeX components with prose.

**Alternative considered**: Markdown files parsed at build time — rejected because KaTeX components need JSX and the existing pattern already works well.

### 2. Page structure: sections with anchor navigation

**Decision**: The metrics page has two main sections: "Regression Metrics" and "Classification Metrics". Each section has an anchor ID (`#regression`, `#classification`). The link from algorithm pages uses the anchor to scroll to the relevant section.

**Rationale**: Simple, no client-side tab state needed. Users can also scroll through all metrics for broader learning. Deep linking from algorithm pages ensures they land on the relevant section.

### 3. Metric card structure

**Decision**: Each metric is presented as a card with:
1. Metric name and formula (KaTeX `BlockMath`)
2. Plain-language explanation
3. "When to use" section with a real-world scenario where this metric shines
4. "When NOT to use" section with a real-world scenario where this metric is misleading/dangerous
5. A visual indicator (icon or color) distinguishing "use" from "don't use"

**Rationale**: The "when NOT to use" is the most valuable part — it's what distinguishes a practitioner from someone who just runs `.fit()`. Real-world scenarios make abstract concepts concrete.

### 4. Link placement: after MetricsPanel in training section

**Decision**: Add a link below `MetricsPanel` in `AlgorithmPageClient.tsx` Section 4. The link appears only after training (alongside metrics). It uses Next.js `Link` component pointing to `/metrics#<algorithmType>`.

**Rationale**: Contextual placement — users see the link exactly when they're looking at metrics and might wonder what they mean. The algorithm type is already available from the `algorithm` prop.

### 5. Static page with generateStaticParams

**Decision**: The metrics page is a statically generated page (like all other pages). Content is hardcoded in TSX, not fetched from an API.

**Rationale**: Consistent with the rest of the app. Content changes infrequently. No need for dynamic rendering.

## Risks / Trade-offs

- **Content volume** → The metrics page will be content-heavy. Mitigation: clear section grouping, anchor links, and consistent card structure make it scannable.
- **i18n content duplication** → Real-world scenario text needs translation in both locales. Mitigation: use translation keys for all prose; math formulas are universal and don't need translation.
- **Maintenance** → If new metrics are added to MetricsPanel, the education page must be updated too. Mitigation: both reference the same metric names from the `metrics` i18n namespace.
