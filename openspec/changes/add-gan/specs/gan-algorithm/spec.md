## ADDED Requirements

### Requirement: GAN algorithm implementation
The system SHALL implement a Generative Adversarial Network in `lib/algorithms/gan.ts` with a Generator (noise → 2D points) and Discriminator (2D points → real/fake probability), both as 2-layer MLPs. Training SHALL alternate between updating the Discriminator (maximize classification accuracy) and Generator (minimize Discriminator accuracy on generated samples). The implementation SHALL track generated samples and losses at each epoch for visualization.

#### Scenario: Train GAN on ring distribution
- **WHEN** the engine receives the 2D ring dataset with hyperparameters (epochs: 500, learningRate: 0.01, hiddenUnits: 16)
- **THEN** the engine trains both Generator and Discriminator, returning a trained model within 10 seconds

#### Scenario: GAN training progress
- **WHEN** GAN training is in progress
- **THEN** the engine reports progress via the onProgress callback at each epoch

### Requirement: GAN sample generation
The system SHALL support generating new 2D samples from a trained Generator by sampling random noise vectors and passing them through the network. The predict function SHALL accept a sample count and return generated coordinates.

#### Scenario: Generate samples from trained GAN
- **WHEN** the engine receives a trained GAN model and a request to generate samples
- **THEN** it returns an array of generated 2D coordinates as the prediction value

### Requirement: GAN evaluation metrics
The system SHALL compute generative-specific evaluation metrics: generator loss, discriminator loss, and number of samples generated. These SHALL be displayed in a `GenerativeMetrics` format compatible with MetricsPanel.

#### Scenario: Evaluate GAN model
- **WHEN** the engine evaluates a trained GAN model
- **THEN** it returns generatorLoss, discriminatorLoss, and numSamplesGenerated as structured metrics

### Requirement: GAN registry configuration
The system SHALL register GAN in the algorithm registry with slug `gan`, category `deepLearning`, algorithmType `generative`, dataset path `/datasets/gan.json`, and color `#8B5CF6`. Hyperparameters: Epochs (default: 500, min: 100, max: 2000, step: 100), Learning Rate (default: 0.01, min: 0.001, max: 0.1, step: 0.001), Hidden Units (default: 16, min: 8, max: 64, step: 8).

#### Scenario: GAN appears in algorithm catalog
- **WHEN** the homepage loads the algorithm catalog
- **THEN** GAN appears under the "Deep Learning" category with the purple accent color

### Requirement: GAN visualization
The system SHALL provide an interactive D3.js visualization (`components/visualizations/GANViz.tsx`) showing: (1) a 2D scatter plot with real distribution points (blue) and generated points (orange) that evolve as the user scrubs through training epochs, and (2) Generator and Discriminator loss curves.

#### Scenario: Visualize adversarial training
- **WHEN** the user scrubs the epoch slider on the GAN visualization
- **THEN** the generated points update to show the Generator's output at that epoch, visually converging toward the real distribution

#### Scenario: View loss curves
- **WHEN** the user views the GAN visualization
- **THEN** both Generator loss and Discriminator loss curves are displayed

### Requirement: GAN math content
The system SHALL display KaTeX-rendered mathematical formulas for GAN including: the minimax objective function, the Generator loss, and the Discriminator loss.

#### Scenario: View GAN formulas
- **WHEN** the user expands the math section on the GAN page
- **THEN** the minimax objective, Generator loss, and Discriminator loss formulas render correctly via KaTeX

### Requirement: GAN code content
The system SHALL provide pseudocode for the GAN training loop showing alternating Discriminator and Generator updates.

#### Scenario: View GAN pseudocode
- **WHEN** the user expands the code section on the GAN page
- **THEN** pseudocode for the GAN training loop is displayed with syntax highlighting

### Requirement: GAN i18n
The system SHALL provide translations in English and Portuguese (pt-BR) for all GAN content: algorithm name, summary, real-world context title and description, and UI labels.

#### Scenario: GAN page in Portuguese
- **WHEN** the user switches to pt-BR locale on the GAN page
- **THEN** all text content displays in Portuguese
