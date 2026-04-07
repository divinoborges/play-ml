## Why

Next.js 16 deprecated the `middleware.ts` file convention in favor of `proxy.ts`, and the build now errors because middleware is incompatible with `output: "export"`. Our `next-intl` locale routing currently relies on `middleware.ts`, so the static export build fails outright.

## What Changes

- **BREAKING**: Remove `middleware.ts` from the project root.
- Configure `next-intl` for fully static locale routing (no runtime middleware/proxy), since the site is built with `output: "export"` and cannot run edge code.
- Ensure every locale-prefixed route (`/en/...`, `/pt-BR/...`) is prerendered via `generateStaticParams`, and that the root `/` redirect to the default locale works in a static context (e.g., a generated `index.html` redirect or a root page that renders the default locale).
- Verify `next build` produces a clean static export with no middleware/proxy warnings.

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `i18n`: Locale routing must work without `middleware.ts`/`proxy.ts` under `output: "export"`; default-locale handling at `/` becomes a static redirect rather than a middleware rewrite.

## Impact

- Removes: `middleware.ts`
- Touches: `i18n/routing.ts`, `i18n/request.ts`, `app/[locale]/layout.tsx`, possibly a new `app/page.tsx` (root redirect) and/or `next.config.ts`.
- Affects: `next-intl` integration, static export build, any internal links assuming middleware-based locale negotiation.
- No runtime dependency changes expected; purely configuration/structure.
