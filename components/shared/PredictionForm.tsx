"use client";

import { useTranslations } from "next-intl";
import type { Dataset, DatasetSample } from "@/lib/datasets";

interface PredictionFormProps {
  dataset: Dataset;
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
  onUseSample: (sample: DatasetSample) => void;
}

export default function PredictionForm({
  dataset,
  values,
  onChange,
  onUseSample,
}: PredictionFormProps) {
  const t = useTranslations("data");

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {dataset.features.map((feature) => (
          <div key={feature}>
            <label className="block font-heading text-sm font-bold text-black mb-1 uppercase">
              {feature}
            </label>
            <input
              type="text"
              value={values[feature] ?? ""}
              onChange={(e) => onChange(feature, e.target.value)}
              placeholder={
                dataset.metadata.featureDescriptions[feature] ?? feature
              }
              className="w-full rounded-full border-2 border-black bg-white px-4 py-2 font-body text-sm text-black focus:ring-2 focus:ring-magenta focus:outline-none"
            />
          </div>
        ))}
      </div>

      {dataset.testData.length > 0 && (
        <div>
          <p className="font-heading text-xs font-bold text-black uppercase mb-2">{t("useSample")}:</p>
          <div className="flex flex-wrap gap-2">
            {dataset.testData.slice(0, 5).map((sample, i) => (
              <button
                key={i}
                onClick={() => onUseSample(sample)}
                className="rounded-full border-2 border-black bg-sand px-4 py-1 font-heading text-xs font-bold text-black hover:bg-black hover:text-sand transition-colors"
              >
                Sample {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
