## MODIFIED Requirements

### Requirement: Metrics display inline after training
The metrics panel SHALL appear directly below the Train button in the Training section after the model is trained. The standalone metrics section (Section 6) SHALL be removed.

#### Scenario: Before training
- **WHEN** the user has not yet trained the model
- **THEN** no metrics SHALL be displayed anywhere on the page

#### Scenario: After training completes
- **WHEN** the user clicks Train and training completes successfully
- **THEN** the `MetricsPanel` SHALL appear below the `TrainButton` within the Training section (Section 4)
- **AND** there SHALL be no separate metrics section at the bottom of the page

#### Scenario: Retraining updates metrics
- **WHEN** the user changes hyperparameters and retrains
- **THEN** the metrics panel below the Train button SHALL update with the new results

## REMOVED Requirements

### Requirement: Standalone metrics section
**Reason**: Metrics are now displayed inline below the Train button for immediate feedback, making a separate section redundant.
**Migration**: MetricsPanel component is reused — it moves from Section 6 to Section 4 (Training), rendered conditionally after `trainResult` is set.
