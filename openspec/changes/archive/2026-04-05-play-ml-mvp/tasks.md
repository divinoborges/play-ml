## 1. Project Setup

- [x] 1.1 Initialize Next.js project with App Router, TypeScript, and Tailwind CSS
- [x] 1.2 Install dependencies: d3, ml.js, @tensorflow/tfjs, next-intl
- [x] 1.3 Configure next-intl with `[locale]` routing, EN and PT-BR message files, and browser language detection middleware
- [x] 1.4 Create base layout with header (nav, language toggle) and responsive shell
- [x] 1.5 Create algorithm registry (`src/lib/registry.ts`) with metadata, slugs, categories, hyperparameter configs, and dataset paths for all 8 algorithms

## 2. Shared Components

- [x] 2.1 Create `<DatasetTable />` component with train/test tabs, sample count, feature count, and horizontal scroll on mobile
- [x] 2.2 Create `<HyperparameterPanel />` component with dynamic sliders and dropdowns driven by registry config
- [x] 2.3 Create `<TrainButton />` component with loading state, progress bar, and success animation
- [x] 2.4 Create `<PredictButton />` component with disabled state when no model is trained
- [x] 2.5 Create `<MetricsPanel />` component that renders regression metrics (MSE, RMSE, MAE, R²) or classification metrics (Accuracy, Precision, Recall, F1, confusion matrix) based on algorithm type
- [x] 2.6 Create prediction input form component with pre-filled test sample selection

## 3. Homepage

- [x] 3.1 Build hero section with platform name, tagline, and CTA
- [x] 3.2 Build algorithm card component with name, category tag, and use-case summary
- [x] 3.3 Build algorithm grid with responsive layout (multi-column desktop, single-column mobile)
- [x] 3.4 Implement category filter (All, Supervised Regression, Supervised Classification, Deep Learning)

## 4. Algorithm Page Template

- [x] 4.1 Create dynamic route `[locale]/algorithms/[slug]/page.tsx` that loads algorithm config from registry
- [x] 4.2 Implement Section 1 - Real-World Context with title, description paragraphs, and application example cards
- [x] 4.3 Integrate Section 2 - Dataset using `<DatasetTable />` with algorithm's themed dataset
- [x] 4.4 Implement Section 3 - How It Works container with collapsible "See the math" subsection
- [x] 4.5 Implement Section 4 - Training using `<HyperparameterPanel />` and `<TrainButton />` wired to ML engine
- [x] 4.6 Implement Section 5 - Prediction using input form and `<PredictButton />` wired to trained model
- [x] 4.7 Implement Section 6 - Metrics using `<MetricsPanel />` populated after training

## 5. Datasets

- [x] 5.1 Create standardized dataset JSON schema and TypeScript types
- [x] 5.2 Generate Linear Regression dataset (real estate: area, rooms, location -> rent price)
- [x] 5.3 Generate Logistic Regression dataset (customers: usage, contract, support -> churn)
- [x] 5.4 Generate Decision Tree dataset (patients: age, symptoms, exams -> diagnosis)
- [x] 5.5 Generate KNN dataset (movies: genre, duration, rating -> recommendation)
- [x] 5.6 Generate SVM dataset (transactions: amount, time, location -> fraud)
- [x] 5.7 Generate Random Forest dataset (credit: income, history, debt -> approval)
- [x] 5.8 Generate CNN dataset (chest X-ray images, ~100 samples, 64x64, base64 in JSON, <2MB)
- [x] 5.9 Generate Transformers dataset (product reviews with sentiment labels, max 64 tokens)

## 6. ML Engine - Classical Algorithms

- [x] 6.1 Implement Linear Regression train/predict/evaluate module using ml.js
- [x] 6.2 Implement Logistic Regression train/predict/evaluate module using ml.js
- [x] 6.3 Implement Decision Tree train/predict/evaluate module using ml.js
- [x] 6.4 Implement KNN train/predict/evaluate module using ml.js
- [x] 6.5 Implement SVM train/predict/evaluate module using ml.js
- [x] 6.6 Implement Random Forest train/predict/evaluate module using ml.js
- [x] 6.7 Implement shared metrics computation (MSE, RMSE, MAE, R², Accuracy, Precision, Recall, F1, confusion matrix)

## 7. ML Engine - Deep Learning

- [x] 7.1 Implement CNN model architecture in TensorFlow.js (conv layers, pooling, dense) with dynamic import
- [x] 7.2 Implement CNN training with per-epoch progress callback and image data loading
- [x] 7.3 Implement Transformers minimal encoder-only architecture in TensorFlow.js (2 layers, attention, embedding)
- [x] 7.4 Implement Transformers training with per-epoch progress and tokenization
- [x] 7.5 Implement slow-hardware detection and pre-computed fallback for Transformers

## 8. D3.js Visualizations

- [x] 8.1 Create Linear Regression visualization (animated scatter plot with fitting line and residuals)
- [x] 8.2 Create Logistic Regression visualization (sigmoid curve with threshold slider, 2D decision boundary)
- [x] 8.3 Create Decision Tree visualization (animated tree building with node splits and Gini values)
- [x] 8.4 Create KNN visualization (points with neighbor circles, K slider)
- [x] 8.5 Create SVM visualization (hyperplane, support vectors, margin, C parameter slider)
- [x] 8.6 Create Random Forest visualization (multiple trees voting, ensemble result)
- [x] 8.7 Create CNN visualization (image through conv layers with feature maps and kernels)
- [x] 8.8 Create Transformers visualization (attention heatmap between tokens, encoder architecture)
- [x] 8.9 Implement responsive sizing and proper cleanup (SVG removal + event listener teardown on unmount)

## 9. Comparison Page

- [x] 9.1 Build algorithm multi-select (2-4 algorithms) with dataset selector
- [x] 9.2 Implement batch training with per-algorithm progress indicators
- [x] 9.3 Build comparative results view: metrics table, bar chart, training time comparison
- [x] 9.4 Implement educational message generation based on result comparison

## 10. Internationalization Content

- [x] 10.1 Create EN message file with all UI labels, section headers, metric names, and algorithm descriptions
- [x] 10.2 Create PT-BR message file with all translations (algorithm names stay in English)
- [x] 10.3 Wire language toggle to next-intl locale switching with localStorage persistence
- [x] 10.4 Verify all pages render correctly in both languages

## 11. Polish and Performance

- [x] 11.1 Add code splitting: dynamic imports for TensorFlow.js, per-algorithm visualization components, and dataset files
- [x] 11.2 Add loading states and skeleton screens for algorithm pages
- [x] 11.3 Verify homepage loads in <3s on simulated 4G throttling
- [x] 11.4 Verify classical algorithm training completes in <5s
- [x] 11.5 Verify CNN/Transformers training completes in <30s
- [ ] 11.6 Test responsive layout on mobile viewports (cards stack, tables scroll, panels collapse)
- [ ] 11.7 Cross-browser testing: Chrome, Firefox, Safari (desktop)
