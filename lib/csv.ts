// Minimal CSV parser: handles quoted fields, \r\n, and numeric coercion.
// Designed for the small static CSVs shipped under public/datasets/.

export type CsvRow = Record<string, string | number>;

function splitLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cur += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      out.push(cur);
      cur = "";
    } else {
      cur += ch;
    }
  }
  out.push(cur);
  return out;
}

export function parseCsv(text: string): CsvRow[] {
  const lines = text
    .replace(/\r\n/g, "\n")
    .split("\n")
    .filter((l) => l.length > 0);
  if (lines.length === 0) return [];
  const headers = splitLine(lines[0]).map((h) => h.trim());
  const rows: CsvRow[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cells = splitLine(lines[i]);
    if (cells.length !== headers.length) continue;
    const row: CsvRow = {};
    for (let j = 0; j < headers.length; j++) {
      const raw = cells[j].trim();
      const num = Number(raw);
      row[headers[j]] = raw !== "" && !Number.isNaN(num) ? num : raw;
    }
    rows.push(row);
  }
  return rows;
}
