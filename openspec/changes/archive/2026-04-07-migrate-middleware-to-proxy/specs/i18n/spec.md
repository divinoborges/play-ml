## MODIFIED Requirements

### Requirement: Locale-based routing
The application SHALL use locale-prefixed routes (`/en/...`, `/pt-BR/...`). The URL SHALL reflect the current language, allowing direct linking to a specific language version. Locale routing SHALL work entirely under `output: "export"` — without any `middleware.ts` or `proxy.ts` runtime handler. Every locale-prefixed route SHALL be prerendered at build time via `generateStaticParams` derived from `routing.locales`.

#### Scenario: URL reflects locale
- **WHEN** the user is viewing the site in PT-BR
- **THEN** the URL path starts with `/pt-BR/`

#### Scenario: Direct locale link
- **WHEN** a user opens `/pt-BR/algorithms/linear-regression`
- **THEN** the page loads in Portuguese regardless of stored preference or browser language

#### Scenario: Static export build succeeds
- **WHEN** `next build` runs with `output: "export"` and no `middleware.ts` / `proxy.ts` present
- **THEN** the build completes without the `Middleware cannot be used with "output: export"` error and emits prerendered HTML for every `routing.locales` entry

#### Scenario: No deprecated middleware convention
- **WHEN** the repository is inspected at the project root
- **THEN** no `middleware.ts` file exists, and Next.js emits no `middleware-to-proxy` deprecation warning during build

### Requirement: Browser language detection
On first visit (no stored preference), the system SHALL detect the browser's preferred language. If the browser language starts with "pt", the system SHALL default to PT-BR. Otherwise, it SHALL default to EN. Because the site is statically exported, this detection SHALL run on the client at the root `/` route rather than in a server middleware.

#### Scenario: Portuguese browser
- **WHEN** a new user visits `/` with browser language "pt-BR" and no stored preference
- **THEN** the client redirects to `/pt-BR`

#### Scenario: Non-Portuguese browser
- **WHEN** a new user visits `/` with browser language "fr" and no stored preference
- **THEN** the client redirects to `/en`

#### Scenario: Stored preference wins
- **WHEN** a returning user with `localStorage` locale `pt-BR` visits `/`
- **THEN** the client redirects to `/pt-BR` regardless of browser language
