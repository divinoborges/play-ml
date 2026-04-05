/**
 * Shared metric computation functions for regression and classification algorithms.
 * Pure functions with no external dependencies.
 */

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

/**
 * Compute regression metrics: MSE, RMSE, MAE, R².
 *
 * @param actual  - Array of actual (ground truth) values
 * @param predicted - Array of predicted values (same length as actual)
 * @returns RegressionMetrics
 */
export function computeRegressionMetrics(
  actual: number[],
  predicted: number[]
): RegressionMetrics {
  const n = actual.length;

  if (n === 0) {
    return { mse: 0, rmse: 0, mae: 0, r2: 0 };
  }

  let sumSquaredError = 0;
  let sumAbsoluteError = 0;
  let sumActual = 0;

  for (let i = 0; i < n; i++) {
    const error = actual[i] - predicted[i];
    sumSquaredError += error * error;
    sumAbsoluteError += Math.abs(error);
    sumActual += actual[i];
  }

  const mse = sumSquaredError / n;
  const rmse = Math.sqrt(mse);
  const mae = sumAbsoluteError / n;

  // R² = 1 - SS_res / SS_tot
  const meanActual = sumActual / n;
  let ssTot = 0;
  for (let i = 0; i < n; i++) {
    const diff = actual[i] - meanActual;
    ssTot += diff * diff;
  }

  const r2 = ssTot === 0 ? 0 : 1 - sumSquaredError / ssTot;

  return { mse, rmse, mae, r2 };
}

/**
 * Compute classification metrics: Accuracy, Precision, Recall, F1, Confusion Matrix.
 * Supports binary (0/1) and multi-class (number or string labels).
 * For multi-class, precision/recall/f1 use macro averaging.
 * Confusion matrix: rows = actual, cols = predicted.
 *
 * @param actual    - Array of actual labels
 * @param predicted - Array of predicted labels (same length as actual)
 * @returns ClassificationMetrics
 */
export function computeClassificationMetrics(
  actual: (number | string)[],
  predicted: (number | string)[]
): ClassificationMetrics {
  const n = actual.length;

  if (n === 0) {
    return { accuracy: 0, precision: 0, recall: 0, f1: 0, confusionMatrix: [] };
  }

  // Gather sorted unique labels
  const labelSet = new Set<string>();
  for (let i = 0; i < n; i++) {
    labelSet.add(String(actual[i]));
    labelSet.add(String(predicted[i]));
  }
  const labels = Array.from(labelSet).sort((a, b) => {
    const na = Number(a);
    const nb = Number(b);
    if (!isNaN(na) && !isNaN(nb)) return na - nb;
    return a < b ? -1 : a > b ? 1 : 0;
  });
  const labelIndex = new Map<string, number>();
  labels.forEach((label, idx) => labelIndex.set(label, idx));

  const numClasses = labels.length;

  // Build confusion matrix: rows = actual, cols = predicted
  const confusionMatrix: number[][] = Array.from({ length: numClasses }, () =>
    new Array(numClasses).fill(0)
  );

  let correct = 0;
  for (let i = 0; i < n; i++) {
    const ai = labelIndex.get(String(actual[i]))!;
    const pi = labelIndex.get(String(predicted[i]))!;
    confusionMatrix[ai][pi]++;
    if (ai === pi) correct++;
  }

  const accuracy = correct / n;

  // Per-class precision, recall, f1
  let macroPrecision = 0;
  let macroRecall = 0;
  let macroF1 = 0;

  for (let c = 0; c < numClasses; c++) {
    // True positives: diagonal
    const tp = confusionMatrix[c][c];

    // False positives: column sum minus diagonal
    let fp = 0;
    for (let r = 0; r < numClasses; r++) {
      if (r !== c) fp += confusionMatrix[r][c];
    }

    // False negatives: row sum minus diagonal
    let fn = 0;
    for (let col = 0; col < numClasses; col++) {
      if (col !== c) fn += confusionMatrix[c][col];
    }

    const classPrecision = tp + fp === 0 ? 0 : tp / (tp + fp);
    const classRecall = tp + fn === 0 ? 0 : tp / (tp + fn);
    const classF1 =
      classPrecision + classRecall === 0
        ? 0
        : (2 * classPrecision * classRecall) / (classPrecision + classRecall);

    macroPrecision += classPrecision;
    macroRecall += classRecall;
    macroF1 += classF1;
  }

  const precision = macroPrecision / numClasses;
  const recall = macroRecall / numClasses;
  const f1 = macroF1 / numClasses;

  return { accuracy, precision, recall, f1, confusionMatrix };
}
