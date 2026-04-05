## 1. Image Grid Component

- [x] 1.1 Create `components/shared/ImageGrid.tsx` — renders a list of dataset samples as 16x16 grayscale thumbnails in a responsive grid, each with its label displayed below
- [x] 1.2 Add i18n keys for image grid labels (training images heading, test images heading, sample counts) in `messages/en.json` and `messages/pt-BR.json`

## 2. Image Selector Component

- [x] 2.1 Create `components/shared/ImageSelector.tsx` — renders test images as clickable thumbnails with selection highlighting, fires `onSelect` callback with the chosen sample
- [x] 2.2 Add i18n keys for image selector UI text (select prompt, selected label) in `messages/en.json` and `messages/pt-BR.json`

## 3. Integrate into AlgorithmPageClient

- [x] 3.1 Update Dataset section (Section 2) in `AlgorithmPageClient.tsx` — when `slug === "cnn"`, render `ImageGrid` with training and test samples instead of `DatasetTable`
- [x] 3.2 Update Prediction section (Section 5) in `AlgorithmPageClient.tsx` — when `slug === "cnn"`, render `ImageSelector` instead of `PredictionForm`, wire selected sample to prediction logic
- [x] 3.3 Show a larger rendering of the selected image alongside the prediction result in the prediction output area

## 4. Verification

- [x] 4.1 Verify CNN page renders image grids with correct grayscale colors and labels
- [x] 4.2 Verify image selection, prediction flow, and result display work end-to-end
- [x] 4.3 Verify non-CNN algorithm pages still render DatasetTable and PredictionForm unchanged
