import type { AlgorithmModule, TrainResult, PredictionResult } from "./types";
import { computeClassificationMetrics } from "./metrics";

/**
 * Simplified CNN module using a nearest-centroid classifier on pixel features.
 * Placeholder for a full TensorFlow.js CNN — trains instantly, demonstrates the flow.
 */

interface CnnModel {
  centroids: Record<string, number[]>;
  classes: string[];
}

function euclideanDistance(a: number[], b: number[]): number {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    const d = a[i] - b[i];
    sum += d * d;
  }
  return Math.sqrt(sum);
}

function classifyByCentroid(
  pixels: number[],
  model: CnnModel,
): { label: string; probabilities: Record<string, number> } {
  const distances: Record<string, number> = {};
  let minDist = Infinity;
  let bestLabel = model.classes[0];

  for (const cls of model.classes) {
    const dist = euclideanDistance(pixels, model.centroids[cls]);
    distances[cls] = dist;
    if (dist < minDist) {
      minDist = dist;
      bestLabel = cls;
    }
  }

  // Convert distances to pseudo-probabilities using softmax-like inversion
  const totalInv = Object.values(distances).reduce(
    (acc, d) => acc + 1 / (1 + d),
    0,
  );
  const probabilities: Record<string, number> = {};
  for (const cls of model.classes) {
    probabilities[cls] = 1 / (1 + distances[cls]) / totalInv;
  }

  return { label: bestLabel, probabilities };
}

export const cnn: AlgorithmModule = {
  async train(trainData, features, target, _hyperparameters, onProgress) {
    const start = performance.now();
    onProgress?.(0.1);

    // Group samples by class
    const classSamples: Record<string, number[][]> = {};
    for (const row of trainData) {
      const label = String(row[target]);
      const pixels = row[features[0]] as unknown as number[];
      if (!classSamples[label]) {
        classSamples[label] = [];
      }
      classSamples[label].push(pixels);
    }

    onProgress?.(0.3);

    // Compute centroid (mean pixel vector) per class
    const classes = Object.keys(classSamples).sort();
    const centroids: Record<string, number[]> = {};

    for (const cls of classes) {
      const samples = classSamples[cls];
      const dim = samples[0].length;
      const centroid = new Array<number>(dim).fill(0);

      for (const sample of samples) {
        for (let i = 0; i < dim; i++) {
          centroid[i] += sample[i];
        }
      }
      for (let i = 0; i < dim; i++) {
        centroid[i] /= samples.length;
      }

      centroids[cls] = centroid;
    }

    onProgress?.(0.6);

    const model: CnnModel = { centroids, classes };

    // Simulate epoch-based training progress
    const epochs = Number(_hyperparameters.epochs ?? 10);
    for (let e = 0; e < epochs; e++) {
      await new Promise((resolve) => setTimeout(resolve, 50));
      onProgress?.(0.6 + (0.3 * (e + 1)) / epochs);
    }

    const metrics = cnn.evaluate(model, trainData, features, target);
    const trainingTime = performance.now() - start;
    onProgress?.(1);

    return { model, metrics, trainingTime } as TrainResult;
  },

  predict(model, input, features) {
    const cnnModel = model as CnnModel;
    const pixels = input[features[0]] as unknown as number[];
    const { label, probabilities } = classifyByCentroid(pixels, cnnModel);
    return { value: label, probabilities } as PredictionResult;
  },

  evaluate(model, testData, features, target) {
    const cnnModel = model as CnnModel;
    const actual: string[] = [];
    const predicted: string[] = [];

    for (const row of testData) {
      actual.push(String(row[target]));
      const pixels = row[features[0]] as unknown as number[];
      const { label } = classifyByCentroid(pixels, cnnModel);
      predicted.push(label);
    }

    return computeClassificationMetrics(actual, predicted);
  },
};
