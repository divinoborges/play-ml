"use client";

const DRACULA = {
  bg: "#282A36",
  fg: "#F8F8F2",
  comment: "#6272A4",
  red: "#FF5555",
  orange: "#FFB86C",
  yellow: "#F1FA8C",
  green: "#50FA7B",
  cyan: "#8BE9FD",
  purple: "#BD93F9",
  pink: "#FF79C6",
  selection: "#44475A",
};

const KEYWORDS = new Set([
  "import", "from", "as", "class", "def", "if", "elif", "else",
  "for", "while", "return", "in", "not", "and", "or", "is",
  "with", "try", "except", "raise", "yield", "lambda", "pass",
  "break", "continue", "del", "global", "nonlocal", "assert",
]);

const BUILTINS = new Set([
  "print", "len", "range", "int", "float", "str", "list", "dict",
  "tuple", "set", "bool", "type", "isinstance", "enumerate", "zip",
  "map", "filter", "sorted", "reversed", "sum", "min", "max", "abs",
  "round", "super", "property", "staticmethod", "classmethod",
]);

type Token = { text: string; color: string };

function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < line.length) {
    // Comments
    if (line[i] === "#") {
      tokens.push({ text: line.slice(i), color: DRACULA.comment });
      break;
    }

    // Triple-quoted strings
    if (line.slice(i, i + 3) === '"""' || line.slice(i, i + 3) === "'''") {
      const quote = line.slice(i, i + 3);
      const end = line.indexOf(quote, i + 3);
      if (end !== -1) {
        tokens.push({ text: line.slice(i, end + 3), color: DRACULA.yellow });
        i = end + 3;
      } else {
        tokens.push({ text: line.slice(i), color: DRACULA.yellow });
        break;
      }
      continue;
    }

    // F-strings and regular strings
    if (line[i] === "f" && (line[i + 1] === '"' || line[i + 1] === "'")) {
      const quote = line[i + 1];
      const end = line.indexOf(quote, i + 2);
      if (end !== -1) {
        tokens.push({ text: line.slice(i, end + 1), color: DRACULA.yellow });
        i = end + 1;
      } else {
        tokens.push({ text: line.slice(i), color: DRACULA.yellow });
        break;
      }
      continue;
    }

    if (line[i] === '"' || line[i] === "'") {
      const quote = line[i];
      let j = i + 1;
      while (j < line.length && line[j] !== quote) {
        if (line[j] === "\\") j++;
        j++;
      }
      tokens.push({ text: line.slice(i, j + 1), color: DRACULA.yellow });
      i = j + 1;
      continue;
    }

    // Decorators
    if (line[i] === "@" && (i === 0 || line.slice(0, i).trim() === "")) {
      const match = line.slice(i).match(/^@\w+/);
      if (match) {
        tokens.push({ text: match[0], color: DRACULA.green });
        i += match[0].length;
        continue;
      }
    }

    // Numbers (including scientific notation)
    if (/\d/.test(line[i]) && (i === 0 || /[\s([:,=+\-*/<>!]/.test(line[i - 1]))) {
      const match = line.slice(i).match(/^\d+(\.\d+)?([eE][+-]?\d+)?/);
      if (match) {
        tokens.push({ text: match[0], color: DRACULA.orange });
        i += match[0].length;
        continue;
      }
    }

    // Words (identifiers, keywords, etc.)
    if (/[a-zA-Z_]/.test(line[i])) {
      const match = line.slice(i).match(/^[a-zA-Z_]\w*/);
      if (match) {
        const word = match[0];
        if (KEYWORDS.has(word)) {
          tokens.push({ text: word, color: DRACULA.pink });
          // Check for def/class name after keyword
          if (word === "def" || word === "class") {
            const rest = line.slice(i + word.length);
            const nameMatch = rest.match(/^(\s+)(\w+)/);
            if (nameMatch) {
              tokens.push({ text: nameMatch[1], color: DRACULA.fg });
              tokens.push({
                text: nameMatch[2],
                color: word === "def" ? DRACULA.green : DRACULA.cyan,
              });
              i += word.length + nameMatch[0].length;
              continue;
            }
          }
        } else if (word === "self") {
          tokens.push({ text: word, color: DRACULA.purple });
        } else if (word === "True" || word === "False" || word === "None") {
          tokens.push({ text: word, color: DRACULA.orange });
        } else if (BUILTINS.has(word)) {
          tokens.push({ text: word, color: DRACULA.cyan });
        } else {
          tokens.push({ text: word, color: DRACULA.fg });
        }
        i += word.length;
        continue;
      }
    }

    // Default: single character
    tokens.push({ text: line[i], color: DRACULA.fg });
    i++;
  }

  return tokens;
}

interface PythonHighlighterProps {
  code: string;
}

export default function PythonHighlighter({ code }: PythonHighlighterProps) {
  const lines = code.split("\n");

  return (
    <pre
      className="overflow-x-auto font-mono text-sm leading-relaxed rounded-xl p-4"
      style={{ backgroundColor: DRACULA.bg, color: DRACULA.fg }}
    >
      <code>
        {lines.map((line, lineIndex) => (
          <span key={lineIndex}>
            {tokenizeLine(line).map((token, tokenIndex) => (
              <span key={tokenIndex} style={{ color: token.color }}>
                {token.text}
              </span>
            ))}
            {lineIndex < lines.length - 1 ? "\n" : ""}
          </span>
        ))}
      </code>
    </pre>
  );
}
