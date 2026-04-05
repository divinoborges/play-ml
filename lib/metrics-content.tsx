"use client";

import type { ReactNode } from "react";
import { BlockMath } from "@/components/shared/Math";
import BrowserFrame from "@/components/shared/BrowserFrame";
import ROCCurveViz from "@/components/visualizations/ROCCurveViz";

function MathBlock({ label, formula, note }: { label: string; formula: string; note: string }) {
  return (
    <div>
      <p className="font-heading text-xs font-bold uppercase mb-2">{label}</p>
      <div className="bg-sand-light rounded-xl border-2 border-black/10 px-4 py-3 overflow-x-auto">
        <BlockMath math={formula} />
      </div>
      <p className="mt-1.5 text-xs text-black/50">{note}</p>
    </div>
  );
}

interface MetricCardProps {
  name: string;
  formula: ReactNode;
  explanation: string;
  interpretation: string;
  whenToUse: string;
  whenNotToUse: string;
  labels: {
    whenToUse: string;
    whenNotToUse: string;
    interpretation: string;
  };
}

function MetricCard({ name, formula, explanation, interpretation, whenToUse, whenNotToUse, labels }: MetricCardProps) {
  return (
    <div className="rounded-2xl border-3 border-black bg-white p-6 space-y-5">
      <h3 className="font-heading text-lg font-bold uppercase text-black">{name}</h3>

      {formula}

      <p className="font-body text-sm text-black/80 leading-relaxed">{explanation}</p>

      <div className="rounded-xl bg-sand-light border-2 border-black/10 p-4">
        <p className="font-heading text-xs font-bold uppercase text-black/60 mb-1">{labels.interpretation}</p>
        <p className="font-body text-sm text-black/70 leading-relaxed">{interpretation}</p>
      </div>

      <div className="rounded-xl bg-lime-pop/20 border-2 border-lime-pop/40 p-4">
        <p className="font-heading text-xs font-bold uppercase text-black mb-1">{labels.whenToUse}</p>
        <p className="font-body text-sm text-black/70 leading-relaxed">{whenToUse}</p>
      </div>

      <div className="rounded-xl bg-red-pop/10 border-2 border-red-pop/30 p-4">
        <p className="font-heading text-xs font-bold uppercase text-black mb-1">{labels.whenNotToUse}</p>
        <p className="font-body text-sm text-black/70 leading-relaxed">{whenNotToUse}</p>
      </div>
    </div>
  );
}

export function getRegressionMetricsContent(t: (key: string) => string): ReactNode {
  const labels = {
    whenToUse: t("whenToUse"),
    whenNotToUse: t("whenNotToUse"),
    interpretation: t("interpretation"),
  };

  return (
    <div className="space-y-8">
      <MetricCard
        name={t("mse.name")}
        formula={
          <MathBlock
            label="Formula"
            formula="MSE = \frac{1}{m} \sum_{i=1}^{m} (y_i - \hat{y}_i)^2"
            note="m = number of samples, yᵢ = actual value, ŷᵢ = predicted value"
          />
        }
        explanation={t("mse.explanation")}
        interpretation={t("mse.interpretation")}
        whenToUse={t("mse.whenToUse")}
        whenNotToUse={t("mse.whenNotToUse")}
        labels={labels}
      />

      <MetricCard
        name={t("rmse.name")}
        formula={
          <MathBlock
            label="Formula"
            formula="RMSE = \sqrt{\frac{1}{m} \sum_{i=1}^{m} (y_i - \hat{y}_i)^2}"
            note="Same as MSE but with the square root, restoring original units"
          />
        }
        explanation={t("rmse.explanation")}
        interpretation={t("rmse.interpretation")}
        whenToUse={t("rmse.whenToUse")}
        whenNotToUse={t("rmse.whenNotToUse")}
        labels={labels}
      />

      <MetricCard
        name={t("mae.name")}
        formula={
          <MathBlock
            label="Formula"
            formula="MAE = \frac{1}{m} \sum_{i=1}^{m} |y_i - \hat{y}_i|"
            note="Absolute value treats positive and negative errors equally"
          />
        }
        explanation={t("mae.explanation")}
        interpretation={t("mae.interpretation")}
        whenToUse={t("mae.whenToUse")}
        whenNotToUse={t("mae.whenNotToUse")}
        labels={labels}
      />

      <MetricCard
        name={t("r2.name")}
        formula={
          <MathBlock
            label="Formula"
            formula="R^2 = 1 - \frac{SS_{res}}{SS_{tot}} = 1 - \frac{\sum (y_i - \hat{y}_i)^2}{\sum (y_i - \bar{y})^2}"
            note="SS_res = residual sum of squares, SS_tot = total sum of squares, ȳ = mean of y"
          />
        }
        explanation={t("r2.explanation")}
        interpretation={t("r2.interpretation")}
        whenToUse={t("r2.whenToUse")}
        whenNotToUse={t("r2.whenNotToUse")}
        labels={labels}
      />
    </div>
  );
}

export function getClassificationMetricsContent(t: (key: string) => string): ReactNode {
  const labels = {
    whenToUse: t("whenToUse"),
    whenNotToUse: t("whenNotToUse"),
    interpretation: t("interpretation"),
  };

  return (
    <div className="space-y-8">
      <MetricCard
        name={t("accuracy.name")}
        formula={
          <MathBlock
            label="Formula"
            formula="Accuracy = \frac{TP + TN}{TP + TN + FP + FN}"
            note="TP = True Positives, TN = True Negatives, FP = False Positives, FN = False Negatives"
          />
        }
        explanation={t("accuracy.explanation")}
        interpretation={t("accuracy.interpretation")}
        whenToUse={t("accuracy.whenToUse")}
        whenNotToUse={t("accuracy.whenNotToUse")}
        labels={labels}
      />

      <MetricCard
        name={t("precision.name")}
        formula={
          <MathBlock
            label="Formula"
            formula="Precision = \frac{TP}{TP + FP}"
            note="Of all predicted positives, how many were actually positive?"
          />
        }
        explanation={t("precision.explanation")}
        interpretation={t("precision.interpretation")}
        whenToUse={t("precision.whenToUse")}
        whenNotToUse={t("precision.whenNotToUse")}
        labels={labels}
      />

      <MetricCard
        name={t("recall.name")}
        formula={
          <MathBlock
            label="Formula"
            formula="Recall = \frac{TP}{TP + FN}"
            note="Of all actual positives, how many did the model find?"
          />
        }
        explanation={t("recall.explanation")}
        interpretation={t("recall.interpretation")}
        whenToUse={t("recall.whenToUse")}
        whenNotToUse={t("recall.whenNotToUse")}
        labels={labels}
      />

      <MetricCard
        name={t("f1.name")}
        formula={
          <MathBlock
            label="Formula"
            formula="F1 = 2 \cdot \frac{Precision \cdot Recall}{Precision + Recall}"
            note="Harmonic mean — low if either precision or recall is low"
          />
        }
        explanation={t("f1.explanation")}
        interpretation={t("f1.interpretation")}
        whenToUse={t("f1.whenToUse")}
        whenNotToUse={t("f1.whenNotToUse")}
        labels={labels}
      />

      <MetricCard
        name={t("confusionMatrix.name")}
        formula={
          <div>
            <p className="font-heading text-xs font-bold uppercase mb-2">Structure</p>
            <div className="bg-sand-light rounded-xl border-2 border-black/10 px-4 py-3 overflow-x-auto">
              <BlockMath math="\begin{bmatrix} TP & FP \\ FN & TN \end{bmatrix}" />
            </div>
            <p className="mt-1.5 text-xs text-black/50">Rows = actual class, Columns = predicted class</p>
          </div>
        }
        explanation={t("confusionMatrix.explanation")}
        interpretation={t("confusionMatrix.interpretation")}
        whenToUse={t("confusionMatrix.whenToUse")}
        whenNotToUse={t("confusionMatrix.whenNotToUse")}
        labels={labels}
      />

      <MetricCard
        name={t("rocAuc.name")}
        formula={
          <div className="space-y-4">
            <BrowserFrame url="playml.app/metrics/roc-curve">
              <ROCCurveViz />
            </BrowserFrame>
            <MathBlock
              label="True Positive Rate (TPR)"
              formula="TPR = \frac{TP}{TP + FN}"
              note="Same as Recall — proportion of actual positives correctly identified"
            />
            <MathBlock
              label="False Positive Rate (FPR)"
              formula="FPR = \frac{FP}{FP + TN}"
              note="Proportion of actual negatives incorrectly classified as positive"
            />
            <MathBlock
              label="AUC"
              formula="AUC = \int_{0}^{1} TPR(FPR) \, d(FPR)"
              note="Area under the ROC curve — the probability that the model ranks a random positive higher than a random negative"
            />
          </div>
        }
        explanation={t("rocAuc.explanation")}
        interpretation={t("rocAuc.interpretation")}
        whenToUse={t("rocAuc.whenToUse")}
        whenNotToUse={t("rocAuc.whenNotToUse")}
        labels={labels}
      />
    </div>
  );
}
