## 1. Prepare CSV assets

- [x] 1.1 Download the three Kaggle source CSVs locally (CarDekho, Graduate Admissions, Uber Fares)
- [x] 1.2 Trim each to ≤2000 rows and drop unused/non-numeric columns per design §7
- [x] 1.3 Save trimmed files as `public/datasets/linear-regression/car-details.csv`, `graduate-admissions.csv`, `uber-fares.csv`
- [x] 1.4 Verify each file is ≤~200KB and loads via a browser fetch

## 2. CSV loader + dataset registry

- [x] 2.1 Add `lib/csv.ts` with a small CSV parser (handles `\r\n`, quotes, numeric coercion)
- [x] 2.2 Add `lib/linear-regression-datasets.ts` exporting the typed registry of the 3 datasets (id, csvPath, features, target, i18n keys)
- [x] 2.3 Write a helper that fetches a CSV, parses it, drops invalid rows, and returns the standard `Dataset` shape with an 80/20 train/test split
- [x] 2.4 Add a lightweight client-side cache so switching datasets doesn't refetch

## 3. UI: dataset selector + description

- [x] 3.1 Add a `LinearRegressionDatasetSelector` component (segmented control) used only on the Linear Regression page
- [x] 3.2 Render the description block (what the dataset is + target variable) below the selector
- [x] 3.3 Wire selector state in `AlgorithmPageClient.tsx` behind a slug check so other algorithms are untouched
- [x] 3.4 Replace the single JSON fetch with the CSV loader for `slug === "linear-regression"`
- [x] 3.5 Ensure DatasetTable, metrics, and training all consume the newly selected dataset

## 4. Code viewer integration

- [x] 4.1 Extend `getCodeContent(slug, variant?)` signature in `lib/code-content.ts`
- [x] 4.2 Add three pandas + sklearn Python snippets, one per dataset, reading the matching `.csv` with the exact feature/target columns used by the TS loader
- [x] 4.3 Pass the active dataset id as `variant` from the code viewer UI on the Linear Regression page
- [x] 4.4 Confirm other algorithm pages still work (variant defaults to unused)

## 5. i18n

- [x] 5.1 Add en + pt-BR messages for the 3 dataset titles, 3 descriptions, and the selector label
- [x] 5.2 Verify both locales render correctly

## 6. Manual verification

- [x] 6.1 Switch between all three datasets and confirm table, metrics, and Python snippet update in sync
- [x] 6.2 Confirm no regressions on other algorithm pages
- [x] 6.3 Run `pnpm lint` and `pnpm build`

## 7. Commit

- [x] 7.1 Create atomic commits using conventional commits (e.g., `feat: add CSV datasets for linear regression`, `feat: add dataset selector on linear regression page`, `feat: dataset-aware python snippet for linear regression`)
