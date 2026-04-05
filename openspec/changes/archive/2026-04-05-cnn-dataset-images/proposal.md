## Why

The CNN algorithm page currently shows training and test data only as a table of raw pixel arrays — unreadable to users. Rendering the actual 16×16 grayscale images from the dataset makes the learning experience concrete and visual. Additionally, the "Test the Model" section currently uses an auto-generated prediction form; letting the user pick a real dataset image to classify makes the interaction meaningful and grounded in real data.

## What Changes

- Display a visual grid of real training images (rendered from the `pixels` array) in the Dataset section of the CNN page.
- Display a visual grid of real test images alongside training images.
- Replace the current prediction input form in "Test the Model" with an image selector that lets users pick a test image to classify.
- Show the selected image alongside the prediction result for visual feedback.

## Capabilities

### New Capabilities
- `cnn-image-grid`: Render 16×16 grayscale images from pixel arrays as visual grids in the CNN dataset section, showing both training and test samples with their labels.
- `cnn-image-selector`: Interactive image picker in the "Test the Model" section that lets users select a dataset image for prediction instead of manually entering pixel values.

### Modified Capabilities
<!-- No existing specs to modify -->

## Impact

- **Components**: `AlgorithmPageClient.tsx` — Dataset section and Test section need CNN-specific rendering logic.
- **New components**: Image grid component and image selector component (reusable for CNN).
- **Data**: `public/datasets/cnn.json` — already contains pixel arrays and metadata (`imageSize: 16`); no schema changes needed.
- **i18n**: New translation keys in `messages/en.json` and `messages/pt-BR.json` for image grid labels and selector UI text.
- **Dependencies**: No new dependencies; images rendered via CSS grid or Canvas/SVG.
