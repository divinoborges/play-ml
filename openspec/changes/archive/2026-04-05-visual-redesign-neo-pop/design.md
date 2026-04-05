## Context

PlayML is a Next.js 16 app with Tailwind CSS v4 (using `@import "tailwindcss"` and `@theme inline` blocks in `globals.css`). The current design uses Geist Sans font, neutral gray palette, and standard rounded borders. All components are in `components/shared/` and pages in `app/[locale]/`. The style guide specifies a neo-pop aesthetic with Space Mono + DM Sans fonts, vibrant alternating backgrounds, thick black outlines, and pill/card shapes.

Tailwind v4 uses CSS-based configuration via `@theme inline` in the CSS file rather than `tailwind.config.js`. Custom colors, fonts, and sizing are defined as CSS custom properties within `@theme inline` blocks.

## Goals / Non-Goals

**Goals:**
- Apply the full neo-pop color palette as Tailwind theme tokens
- Switch to Space Mono (headings) + DM Sans (body) typography
- Restyle every user-facing component and page to match the style guide
- Maintain all existing functionality, i18n, and responsive behavior
- Keep the restyling purely in CSS classes — no logic changes

**Non-Goals:**
- Custom illustrations or SVG artwork (use bold icons and colored frames instead)
- Animated page transitions or scroll-driven effects
- Changing any ML logic, routing, or data flow
- Dark mode (the style guide is light/colorful by nature)

## Decisions

### 1. Tailwind v4 Theme Configuration

**Decision:** Define all design tokens in `globals.css` using `@theme inline` blocks with CSS custom properties. Import fonts via `next/font/google` in the root layout.

**Rationale:** Tailwind v4 doesn't use `tailwind.config.js` for theme. The `@theme inline` block in CSS is the canonical way to extend the theme. Fonts loaded via `next/font/google` are optimized and self-hosted automatically.

### 2. Section Background Alternation Strategy

**Decision:** Each algorithm page section gets a distinct background color from the palette, cycling through: black → blue-electric → yellow-pop → sand → orange-pop → blue-electric. The homepage hero uses black bg with white text. Algorithm cards sit on a sand background.

**Rationale:** The style guide's core visual device is alternating vibrant backgrounds. Hardcoding per-section colors (rather than dynamic cycling) keeps it simple and lets us fine-tune readability per section.

### 3. Component Restyling Approach

**Decision:** Update class names in-place on existing components. No new wrapper components or CSS modules. Every component gets:
- `border-2 border-black` or `border-3 border-black` (heavy outlines)
- `rounded-full` for pills/badges, `rounded-3xl` for cards
- `font-heading` for labels/headings, `font-body` for content
- Category colors mapped to accent colors: regression → blue-electric, classification → lime-pop, deep learning → magenta

**Rationale:** Minimal code churn — same components, same props, new classes. The style guide is purely visual.

### 4. Browser Chrome Frame for Visualizations

**Decision:** Create a `<BrowserFrame />` component that wraps D3 visualizations in a faux-browser window (traffic light dots + URL bar + bordered frame).

**Rationale:** The style guide uses browser chrome frames as a visual device. Wrapping the "How It Works" visualizations in this frame adds personality and reinforces the retro-web aesthetic.

### 5. Hover/Interaction Pattern

**Decision:** Interactive elements (cards, buttons) use bg-to-black inversion on hover: `hover:bg-black hover:text-[accent-color] transition-colors`.

**Rationale:** Direct from the style guide's hover pattern. Creates a punchy, consistent interaction feel.

## Risks / Trade-offs

**[Readability on vibrant backgrounds]** → Test contrast ratios. Use `text-black` on light backgrounds, `text-white` on black/dark backgrounds. Body text uses `text-black/80` for softer reading.

**[Tailwind v4 @theme inline syntax]** → Less documented than v3 config. Test that all custom utilities resolve correctly.

**[Font loading performance]** → Space Mono and DM Sans are lightweight Google Fonts. Using `next/font/google` ensures they're self-hosted and don't block rendering.

**[Accessibility of saturated colors]** → Magenta on white or yellow on white may fail WCAG. Use black text on all colored backgrounds, and ensure interactive elements have sufficient contrast.
