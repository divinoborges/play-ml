## 1. Type System & Infrastructure

- [x] 1.1 Add `"generative"` to `AlgorithmType` union in `lib/registry.ts`
- [x] 1.2 Add `GenerativeMetrics` type to `components/shared/MetricsPanel` (generatorLoss, discriminatorLoss, numSamplesGenerated)
- [x] 1.3 Update `TrainResult` metrics union in `lib/algorithms/types.ts` to include `GenerativeMetrics`
- [x] 1.4 Update `MetricsPanel` component to render generative metrics (G loss, D loss, samples generated)

## 2. GAN Algorithm

- [x] 2.1 Create `lib/algorithms/gan.ts` implementing Generator + Discriminator MLPs with adversarial training loop
- [x] 2.2 Register GAN module in `lib/algorithms/index.ts`
- [x] 2.3 Add GAN config to `lib/registry.ts` (slug: `gan`, category: `deepLearning`, algorithmType: `generative`, color: `#8B5CF6`)
- [x] 2.4 Create `public/datasets/gan.json` (2D ring distribution, ~200 points)
- [x] 2.5 Create `components/visualizations/GANViz.tsx` (real vs generated scatter plot + epoch slider + loss curves)
- [x] 2.6 Register GANViz in `components/visualizations/index.ts`
- [x] 2.7 Add GAN math formulas to `lib/math-content.tsx` (minimax objective, G loss, D loss)
- [x] 2.8 Add GAN pseudocode to `lib/code-content.ts`
- [x] 2.9 Add GAN translations to `messages/en.json` (name, summary, context, features)
- [x] 2.10 Add GAN translations to `messages/pt-BR.json`

## 3. UI Integration

- [x] 3.1 Update `AlgorithmPageClient` prediction section for generative algorithms (show "Generate Samples" button + scatter plot instead of PredictionForm)
- [x] 3.2 Add generative-related translation keys (`sections.generateSamples`) to `messages/en.json` and `messages/pt-BR.json`
- [x] 3.3 Add generative metrics translation keys (`metrics.generatorLoss`, `metrics.discriminatorLoss`, `metrics.samplesGenerated`) to both locale files

## 4. Validation

- [x] 4.1 Verify GAN trains and generated points converge toward the ring distribution
- [x] 4.2 Verify GAN page renders correctly in en and pt-BR locales
- [x] 4.3 Run full build (`next build`) and fix any type errors or build issues
