## 1. Mobile Select Implementation

- [x] 1.1 Add a `<select>` element in `AlgorithmCatalog.tsx` with all category options using translated labels, bound to the existing `filter` state via `onChange`
- [x] 1.2 Style the `<select>` with neo-pop classes: `border-2 border-black rounded-full font-heading text-sm font-bold uppercase px-5 py-2 bg-sand-light`
- [x] 1.3 Add `md:hidden` to the `<select>` so it only shows on mobile
- [x] 1.4 Add `hidden md:flex` to the existing button row so it only shows on desktop/tablet

## 2. Verification

- [x] 2.1 Verify the select renders correctly on mobile viewport (<768px) and buttons are hidden
- [x] 2.2 Verify buttons render correctly on desktop viewport (≥768px) and select is hidden
- [x] 2.3 Verify filtering works identically via both select and buttons

## 3. Commit

- [x] 3.1 Create atomic commit using conventional commits (e.g., `feat: replace category filter buttons with select on mobile`)
