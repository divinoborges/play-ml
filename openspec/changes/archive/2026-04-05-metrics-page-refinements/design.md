## Context

The metrics education page was recently implemented with two sections: regression (sand background) and classification (blue-electric background). The blue-electric background causes readability issues. The page is only accessible via the "Understanding Metrics" link that appears after training — there's no persistent navigation to it. The ROC Curve section has formulas but no visual, unlike algorithm pages which have interactive D3 visualizations.

## Goals / Non-Goals

**Goals:**
- Fix classification section readability by changing background color
- Make the metrics page discoverable from the main header navigation
- Add an interactive ROC curve visualization consistent with existing D3 visualizations

**Non-Goals:**
- Redesigning the entire metrics page layout
- Adding visualizations for other metrics (only ROC curve)
- Making the ROC curve use real training data (static example data is fine)

## Decisions

### 1. Classification section background: `bg-sand-light`

**Decision**: Replace `bg-blue-electric` with `bg-sand-light` for the classification metrics section.

**Rationale**: `sand-light` maintains visual distinction from the regression section (`bg-sand`) while providing excellent text contrast. It's already used elsewhere in the app (e.g., math formula backgrounds).

**Alternative considered**: `bg-white` — too plain and loses the section separation feel.

### 2. Header button: same style as Compare, different color

**Decision**: Add a "Metrics" button in the Header nav alongside "Compare Algorithms". Use `bg-yellow-pop` to visually distinguish it from the sky-pop Compare button.

**Rationale**: Consistent placement pattern. Different color avoids visual confusion between the two nav items.

### 3. ROC Curve visualization: D3 with threshold slider

**Decision**: Create `components/visualizations/ROCCurveViz.tsx` using the existing `useD3` hook. The visualization shows:
- A pre-computed example ROC curve (representing a decent classifier, AUC ~0.85)
- The diagonal baseline (random classifier)
- X-axis: FPR (0 to 1), Y-axis: TPR (0 to 1)
- A draggable/slider threshold point on the curve that highlights the current TPR/FPR values
- Shaded AUC area

Embed this visualization inside a `BrowserFrame` in the ROC Curve metric card on the metrics page.

**Rationale**: Follows the exact pattern of algorithm page visualizations (D3 + `useD3` hook + `BrowserFrame`). The threshold slider makes it interactive and educational — users see how changing the decision threshold trades off TPR vs FPR.

## Risks / Trade-offs

- **Static ROC data** → The example curve is hardcoded, not from real model output. Mitigation: clearly labeled as an example; the goal is education, not real-time analysis.
- **Additional bundle size** → Minimal — D3 is already in the bundle. The new component is small.
