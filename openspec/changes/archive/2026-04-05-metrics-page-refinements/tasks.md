## 1. Background Color Fix

- [x] 1.1 Change classification section background in `MetricsPageClient.tsx` from `bg-blue-electric` to `bg-sand-light`

## 2. Header Navigation

- [x] 2.1 Add i18n key `common.metrics` ("Metrics" / "Métricas") to both `messages/en.json` and `messages/pt-BR.json`
- [x] 2.2 Add "Metrics" navigation button in `Header.tsx` next to "Compare Algorithms", styled with `bg-yellow-pop`, linking to `/metrics`

## 3. ROC Curve Visualization

- [x] 3.1 Create `components/visualizations/ROCCurveViz.tsx` using `useD3` hook with pre-computed example ROC curve data (AUC ≈ 0.85), FPR/TPR axes (0-1), diagonal baseline, shaded AUC area, and a threshold slider that highlights the current point on the curve with TPR/FPR readout
- [x] 3.2 Import `ROCCurveViz` and `BrowserFrame` in `lib/metrics-content.tsx` and embed the visualization inside the ROC Curve / AUC metric card

## 4. Verification

- [x] 4.1 Type-check with `npx tsc --noEmit`
- [x] 4.2 Build with `npx next build` to verify all pages generate correctly
