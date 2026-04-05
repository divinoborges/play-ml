## Why

The algorithm detail pages need UX improvements to be more useful for learners. Users currently can only see the math behind algorithms but not the Python implementation code, the data table shows all rows at once making it hard to navigate large datasets, the performance metrics are disconnected from the training action, and the app lacks proper attribution in the footer.

## What Changes

- **Add "View Code" toggle** next to the existing "See the Math" button on algorithm pages. Displays Python implementation code with a copy-to-clipboard button.
- **Paginated data table** — The dataset table in "Os Dados" section now shows 10 rows at a time with vertical scroll to browse the rest, instead of displaying all rows at once.
- **Relocate performance metrics** — Remove the standalone "Como foi o desempenho?" section (Section 6). Move metrics display to appear directly below the Train button after training completes, providing immediate feedback.
- **Add site footer** — New footer component with credits to Divino Borges (idealizador), LinkedIn icon linking to `https://www.linkedin.com/in/divinoborges/`, and X (Twitter) icon linking to `@dvnofl`.

## Capabilities

### New Capabilities
- `code-viewer`: Python code display with syntax highlighting and copy-to-clipboard for each algorithm
- `site-footer`: Global footer component with creator credits and social links

### Modified Capabilities
- `dataset-table`: Table now shows 10 rows with vertical scroll instead of all rows
- `algorithm-page-layout`: Performance metrics section removed as standalone; metrics now render below train button

## Impact

- **Components affected**: `AlgorithmPageClient.tsx`, `DatasetTable.tsx`, `MetricsPanel.tsx`, locale layout
- **New components**: `CodeViewer.tsx`, `Footer.tsx`
- **New dependency**: Python code content files per algorithm (similar to existing math content)
- **i18n**: New translation keys for "View Code", "Copy", footer text
- **No breaking changes** to data flow or APIs
