## Context

The `AlgorithmCatalog` component (`components/shared/AlgorithmCatalog.tsx`) renders category filter buttons as a horizontal flex-wrap row of pill-shaped buttons. On mobile, these wrap into 2-3 rows, consuming vertical space and feeling cluttered. The component uses `next-intl` for i18n and a `useState` hook for filter state.

## Goals / Non-Goals

**Goals:**
- Replace filter buttons with a native `<select>` on mobile (`<768px`)
- Keep the existing pill-button filter on desktop/tablet (`≥768px`)
- Maintain full i18n support and identical filtering behavior
- Match the neo-pop design system styling

**Non-Goals:**
- Custom dropdown/popover component — native `<select>` is sufficient and touch-friendly
- Changing the filter categories or algorithm grid behavior
- Adding animation/transitions between mobile and desktop layouts

## Decisions

### Use Tailwind responsive `hidden`/`block` classes for show/hide
Render both the `<select>` and the button row in the DOM, using `md:hidden` and `hidden md:flex` to toggle visibility. This avoids JS-based media query detection (e.g., `useMediaQuery`) and keeps the component SSR-friendly.

**Alternative considered:** `useMediaQuery` hook — rejected because it requires client-side hydration, causes layout shift, and adds complexity for a simple show/hide.

### Use native `<select>` element, not a custom component
A native `<select>` provides the best UX on mobile: OS-level picker on iOS/Android, accessibility built-in, no bundle size. Style it with Tailwind to match the neo-pop aesthetic (border-2, rounded-full, font-heading, uppercase).

**Alternative considered:** Headless UI `Listbox` — rejected as overkill for 5 static options and adds a dependency.

### Single component, no extraction
The change is small enough to stay within `AlgorithmCatalog.tsx`. No need for a separate `CategoryFilter` component.

## Risks / Trade-offs

- **Styling limitations of `<select>`**: Native `<select>` styling is limited across browsers (cannot style the dropdown options). Mitigation: style the trigger element only; the OS picker handles options display, which is acceptable for mobile.
- **Two DOM elements for one control**: Both the select and buttons exist in the DOM at all times. Mitigation: negligible performance impact for 5 filter items, and Tailwind's `hidden` class sets `display:none` which excludes from layout/paint.
