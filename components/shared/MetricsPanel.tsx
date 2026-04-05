"use client";

import { useTranslations } from "next-intl";
import type { AlgorithmType } from "@/lib/registry";

export interface RegressionMetrics {
  mse: number;
  rmse: number;
  mae: number;
  r2: number;
}

export interface ClassificationMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
  confusionMatrix: number[][];
}

export interface TrainingHistory {
  loss: number[];
  valLoss?: number[];
}

type MetricsPanelProps = {
  algorithmType: AlgorithmType;
  metrics: RegressionMetrics | ClassificationMetrics | null;
  trainingTime?: number;
  history?: TrainingHistory;
};

export default function MetricsPanel({
  algorithmType,
  metrics,
  trainingTime,
  history,
}: MetricsPanelProps) {
  const t = useTranslations("metrics");

  if (!metrics) return null;

  return (
    <div className="space-y-6">
      {trainingTime !== undefined && (
        <div className="inline-flex items-center gap-2 rounded-full bg-sand border-2 border-black px-4 py-1.5">
          <span className="font-heading text-xs font-bold text-black uppercase">{t("trainingTime")}:</span>
          <span className="font-heading text-sm font-bold text-black">{trainingTime.toFixed(0)}ms</span>
        </div>
      )}

      {algorithmType === "regression" ? (
        <RegressionMetricsView
          metrics={metrics as RegressionMetrics}
          t={t}
        />
      ) : (
        <ClassificationMetricsView
          metrics={metrics as ClassificationMetrics}
          t={t}
        />
      )}

      {history && history.loss.length > 0 && (
        <LossChart history={history} t={t} />
      )}
    </div>
  );
}

function RegressionMetricsView({
  metrics,
  t,
}: {
  metrics: RegressionMetrics;
  t: ReturnType<typeof useTranslations>;
}) {
  const items = [
    { key: "mse", value: metrics.mse },
    { key: "rmse", value: metrics.rmse },
    { key: "mae", value: metrics.mae },
    { key: "r2", value: metrics.r2 },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {items.map(({ key, value }) => (
        <div key={key} className="flex flex-col items-center gap-2">
          <div className="flex h-20 w-full items-center justify-center rounded-2xl bg-yellow-pop border-2 border-black">
            <span className="font-heading text-display-sm text-black">
              {value.toFixed(key === "r2" ? 3 : 1)}
            </span>
          </div>
          <span className="rounded-full bg-sand px-4 py-1 font-heading text-xs font-bold text-black text-center">
            {t(key as "mse" | "rmse" | "mae" | "r2")}
          </span>
        </div>
      ))}
    </div>
  );
}

function ClassificationMetricsView({
  metrics,
  t,
}: {
  metrics: ClassificationMetrics;
  t: ReturnType<typeof useTranslations>;
}) {
  const items = [
    { key: "accuracy", value: metrics.accuracy },
    { key: "precision", value: metrics.precision },
    { key: "recall", value: metrics.recall },
    { key: "f1", value: metrics.f1 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {items.map(({ key, value }) => (
          <div key={key} className="flex flex-col items-center gap-2">
            <div className="flex h-20 w-full items-center justify-center rounded-2xl bg-yellow-pop border-2 border-black">
              <span className="font-heading text-display-sm text-black">
                {(value * 100).toFixed(0)}%
              </span>
            </div>
            <span className="rounded-full bg-sand px-4 py-1 font-heading text-xs font-bold text-black text-center">
              {t(key as "accuracy" | "precision" | "recall" | "f1")}
            </span>
          </div>
        ))}
      </div>

      {metrics.confusionMatrix.length > 0 && (
        <div>
          <p className="font-heading text-sm font-bold text-black mb-2 uppercase">
            {t("confusionMatrix")}
          </p>
          <div className="inline-block">
            <table className="border-collapse">
              <tbody>
                {metrics.confusionMatrix.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className={`w-16 h-12 text-center font-heading text-sm font-bold border-2 border-black ${
                          i === j
                            ? "bg-lime-pop text-black"
                            : "bg-red-pop/30 text-black"
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function LossChart({
  history,
  t,
}: {
  history: TrainingHistory;
  t: ReturnType<typeof useTranslations>;
}) {
  const maxLoss = Math.max(...history.loss, ...(history.valLoss ?? []));
  const height = 120;
  const width = 300;

  function toPoints(values: number[]): string {
    return values
      .map(
        (v, i) =>
          `${(i / (values.length - 1)) * width},${height - (v / maxLoss) * height}`,
      )
      .join(" ");
  }

  return (
    <div>
      <p className="font-heading text-sm font-bold text-black mb-2 uppercase">{t("lossChart")}</p>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full max-w-sm border-2 border-black rounded-2xl bg-white p-2"
      >
        <polyline
          points={toPoints(history.loss)}
          fill="none"
          stroke="#1185F7"
          strokeWidth="2"
        />
        {history.valLoss && (
          <polyline
            points={toPoints(history.valLoss)}
            fill="none"
            stroke="#FF3B3B"
            strokeWidth="2"
            strokeDasharray="4"
          />
        )}
      </svg>
      <div className="flex gap-4 mt-2 font-heading text-xs font-bold text-black">
        <span className="flex items-center gap-1">
          <span className="w-4 h-0.5 bg-blue-electric inline-block" /> Train
        </span>
        {history.valLoss && (
          <span className="flex items-center gap-1">
            <span className="w-4 h-0.5 bg-red-pop inline-block" /> Val
          </span>
        )}
      </div>
    </div>
  );
}
