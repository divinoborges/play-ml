import type { AlgorithmModule, TrainResult, PredictionResult } from "./types";
import { computeRegressionMetrics } from "./metrics";

/**
 * Simplified RNN for time-series prediction.
 * Uses a single-layer vanilla RNN with tanh activation, trained with gradient descent.
 * Educational implementation — demonstrates the sequential hidden-state flow.
 */

interface RNNModel {
  Wx: number[][];  // input-to-hidden weights
  Wh: number[][];  // hidden-to-hidden weights
  Wy: number[];    // hidden-to-output weights
  bh: number[];    // hidden bias
  by: number;      // output bias
  hiddenSize: number;
  seqLen: number;
  inputMean: number[];
  inputStd: number[];
  targetMean: number;
  targetStd: number;
}

function randomMatrix(rows: number, cols: number, scale: number): number[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => (Math.random() * 2 - 1) * scale)
  );
}

function tanh(x: number): number {
  if (x > 20) return 1;
  if (x < -20) return -1;
  const e2x = Math.exp(2 * x);
  return (e2x - 1) / (e2x + 1);
}

function forwardStep(
  input: number[],
  hPrev: number[],
  Wx: number[][],
  Wh: number[][],
  bh: number[]
): number[] {
  const hiddenSize = hPrev.length;
  const hNext = new Array(hiddenSize);
  for (let h = 0; h < hiddenSize; h++) {
    let sum = bh[h];
    for (let i = 0; i < input.length; i++) {
      sum += Wx[i][h] * input[i];
    }
    for (let j = 0; j < hiddenSize; j++) {
      sum += Wh[j][h] * hPrev[j];
    }
    hNext[h] = tanh(sum);
  }
  return hNext;
}

function predictOutput(hidden: number[], Wy: number[], by: number): number {
  let sum = by;
  for (let h = 0; h < hidden.length; h++) {
    sum += Wy[h] * hidden[h];
  }
  return sum;
}

function normalizeData(
  data: number[][],
  features: string[]
): { normalized: number[][]; mean: number[]; std: number[] } {
  const nFeatures = features.length;
  const mean = new Array(nFeatures).fill(0);
  const std = new Array(nFeatures).fill(0);

  for (const row of data) {
    for (let f = 0; f < nFeatures; f++) {
      mean[f] += row[f];
    }
  }
  for (let f = 0; f < nFeatures; f++) {
    mean[f] /= data.length;
  }

  for (const row of data) {
    for (let f = 0; f < nFeatures; f++) {
      std[f] += (row[f] - mean[f]) ** 2;
    }
  }
  for (let f = 0; f < nFeatures; f++) {
    std[f] = Math.sqrt(std[f] / data.length) || 1;
  }

  const normalized = data.map((row) =>
    row.map((v, f) => (v - mean[f]) / std[f])
  );

  return { normalized, mean, std };
}

export const rnn: AlgorithmModule = {
  async train(trainData, features, target, hyperparameters, onProgress) {
    const start = performance.now();
    onProgress?.(0.05);

    const epochs = Number(hyperparameters.epochs ?? 10);
    const lr = Number(hyperparameters.learningRate ?? 0.01);
    const hiddenSize = Number(hyperparameters.hiddenUnits ?? 16);
    const seqLen = Number(hyperparameters.sequenceLength ?? 10);

    // Extract input sequences (use temp features as a sequence)
    const tempFeatures = features.filter((f) => f.startsWith("temp_"));
    const inputDim = 1; // single feature per timestep

    // Extract raw data
    const rawInputs: number[][] = trainData.map((row) =>
      tempFeatures.map((f) => Number(row[f]))
    );
    const rawTargets: number[] = trainData.map((row) => Number(row[target]));

    // Normalize
    const { normalized: normInputs, mean: inputMean, std: inputStd } =
      normalizeData(rawInputs, tempFeatures);
    const targetMean =
      rawTargets.reduce((a, b) => a + b, 0) / rawTargets.length;
    const targetStd =
      Math.sqrt(
        rawTargets.reduce((a, b) => a + (b - targetMean) ** 2, 0) /
          rawTargets.length
      ) || 1;
    const normTargets = rawTargets.map((t) => (t - targetMean) / targetStd);

    onProgress?.(0.1);

    // Initialize weights
    const scale = 0.1;
    const Wx = randomMatrix(inputDim, hiddenSize, scale);
    const Wh = randomMatrix(hiddenSize, hiddenSize, scale);
    const Wy = Array.from({ length: hiddenSize }, () => (Math.random() * 2 - 1) * scale);
    const bh = new Array(hiddenSize).fill(0);
    let by = 0;

    const actualSeqLen = Math.min(seqLen, tempFeatures.length);
    const history: number[] = [];

    for (let epoch = 0; epoch < epochs; epoch++) {
      let epochLoss = 0;

      for (let s = 0; s < normInputs.length; s++) {
        // Forward pass through sequence
        const hiddens: number[][] = [new Array(hiddenSize).fill(0)];

        for (let t = 0; t < actualSeqLen; t++) {
          const input = [normInputs[s][t]];
          hiddens.push(forwardStep(input, hiddens[t], Wx, Wh, bh));
        }

        const output = predictOutput(hiddens[actualSeqLen], Wy, by);
        const error = output - normTargets[s];
        epochLoss += error * error;

        // Backpropagation through time (truncated)
        // Output gradients
        const dWy = hiddens[actualSeqLen].map((h) => error * h);
        const dby = error;

        // Hidden gradient at last step
        let dh = Wy.map((w) => error * w);

        // Clip gradients
        const clipVal = 1.0;

        // Update output weights
        for (let h = 0; h < hiddenSize; h++) {
          Wy[h] -= lr * Math.max(-clipVal, Math.min(clipVal, dWy[h]));
        }
        by -= lr * Math.max(-clipVal, Math.min(clipVal, dby));

        // BPTT for a few steps
        const bpttSteps = Math.min(5, actualSeqLen);
        for (let t = actualSeqLen; t > actualSeqLen - bpttSteps; t--) {
          // dtanh = dh * (1 - tanh²)
          const dhRaw = dh.map(
            (d, h) => d * (1 - hiddens[t][h] * hiddens[t][h])
          );

          // Update Wx
          const input = [normInputs[s][t - 1]];
          for (let i = 0; i < inputDim; i++) {
            for (let h = 0; h < hiddenSize; h++) {
              const grad = dhRaw[h] * input[i];
              Wx[i][h] -= lr * Math.max(-clipVal, Math.min(clipVal, grad));
            }
          }

          // Update Wh
          for (let j = 0; j < hiddenSize; j++) {
            for (let h = 0; h < hiddenSize; h++) {
              const grad = dhRaw[h] * hiddens[t - 1][j];
              Wh[j][h] -= lr * Math.max(-clipVal, Math.min(clipVal, grad));
            }
          }

          // Update bh
          for (let h = 0; h < hiddenSize; h++) {
            bh[h] -= lr * Math.max(-clipVal, Math.min(clipVal, dhRaw[h]));
          }

          // Propagate dh back
          const dhPrev = new Array(hiddenSize).fill(0);
          for (let j = 0; j < hiddenSize; j++) {
            for (let h = 0; h < hiddenSize; h++) {
              dhPrev[j] += Wh[j][h] * dhRaw[h];
            }
          }
          dh = dhPrev;
        }
      }

      epochLoss /= normInputs.length;
      history.push(epochLoss);

      await new Promise((resolve) => setTimeout(resolve, 20));
      onProgress?.(0.1 + (0.8 * (epoch + 1)) / epochs);
    }

    const model: RNNModel = {
      Wx,
      Wh,
      Wy,
      bh,
      by,
      hiddenSize,
      seqLen: actualSeqLen,
      inputMean,
      inputStd,
      targetMean,
      targetStd,
    };

    const metrics = rnn.evaluate(model, trainData, features, target);
    const trainingTime = performance.now() - start;
    onProgress?.(1);

    return {
      model,
      metrics,
      trainingTime,
      history: { loss: history },
    } as TrainResult;
  },

  predict(model, input, features) {
    const rnnModel = model as RNNModel;
    const tempFeatures = features.filter((f) => f.startsWith("temp_"));

    // Normalize input
    const sequence = tempFeatures.map(
      (f, i) => (Number(input[f]) - rnnModel.inputMean[i]) / rnnModel.inputStd[i]
    );

    // Forward pass
    let hidden = new Array(rnnModel.hiddenSize).fill(0);
    const actualSeqLen = Math.min(rnnModel.seqLen, sequence.length);

    for (let t = 0; t < actualSeqLen; t++) {
      hidden = forwardStep(
        [sequence[t]],
        hidden,
        rnnModel.Wx,
        rnnModel.Wh,
        rnnModel.bh
      );
    }

    const normOutput = predictOutput(hidden, rnnModel.Wy, rnnModel.by);
    const value = normOutput * rnnModel.targetStd + rnnModel.targetMean;

    return {
      value: Number(value.toFixed(1)),
    } as PredictionResult;
  },

  evaluate(model, testData, features, target) {
    const actual: number[] = [];
    const predicted: number[] = [];

    for (const row of testData) {
      actual.push(Number(row[target]));
      const input: Record<string, number> = {};
      features.forEach((f) => {
        input[f] = Number(row[f]);
      });
      const result = rnn.predict(model, input, features);
      predicted.push(Number(result.value));
    }

    return computeRegressionMetrics(actual, predicted);
  },
};
