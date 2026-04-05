## ADDED Requirements

### Requirement: Image selector replaces prediction form for CNN
The CNN Prediction section SHALL replace the default `PredictionForm` with an interactive image selector that displays test dataset images as clickable thumbnails.

#### Scenario: Image selector shown after training
- **WHEN** the CNN model has been trained
- **THEN** the Prediction section displays test images as clickable thumbnails instead of text input fields

#### Scenario: Image selector hidden before training
- **WHEN** the CNN model has not been trained yet
- **THEN** the Prediction section displays the image selector but the Predict button remains disabled with the "train first" message

### Requirement: User can select an image for prediction
The user SHALL be able to click a test image thumbnail to select it for prediction. The selected image SHALL be visually highlighted.

#### Scenario: Selecting an image
- **WHEN** the user clicks a test image thumbnail
- **THEN** that image is highlighted with a distinct border/outline and any previously selected image is deselected

#### Scenario: Only one image selected at a time
- **WHEN** the user clicks a different image while one is already selected
- **THEN** the new image becomes selected and the previous selection is cleared

### Requirement: Selected image used for prediction
When the user clicks "Predict", the system SHALL run inference using the pixel data of the currently selected image.

#### Scenario: Predicting with selected image
- **WHEN** the user selects a test image and clicks "Predict"
- **THEN** the model classifies the selected image's pixel data and displays the prediction result

#### Scenario: Prediction shows selected image
- **WHEN** a prediction result is displayed
- **THEN** a larger rendering of the selected image is shown alongside the prediction value and probability bars

### Requirement: Non-CNN algorithms unaffected
The Prediction section for non-CNN algorithms SHALL continue to use the existing `PredictionForm` component.

#### Scenario: Other algorithm prediction form unchanged
- **WHEN** the user navigates to a non-CNN algorithm page
- **THEN** the Prediction section displays the standard `PredictionForm` with text inputs
