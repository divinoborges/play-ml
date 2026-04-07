## Context

PlayML is an educational ML platform with 10 algorithms across 4 categories (regression, classification, deep learning, clustering). All training runs client-side. The current `AlgorithmModule` interface assumes supervised or unsupervised learning — `train()` takes labeled data, `predict()` maps input features to output values, and `evaluate()` computes metrics against ground truth.

GANs break this pattern: there's no "input → output" prediction. Instead, a Generator creates synthetic samples from noise, and a Discriminator distinguishes real from generated data. The "prediction" is generating new samples, and the "metrics" are adversarial losses rather than accuracy/MSE.

## Goals / Non-Goals

**Goals:**
- Add GAN as a fully interactive deep learning algorithm with a visible adversarial training process
- Extend the type system to support generative models (`"generative"` AlgorithmType, `GenerativeMetrics`)
- Provide a compelling visualization: real distribution vs. generated points evolving over training, plus G/D loss curves
- Use a simple 2D point distribution so the adversarial dynamics are visually intuitive
- Keep training client-side with sub-30s wall time

**Non-Goals:**
- Image generation (too computationally expensive for browser)
- Conditional GANs, WGAN, or other GAN variants
- Supporting a generic "generative model" framework beyond GAN
- GPU acceleration

## Decisions

### 1. GAN architecture: simple MLP Generator and Discriminator

**Decision**: Both Generator and Discriminator are 2-layer MLPs (Multi-Layer Perceptrons) implemented from scratch in TypeScript. Generator: noise(2D) → hidden(16) → output(2D). Discriminator: input(2D) → hidden(16) → output(1, sigmoid).

**Alternatives considered**:
- TensorFlow.js — adds unnecessary complexity for a 2D toy example. The existing CNN/Transformers use simplified implementations too.
- Deeper networks — overkill for 2D data and would be slow in browser.

**Rationale**: A from-scratch implementation is more educational (learners see the actual forward/backward passes), performs well for 2D data, and matches the project's pattern of simplified implementations for learning.

### 2. Dataset: 2D ring distribution

**Decision**: The target distribution is a ring (circle) of 200 points with some noise. The Generator must learn to produce points that lie on this ring.

**Alternatives considered**:
- Gaussian clusters — too similar to K-Means dataset visually.
- Spiral — harder to learn, may not converge in limited iterations.
- Grid/uniform — not visually interesting.

**Rationale**: A ring is simple enough that a small GAN can learn it, but complex enough that you can see the Generator gradually improving. It's also visually distinctive from other datasets in the platform.

### 3. Extend type system with "generative" AlgorithmType

**Decision**: Add `"generative"` to `AlgorithmType`. The `AlgorithmModule` interface stays unchanged — GAN reuses `train()` (trains both G and D), `predict()` (generates N samples using the trained Generator), and `evaluate()` (returns `GenerativeMetrics` with generatorLoss and discriminatorLoss).

**Alternatives considered**:
- Separate `GenerativeModule` interface — rejected for the same reasons as when clustering was added: doubles integration surface unnecessarily.

**Rationale**: The existing interface is flexible enough. `predict()` for GAN interprets "input" as a noise seed/count and returns generated coordinates. `evaluate()` returns loss values instead of accuracy/MSE.

### 4. GenerativeMetrics type

**Decision**: New type with `generatorLoss`, `discriminatorLoss`, and `numSamplesGenerated`. MetricsPanel gets a new branch to render these as metric cards.

**Rationale**: Follows the same pattern used for ClusteringMetrics. Simple, clean, no breaking changes.

### 5. Prediction section becomes "Generate Samples"

**Decision**: When `algorithmType === "generative"`, the prediction section shows a "Generate" button instead of a PredictionForm. Clicking it generates a batch of samples and displays them as a scatter plot alongside the real distribution.

**Rationale**: A GAN doesn't take user input features — it generates from noise. The scatter plot comparison is the most educational way to show the Generator's output quality.

### 6. Visualization: real vs generated scatter plot + loss curves

**Decision**: D3.js visualization with two panels:
1. **Scatter plot**: Shows real data points (blue) and generated points (orange), with a slider to scrub through training epochs
2. **Loss chart**: Generator and Discriminator loss curves over training

**Rationale**: The evolving scatter plot is the key insight — watching generated points go from random noise to matching the real distribution makes the adversarial dynamics tangible.

## Risks / Trade-offs

- **[GAN training instability]** GANs are notoriously hard to train — mode collapse, oscillating losses. → Mitigation: Use a simple 2D problem where convergence is reliable. Pre-tune hyperparameter defaults. Add learning rate scheduling if needed.

- **[Browser performance]** Training a GAN with forward/backward passes for both networks each iteration. → Mitigation: Small networks (16 hidden units), 200 data points, 500-2000 iterations. Should complete in <10s.

- **[Predict semantics]** GAN "predict" doesn't map input→output in the traditional sense. → Mitigation: The predict function treats the input as a noise seed count and returns generated 2D coordinates. The UI is adapted with a "Generate Samples" button instead of feature input fields.

- **[AlgorithmPageClient complexity]** Adding another conditional branch for generative algorithms. → Mitigation: The pattern is established (clustering already added conditionals). Just one more branch for the prediction/generation section.
