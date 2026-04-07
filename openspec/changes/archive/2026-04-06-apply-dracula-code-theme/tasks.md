## 1. Create PythonHighlighter Component

- [x] 1.1 Create `components/shared/PythonHighlighter.tsx` with Dracula color constants (Background `#282A36`, Foreground `#F8F8F2`, Comment `#6272A4`, Pink `#FF79C6`, Yellow `#F1FA8C`, Orange `#FFB86C`, Green `#50FA7B`, Cyan `#8BE9FD`, Purple `#BD93F9`, Red `#FF5555`, Selection `#44475A`)
- [x] 1.2 Implement regex-based Python tokenizer covering: comments, strings (single/double/triple/f-strings), keywords, numbers, booleans/None, function definitions, class names, self, decorators
- [x] 1.3 Render tokenized code as `<span>` elements with inline Dracula colors inside `<pre><code>` with background `#282A36` and foreground `#F8F8F2`

## 2. Update Code Panel in AlgorithmPageClient

- [x] 2.1 Replace plain `<pre><code>{getCodeContent(slug)}</code></pre>` with `<PythonHighlighter code={getCodeContent(slug)} />` in `app/[locale]/algorithms/[slug]/AlgorithmPageClient.tsx`
- [x] 2.2 Update the code panel container: change `bg-white` to `bg-[#282A36]` and `border-black` to `border-[#44475A]`
- [x] 2.3 Update the copy button: change to `bg-[#44475A] text-[#F8F8F2]` with hover state `hover:bg-[#6272A4]`, remove `border-black` and `bg-sand`

## 3. Commit

- [x] 3.1 Create atomic commit using conventional commits (e.g., `feat: add Dracula theme syntax highlighting to code viewer`)
