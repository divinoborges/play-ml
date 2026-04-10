"use client";

import { useTranslations } from "next-intl";
import { LR_DATASETS, type LRDatasetId } from "@/lib/linear-regression-datasets";

interface Props {
  value: LRDatasetId;
  onChange: (id: LRDatasetId) => void;
}

export default function LinearRegressionDatasetSelector({ value, onChange }: Props) {
  const t = useTranslations();
  const active = LR_DATASETS.find((d) => d.id === value) ?? LR_DATASETS[0];

  return (
    <div className="mb-6">
      <p className="font-heading text-xs font-bold text-black uppercase mb-2">
        {t("linearRegressionDatasets.selectorLabel")}
      </p>
      <select
        className="md:hidden w-full border-2 border-black rounded-xl px-4 py-2 font-heading text-sm font-bold bg-white"
        value={value}
        onChange={(e) => onChange(e.target.value as LRDatasetId)}
      >
        {LR_DATASETS.map((d) => (
          <option key={d.id} value={d.id}>
            {t(d.titleKey)}
          </option>
        ))}
      </select>
      <div
        className="hidden md:inline-flex flex-wrap rounded-full border-2 border-black bg-white p-1 gap-1"
        role="tablist"
      >
        {LR_DATASETS.map((d) => {
          const selected = d.id === value;
          return (
            <button
              key={d.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => onChange(d.id)}
              className={`rounded-full px-4 py-1.5 font-heading text-xs font-bold uppercase transition-colors ${
                selected
                  ? "bg-black text-white"
                  : "bg-transparent text-black hover:bg-black/10"
              }`}
            >
              {t(d.titleKey)}
            </button>
          );
        })}
      </div>
      <div className="mt-4 rounded-2xl border-2 border-black bg-white p-4">
        <p className="font-heading text-sm font-bold text-black mb-1">
          {t(active.titleKey)}
        </p>
        <p className="font-body text-sm text-black/70">
          {t(active.descriptionKey)}
        </p>
        <p className="font-body text-xs text-black/60 mt-2">
          <span className="font-bold">{t("linearRegressionDatasets.targetLabel")}:</span>{" "}
          <code>{active.target}</code>
        </p>
      </div>
    </div>
  );
}
