## Why

The "See the Code" panels across all algorithm pages currently display Python code as plain monospace text with no syntax highlighting (white background, black text). This makes the code harder to read and looks unprofessional compared to modern code editors. Applying the Dracula color theme — a popular, high-contrast dark theme — will improve readability and give the code panels a polished, developer-friendly appearance.

## What Changes

- Apply Dracula theme colors to the code display panel background, text, and UI elements (copy button)
- Implement client-side Python syntax highlighting using the Dracula color palette:
  - Background: `#282A36`, Foreground: `#F8F8F2`
  - Keywords (Pink `#FF79C6`), Functions (Green `#50FA7B`), Strings (Yellow `#F1FA8C`)
  - Comments (Comment `#6272A4`), Numbers/Constants (Orange `#FFB86C`), Classes/Types (Cyan `#8BE9FD`)
  - Reserved words/Constants (Purple `#BD93F9`), Errors (Red `#FF5555`)
- Update the copy button styling to match the dark Dracula theme

## Capabilities

### New Capabilities
- `dracula-code-theme`: Dracula-themed Python syntax highlighting for the code viewer panels

### Modified Capabilities
- `code-viewer`: The code display panel styling changes from white/plain to Dracula dark theme with syntax highlighting

## Impact

- `app/[locale]/algorithms/[slug]/AlgorithmPageClient.tsx` — code panel container and copy button styles
- A new syntax highlighter component or utility will be needed to tokenize Python code and apply Dracula colors
- No dependency changes — highlighting will be implemented with a lightweight custom tokenizer (no external syntax highlighting library needed for basic Python)
