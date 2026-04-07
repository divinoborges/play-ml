import type { AlgorithmModule, TrainResult, PredictionResult } from "./types";
import { computeClassificationMetrics } from "./metrics";

export interface NaiveBayesModel {
  classes: number[];
  priors: Record<number, number>;
  means: Record<number, number[]>;
  variances: Record<number, number[]>;
  features: string[];
}

function toRow(row: Record<string, number | string>, features: string[]): number[] {
  return features.map((f) => Number(row[f]));
}

function mean(xs: number[]): number {
  return xs.reduce((a, b) => a + b, 0) / xs.length;
}

function variance(xs: number[], mu: number): number {
  return xs.reduce((a, b) => a + (b - mu) * (b - mu), 0) / xs.length;
}

function logGaussian(x: number, mu: number, varValue: number): number {
  // log N(x | mu, var) = -0.5 * log(2 pi var) - (x - mu)^2 / (2 var)
  return -0.5 * Math.log(2 * Math.PI * varValue) - ((x - mu) ** 2) / (2 * varValue);
}

function classLogPosteriors(model: NaiveBayesModel, x: number[]): Record<number, number> {
  const out: Record<number, number> = {};
  for (const c of model.classes) {
    let logp = Math.log(model.priors[c]);
    const mu = model.means[c];
    const va = model.variances[c];
    for (let i = 0; i < x.length; i++) {
      logp += logGaussian(x[i], mu[i], va[i]);
    }
    out[c] = logp;
  }
  return out;
}

function softmax(logps: Record<number, number>): Record<string, number> {
  const keys = Object.keys(logps);
  const vals = keys.map((k) => logps[Number(k)]);
  const max = Math.max(...vals);
  const exps = vals.map((v) => Math.exp(v - max));
  const sum = exps.reduce((a, b) => a + b, 0);
  const out: Record<string, number> = {};
  keys.forEach((k, i) => {
    out[k] = exps[i] / sum;
  });
  return out;
}

function argmaxClass(logps: Record<number, number>): number {
  let best = -Infinity;
  let cls = 0;
  for (const k of Object.keys(logps)) {
    const n = Number(k);
    if (logps[n] > best) {
      best = logps[n];
      cls = n;
    }
  }
  return cls;
}

export const naiveBayes: AlgorithmModule = {
  async train(trainData, features, target, hyperparameters, onProgress) {
    const start = performance.now();
    onProgress?.(0.1);

    const varSmoothing = Number(hyperparameters.varSmoothing ?? 1e-9);

    const rows = trainData.map((r) => toRow(r, features));
    const ys = trainData.map((r) => Number(r[target]));
    const classes = Array.from(new Set(ys)).sort((a, b) => a - b);

    const priors: Record<number, number> = {};
    const means: Record<number, number[]> = {};
    const variances: Record<number, number[]> = {};

    // Global max variance per feature — scikit-learn uses this as the smoothing base.
    const globalMeans = features.map((_, i) => mean(rows.map((r) => r[i])));
    const globalVars = features.map((_, i) =>
      variance(rows.map((r) => r[i]), globalMeans[i]),
    );
    const epsilon = varSmoothing * Math.max(...globalVars, 1e-12);

    onProgress?.(0.4);

    for (const c of classes) {
      const classRows = rows.filter((_, idx) => ys[idx] === c);
      priors[c] = classRows.length / rows.length;
      means[c] = features.map((_, i) => mean(classRows.map((r) => r[i])));
      variances[c] = features.map(
        (_, i) => variance(classRows.map((r) => r[i]), means[c][i]) + epsilon,
      );
    }

    onProgress?.(0.8);

    const model: NaiveBayesModel = { classes, priors, means, variances, features };
    const metrics = naiveBayes.evaluate(model, trainData, features, target);
    const trainingTime = performance.now() - start;
    onProgress?.(1);

    return { model, metrics, trainingTime } as TrainResult;
  },

  predict(model, input, features) {
    const nb = model as NaiveBayesModel;
    const x = features.map((f) => Number(input[f]));
    const logps = classLogPosteriors(nb, x);
    const value = argmaxClass(logps);
    const probabilities = softmax(logps);
    return { value, probabilities } as PredictionResult;
  },

  evaluate(model, testData, features, target) {
    const nb = model as NaiveBayesModel;
    const actual = testData.map((r) => Number(r[target]));
    const predicted = testData.map((r) => {
      const x = toRow(r, features);
      return argmaxClass(classLogPosteriors(nb, x));
    });
    return computeClassificationMetrics(actual, predicted);
  },
};
