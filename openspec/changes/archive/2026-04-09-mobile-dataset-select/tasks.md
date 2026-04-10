## 1. Add native select for mobile

- [x] 1.1 Add a `<select>` element in `LinearRegressionDatasetSelector.tsx` that maps over `LR_DATASETS` and renders `<option>` elements with translated labels via `t(d.titleKey)`
- [x] 1.2 Bind the `<select>` value to the `value` prop and wire `onChange` to call `onChange(e.target.value as LRDatasetId)`
- [x] 1.3 Style the `<select>` with Tailwind classes consistent with the design system: `w-full border-2 border-black rounded-xl px-4 py-2 font-heading text-sm font-bold bg-white`

## 2. Responsive visibility

- [x] 2.1 Add `md:hidden` to the `<select>` wrapper so it only shows on mobile
- [x] 2.2 Change the tab list container from `inline-flex` to `hidden md:inline-flex` so it hides on mobile and shows on desktop

## 3. Verification

- [x] 3.1 Verify the component renders the `<select>` on viewports < 768px and the pill tabs on >= 768px
- [x] 3.2 Verify selecting a dataset via the dropdown updates the description card correctly
- [x] 3.3 Verify translated labels display correctly in both en and pt-BR locales

## 4. Commit

- [x] 4.1 Create atomic commit using conventional commits: `feat(linear-regression): add mobile-friendly dataset select dropdown`
