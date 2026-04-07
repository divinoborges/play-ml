import type { Dataset, DatasetSample } from "@/lib/datasets";
import { parseCsv } from "@/lib/csv";

export type LRDatasetId = "salary" | "graduate-admissions" | "uber-fares";

export interface LRDatasetConfig {
  id: LRDatasetId;
  csvPath: string;
  features: string[];
  target: string;
  titleKey: string;
  descriptionKey: string;
}

export const LR_DATASETS: readonly LRDatasetConfig[] = [
  {
    id: "salary",
    csvPath: "/datasets/linear-regression/salary.csv",
    features: ["YearsExperience"],
    target: "Salary",
    titleKey: "linearRegressionDatasets.salary.title",
    descriptionKey: "linearRegressionDatasets.salary.description",
  },
  {
    id: "graduate-admissions",
    csvPath: "/datasets/linear-regression/graduate-admissions.csv",
    features: [
      "GRE Score",
      "TOEFL Score",
      "University Rating",
      "SOP",
      "LOR",
      "CGPA",
      "Research",
    ],
    target: "Chance of Admit",
    titleKey: "linearRegressionDatasets.graduate-admissions.title",
    descriptionKey: "linearRegressionDatasets.graduate-admissions.description",
  },
  {
    id: "uber-fares",
    csvPath: "/datasets/linear-regression/uber-fares.csv",
    features: [
      "pickup_longitude",
      "pickup_latitude",
      "dropoff_longitude",
      "dropoff_latitude",
      "passenger_count",
    ],
    target: "fare_amount",
    titleKey: "linearRegressionDatasets.uber-fares.title",
    descriptionKey: "linearRegressionDatasets.uber-fares.description",
  },
] as const;

export const DEFAULT_LR_DATASET_ID: LRDatasetId = "salary";

export function getLRDatasetConfig(id: LRDatasetId): LRDatasetConfig {
  return LR_DATASETS.find((d) => d.id === id) ?? LR_DATASETS[0];
}

// Some Kaggle headers contain a trailing space (e.g. "LOR " or "Chance of Admit ").
// Match tolerant: trim both sides when looking up.
function pick(row: Record<string, unknown>, key: string): unknown {
  if (key in row) return row[key];
  const want = key.trim().toLowerCase();
  for (const k of Object.keys(row)) {
    if (k.trim().toLowerCase() === want) return row[k];
  }
  return undefined;
}

function toNumber(v: unknown): number | null {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string" && v.trim() !== "") {
    const n = Number(v);
    if (Number.isFinite(n)) return n;
  }
  return null;
}

function buildSamples(
  rows: Record<string, unknown>[],
  features: string[],
  target: string,
): DatasetSample[] {
  const out: DatasetSample[] = [];
  for (const row of rows) {
    const sample: DatasetSample = {};
    let ok = true;
    for (const f of features) {
      const n = toNumber(pick(row, f));
      if (n === null) {
        ok = false;
        break;
      }
      sample[f] = n;
    }
    if (!ok) continue;
    const ty = toNumber(pick(row, target));
    if (ty === null) continue;
    sample[target] = ty;
    out.push(sample);
  }
  return out;
}

// Basic sanity filter for Uber coordinates / fares.
function sanitize(id: LRDatasetId, samples: DatasetSample[]): DatasetSample[] {
  if (id !== "uber-fares") return samples;
  return samples.filter((s) => {
    const fare = Number(s["fare_amount"]);
    const plon = Number(s["pickup_longitude"]);
    const plat = Number(s["pickup_latitude"]);
    const dlon = Number(s["dropoff_longitude"]);
    const dlat = Number(s["dropoff_latitude"]);
    if (fare <= 0 || fare > 200) return false;
    if (plon === 0 || plat === 0 || dlon === 0 || dlat === 0) return false;
    if (Math.abs(plat) > 90 || Math.abs(dlat) > 90) return false;
    if (Math.abs(plon) > 180 || Math.abs(dlon) > 180) return false;
    return true;
  });
}

const cache = new Map<LRDatasetId, Dataset>();

export async function loadLRDataset(id: LRDatasetId): Promise<Dataset> {
  const cached = cache.get(id);
  if (cached) return cached;

  const cfg = getLRDatasetConfig(id);
  const url = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${cfg.csvPath}`;
  const text = await fetch(url).then((r) => r.text());
  const rows = parseCsv(text) as Record<string, unknown>[];

  const all = sanitize(id, buildSamples(rows, cfg.features, cfg.target));
  const split = Math.max(1, Math.floor(all.length * 0.8));
  const trainData = all.slice(0, split);
  const testData = all.slice(split);

  const dataset: Dataset = {
    features: cfg.features,
    target: cfg.target,
    trainData,
    testData,
    metadata: {
      description: cfg.id,
      featureDescriptions: Object.fromEntries(cfg.features.map((f) => [f, f])),
    },
  };
  cache.set(id, dataset);
  return dataset;
}
