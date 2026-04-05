## ADDED Requirements

### Requirement: Understanding Metrics link after training
The algorithm detail page SHALL display an "Understanding Metrics" link after the metrics panel, visible only after training is complete.

#### Scenario: Link appears after training
- **WHEN** user trains a model and metrics are displayed in the training section
- **THEN** an "Understanding Metrics" link SHALL appear below the MetricsPanel

#### Scenario: Link not visible before training
- **WHEN** the user has not yet trained a model
- **THEN** no "Understanding Metrics" link SHALL be visible

#### Scenario: Link navigates to correct section
- **WHEN** user clicks the "Understanding Metrics" link on a regression algorithm page
- **THEN** it SHALL navigate to `/[locale]/metrics#regression`
- **WHEN** user clicks the "Understanding Metrics" link on a classification algorithm page
- **THEN** it SHALL navigate to `/[locale]/metrics#classification`

### Requirement: Link internationalization
The "Understanding Metrics" link text SHALL be internationalized.

#### Scenario: English label
- **WHEN** locale is `en`
- **THEN** the link text SHALL display "Understanding Metrics"

#### Scenario: Portuguese label
- **WHEN** locale is `pt-BR`
- **THEN** the link text SHALL display "Entendendo as Métricas"
