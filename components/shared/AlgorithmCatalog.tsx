"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  algorithms,
  type AlgorithmCategory,
  type AlgorithmConfig,
} from "@/lib/registry";

const categoryAccentColors: Record<AlgorithmCategory, string> = {
  regression: "bg-blue-electric",
  classification: "bg-lime-pop",
  deepLearning: "bg-magenta",
  clustering: "bg-amber-400",
};

const categoryFilters: { key: AlgorithmCategory | "all"; labelKey: string }[] =
  [
    { key: "all", labelKey: "categories.all" },
    { key: "regression", labelKey: "categories.regression" },
    { key: "classification", labelKey: "categories.classification" },
    { key: "deepLearning", labelKey: "categories.deepLearning" },
    { key: "clustering", labelKey: "categories.clustering" },
  ];

export default function AlgorithmCatalog() {
  const t = useTranslations();
  const [filter, setFilter] = useState<AlgorithmCategory | "all">("all");

  const filtered =
    filter === "all"
      ? algorithms
      : algorithms.filter((a) => a.category === filter);

  return (
    <div>
      {/* Filter – mobile select */}
      <select
        value={filter}
        onChange={(e) =>
          setFilter(e.target.value as AlgorithmCategory | "all")
        }
        className="md:hidden mb-8 w-full appearance-none rounded-full border-2 border-black bg-sand-light px-5 py-2 font-heading text-sm font-bold uppercase"
      >
        {categoryFilters.map(({ key, labelKey }) => (
          <option key={key} value={key}>
            {t(labelKey)}
          </option>
        ))}
      </select>

      {/* Filter – desktop buttons */}
      <div className="hidden md:flex flex-wrap gap-2 mb-8">
        {categoryFilters.map(({ key, labelKey }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`rounded-full border-2 border-black px-5 py-2 font-heading text-sm font-bold uppercase transition-colors ${
              filter === key
                ? "bg-black text-yellow-pop"
                : "bg-sand-light text-black hover:bg-black hover:text-white"
            }`}
          >
            {t(labelKey)}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((algo) => (
          <AlgorithmCard key={algo.slug} algorithm={algo} />
        ))}
      </div>
    </div>
  );
}

function AlgorithmCard({ algorithm }: { algorithm: AlgorithmConfig }) {
  const t = useTranslations();
  const name = t(`algorithms.${algorithm.slug}.name`);
  const summary = t(`algorithms.${algorithm.slug}.summary`);

  return (
    <Link
      href={`/algorithms/${algorithm.slug}`}
      className="group block rounded-2xl border-2 border-black bg-sand-light p-6 hover:bg-black hover:text-white transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="h-12 w-12 rounded-full border-2 border-black flex items-center justify-center text-black font-heading text-lg font-bold group-hover:border-white group-hover:text-white"
          style={{ backgroundColor: algorithm.color }}
        >
          {name.charAt(0)}
        </div>
        <span
          className={`font-heading text-xs font-bold px-3 py-1 rounded-full text-black ${categoryAccentColors[algorithm.category]}`}
        >
          {t(`categories.${algorithm.category}`)}
        </span>
      </div>
      <h3 className="font-heading text-base font-bold text-black uppercase group-hover:text-yellow-pop">
        {name}
      </h3>
      <p className="mt-1 font-body text-sm text-black/70 leading-relaxed group-hover:text-white/70">
        {summary}
      </p>
    </Link>
  );
}
