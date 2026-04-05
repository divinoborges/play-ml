import { MultivariateLinearRegression } from "ml-regression";
import type { AlgorithmModule, TrainResult, PredictionResult } from "./types";
import { computeRegressionMetrics } from "./metrics";

function extractXY(
  data: Record<string, number | string>[],
  features: string[],
  target: string,
) {
  const X = data.map((row) => features.map((f) => Number(row[f])));
  const Y = data.map((row) => [Number(row[target])]);
  return { X, Y };
}

export const linearRegression: AlgorithmModule = {
  async train(trainData, features, target, _hyperparameters, onProgress) {
    const start = performance.now();
    onProgress?.(0.1);

    const { X, Y } = extractXY(trainData, features, target);

    onProgress?.(0.3);
    const model = new MultivariateLinearRegression(X, Y);
    onProgress?.(0.8);

    const metrics = linearRegression.evaluate(model, trainData, features, target);
    const trainingTime = performance.now() - start;
    onProgress?.(1);

    return { model, metrics, trainingTime } as TrainResult;
  },

  predict(model, input, features) {
    const mlr = model as MultivariateLinearRegression;
    const x = features.map((f) => Number(input[f]));
    const [value] = mlr.predict([x])[0] as unknown as number[];
    return { value: Math.round(value * 100) / 100 } as PredictionResult;
  },

  evaluate(model, testData, features, target) {
    const mlr = model as MultivariateLinearRegression;
    const { X } = extractXY(testData, features, target);
    const actual = testData.map((row) => Number(row[target]));
    const predicted = X.map((x) => {
      const result = mlr.predict([x])[0] as unknown as number[];
      return result[0];
    });
    return computeRegressionMetrics(actual, predicted);
  },
};
