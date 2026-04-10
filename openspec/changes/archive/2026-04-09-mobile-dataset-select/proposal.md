## Why

On mobile devices, the pill-button tab list in the Linear Regression dataset selector wraps awkwardly and takes up excessive vertical space. Replacing the tab list with a native `<select>` dropdown on small screens provides a more familiar, compact, and touch-friendly interaction, improving UX for mobile users.

## What Changes

- On screens below the `md` breakpoint (< 768px), the dataset selector renders as a native `<select>` element instead of the pill-button tab list.
- On `md` and above, the existing pill-button tab list remains unchanged.
- The description card below the selector continues to display for the active dataset on all screen sizes.

## Capabilities

### New Capabilities

- `mobile-dataset-select`: Responsive behavior for the LinearRegressionDatasetSelector component that switches between a native `<select>` on mobile and the existing pill-button tabs on desktop.

### Modified Capabilities

_(none)_

## Impact

- **Component**: `components/shared/LinearRegressionDatasetSelector.tsx` — primary change target.
- **Dependencies**: None. Uses existing Tailwind responsive utilities and native HTML `<select>`.
- **i18n**: Reuses existing translation keys (`linearRegressionDatasets.selectorLabel`, dataset `titleKey`).
- **APIs**: No backend or data changes.
