## Context

PlayML is a greenfield Next.js web application for interactive ML learning. The entire platform runs client-side — no backend, no auth, no database. Users explore 8 ML algorithms through a consistent 6-section page structure, train models in the browser, and compare algorithms side-by-side. The app must support PT-BR/EN internationalization and deploy to free static hosting.

The project has no existing codebase. Key constraints from the PRD: <3s homepage load on 4G, <5s training for classical algorithms, <30s for deep learning, desktop-first responsive design.

## Goals / Non-Goals

**Goals:**
- Establish a scalable project structure where adding new algorithms follows a consistent pattern
- Choose ML libraries that balance bundle size with capability (classical vs deep learning)
- Design a component architecture that enforces visual consistency across algorithm pages
- Enable full i18n without duplicating page components
- Keep initial bundle size reasonable despite heavy dependencies (TensorFlow.js, D3.js)

**Non-Goals:**
- Server-side rendering for ML computation
- User accounts, persistence, or any backend
- Mobile-optimized D3.js visualizations (desktop-first, functional on mobile)
- PWA or offline support
- Analytics integration (deferred to post-MVP)

## Decisions

### 1. ML Library Strategy: Dual-library approach

**Decision:** Use `ml.js` for classical algorithms (Linear Regression, Logistic Regression, Decision Tree, KNN, SVM, Random Forest) and `TensorFlow.js` only for CNN and Transformers.

**Rationale:** ml.js is ~50KB vs TensorFlow.js at ~1.5MB. Classical algorithms don't need GPU acceleration or tensor operations. Loading TensorFlow.js only on deep learning pages via dynamic imports keeps the homepage and classical algorithm pages fast.

**Alternatives considered:**
- TensorFlow.js for everything: Simpler API surface but massive initial bundle even for simple algorithms
- Custom implementations: Too much effort and risk of pedagogical inaccuracy
- WebAssembly (ONNX Runtime Web): More complex build pipeline, less ecosystem support for training

### 2. Project Structure: Feature-based with algorithm registry

**Decision:** Organize by feature with a centralized algorithm registry that defines metadata, dataset paths, hyperparameters, and component mappings for each algorithm.

```
src/
  app/
    [locale]/
      page.tsx                    # Homepage
      algorithms/
        [slug]/page.tsx           # Dynamic algorithm page
      compare/page.tsx            # Comparison page
  components/
    shared/                       # TrainButton, PredictButton, MetricsPanel, DatasetTable, HyperparameterPanel
    visualizations/               # Per-algorithm D3.js visualizations
  lib/
    algorithms/                   # ML logic per algorithm (train, predict, evaluate)
    registry.ts                   # Algorithm registry (metadata, configs)
    datasets/                     # Dataset loaders
  i18n/
    messages/
      en.json
      pt-BR.json
public/
  datasets/                       # Static JSON datasets
```

**Rationale:** The dynamic `[slug]` route with a registry pattern means adding a new algorithm requires: (1) adding an entry to the registry, (2) creating a visualization component, (3) implementing the ML logic module, (4) adding the dataset JSON, and (5) adding i18n keys. The page template itself is shared.

**Alternatives considered:**
- Separate page per algorithm: Too much duplication; 8 nearly identical page files
- Single monolithic page with switch statements: Hard to maintain, poor code splitting

### 3. Visualization Layer: D3.js with React wrappers

**Decision:** Use D3.js for data-driven visualizations wrapped in React components via `useRef` + `useEffect`. Each algorithm gets a dedicated visualization component.

**Rationale:** D3.js gives full control over interactive, animated visualizations (animated regression lines, growing decision trees, attention heatmaps). React wrappers keep D3 lifecycle managed. No existing React charting library (Recharts, Nivo) supports the custom interactive visualizations needed.

**Alternatives considered:**
- Recharts/Nivo: Good for standard charts but can't handle algorithm-specific interactive visualizations
- Canvas/WebGL: Better performance but harder to make accessible and interactive
- Observable Plot: Less control over animations and interactivity

### 4. i18n: next-intl with locale-based routing

**Decision:** Use `next-intl` with `[locale]` prefix routing (`/en/algorithms/...`, `/pt-BR/algorithms/...`). Algorithm technical names stay in English in both locales. Content strings live in JSON message files.

**Rationale:** next-intl is the most mature i18n solution for Next.js App Router. Locale-based routing is SEO-friendly and allows direct linking to specific language versions. JSON message files are easy to maintain and contribute to.

**Alternatives considered:**
- react-i18next: Works but less integrated with App Router
- Custom context-based solution: Reinventing the wheel

### 5. Dataset Format: Static JSON with typed schemas

**Decision:** Each algorithm's dataset is a JSON file in `/public/datasets/<algorithm-slug>.json` with a standardized schema: `{ features: [...], target: string, trainData: [...], testData: [...], metadata: { description, featureDescriptions } }`.

**Rationale:** JSON is directly importable, typed, and lightweight. Standardized schema allows the shared `DatasetTable` component to render any algorithm's data without custom logic.

**Alternatives considered:**
- CSV files: Require parsing logic, harder to type
- Embedded in JS modules: Increases bundle size, not cacheable separately

### 6. Component Architecture: Shared layout, pluggable content

**Decision:** Create 5 standardized shared components (`TrainButton`, `PredictButton`, `MetricsPanel`, `DatasetTable`, `HyperparameterPanel`) used identically across all algorithm pages. The algorithm page template composes these with algorithm-specific visualization and ML logic from the registry.

**Rationale:** Ensures visual consistency (buttons always in same position, same style) while allowing content to vary per algorithm. The registry pattern maps each algorithm slug to its specific visualization component and ML module.

### 7. CNN Image Dataset: Base64-encoded reduced set

**Decision:** Ship ~100 chest X-ray images at 64x64 resolution, base64-encoded in a JSON file with lazy loading. Total size target: <2MB.

**Rationale:** Keeps the dataset embeddable without a backend while staying under reasonable bundle limits. 64x64 is sufficient for a pedagogical CNN demo. Lazy loading prevents blocking homepage load.

**Alternatives considered:**
- Full-resolution images in /public: Too large for static bundle
- External CDN: Violates the "no external dependencies" constraint
- Generated/synthetic image data: Less pedagogically compelling

### 8. Transformers: Minimal encoder-only architecture

**Decision:** Implement a 2-layer encoder-only Transformer with reduced vocabulary (~5000 tokens) and short sequences (max 64 tokens) for sentiment analysis. Include a pre-computed fallback demo for low-powered devices.

**Rationale:** Full Transformers are too heavy for browser training. A minimal architecture still demonstrates attention mechanisms, embeddings, and the core concepts. The fallback ensures the page is useful even on weaker hardware.

## Risks / Trade-offs

**[TensorFlow.js bundle size on deep learning pages]** → Dynamic imports with `next/dynamic` and loading states. TF.js loads only when user navigates to CNN or Transformers pages.

**[D3.js memory leaks in React]** → Strict cleanup in useEffect return functions. Each visualization component must remove all SVG elements and event listeners on unmount.

**[Transformer training timeout on low-end hardware]** → Pre-computed demo mode as fallback. Detect slow performance after first epoch and offer to switch to demo.

**[8 datasets + images inflating build size]** → JSON datasets are small (~50KB each). CNN images are the concern — lazy load and keep at 64x64 resolution. Total static assets target: <5MB.

**[i18n maintenance burden with 8 algorithms]** → Structured i18n keys by algorithm slug (`algorithms.linear-regression.context.title`, etc.) make it clear what needs translating. Missing key fallback to English.

**[ml.js library maturity]** → ml.js is stable for the algorithms needed but less actively maintained than TensorFlow.js. Pin versions and include basic integration tests for each algorithm's train/predict cycle.
