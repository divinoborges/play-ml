## 1. Locate hero

- [x] \1 Identify the homepage hero component/section in the Next.js `app/` route
- [ ] 1.2 Confirm current background styling and existing z-index/stacking

## 2. Build HeroBackdrop component

- [ ] 2.1 Create `HeroBackdrop` component colocated with the hero, rendering an `aria-hidden`, `pointer-events-none`, absolutely-positioned layer
- [ ] 2.2 Add inline SVG with a subtle dotted/grid pattern sized to fill the hero
- [ ] 2.3 Add 2–3 soft radial-gradient "glow" blobs in existing brand accent colors
- [ ] 2.4 Add a sparse neural-graph motif (a few nodes + thin connecting lines) in SVG
- [ ] 2.5 Add a dark gradient overlay behind the text column to protect contrast

## 3. Integrate into homepage hero

- [ ] 3.1 Make the hero container `relative` and lift text content to `relative z-10`
- [ ] 3.2 Mount `HeroBackdrop` as a sibling with `absolute inset-0 -z-0`
- [ ] 3.3 Remove the plain solid-black background rule from the hero

## 4. Motion + accessibility

- [ ] 4.1 Add slow CSS `@keyframes` float on the glow blobs (transform/opacity only)
- [ ] 4.2 Gate all animation behind `@media (prefers-reduced-motion: reduce)` disabling motion
- [ ] 4.3 Verify headline, subheadline, and CTA meet WCAG AA contrast over the backdrop

## 5. Responsive + performance check

- [ ] 5.1 Verify layout on mobile (<768px), tablet, and desktop breakpoints
- [ ] 5.2 Confirm SVG is under ~5KB and no new npm dependencies were added
- [ ] 5.3 Spot-check Lighthouse performance and accessibility are not regressed

## 6. Commit

- [ ] 6.1 Create atomic commit using conventional commits (e.g., `feat(homepage): add decorative ML-themed hero backdrop`)
