## ADDED Requirements

### Requirement: Algorithm selection for comparison
The comparison page SHALL allow the user to select 2-4 algorithms from the 8 available for side-by-side comparison.

#### Scenario: User selects algorithms
- **WHEN** the user selects 3 algorithms (Linear Regression, Decision Tree, Random Forest)
- **THEN** the system enables the dataset selection and "Train All" button

#### Scenario: Selection limits
- **WHEN** the user attempts to select more than 4 algorithms
- **THEN** the system prevents the selection and indicates the maximum is 4

#### Scenario: Minimum selection
- **WHEN** the user has selected fewer than 2 algorithms
- **THEN** the "Train All" button is disabled

### Requirement: Shared dataset selection
The comparison page SHALL allow the user to select one of the 8 available datasets to train all selected algorithms on the same data.

#### Scenario: User selects a shared dataset
- **WHEN** the user picks the "Churn Prediction" dataset
- **THEN** the system prepares to train all selected algorithms on that dataset

### Requirement: Batch training
The comparison page SHALL train all selected algorithms on the chosen dataset with a single "Train All" button click. Training progress SHALL be shown for each algorithm individually.

#### Scenario: User trains all selected algorithms
- **WHEN** the user clicks "Train All" with 3 algorithms selected
- **THEN** the system trains each algorithm sequentially or in parallel, showing individual progress indicators, and displays results when all complete

### Requirement: Side-by-side results
After training, the comparison page SHALL display results side-by-side: a comparative metrics table, relative training times, a bar chart comparing key metrics, and a textual recommendation of which model is most suitable.

#### Scenario: View comparison results
- **WHEN** all selected models finish training
- **THEN** the system displays a table with metrics per algorithm, a bar chart, training time comparison, and a recommendation text

### Requirement: Educational message
The comparison page SHALL display an educational message after results, highlighting when a simpler algorithm achieves similar performance to a complex one.

#### Scenario: Simple vs complex comparison
- **WHEN** Logistic Regression achieves similar accuracy to Random Forest on a dataset
- **THEN** the system displays a message like "For this problem, Logistic Regression achieved similar performance to Random Forest, demonstrating that simpler models can be equally effective."
