## Why

The current PlayML UI uses a generic gray/white Tailwind design with Geist font. The platform's educational and playful purpose demands a bold, memorable visual identity that excites learners and stands out from dry, corporate ML tools. A neo-pop style inspired by "Remodelling the Internet" (The Verge) — with vibrant alternating backgrounds, monospace headings, thick black outlines, and saturated accent colors — will transform PlayML from "functional" to "memorable."

## What Changes

- Replace the color palette: swap neutral grays for vibrant backgrounds (black, blue electric #1185F7, yellow #FFE500, orange #FF6B00, sand #E8D5B7) with saturated accents (magenta, lime, sky, red-pop)
- Replace typography: swap Geist for Space Mono (headings, bold/uppercase) + DM Sans (body text), with aggressive display sizes (4.5rem down to 1.75rem)
- Restyle all shared components with thick black outlines (border-2/3), pill shapes (rounded-full), sand-colored cards (rounded-3xl), and stat badges
- Add a decorative multi-color border strip to the header
- Restyle the homepage hero with alternating vibrant section backgrounds
- Restyle algorithm cards with black outlines, category-colored pills, and hover inversion (bg-black + inverted text)
- Restyle algorithm page sections with alternating background colors per section
- Restyle the comparison page to match the new design system
- Update the header/nav to use the new visual language (monospace font, pill-shaped nav items, color border)
- Add browser chrome frame component for wrapping visualizations

## Capabilities

### New Capabilities
- `design-system`: Global design tokens (colors, typography, border widths, spacing), Tailwind theme configuration, CSS custom properties, and decorative border component
- `component-restyling`: Restyle all existing shared components (Header, AlgorithmCatalog, AlgorithmCard, DatasetTable, HyperparameterPanel, TrainButton, PredictButton, MetricsPanel, PredictionForm) and page layouts (homepage, algorithm page, comparison page) to the neo-pop style guide

### Modified Capabilities

## Impact

- **CSS/Tailwind**: Update `globals.css` with new theme tokens; install Space Mono and DM Sans via `next/font/google`
- **Components**: Every shared component and page layout file will be updated with new class names — purely visual changes, no logic changes
- **Layout**: Root layout switches fonts; locale layout adds decorative border
- **Bundle**: Two new Google Fonts (~50KB total) replace Geist
- **No breaking changes**: All functionality, i18n, routing, and ML engine remain unchanged
