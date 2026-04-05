import LogisticRegressionLib from "ml-logistic-regression";
import { Matrix } from "ml-matrix";
import type { AlgorithmModule, TrainResult, PredictionResult } from "./types";
import { computeClassificationMetrics } from "./metrics";

function extractXY(
  data: Record<string, number | string>[],
  features: string[],
  target: string,
) {
  const X = new Matrix(data.map((row) => features.map((f) => Number(row[f]))));
  const Y = Matrix.columnVector(data.map((row) => Number(row[target])));
  return { X, Y };
}

export const logisticRegression: AlgorithmModule = {
  async train(trainData, features, target, hyperparameters, onProgress) {
    const start = performance.now();
    onProgress?.(0.1);

    const { X, Y } = extractXY(trainData, features, target);

    onProgress?.(0.3);
    const model = new LogisticRegressionLib({
      numSteps: Number(hyperparameters.iterations ?? 1000),
      learningRate: Number(hyperparameters.learningRate ?? 0.01),
    });
    model.train(X, Y);
    onProgress?.(0.8);

    const metrics = logisticRegression.evaluate(model, trainData, features, target);
    const trainingTime = performance.now() - start;
    onProgress?.(1);

    return { model, metrics, trainingTime } as TrainResult;
  },

  predict(model, input, features) {
    const lr = model as InstanceType<typeof LogisticRegressionLib>;
    const x = new Matrix([features.map((f) => Number(input[f]))]);
    const pred = lr.predict(x);
    const value = pred[0];
    return {
      value,
      probabilities: { "0": value === 0 ? 0.8 : 0.2, "1": value === 1 ? 0.8 : 0.2 },
    } as PredictionResult;
  },

  evaluate(model, testData, features, target) {
    const lr = model as InstanceType<typeof LogisticRegressionLib>;
    const X = new Matrix(testData.map((row) => features.map((f) => Number(row[f]))));
    const actual = testData.map((row) => Number(row[target]));
    const predicted = Array.from(lr.predict(X));
    return computeClassificationMetrics(actual, predicted);
  },
};
