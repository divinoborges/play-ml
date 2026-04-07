## ADDED Requirements

### Requirement: Python syntax highlighting with Dracula theme
The system SHALL render Python code in the "See the Code" panel with syntax highlighting using the Dracula color palette. A `PythonHighlighter` component SHALL accept a `code` string prop and render it with colored tokens inside a `<pre><code>` block.

#### Scenario: Code panel displays with Dracula background
- **WHEN** user expands the "See the Code" panel for any algorithm
- **THEN** the code panel background SHALL be `#282A36` (Dracula Background)
- **AND** the default text color SHALL be `#F8F8F2` (Dracula Foreground)

#### Scenario: Python keywords are highlighted
- **WHEN** code contains Python keywords (`import`, `from`, `class`, `def`, `if`, `else`, `elif`, `for`, `while`, `return`, `in`, `not`, `and`, `or`, `is`, `as`, `with`, `try`, `except`, `raise`, `yield`, `lambda`, `pass`, `break`, `continue`)
- **THEN** those keywords SHALL be rendered in Pink `#FF79C6`

#### Scenario: Comments are highlighted
- **WHEN** code contains a line comment starting with `#`
- **THEN** the comment text (from `#` to end of line) SHALL be rendered in Comment color `#6272A4`

#### Scenario: Strings are highlighted
- **WHEN** code contains string literals (single-quoted, double-quoted, f-strings, triple-quoted)
- **THEN** the string content SHALL be rendered in Yellow `#F1FA8C`

#### Scenario: Numbers and booleans are highlighted
- **WHEN** code contains numeric literals (`42`, `0.01`, `1e-4`, `1e-10`) or boolean/None values (`True`, `False`, `None`)
- **THEN** those tokens SHALL be rendered in Orange `#FFB86C`

#### Scenario: Function definitions are highlighted
- **WHEN** code contains `def function_name`
- **THEN** the function name SHALL be rendered in Green `#50FA7B`

#### Scenario: Class names are highlighted
- **WHEN** code contains `class ClassName`
- **THEN** the class name SHALL be rendered in Cyan `#8BE9FD`

#### Scenario: Self keyword is highlighted
- **WHEN** code contains the `self` keyword
- **THEN** it SHALL be rendered in Purple `#BD93F9`

#### Scenario: Decorators are highlighted
- **WHEN** code contains decorators (lines starting with `@`)
- **THEN** the decorator SHALL be rendered in Green `#50FA7B`

### Requirement: Copy button styling on dark background
The copy button inside the code panel SHALL be visually adapted to the Dracula dark background.

#### Scenario: Copy button appearance on Dracula background
- **WHEN** the code panel is expanded
- **THEN** the copy button SHALL be visible and readable against the `#282A36` background
- **AND** the button SHALL use Dracula Selection color `#44475A` as its background with Foreground `#F8F8F2` text

#### Scenario: Copy button hover state
- **WHEN** user hovers over the copy button
- **THEN** the button SHALL change to a visually distinct hover state (e.g., lighter background or Dracula Comment `#6272A4`)

### Requirement: Code panel border styling
The code panel container SHALL have a border that complements the Dracula dark theme.

#### Scenario: Panel border on dark background
- **WHEN** the code panel is expanded
- **THEN** the panel border SHALL use Dracula Selection color `#44475A` instead of `border-black`
- **AND** the panel SHALL have rounded corners consistent with the existing design (`rounded-2xl`)
