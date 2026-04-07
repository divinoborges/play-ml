## Context

The Linear Regression page loads a single themed JSON dataset via `fetch(algorithm.datasetPath)` in `AlgorithmPageClient.tsx`. The "See the Code" panel renders a static Python snippet from `lib/code-content.ts` that uses `fetch_california_housing()` — unrelated to the dataset shown on screen.

This change introduces three real Kaggle datasets as CSV files and lets the user switch between them. The UI, DatasetTable, metrics, and Python snippet must all follow the selection in lock-step. Only the Linear Regression page is affected; other algorithms keep their JSON pipeline.

## Goals / Non-Goals

**Goals:**
- Ship three real CSV datasets (CarDekho used-car details, Graduate Admissions, Uber Fares) under `public/datasets/linear-regression/`.
- Provide a dataset selector on the Linear Regression page with descriptions (what the dataset is, key features, target variable).
- Parse CSVs in TypeScript and feed them into the existing DatasetTable and ML engine pipeline.
- Display a dataset-specific Python snippet in "See the Code" using pandas + scikit-learn, reading the matching `.csv` filename.
- Keep i18n parity (en + pt-BR) for selector labels and descriptions.

**Non-Goals:**
- Changing other algorithm pages.
- Running actual Python in-browser — snippets are display-only.
- Uploading custom user CSVs.
- Preserving the legacy `linear-regression.json` as the active source (may be deleted or repurposed).

## Decisions

### 1. CSV files stored under `public/datasets/linear-regression/`
Rationale: keeps all linear-regression assets grouped, avoids name collisions with the existing `linear-regression.json`, and lets `fetch()` load them relative to `NEXT_PUBLIC_BASE_PATH` just like today's JSON.
Alternatives: flat `public/datasets/*.csv` (rejected — clutters shared folder); embedding CSV strings in TS (rejected — bloats bundle).

### 2. Hand-rolled CSV parser in a small util (`lib/csv.ts`)
Rationale: datasets are small (<5k rows after trimming), columns are simple numeric/string. A 30-line parser avoids adding a dependency like `papaparse`.
Alternative: `papaparse` — rejected as overkill for three static files. If data complexity grows, we can swap later.

### 3. Dataset registry for linear regression
Add a typed list in `lib/linear-regression-datasets.ts`:
```ts
type LRDataset = {
  id: "salary" | "graduate-admissions" | "uber-fares";
  csvPath: string;           // public path
  features: string[];
  target: string;
  // i18n keys resolved in component
  titleKey: string;
  descriptionKey: string;
};
```
The component maps `id` → dataset config → fetched CSV → parsed rows. The default selected dataset is `salary`.

### 4. Normalized in-memory dataset shape
After parsing the CSV, convert to the existing `Dataset` shape (`features`, `target`, `trainData`, `testData`, `metadata`) so the DatasetTable, metrics, and ML engine require no changes beyond wiring. Train/test split is a deterministic 80/20 slice computed client-side.

### 5. Dataset-aware `getCodeContent`
Extend `getCodeContent` signature:
```ts
getCodeContent(slug: string, variant?: string): string
```
For `slug === "linear-regression"`, `variant` is the dataset id; for all other algorithms `variant` is ignored. Each variant returns a pandas snippet that reads the matching `.csv` filename, selects features/target explicitly, trains `LinearRegression`, and prints `r2_score`. Backward compatible — existing callers without `variant` still work for other algorithms.

### 6. Selector UI
A small pill/segmented-control component placed above the DatasetTable on the Linear Regression page. Clicking a pill:
1. Updates local state `selectedDatasetId`.
2. Triggers re-fetch/re-parse of the CSV (or uses a memoized cache).
3. Re-runs training in the ML engine for that dataset.
4. Updates the Python snippet shown in "See the Code".

### 7. Feature engineering per dataset (minimal)
- **salary**: single numeric feature `YearsExperience`; target `Salary`. Classic single-variable LR example (30 rows).
- **graduate-admissions**: features `GRE Score`, `TOEFL Score`, `University Rating`, `SOP`, `LOR`, `CGPA`, `Research`; target `Chance of Admit`.
- **uber-fares**: features `pickup_longitude`, `pickup_latitude`, `dropoff_longitude`, `dropoff_latitude`, `passenger_count`; target `fare_amount`. Rows with null or clearly invalid coordinates dropped; dataset trimmed to ~2000 rows to keep payload small.

### 8. Source CSVs trimmed before committing
Raw Kaggle CSVs are too large to commit in full (Uber Fares is ~200MB). We trim each to ≤2000 rows and drop unused columns before saving under `public/datasets/linear-regression/`, keeping each file under ~200KB.

## Risks / Trade-offs

- **Large raw CSVs bloat the repo** → Trim and prune columns before committing; document the trimming step in tasks.
- **CSV parsing edge cases** (quoted commas, different line endings) → Keep the util simple but cover `\r\n`, double quotes, and numeric coercion; unit-test against the three shipped files.
- **Training latency when switching datasets** → Cache parsed datasets and trained models keyed by `id`.
- **Python snippet drift** (snippet references a column that no longer exists after trimming) → Generate snippets from the same feature list used by the TS loader so they stay in sync.
- **i18n overhead** → Add only 3 dataset titles + 3 descriptions per locale.

## Migration Plan

1. Add new assets and code behind a single PR.
2. Remove or keep `public/datasets/linear-regression.json` based on whether other parts of the app still reference it (registry entry updated accordingly).
3. No data migration — purely additive for users.
