## ADDED Requirements

### Requirement: Render training images as visual grid
The CNN Dataset section SHALL display training samples as a grid of 16x16 grayscale image thumbnails instead of a data table. Each thumbnail SHALL render the pixel array as a visual image using the `imageSize` from dataset metadata. Each thumbnail SHALL display its label ("normal" or "pneumonia") below the image.

#### Scenario: Training images displayed on page load
- **WHEN** the CNN algorithm page loads and the dataset is fetched
- **THEN** the Dataset section displays all training samples as grayscale image thumbnails arranged in a responsive grid, each with its label visible

#### Scenario: Pixel values map to grayscale colors
- **WHEN** a training sample pixel array is rendered
- **THEN** each pixel value (0-255) maps to `rgb(value, value, value)` and the pixels are arranged in a 16x16 grid matching the `metadata.imageSize`

### Requirement: Render test images as visual grid
The CNN Dataset section SHALL display test samples as a separate visual grid, clearly labeled as test data, using the same thumbnail rendering as training images.

#### Scenario: Test images shown separately from training images
- **WHEN** the CNN dataset is displayed
- **THEN** test images appear in a distinct group labeled with the test data heading, visually separated from training images

### Requirement: Show dataset sample counts
The image grid display SHALL show the count of training and test samples.

#### Scenario: Sample counts visible
- **WHEN** the CNN dataset section is rendered
- **THEN** the training section shows the number of training samples and the test section shows the number of test samples

### Requirement: Non-CNN algorithms unaffected
The Dataset section for non-CNN algorithms SHALL continue to render using the existing `DatasetTable` component.

#### Scenario: Linear regression dataset renders as table
- **WHEN** the user navigates to a non-CNN algorithm page (e.g., linear-regression)
- **THEN** the Dataset section displays the standard `DatasetTable`, not the image grid
