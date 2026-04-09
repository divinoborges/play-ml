## Context

The homepage hero currently renders on a flat black background. Users perceive the landing as austere and "sem graça" (dull). We want a playful, ML-themed backdrop without sacrificing legibility, performance, or accessibility. Stack: Next.js 16, React 19, TailwindCSS 4, D3.js already available.

## Goals / Non-Goals

**Goals:**
- Replace the plain black hero background with a decorative ML-themed visual.
- Preserve WCAG AA contrast for headline, subheadline, and CTA.
- Keep the addition lightweight (no new npm deps if avoidable; <10KB over the wire).
- Respect `prefers-reduced-motion`.
- Work responsively from mobile to large desktop.

**Non-Goals:**
- Redesigning the rest of the homepage (algorithm grid, filters, footer).
- Adding interactive hero elements (clickable particles, games, etc.).
- Introducing a canvas/WebGL engine or external animation library.

## Decisions

### Decision 1: Pure CSS/SVG backdrop over canvas or Lottie
Use an inline SVG layer + CSS gradients/masks, rendered as an absolutely-positioned element behind hero content. Rationale:
- Zero new dependencies, tree-shake friendly, SSR-safe.
- Scales crisply on all DPRs.
- Easy to theme with Tailwind tokens.
Alternatives considered:
- **Canvas particles (tsParticles, three.js):** adds significant bundle weight and CPU cost for a decorative element.
- **Lottie animation:** requires a runtime and asset pipeline for a one-off.

### Decision 2: Visual motif — "neural grid + scatter points"
Compose the backdrop from (a) a faint dotted/grid pattern evoking a feature space, (b) a few soft glowing blobs (radial gradients) in brand accent colors, and (c) a sparse scatter of nodes connected by thin lines suggesting a small neural graph. Rationale: immediately reads as "ML/data" without being cliché or noisy.
Alternatives considered:
- Pure abstract gradient (too generic).
- Math formulas / code rain (too literal, distracts from copy).

### Decision 3: Subtle motion, gated by `prefers-reduced-motion`
Animate only the glowing blobs with a slow CSS `@keyframes` float (20–30s loop). Disable motion entirely when the user prefers reduced motion. Rationale: adds life without being distracting; zero JS required.

### Decision 4: Component location
Implement as a dedicated `HeroBackdrop` client-optional component colocated with the hero section in the homepage route. The hero container becomes `relative`; the backdrop sits in an `absolute inset-0 -z-0` layer with `pointer-events-none`; hero content stays in a `relative z-10` layer. Rationale: contained blast radius, easy to remove or tweak.

### Decision 5: Contrast protection
Layer a dark gradient overlay (e.g., `from-black/80 via-black/60 to-transparent`) over the backdrop behind the text column so headline/CTA contrast stays WCAG AA even on bright blob regions.

## Risks / Trade-offs

- **Risk:** Decorative SVG increases DOM size and could shift LCP. → **Mitigation:** Keep SVG under ~5KB, mark it `aria-hidden`, ensure it does not block the hero text from rendering (text stays in the same DOM order, backdrop is sibling).
- **Risk:** Animation on low-end devices causes jank. → **Mitigation:** Animate only `transform` / `opacity` on a handful of nodes; disable via `prefers-reduced-motion`.
- **Risk:** Visual clashes with existing dark theme tokens. → **Mitigation:** Use existing Tailwind theme colors / design-system tokens; review against `design-system` spec before merging.
- **Risk:** Text contrast regression. → **Mitigation:** Gradient overlay + manual contrast check on headline, subheadline, and CTA.
