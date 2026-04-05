import KNN from "ml-knn";
import type { AlgorithmModule, TrainResult, PredictionResult } from "./types";
import { computeClassificationMetrics } from "./metrics";

function extractXY(
  data: Record<string, number | string>[],
  features: string[],
  target: string,
) {
  const X = data.map((row) => features.map((f) => Number(row[f])));
  const Y = data.map((row) => Number(row[target]));
  return { X, Y };
}

export const knn: AlgorithmModule = {
  async train(trainData, features, target, hyperparameters, onProgress) {
    const start = performance.now();
    onProgress?.(0.1);

    const { X, Y } = extractXY(trainData, features, target);

    onProgress?.(0.3);
    const model = new KNN(X, Y, {
      k: Number(hyperparameters.k ?? 5),
    });
    onProgress?.(0.8);

    const metrics = knn.evaluate(model, trainData, features, target);
    const trainingTime = performance.now() - start;
    onProgress?.(1);

    return { model, metrics, trainingTime } as TrainResult;
  },

  predict(model, input, features) {
    const knnModel = model as KNN;
    const x = [features.map((f) => Number(input[f]))];
    const pred = knnModel.predict(x);
    return { value: pred[0] } as PredictionResult;
  },

  evaluate(model, testData, features, target) {
    const knnModel = model as KNN;
    const X = testData.map((row) => features.map((f) => Number(row[f])));
    const actual = testData.map((row) => Number(row[target]));
    const predicted = knnModel.predict(X);
    return computeClassificationMetrics(actual, predicted);
  },
};
