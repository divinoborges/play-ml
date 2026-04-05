"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import type { Dataset } from "@/lib/datasets";

interface DatasetTableProps {
  dataset: Dataset;
  onSampleSelect?: (sample: Record<string, number | string>) => void;
}

export default function DatasetTable({
  dataset,
  onSampleSelect,
}: DatasetTableProps) {
  const t = useTranslations("data");
  const [tab, setTab] = useState<"train" | "test">("train");
  const scrollRef = useRef<HTMLDivElement>(null);

  const data = tab === "train" ? dataset.trainData : dataset.testData;
  const columns = [...dataset.features, dataset.target];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [tab]);

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <div className="flex gap-1 rounded-full border-2 border-black bg-sand p-1">
          <button
            onClick={() => setTab("train")}
            className={`rounded-full px-4 py-1.5 font-heading text-sm font-bold transition-colors ${
              tab === "train"
                ? "bg-black text-yellow-pop"
                : "text-black hover:bg-black/10"
            }`}
          >
            {t("trainData")}
          </button>
          <button
            onClick={() => setTab("test")}
            className={`rounded-full px-4 py-1.5 font-heading text-sm font-bold transition-colors ${
              tab === "test"
                ? "bg-black text-yellow-pop"
                : "text-black hover:bg-black/10"
            }`}
          >
            {t("testData")}
          </button>
        </div>
        <span className="font-body text-sm text-black/70">
          {data.length} {t("samples")} · {dataset.features.length} {t("features")}
        </span>
      </div>

      <div ref={scrollRef} className="overflow-x-auto overflow-y-auto max-h-[400px] rounded-2xl border-2 border-black">
        <table className="min-w-full divide-y divide-black/20">
          <thead className="bg-sand sticky top-0 z-10">
            <tr>
              {onSampleSelect && <th className="w-10 px-3 py-3" />}
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 text-left font-heading text-xs font-bold uppercase tracking-wider text-black"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-black/10 bg-white">
            {data.map((row, i) => (
              <tr key={i} className="hover:bg-sand-light">
                {onSampleSelect && (
                  <td className="px-3 py-2">
                    <button
                      onClick={() => onSampleSelect(row)}
                      className="font-heading text-xs font-bold text-blue-electric hover:text-black"
                      title={t("useSample")}
                    >
                      Use
                    </button>
                  </td>
                )}
                {columns.map((col) => (
                  <td
                    key={col}
                    className="whitespace-nowrap px-4 py-2 font-body text-sm text-black/80"
                  >
                    {typeof row[col] === "number"
                      ? (row[col] as number).toFixed(2)
                      : String(row[col])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
