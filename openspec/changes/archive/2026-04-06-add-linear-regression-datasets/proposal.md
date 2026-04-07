## Why

The Linear Regression page currently ships a single themed dataset, giving learners no sense of how the same algorithm behaves across different real-world problems. Offering three real Kaggle-sourced CSV datasets with switchable selection — and aligning the "See the Code" Python snippet to the selected dataset — turns the page into a hands-on comparison tool instead of a fixed demo.

## What Changes

- Add three CSV datasets to `public/datasets/linear-regression/`, sourced from Kaggle:
  - `salary.csv` — Salary dataset (predict salary from years of experience)
  - `graduate-admissions.csv` — Graduate Admissions dataset (predict chance of admit)
  - `uber-fares.csv` — Uber Fares dataset (predict fare amount)
- Add a dataset selector UI on the Linear Regression algorithm page letting the user pick one of the three datasets.
- Display a short description of each dataset (what it is, features, target variable being predicted) alongside the selector.
- Load and parse the selected CSV in TypeScript for the in-app DatasetTable, training, and visualization flows — the app layer remains TypeScript.
- Swap the "See the Code" Python snippet to match the selected dataset: each snippet SHALL read the corresponding `.csv` file with pandas, train `LinearRegression`, and report the score.
- Retrain the in-app model from the currently selected CSV so metrics and predictions reflect that dataset.
- **BREAKING** for linear regression only: `/public/datasets/linear-regression.json` is no longer the source of truth for that page (kept or removed per design decision).

## Capabilities

### New Capabilities
- `linear-regression-datasets`: multi-dataset selection, CSV loading, per-dataset descriptions, and per-dataset Python code synchronization on the Linear Regression page.

### Modified Capabilities
- `datasets`: linear regression now uses three CSV files under `public/datasets/linear-regression/` instead of a single JSON, with a runtime-selectable active dataset.
- `code-viewer`: `getCodeContent` for the linear-regression slug becomes dataset-aware, returning a pandas-based Python snippet keyed by the active dataset id.

## Impact

- Code: `app/[locale]/algorithms/[slug]/AlgorithmPageClient.tsx` (dataset loading), `lib/code-content.ts` (per-dataset snippets), `lib/registry.ts` (linear regression entry), new CSV-loading util, new selector component, i18n messages (en + pt-BR).
- Assets: new `public/datasets/linear-regression/*.csv` files.
- No new runtime deps required (CSV parsing can be hand-rolled or via an existing small util); if a parser is added, it must be lightweight.
- Only the linear regression page is affected; other algorithm pages are unchanged.
