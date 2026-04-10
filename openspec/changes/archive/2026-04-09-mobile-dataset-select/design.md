## Context

The `LinearRegressionDatasetSelector` component (`components/shared/LinearRegressionDatasetSelector.tsx`) currently renders a pill-button tab list for choosing between three datasets (Salary, Graduate Admissions, Uber Fares). On mobile, the buttons wrap via `flex-wrap`, creating a clunky multi-row layout that is not ideal for touch interaction.

## Goals / Non-Goals

**Goals:**
- Provide a native `<select>` dropdown on mobile (< `md` breakpoint) for compact, touch-friendly dataset selection.
- Keep the existing pill-button tab list on desktop (>= `md`).
- Maintain identical behavior: selecting a dataset updates the active dataset and the description card below.

**Non-Goals:**
- Restyling the desktop tab list or the description card.
- Adding new datasets or changing dataset configuration.
- Custom styled dropdown — we use the native `<select>` for best mobile UX and accessibility.

## Decisions

### 1. CSS-based show/hide with Tailwind responsive classes

Render both the `<select>` and the tab list in the DOM. Use `hidden md:inline-flex` on the tab list and `md:hidden` on the `<select>`. This avoids JS-based breakpoint detection, SSR hydration issues, and keeps logic simple.

**Alternative considered:** `useMediaQuery` hook — rejected because it requires client-side JS, can cause layout shift on hydration, and adds unnecessary complexity for this use case.

### 2. Native `<select>` element

Use a plain `<select>` styled with Tailwind (border, rounded, font classes consistent with the design system). Native `<select>` provides the best mobile UX: OS-level picker on iOS/Android, built-in accessibility, no extra dependencies.

**Alternative considered:** Custom dropdown component — rejected because it adds complexity, requires focus/keyboard management, and native selects are superior on mobile.

### 3. Single component, no extraction

All changes stay within `LinearRegressionDatasetSelector.tsx`. The component is small (~58 lines) and the addition is minimal (~15 lines for the `<select>`). No need to extract sub-components.

## Risks / Trade-offs

- **Visual consistency**: Native `<select>` appearance varies across browsers/OS → Acceptable for mobile; provides familiar UX per platform.
- **Dual rendering**: Both elements exist in DOM → Negligible performance cost; only one is visible at a time via CSS `display: none`.
