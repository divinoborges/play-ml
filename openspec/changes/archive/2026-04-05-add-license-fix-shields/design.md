## Context

The README has four shields that all use static badges with `#` href links. The repo is `divinoborges/play-ml`, deployed via GitHub Actions to GitHub Pages at `https://divinoborges.github.io/play-ml/`.

## Goals / Non-Goals

**Goals:**
- Add a proper MIT LICENSE file
- Replace static shields with dynamic ones that reflect real repo state

**Non-Goals:**
- Adding additional badges (coverage, npm, etc.)
- Changing README content beyond the shields section

## Decisions

### 1. Shield configuration

| Badge | Source | Link target |
|-------|--------|-------------|
| Build Status | `github/actions/workflow/status/divinoborges/play-ml/nextjs.yml` | Actions page |
| License | `github/license/divinoborges/play-ml` | `#license` anchor |
| PRs Welcome | Static badge (no dynamic source) | Issues page |
| Demo | Static badge | GitHub Pages URL |

**Rationale**: Use dynamic shields where possible so they stay accurate without maintenance.

### 2. LICENSE file

Standard MIT license template with `2025 Divino Borges` as the copyright line.

## Risks / Trade-offs

- **Low risk** — Documentation-only change with no code impact.
