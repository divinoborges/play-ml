## Why

Developers learning Machine Learning face fragmented resources (25+ tools, each covering 1-3 algorithms with different interfaces) and zero guidance on algorithmic discernment — knowing when a simple model outperforms an expensive LLM API call. No existing platform offers a unified, interactive experience covering algorithms from Linear Regression to Transformers with side-by-side comparison on the same dataset. PlayML fills this gap as a free, open-source, zero-setup web platform where users learn ML by experimenting directly in the browser.

## What Changes

- Create a Next.js (App Router) web application with Tailwind CSS
- Build a homepage with an algorithm catalog (8 algorithms in grid/card layout with category filters)
- Implement standardized algorithm pages with 6 sections: Real-World Context, Dataset, How It Works (interactive D3.js visualization), Training (client-side with hyperparameter controls), Prediction, and Metrics
- Implement 6 classical ML algorithms (Linear Regression, Logistic Regression, Decision Tree, KNN, SVM, Random Forest) using ml.js or TensorFlow.js
- Implement 2 deep learning algorithms (CNN, Transformers) using TensorFlow.js with reduced datasets
- Embed themed datasets per algorithm as static JSON (real estate pricing, churn prediction, medical triage, movie recommendations, fraud detection, credit analysis, chest X-ray diagnosis, sentiment analysis)
- Build an algorithm comparison page (select 2-4 algorithms, train on shared dataset, see results side-by-side)
- Add full internationalization (PT-BR / EN) with browser detection and manual toggle
- All ML training/inference runs 100% client-side (no backend)

## Capabilities

### New Capabilities
- `homepage`: Algorithm catalog with hero section, category filters, algorithm cards, and language toggle
- `algorithm-page`: Standardized algorithm page template with 6 sections (context, dataset, visualization, training, prediction, metrics)
- `ml-engine`: Client-side ML training and inference engine supporting 8 algorithms via TensorFlow.js/ml.js
- `visualizations`: Interactive D3.js visualizations for each algorithm (scatter plots, sigmoid curves, decision trees, neighbor circles, hyperplanes, ensemble voting, feature maps, attention maps)
- `datasets`: Embedded themed datasets per algorithm with train/test splits
- `comparison-page`: Side-by-side algorithm comparison with shared datasets and comparative metrics
- `i18n`: Full internationalization system (PT-BR / EN) with browser detection and persistent toggle

### Modified Capabilities

## Impact

- **New codebase**: Greenfield Next.js project — no existing code affected
- **Dependencies**: next, react, tailwindcss, d3, tensorflow.js (tfjs), ml.js, next-intl
- **Bundle size**: TensorFlow.js and D3.js are significant — requires code splitting and lazy loading for algorithm pages
- **Performance**: CNN/Transformers training must complete <30s client-side; classical algorithms <5s
- **Static assets**: ~8 JSON dataset files + reduced image dataset for CNN in `/public/datasets/`
- **Hosting**: Must support static export for free hosting (Vercel, Netlify)
