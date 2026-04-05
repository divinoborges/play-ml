## Context

PlayML is an interactive ML learning platform built with Next.js. Each algorithm detail page (`AlgorithmPageClient.tsx`) has 6 sections: Context, Dataset, How It Works, Training, Prediction, and Metrics. The app uses a neo-pop design system (bold borders, rounded shapes, Space Mono + DM Sans typography) with i18n support (EN/PT-BR).

Current state:
- **Math viewer**: "See the Math" collapsible button exists in Section 3 (How It Works), rendering KaTeX formulas via `getMathContent(slug)`.
- **Data table**: `DatasetTable.tsx` renders up to 50 rows at once with no scroll constraint.
- **Metrics**: Section 6 is a standalone section ("Como foi o desempenho?") that shows metrics only after training.
- **Footer**: No footer exists in the app.

## Goals / Non-Goals

**Goals:**
- Add Python code viewer alongside the math viewer with copy-to-clipboard functionality
- Limit data table to 10 visible rows with vertical scroll for the remainder
- Move metrics display to appear inline below the Train button (removing Section 6)
- Add a global footer with creator credits and social links

**Non-Goals:**
- Syntax highlighting library (use simple `<pre><code>` with monospace styling consistent with the design system)
- Runnable/editable code (display only)
- Server-side pagination for the data table (client-side scroll is sufficient)
- Dynamic footer content or CMS integration

## Decisions

### 1. Code viewer as a toggle alongside math toggle

**Decision**: Add a "See the Code" button next to "See the Math" in Section 3. Both are independently collapsible. Code content follows the same pattern as math content — a `getCodeContent(slug)` function in `lib/code-content.ts` returns Python code strings per algorithm.

**Rationale**: Mirrors the existing math content architecture. Keeps code content separate and maintainable. Each algorithm gets a Python code string showing its implementation.

**Alternative considered**: A tabbed interface switching between Math and Code — rejected because users may want to view both simultaneously.

### 2. Copy button using Clipboard API

**Decision**: Use `navigator.clipboard.writeText()` with a visual feedback state (button text changes to "Copied!" for 2 seconds).

**Rationale**: No external dependencies needed. The Clipboard API is well-supported in modern browsers.

### 3. Data table scroll with CSS max-height

**Decision**: Apply `max-h-[400px] overflow-y-auto` on the table's `<tbody>` wrapper. The table header remains sticky. All data is still loaded in the DOM — only the visible area scrolls.

**Rationale**: Simpler than virtual scrolling. Datasets in this app are small (< 500 rows), so DOM performance isn't a concern. The 10-row visible height (~400px) provides a good balance.

**Alternative considered**: Virtual scrolling with react-window — rejected as over-engineered for these dataset sizes.

### 4. Metrics inline below Train button

**Decision**: Remove Section 6 entirely. Render `MetricsPanel` conditionally inside Section 4 (Training), directly below the `TrainButton` component. It appears only after `trainResult` is set.

**Rationale**: Provides immediate feedback after training — the user sees results right where they took action. Reduces page length and improves flow.

### 5. Footer as a shared layout component

**Decision**: Create `components/shared/Footer.tsx` and add it to `app/[locale]/layout.tsx`. Static content with:
- "Idealizado por Divino Borges" text
- LinkedIn icon linking to `https://www.linkedin.com/in/divinoborges/`
- X (Twitter) icon linking to `https://x.com/dvnofl`

**Rationale**: Footer belongs in the locale layout since it appears on every page. Using inline SVG icons avoids adding an icon library dependency.

## Risks / Trade-offs

- **Python code accuracy** → Code content is static strings, not validated. Risk: code may not perfectly match the JS implementation. Mitigation: review code content carefully during implementation.
- **Sticky table header** → Some older browsers have limited `position: sticky` support on `<thead>`. Mitigation: acceptable given the app's target audience (modern browser users).
- **Metrics section removal** → Users accustomed to the separate section may initially miss it. Mitigation: metrics appear with a smooth visual transition below the train button, making it discoverable.
