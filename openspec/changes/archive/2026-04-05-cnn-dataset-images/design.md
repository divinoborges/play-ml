## Context

The CNN algorithm page (`/[locale]/algorithms/cnn`) uses the generic `AlgorithmPageClient.tsx` which renders datasets as tabular data via `DatasetTable`. For CNN, the dataset contains a single `pixels` feature — a flat array of 256 integers representing a 16x16 grayscale image. Displaying raw pixel arrays in a table is meaningless to users. The dataset JSON already includes `metadata.imageSize: 16` and `metadata.classes: ["normal", "pneumonia"]`.

The prediction section uses `PredictionForm`, which generates input fields per feature — for CNN this means a single "pixels" text field expecting 256 comma-separated values, which is unusable.

## Goals / Non-Goals

**Goals:**
- Render CNN dataset samples as visual 16x16 grayscale image thumbnails in the Dataset section
- Show both training and test image grids with labels
- Replace the prediction form with an interactive image picker for CNN
- Show the selected image alongside the prediction result
- Keep the generic `AlgorithmPageClient` working for all other algorithms

**Non-Goals:**
- Uploading custom images (out of scope — only dataset images)
- Resizing or augmenting images
- Changing the CNN algorithm logic or training pipeline
- Supporting other image-based algorithms beyond CNN (can be generalized later)

## Decisions

### 1. CNN-specific rendering in AlgorithmPageClient

**Decision**: Add conditional branches in `AlgorithmPageClient.tsx` that check `slug === "cnn"` to render CNN-specific components in the Dataset and Prediction sections.

**Alternative considered**: Create a separate `CnnPageClient.tsx`. Rejected because the page structure (5 sections) is identical — only the Dataset and Prediction content differs. Conditional rendering within the existing component is simpler and avoids duplicating 300+ lines of shared layout.

### 2. Pixel rendering approach

**Decision**: Use CSS Grid with inline background-color styles. Each pixel becomes a small `<div>` with `background-color: rgb(v, v, v)` where `v` is the pixel value. The 16x16 grid is wrapped in a fixed-size container.

**Alternative considered**: Canvas element. Rejected because CSS Grid integrates better with React's declarative model, requires no ref management, and the 256-cell grid is trivially small for the DOM. Canvas would be better for larger images but is overkill here.

### 3. Component structure

**Decision**: Create two new components:
- `components/shared/ImageGrid.tsx` — Renders a grid of 16x16 image thumbnails with labels. Accepts dataset samples and metadata. Used in the Dataset section.
- `components/shared/ImageSelector.tsx` — Renders selectable image thumbnails for prediction. Accepts test samples, fires `onSelect` with the chosen sample. Used in the Prediction section.

### 4. Image selector interaction in prediction

**Decision**: The user clicks an image thumbnail to select it. The selected image is highlighted with a border. Clicking "Predict" runs inference on the selected sample. The prediction result displays alongside a larger rendering of the selected image.

**Alternative considered**: Drag-and-drop. Rejected as unnecessarily complex for selecting from a small set of images.

## Risks / Trade-offs

- **[Risk] CNN-specific conditionals in generic page** → Kept minimal (two `if` blocks). If more algorithm-specific views emerge, refactor to a strategy/registry pattern.
- **[Risk] DOM performance with many pixel divs** → 256 divs per image × ~25 images = ~6400 divs total. Well within browser limits.
- **[Trade-off] CSS Grid vs Canvas** → CSS Grid is simpler but slightly less performant for hover/animation effects. Acceptable for 16x16 images.
