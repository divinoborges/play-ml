"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  getRegressionMetricsContent,
  getClassificationMetricsContent,
} from "@/lib/metrics-content";

export default function MetricsPageClient() {
  const t = useTranslations();
  const tm = useTranslations("metricsPage");

  return (
    <div>
      {/* Back nav */}
      <div className="bg-black px-4 sm:px-6 lg:px-8 py-3">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center font-heading text-sm font-bold text-white/70 hover:text-yellow-pop uppercase"
          >
            ← {t("common.backToCatalog")}
          </Link>
        </div>
      </div>

      {/* Header */}
      <section className="bg-black px-4 sm:px-6 lg:px-8 py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-heading text-display-lg uppercase tracking-tight text-white mb-4">
            {tm("title")}
          </h1>
          <p className="font-body text-base text-white/70 leading-relaxed max-w-2xl">
            {tm("subtitle")}
          </p>

          {/* Anchor nav */}
          <div className="mt-8 flex gap-3">
            <a
              href="#regression"
              className="rounded-full border-2 border-white/30 px-4 py-1.5 font-heading text-xs font-bold text-white uppercase hover:bg-white hover:text-black transition-colors"
            >
              {tm("regressionTitle")}
            </a>
            <a
              href="#classification"
              className="rounded-full border-2 border-white/30 px-4 py-1.5 font-heading text-xs font-bold text-white uppercase hover:bg-white hover:text-black transition-colors"
            >
              {tm("classificationTitle")}
            </a>
          </div>
        </div>
      </section>

      {/* Regression Metrics */}
      <section id="regression" className="bg-sand px-4 sm:px-6 lg:px-8 py-16 scroll-mt-4">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-heading text-display-sm uppercase text-black mb-2">
            {tm("regressionTitle")}
          </h2>
          <p className="font-body text-sm text-black/60 mb-8">
            {tm("regressionDescription")}
          </p>
          {getRegressionMetricsContent(tm)}
        </div>
      </section>

      {/* Classification Metrics */}
      <section id="classification" className="bg-sand-light px-4 sm:px-6 lg:px-8 py-16 scroll-mt-4">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-heading text-display-sm uppercase text-black mb-2">
            {tm("classificationTitle")}
          </h2>
          <p className="font-body text-sm text-black/60 mb-8">
            {tm("classificationDescription")}
          </p>
          {getClassificationMetricsContent(tm)}
        </div>
      </section>
    </div>
  );
}
