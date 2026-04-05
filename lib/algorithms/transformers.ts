import type { AlgorithmModule, TrainResult, PredictionResult } from "./types";
import { computeClassificationMetrics } from "./metrics";

/**
 * Simplified Transformer module using bag-of-words + perceptron classifier.
 * Placeholder for a full TensorFlow.js Transformer — demonstrates the training flow.
 */

interface TransformerModel {
  vocabulary: Map<string, number>;
  weights: number[];
  bias: number;
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter((t) => t.length > 0);
}

function textToBoW(text: string, vocabulary: Map<string, number>): number[] {
  const vec = new Array<number>(vocabulary.size).fill(0);
  const tokens = tokenize(text);
  for (const token of tokens) {
    const idx = vocabulary.get(token);
    if (idx !== undefined) {
      vec[idx] += 1;
    }
  }
  return vec;
}

function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-Math.max(-500, Math.min(500, x))));
}

function dot(a: number[], b: number[]): number {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += a[i] * b[i];
  }
  return sum;
}

export const transformers: AlgorithmModule = {
  async train(trainData, features, target, hyperparameters, onProgress) {
    const start = performance.now();
    onProgress?.(0.05);

    // Build vocabulary from training texts
    const wordCounts = new Map<string, number>();
    for (const row of trainData) {
      const text = String(row[features[0]]);
      const tokens = tokenize(text);
      for (const token of tokens) {
        wordCounts.set(token, (wordCounts.get(token) ?? 0) + 1);
      }
    }

    // Sort by frequency, keep top vocabSize words
    const vocabSize = Number(hyperparameters.vocabSize ?? 500);
    const sortedWords = Array.from(wordCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, vocabSize);

    const vocabulary = new Map<string, number>();
    sortedWords.forEach(([word], idx) => vocabulary.set(word, idx));

    onProgress?.(0.15);

    // Convert all training texts to BoW vectors
    const X: number[][] = [];
    const Y: number[] = [];
    for (const row of trainData) {
      const text = String(row[features[0]]);
      X.push(textToBoW(text, vocabulary));
      Y.push(Number(row[target]));
    }

    onProgress?.(0.2);

    // Train perceptron with gradient descent
    const epochs = Number(hyperparameters.epochs ?? 20);
    const lr = Number(hyperparameters.learningRate ?? 0.1);
    const dim = vocabulary.size;

    const weights = new Array<number>(dim).fill(0);
    let bias = 0;

    for (let e = 0; e < epochs; e++) {
      for (let i = 0; i < X.length; i++) {
        const pred = sigmoid(dot(X[i], weights) + bias);
        const error = pred - Y[i];

        // Update weights
        for (let j = 0; j < dim; j++) {
          weights[j] -= lr * error * X[i][j];
        }
        bias -= lr * error;
      }

      // Simulate async training with progress
      await new Promise((resolve) => setTimeout(resolve, 30));
      onProgress?.(0.2 + (0.7 * (e + 1)) / epochs);
    }

    const model: TransformerModel = { vocabulary, weights, bias };

    const metrics = transformers.evaluate(model, trainData, features, target);
    const trainingTime = performance.now() - start;
    onProgress?.(1);

    return { model, metrics, trainingTime } as TrainResult;
  },

  predict(model, input, features) {
    const tfModel = model as TransformerModel;
    const text = String(input[features[0]]);
    const bow = textToBoW(text, tfModel.vocabulary);
    const score = sigmoid(dot(bow, tfModel.weights) + tfModel.bias);
    const predicted = score >= 0.5 ? 1 : 0;

    return {
      value: predicted,
      probabilities: {
        positive: score,
        negative: 1 - score,
      },
    } as PredictionResult;
  },

  evaluate(model, testData, features, target) {
    const tfModel = model as TransformerModel;
    const actual: number[] = [];
    const predicted: number[] = [];

    for (const row of testData) {
      actual.push(Number(row[target]));
      const text = String(row[features[0]]);
      const bow = textToBoW(text, tfModel.vocabulary);
      const score = sigmoid(dot(bow, tfModel.weights) + tfModel.bias);
      predicted.push(score >= 0.5 ? 1 : 0);
    }

    return computeClassificationMetrics(actual, predicted);
  },
};
