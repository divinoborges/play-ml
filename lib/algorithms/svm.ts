import SVM from "ml-svm";
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

export const svm: AlgorithmModule = {
  async train(trainData, features, target, hyperparameters, onProgress) {
    const start = performance.now();
    onProgress?.(0.1);

    const { X, Y } = extractXY(trainData, features, target);
    // SVM expects labels as -1 and 1
    const labels = Y.map((y) => (y === 1 ? 1 : -1));

    onProgress?.(0.3);
    const model = new SVM({
      C: Number(hyperparameters.C ?? 1),
      quiet: true,
    });
    model.train(X, labels);
    onProgress?.(0.8);

    const metrics = svm.evaluate(model, trainData, features, target);
    const trainingTime = performance.now() - start;
    onProgress?.(1);

    return { model, metrics, trainingTime } as TrainResult;
  },

  predict(model, input, features) {
    const svmModel = model as SVM;
    const x = [features.map((f) => Number(input[f]))];
    const pred = svmModel.predict(x);
    const value = pred[0] === 1 ? 1 : 0;
    return { value } as PredictionResult;
  },

  evaluate(model, testData, features, target) {
    const svmModel = model as SVM;
    const X = testData.map((row) => features.map((f) => Number(row[f])));
    const actual = testData.map((row) => Number(row[target]));
    const rawPredicted = svmModel.predict(X);
    const predicted = rawPredicted.map((p: number) => (p === 1 ? 1 : 0));
    return computeClassificationMetrics(actual, predicted);
  },
};
