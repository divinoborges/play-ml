## Context

The project currently has a default `create-next-app` README that provides zero context about PlayML as an educational ML platform. PlayML features interactive algorithm visualizations (D3-based), a Neo-Pop visual design system, i18n support (en/pt-BR), and multiple ML algorithm implementations. The README is the primary entry point for GitHub visitors and needs to reflect the project's identity and value.

## Goals / Non-Goals

**Goals:**
- Replace boilerplate README with a branded, informative project README
- Communicate PlayML's purpose, features, and value proposition clearly
- Provide quick start instructions for both learners and developers
- Showcase the Neo-Pop visual identity through banner/screenshots
- Support multilingual audience with a pt-BR translated README
- Include standard open-source sections (contributing, license, tech stack)

**Non-Goals:**
- Creating CONTRIBUTING.md or CODE_OF_CONDUCT.md (separate changes)
- Building or deploying a demo site (referenced but not created here)
- Creating screenshot assets (placeholder references will be used)
- Adding CI badges configuration (badge URLs will use placeholders)

## Decisions

### 1. HTML-centered layout for hero section
**Decision**: Use raw HTML (`<p align="center">`) for the logo, tagline, and badges.
**Rationale**: GitHub Markdown doesn't support centering via standard Markdown. HTML `align="center"` is the de facto standard for centered README layouts and renders correctly on GitHub.
**Alternative considered**: Plain Markdown with no centering — rejected because the Neo-Pop brand relies on visual impact.

### 2. Emoji-accented feature bullets
**Decision**: Use emojis (🧠, 📊, 🎨, etc.) as visual markers for key features.
**Rationale**: The user explicitly requested this style. Emojis improve scannability and align with the playful, educational brand.
**Alternative considered**: Plain bullet points — rejected per user requirements.

### 3. Separate translated README file
**Decision**: Create `README.pt-BR.md` as a separate file with a language selector linking between versions.
**Rationale**: This is the GitHub convention for multilingual READMEs. Keeps each version clean and independently maintainable. Matches the existing i18n architecture (en/pt-BR).
**Alternative considered**: Single README with collapsible language sections — rejected because it creates a cluttered experience.

### 4. Placeholder references for assets
**Decision**: Use placeholder paths for logo banner, screenshots, and demo URLs that can be filled in later.
**Rationale**: The README structure and content can be completed now; visual assets can be added incrementally without blocking the change.

## Risks / Trade-offs

- **[Stale content]** → README content may drift from actual features as the project evolves. Mitigation: keep descriptions high-level and reference code structure rather than specific implementation details.
- **[Missing assets]** → Screenshots and logo won't exist immediately. Mitigation: use clear placeholder comments so they're easy to find and replace.
- **[Translation maintenance]** → pt-BR README may fall out of sync with English version. Mitigation: keep content concise to minimize translation burden; note in contributing guidelines that README changes need both versions updated.
