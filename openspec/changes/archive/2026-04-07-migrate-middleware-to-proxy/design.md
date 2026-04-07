## Context

PlayML is built with Next.js 16 and exported statically (`output: "export"`). Locale routing is handled by `next-intl` via a root `middleware.ts` that delegates to `createMiddleware(routing)`. Two issues now block the build:

1. Next.js 16 deprecated the `middleware` file convention in favor of `proxy`.
2. Even renamed to `proxy.ts`, runtime request handlers are incompatible with `output: "export"` — the build fails with `Middleware cannot be used with "output: export"`.

The site has no server runtime in production: it is shipped as static HTML/JS via GitHub Pages-style hosting. Locale negotiation must therefore happen at build time and on the client, not in an edge handler.

## Goals / Non-Goals

**Goals:**
- Eliminate the deprecation warning and build error by removing `middleware.ts`.
- Preserve existing user-visible behavior: `/en/...` and `/pt-BR/...` keep working, root `/` lands on a sensible default locale, language toggle still persists via localStorage, browser-language detection still works on first visit.
- Keep the static export pipeline (`output: "export"`) intact.

**Non-Goals:**
- Switching to SSR/edge runtime or removing static export.
- Migrating off `next-intl`.
- Changing the set of supported locales (`en`, `pt-BR`) or URL structure.
- Server-side browser-language negotiation (impossible under static export).

## Decisions

### Decision 1: Remove `middleware.ts` entirely instead of renaming to `proxy.ts`

`proxy.ts` is also a runtime construct and is equally incompatible with `output: "export"`. Renaming would only swap one error for the same one. We delete the file outright.

**Alternatives considered:**
- *Rename to `proxy.ts`*: still fails the export build.
- *Drop `output: "export"`*: would let us keep middleware/proxy, but requires a Node/edge host and changes deployment — out of scope and a much larger change.

### Decision 2: Use `next-intl`'s static-export configuration

`next-intl` supports static rendering when every locale segment is enumerated via `generateStaticParams` in `app/[locale]/layout.tsx` and the request config (`i18n/request.ts`) reads `locale` from the route param rather than from middleware-injected headers. We will:

- Ensure `app/[locale]/layout.tsx` exports `generateStaticParams` returning `routing.locales.map((locale) => ({ locale }))`.
- Ensure `i18n/request.ts` validates the incoming `locale` against `routing.locales` and falls back to `routing.defaultLocale`.
- Remove any reliance on middleware-set request headers.

### Decision 3: Handle root `/` via a static client redirect

With no middleware, hitting `/` no longer auto-rewrites to `/<defaultLocale>`. We add a minimal `app/page.tsx` (outside `[locale]`) that:

- Renders an HTML page with a `<meta http-equiv="refresh">` to `/<defaultLocale>` and a `<script>` that, on the client, reads the stored locale preference from `localStorage` (or browser language) and `location.replace`s to the matching locale prefix.
- This preserves first-visit browser detection and persisted preference, just shifted from edge to client — acceptable because the site is fully client-hydrated anyway.

**Alternatives considered:**
- *Only meta-refresh to default*: simpler, but loses browser-language detection on first visit.
- *Generate `/index.html` via `next.config` redirects*: `redirects()` is not honored under `output: "export"`.

### Decision 4: Keep `basePath` handling unchanged

The redirect script must respect `process.env.NEXT_PUBLIC_BASE_PATH` so deployments under a subpath still work. We read it at build time and inline it into the root page.

## Risks / Trade-offs

- **First-paint flicker on `/`** → Mitigation: the root page is intentionally tiny (no layout chrome), and the client redirect runs before hydration; users typically land on a locale URL via the toggle or shared links.
- **Browser-language detection moves to client** → Mitigation: first-visit users get a sub-100ms client redirect; bookmarks and shared links already include the locale prefix and are unaffected.
- **`generateStaticParams` must stay in sync with `routing.locales`** → Mitigation: derive it directly from `routing.locales` so adding a locale automatically generates its routes.
- **`next-intl` API drift** → Mitigation: consult `node_modules/next-intl` docs for the v3+ static-export recipe before editing, per `AGENTS.md`.

## Migration Plan

1. Delete `middleware.ts`.
2. Update `i18n/request.ts` and `app/[locale]/layout.tsx` to the static-export recipe.
3. Add `app/page.tsx` root redirect.
4. Run `next build` and confirm: no deprecation warning, no export error, both locale trees prerendered, `/index.html` redirects correctly.
5. Smoke-test `/`, `/en`, `/pt-BR`, deep links, and the language toggle in dev and in the built export.

**Rollback:** restore `middleware.ts` from git and revert the layout/request changes; the export build will fail again but dev mode will work.

## Open Questions

- None blocking. If `next-intl` ships an official `proxy.ts` recipe compatible with `output: "export"` in a future release, we can revisit, but it is not required for this change.
