## Why

The metrics education page has readability and discoverability issues: the blue-electric background on the classification section makes text hard to read, users can't easily navigate to the metrics page from the main navigation, and the ROC Curve section lacks the interactive visualization that other algorithm pages offer in their "How It Works" sections.

## What Changes

- **Change classification section background color** on the metrics page from `bg-blue-electric` to a more readable color (e.g., `bg-sand-light`) that maintains visual distinction from the regression section while improving text contrast.
- **Add "Metrics" navigation button** in the Header component, next to the existing "Compare Algorithms" button, linking to `/metrics`.
- **Add interactive ROC curve visualization** in the ROC Curve / AUC metric card on the metrics page, using D3.js (consistent with existing algorithm visualizations), showing an example ROC curve with TPR/FPR axes, diagonal baseline, and interactive threshold slider.

## Capabilities

### New Capabilities
- `roc-curve-visualization`: Interactive D3-based ROC curve chart for the metrics education page

### Modified Capabilities
_(none — the background color fix and header nav button are styling/UI changes, not spec-level behavior changes)_

## Impact

- **Modified files**: `MetricsPageClient.tsx` (background color), `Header.tsx` (new nav button), `metrics-content.tsx` (embed visualization in ROC card)
- **New component**: `components/visualizations/ROCCurveViz.tsx`
- **i18n**: New translation key for "Metrics" header button label
- **Dependencies**: Uses existing D3.js setup (already used by algorithm visualizations)
