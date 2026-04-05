## ADDED Requirements

### Requirement: Interactive ROC curve visualization
The metrics education page SHALL include an interactive D3-based ROC curve visualization within the ROC Curve / AUC metric card.

#### Scenario: Visualization renders
- **WHEN** the ROC Curve / AUC metric card is displayed on the metrics page
- **THEN** an interactive ROC curve chart SHALL render inside a BrowserFrame wrapper
- **AND** the chart SHALL display a pre-computed example ROC curve representing a classifier with AUC ≈ 0.85

#### Scenario: Chart axes and baseline
- **WHEN** the ROC curve chart is rendered
- **THEN** the X-axis SHALL be labeled "False Positive Rate (FPR)" ranging from 0 to 1
- **AND** the Y-axis SHALL be labeled "True Positive Rate (TPR)" ranging from 0 to 1
- **AND** a dashed diagonal line from (0,0) to (1,1) SHALL represent the random classifier baseline

#### Scenario: AUC area shading
- **WHEN** the ROC curve chart is rendered
- **THEN** the area under the ROC curve SHALL be shaded to visually represent AUC

#### Scenario: Interactive threshold control
- **WHEN** the user interacts with a threshold slider or drags a point along the ROC curve
- **THEN** the current threshold point SHALL be highlighted on the curve
- **AND** the corresponding TPR and FPR values SHALL be displayed

#### Scenario: Visual consistency with algorithm visualizations
- **WHEN** the ROC curve visualization is rendered
- **THEN** it SHALL use the same `useD3` hook, `BrowserFrame` wrapper, and visual styling (colors, fonts, sizing) as the existing algorithm visualizations
