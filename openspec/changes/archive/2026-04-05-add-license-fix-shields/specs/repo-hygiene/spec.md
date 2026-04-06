## ADDED Requirements

### Requirement: MIT LICENSE file
The repository SHALL include a LICENSE file at the project root containing the MIT license with copyright year 2025 and author Divino Borges.

#### Scenario: License file present
- **WHEN** a user views the repository root
- **THEN** a LICENSE file is present and GitHub displays "MIT License" in the repo sidebar

### Requirement: Dynamic README shields
The README SHALL display shields that reflect the actual state of the repository: build status from GitHub Actions, license detected from the LICENSE file, a PRs-welcome badge linking to issues, and a demo badge linking to the live GitHub Pages site.

#### Scenario: Build status badge
- **WHEN** a user views the README on GitHub
- **THEN** the build badge dynamically reflects the current status of the `nextjs.yml` workflow

#### Scenario: Demo badge
- **WHEN** a user clicks the demo badge
- **THEN** they are navigated to `https://divinoborges.github.io/play-ml/`
