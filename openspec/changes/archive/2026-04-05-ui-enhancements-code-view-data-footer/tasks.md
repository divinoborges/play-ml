## 1. Code Viewer

- [x] 1.1 Create `lib/code-content.ts` with `getCodeContent(slug)` function returning Python code strings for all algorithms in the registry
- [x] 1.2 Add i18n keys for code viewer labels (`seeTheCode`, `copy`, `copied`) in both `messages/en.json` and `messages/pt-BR.json`
- [x] 1.3 Add `codeExpanded` state and "See the Code" toggle button next to "See the Math" in `AlgorithmPageClient.tsx` Section 3
- [x] 1.4 Create collapsible code panel with `<pre><code>` block and copy-to-clipboard button using `navigator.clipboard.writeText()`
- [x] 1.5 Implement copy feedback: button text changes to "Copied!" for 2 seconds then reverts

## 2. Dataset Table Scroll

- [x] 2.1 Update `DatasetTable.tsx` to remove the `data.slice(0, 50)` limit and render all rows
- [x] 2.2 Add fixed-height scrollable container (~400px / ~10 rows visible) with `overflow-y-auto` on the tbody wrapper
- [x] 2.3 Make table header sticky with `position: sticky; top: 0` so column names remain visible during scroll

## 3. Metrics Relocation

- [x] 3.1 Move `MetricsPanel` rendering from Section 6 into Section 4 (Training), below the `TrainButton` component, conditional on `trainResult`
- [x] 3.2 Remove Section 6 ("Como foi o desempenho?") entirely from `AlgorithmPageClient.tsx`

## 4. Site Footer

- [x] 4.1 Create `components/shared/Footer.tsx` with black background, "Idealizado por Divino Borges" text, LinkedIn SVG icon linking to `https://www.linkedin.com/in/divinoborges/`, and X SVG icon linking to `https://x.com/dvnofl`
- [x] 4.2 Add i18n keys for footer text in both locale files
- [x] 4.3 Import and render `Footer` in `app/[locale]/layout.tsx` at the bottom of the page

## 5. Verification

- [x] 5.1 Verify all algorithm slugs return valid code content from `getCodeContent`
- [x] 5.2 Test code copy functionality, data table scroll, metrics placement, and footer rendering across both locales
