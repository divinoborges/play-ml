## Why

PlayML now covers 10 algorithms across regression, classification, clustering, and deep learning — but has no generative model. **Generative Adversarial Networks (GANs)** are one of the most influential deep learning architectures, powering image synthesis, data augmentation, and creative AI. Adding a GAN introduces a new paradigm (generative modeling) and gives learners hands-on experience with adversarial training dynamics.

## What Changes

- Add **GAN (Generative Adversarial Network)** algorithm — a generative deep learning model where a Generator and Discriminator compete in a minimax game
- Introduce a new `"generative"` algorithm type to support models that produce output samples rather than predictions on input features
- Create a simple 2D point distribution dataset where the Generator learns to reproduce a target distribution (e.g., a ring or clusters), making the adversarial training dynamics visually clear
- Add D3.js interactive visualization showing generated points evolving over training epochs alongside the real distribution, plus Generator/Discriminator loss curves
- Add mathematical formulas (KaTeX) for the GAN minimax objective and pseudocode
- Add full i18n support (en + pt-BR)
- Adapt the prediction section to show "Generate Samples" instead of prediction inputs for generative algorithms

## Capabilities

### New Capabilities
- `gan-algorithm`: GAN algorithm implementation (Generator + Discriminator networks), dataset, visualization, math/code content, and i18n translations within the deep learning category. Introduces the "generative" algorithm type.

### Modified Capabilities
- `ml-engine`: Add support for generative learning workflows — GAN does not predict on input features; instead it generates new samples. Needs generative-specific metrics (generator loss, discriminator loss) and a different train/predict interface where "predict" means "generate N samples".
- `datasets`: New dataset file for GAN (2D point distribution for the generator to learn).

## Impact

- **Code**: New files in `lib/algorithms/`, `components/visualizations/`, updates to `lib/registry.ts`, `lib/math-content.tsx`, `lib/code-content.ts`
- **Types**: Extend `AlgorithmType` with `"generative"`, add `GenerativeMetrics` type, adapt `MetricsPanel` and `AlgorithmPageClient` for generative display
- **UI**: Prediction section becomes "Generate Samples" for generative algorithms; MetricsPanel shows G/D losses
- **Datasets**: One new JSON file in `public/datasets/`
- **i18n**: New translation keys in both locale files
- **Dependencies**: Custom implementation (no external library needed — simple MLP generator/discriminator)
