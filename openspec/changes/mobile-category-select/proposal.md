## Why

On mobile viewports, the category filter buttons (All, Regression, Classification, Deep Learning, Clustering) wrap into multiple rows, consuming significant vertical space and creating a cluttered UI. Replacing them with a native `<select>` dropdown on mobile improves usability by reducing visual noise and providing a familiar, touch-friendly interaction pattern.

## What Changes

- On mobile viewports (`<768px`), the category filter buttons are replaced by a styled `<select>` dropdown
- On desktop/tablet viewports (`≥768px`), the existing pill-style filter buttons remain unchanged
- The select element follows the existing neo-pop design system (border, font, colors)

## Capabilities

### New Capabilities
- `mobile-category-select`: Responsive category filter that renders as a `<select>` dropdown on mobile and pill buttons on desktop

### Modified Capabilities
- `homepage`: Category filter requirement updated to specify responsive behavior — select on mobile, buttons on desktop

## Impact

- **Code**: `components/shared/AlgorithmCatalog.tsx` — filter rendering logic
- **Styling**: Tailwind responsive classes for show/hide behavior
- **No new dependencies** — uses native `<select>` element
