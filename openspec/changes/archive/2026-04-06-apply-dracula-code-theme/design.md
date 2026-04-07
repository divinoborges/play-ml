## Context

The algorithm pages display Python source code in a "See the Code" collapsible panel. Currently, the code is rendered as plain text inside a `<pre><code>` block with white background and `text-black/80` styling. There is no syntax highlighting — all code appears in a single color. The user wants all code panels to use the Dracula color theme, a popular dark theme with specific hex values for each token type.

The code viewer lives in `app/[locale]/algorithms/[slug]/AlgorithmPageClient.tsx` (lines 241–259). Code content comes from `lib/code-content.ts` as raw Python strings.

## Goals / Non-Goals

**Goals:**
- Apply Dracula theme background and foreground colors to the code panel container
- Implement Python syntax highlighting that maps token types to Dracula palette colors
- Update the copy button to work visually on the dark background
- Keep the solution lightweight — no heavy external syntax highlighting library

**Non-Goals:**
- Full language-server-level parsing of Python (a regex-based tokenizer is sufficient for educational code)
- Supporting themes other than Dracula
- Highlighting languages other than Python
- Adding line numbers to the code display

## Decisions

### Decision 1: Custom lightweight Python tokenizer vs. external library (e.g., Prism.js, highlight.js)

**Choice**: Custom lightweight regex-based tokenizer.

**Rationale**: The code samples are simple, educational Python. A small tokenizer (~50 lines) covering comments, strings, keywords, numbers, functions, classes, and decorators is sufficient. This avoids adding a large dependency (Prism.js is ~30KB+, highlight.js is ~70KB+) for a feature that only renders Python snippets.

**Alternative considered**: Prism.js with Dracula theme — simpler but adds a dependency and the default Dracula Prism theme may not match the exact hex values specified.

### Decision 2: Implementation approach — React component vs. utility function

**Choice**: Create a `PythonHighlighter` React component at `components/shared/PythonHighlighter.tsx`.

**Rationale**: Encapsulates the Dracula color constants and tokenization logic in one reusable component. The component receives a `code` string prop and returns styled `<span>` elements inside a `<pre><code>` block. This keeps `AlgorithmPageClient.tsx` clean.

### Decision 3: Dracula color mapping

Token-to-color mapping based on the specified Dracula palette:
| Token Type | Color | Hex |
|---|---|---|
| Background | Background | `#282A36` |
| Default text | Foreground | `#F8F8F2` |
| Comments (`#`) | Comment | `#6272A4` |
| Strings (`"..."`, `'...'`, `f"..."`) | Yellow | `#F1FA8C` |
| Keywords (`import`, `class`, `def`, `if`, `for`, `return`, etc.) | Pink | `#FF79C6` |
| Built-in functions (`print`, `len`, `range`, `np.`, etc.) | Cyan | `#8BE9FD` |
| Function/method names (after `def`) | Green | `#50FA7B` |
| Class names (after `class`) | Cyan | `#8BE9FD` |
| Numbers/booleans (`42`, `0.01`, `True`, `False`, `None`) | Orange | `#FFB86C` |
| Decorators (`@property`) | Green | `#50FA7B` |
| Operators and punctuation | Foreground | `#F8F8F2` |
| Self keyword | Purple | `#BD93F9` |

## Risks / Trade-offs

- **[Regex tokenizer may miss edge cases]** → Acceptable for educational Python snippets. The code content is controlled by us, not user-input. Any missed tokens just render in default foreground color.
- **[Hardcoded Dracula colors]** → Since we only need one theme, hardcoding is simpler than a theming system. If more themes are needed later, the constants can be extracted.
- **[No SSR for highlighted code]** → The tokenizer runs client-side in the component. Since the code panel is behind a toggle (collapsed by default), this has no impact on initial page load or SEO.
