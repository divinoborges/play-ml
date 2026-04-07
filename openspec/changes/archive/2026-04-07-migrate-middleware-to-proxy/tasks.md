## 1. Research

- [x] 1.1 Read `node_modules/next/dist/docs/` notes on the `middleware` → `proxy` migration and on `output: "export"` constraints
- [x] 1.2 Read `next-intl` docs/source for the static-export recipe (no middleware) and confirm the v3+ API for `getRequestConfig` + `generateStaticParams`

## 2. Remove middleware

- [x] 2.1 Delete `middleware.ts` from the project root
- [x] 2.2 Run `next build` once to confirm the export error and deprecation warning are gone (build may still fail until step 3 is complete — that's fine)

## 3. Static-export i18n wiring

- [x] 3.1 Update `i18n/request.ts` to validate the route `locale` against `routing.locales` and fall back to `routing.defaultLocale`, with no dependency on middleware-injected headers
- [x] 3.2 Ensure `app/[locale]/layout.tsx` exports `generateStaticParams` returning `routing.locales.map((locale) => ({ locale }))`
- [x] 3.3 Verify `routing.ts` still declares both locales (`en`, `pt-BR`) and the correct default
- [x] 3.4 Audit `app/[locale]/**` pages for any `await headers()` / middleware-dependent calls and remove them

## 4. Root redirect

- [x] 4.1 Add `app/page.tsx` that renders a minimal HTML shell with a `<meta http-equiv="refresh">` to `/<defaultLocale>` (respecting `process.env.NEXT_PUBLIC_BASE_PATH`)
- [x] 4.2 Inline a small client script that, before refresh fires, reads the stored locale from `localStorage` (key used by the existing language toggle), falls back to `navigator.language` (PT-BR if it starts with "pt", else EN), and `location.replace`s to `<basePath>/<locale>`
- [x] 4.3 Confirm the root page is itself prerendered as `index.html` under `output: "export"`

## 5. Verification

- [x] 5.1 Run `next build` and confirm: no `middleware-to-proxy` warning, no `Middleware cannot be used with "output: export"` error, both `/en` and `/pt-BR` trees emitted
- [ ] 5.2 Serve the `out/` directory locally and smoke-test `/`, `/en`, `/pt-BR`, a deep link (`/pt-BR/algorithms/linear-regression`), and the language toggle persistence
- [ ] 5.3 Test first-visit detection: clear localStorage, set browser language to `pt-BR` and to `en-US`, verify `/` redirects to the correct locale in each case
- [ ] 5.4 Test deployment with a non-empty `NEXT_PUBLIC_BASE_PATH` to ensure the root redirect respects it

## 6. Commit

- [ ] 6.1 Create an atomic commit using conventional commits format, e.g. `fix(i18n): drop middleware.ts and statically redirect root for next 16 export`
