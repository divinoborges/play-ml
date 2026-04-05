import { DecisionTreeClassifier } from "ml-cart";
import type { AlgorithmModule, TrainResult, PredictionResult } from "./types";
import { computeClassificationMetrics } from "./metrics";

function extractXY(
  data: Record<string, number | string>[],
  features: string[],
  target: string,
) {
  const X = data.map((row) => features.map((f) => Number(row[f])));
  const Y = data.map((row) => String(row[target]));
  return { X, Y };
}

export const decisionTree: AlgorithmModule = {
  async train(trainData, features, target, hyperparameters, onProgress) {
    const start = performance.now();
    onProgress?.(0.1);

    const { X, Y } = extractXY(trainData, features, target);

    onProgress?.(0.3);
    const model = new DecisionTreeClassifier({
      maxDepth: Number(hyperparameters.maxDepth ?? 5),
      minNumSamples: Number(hyperparameters.minNumSamples ?? 3),
    });
    model.train(X, Y);
    onProgress?.(0.8);

    const metrics = decisionTree.evaluate(model, trainData, features, target);
    const trainingTime = performance.now() - start;
    onProgress?.(1);

    return { model, metrics, trainingTime } as TrainResult;
  },

  predict(model, input, features) {
    const dt = model as DecisionTreeClassifier;
    const x = [features.map((f) => Number(input[f]))];
    const pred = dt.predict(x);
    return { value: pred[0] } as PredictionResult;
  },

  evaluate(model, testData, features, target) {
    const dt = model as DecisionTreeClassifier;
    const X = testData.map((row) => features.map((f) => Number(row[f])));
    const actual = testData.map((row) => String(row[target]));
    const predicted = dt.predict(X);
    return computeClassificationMetrics(actual, predicted);
  },
};
