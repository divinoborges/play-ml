## ADDED Requirements

### Requirement: Global footer with creator credits
The system SHALL display a footer on every page with credits to the project creator.

#### Scenario: Footer visible on all pages
- **WHEN** user navigates to any page in the application
- **THEN** a footer SHALL be visible at the bottom of the page

#### Scenario: Creator credit text
- **WHEN** the footer is displayed
- **THEN** it SHALL contain text crediting Divino Borges as the creator/idealizer of the project

### Requirement: Social media links in footer
The footer SHALL include icon links to the creator's social profiles.

#### Scenario: LinkedIn link
- **WHEN** user clicks the LinkedIn icon in the footer
- **THEN** it SHALL open `https://www.linkedin.com/in/divinoborges/` in a new tab

#### Scenario: X (Twitter) link
- **WHEN** user clicks the X icon in the footer
- **THEN** it SHALL open `https://x.com/dvnofl` in a new tab

#### Scenario: Links open in new tab
- **WHEN** user clicks any social link in the footer
- **THEN** the link SHALL open in a new tab (`target="_blank"`) with `rel="noopener noreferrer"`

### Requirement: Footer styling consistency
The footer SHALL follow the app's neo-pop design system.

#### Scenario: Visual consistency
- **WHEN** the footer is rendered
- **THEN** it SHALL use the app's typography (Space Mono for headings, DM Sans for body), color palette (black background, white/yellow text), and border styling consistent with the design system
