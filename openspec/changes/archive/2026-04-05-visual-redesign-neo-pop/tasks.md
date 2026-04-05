## 1. Design Tokens & Fonts

- [x] 1.1 Update `app/globals.css` with neo-pop color palette, display font sizes, and border-3 utility via `@theme inline`
- [x] 1.2 Replace Geist with Space Mono (700) and DM Sans (400, 500, 700) via `next/font/google` in `app/layout.tsx`
- [x] 1.3 Add decorative multi-color border strip component and include it in the locale layout

## 2. New Components

- [x] 2.1 Create `<BrowserFrame />` component (traffic light dots, URL bar, bordered content area)
- [x] 2.2 Create `<ColorBorder />` decorative stripe component (magenta, yellow-pop, red-pop, blue-electric, lime-pop, orange-pop repeating)

## 3. Header Restyling

- [x] 3.1 Restyle Header: black background, white text, font-heading logo, pill-shaped nav items, border-white language toggle pill

## 4. Homepage Restyling

- [x] 4.1 Restyle hero section: black background, white text, font-heading text-display-xl uppercase heading, yellow-pop pill CTA with hover inversion
- [x] 4.2 Restyle algorithm catalog section: sand background with generous padding
- [x] 4.3 Restyle AlgorithmCard: border-2 border-black, rounded-2xl, bg-sand, category pill with accent color, hover inversion to bg-black/white text
- [x] 4.4 Restyle category filter buttons: pill shape with border-2 border-black, active state uses accent color

## 5. Algorithm Page Restyling

- [x] 5.1 Apply alternating section backgrounds: Context → black, Dataset → blue-electric, How It Works → yellow-pop, Training → sand, Prediction → orange-pop, Metrics → blue-electric
- [x] 5.2 Restyle Section 1 (Context): white text on black, context cards with border-2 border-white rounded-2xl
- [x] 5.3 Restyle Section 2 (Dataset): wrap DatasetTable in outlined container on blue-electric background
- [x] 5.4 Wrap Section 3 (How It Works) visualization in BrowserFrame on yellow-pop background
- [x] 5.5 Restyle Section 4 (Training): sand background, outlined HyperparameterPanel, yellow-pop TrainButton pill
- [x] 5.6 Restyle Section 5 (Prediction): orange-pop background, outlined PredictionForm, lime-pop PredictButton pill
- [x] 5.7 Restyle Section 6 (Metrics): blue-electric background, stat badges with yellow-pop number cards

## 6. Shared Component Restyling

- [x] 6.1 Restyle DatasetTable: border-2 border-black rounded-2xl, font-heading table headers, sand header row background
- [x] 6.2 Restyle HyperparameterPanel: border-2 border-black rounded-2xl bg-sand, font-heading labels
- [x] 6.3 Restyle TrainButton: rounded-full border-2 border-black bg-yellow-pop font-heading uppercase, hover inversion, progress bar in magenta
- [x] 6.4 Restyle PredictButton: rounded-full border-2 border-black bg-lime-pop font-heading uppercase, hover inversion
- [x] 6.5 Restyle MetricsPanel: stat badge format (number in bg-yellow-pop rounded-2xl + description in bg-sand rounded-full), confusion matrix with border-2 border-black cells
- [x] 6.6 Restyle PredictionForm: border-2 border-black rounded-2xl inputs, sample buttons as outlined pills

## 7. Comparison Page Restyling

- [x] 7.1 Restyle comparison page header/selection area: sand background, outlined checkboxes, pill buttons
- [x] 7.2 Restyle comparison results: blue-electric background, stat badges, bar chart with pop colors
- [x] 7.3 Restyle educational insight card: rounded-3xl bg-sand border-2 border-black with font-heading title

## 8. Verification

- [x] 8.1 Build passes with no TypeScript or CSS errors
- [x] 8.2 Verify all pages render correctly in both EN and PT-BR with new styling
- [ ] 8.3 Verify hover interactions work on cards, buttons, and nav items
- [ ] 8.4 Verify responsive layout still functions on mobile viewports
