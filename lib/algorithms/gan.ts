import type { AlgorithmModule, TrainResult, PredictionResult } from "./types";
import type { GenerativeMetrics } from "@/components/shared/MetricsPanel";

/**
 * Simplified GAN for 2D point generation.
 * Generator: noise(2D) → hidden(H) → output(2D)
 * Discriminator: input(2D) → hidden(H) → output(1, sigmoid)
 * Educational implementation — demonstrates adversarial training dynamics.
 */

interface GANModel {
  // Generator weights
  gW1: number[][];
  gB1: number[];
  gW2: number[][];
  gB2: number[];
  // Discriminator weights
  dW1: number[][];
  dB1: number[];
  dW2: number[];
  dB2: number;
  hiddenSize: number;
  // Training history for visualization
  epochSnapshots: number[][][]; // generated samples at each snapshot
  gLossHistory: number[];
  dLossHistory: number[];
}

function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-Math.max(-500, Math.min(500, x))));
}

function relu(x: number): number {
  return Math.max(0, x);
}

function reluDeriv(x: number): number {
  return x > 0 ? 1 : 0;
}

function randn(): number {
  // Box-Muller transform
  const u1 = Math.random();
  const u2 = Math.random();
  return Math.sqrt(-2 * Math.log(u1 + 1e-10)) * Math.cos(2 * Math.PI * u2);
}

function randomMatrix(rows: number, cols: number, scale: number): number[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => randn() * scale)
  );
}

function generatorForward(
  noise: number[],
  gW1: number[][],
  gB1: number[],
  gW2: number[][],
  gB2: number[]
): { hidden: number[]; output: number[] } {
  const H = gB1.length;
  const hidden = new Array(H);
  for (let h = 0; h < H; h++) {
    let sum = gB1[h];
    for (let i = 0; i < noise.length; i++) {
      sum += noise[i] * gW1[i][h];
    }
    hidden[h] = relu(sum);
  }

  const output = new Array(2);
  for (let o = 0; o < 2; o++) {
    let sum = gB2[o];
    for (let h = 0; h < H; h++) {
      sum += hidden[h] * gW2[h][o];
    }
    output[o] = sum;
  }

  return { hidden, output };
}

function discriminatorForward(
  input: number[],
  dW1: number[][],
  dB1: number[],
  dW2: number[],
  dB2: number
): { hidden: number[]; output: number } {
  const H = dB1.length;
  const hidden = new Array(H);
  for (let h = 0; h < H; h++) {
    let sum = dB1[h];
    for (let i = 0; i < input.length; i++) {
      sum += input[i] * dW1[i][h];
    }
    hidden[h] = relu(sum);
  }

  let output = dB2;
  for (let h = 0; h < H; h++) {
    output += hidden[h] * dW2[h];
  }

  return { hidden, output: sigmoid(output) };
}

function generateBatch(
  batchSize: number,
  gW1: number[][],
  gB1: number[],
  gW2: number[][],
  gB2: number[]
): number[][] {
  const samples: number[][] = [];
  for (let i = 0; i < batchSize; i++) {
    const noise = [randn(), randn()];
    const { output } = generatorForward(noise, gW1, gB1, gW2, gB2);
    samples.push(output);
  }
  return samples;
}

export const gan: AlgorithmModule = {
  async train(trainData, features, _target, hyperparameters, onProgress) {
    const start = performance.now();
    onProgress?.(0.02);

    const epochs = Number(hyperparameters.epochs ?? 500);
    const lr = Number(hyperparameters.learningRate ?? 0.01);
    const H = Number(hyperparameters.hiddenUnits ?? 16);
    const clipVal = 1.0;

    // Extract real 2D data
    const realData: number[][] = trainData.map((row) =>
      features.map((f) => Number(row[f]))
    );

    // Initialize weights
    const scale = 0.1;
    const gW1 = randomMatrix(2, H, scale);
    const gB1 = new Array(H).fill(0);
    const gW2 = randomMatrix(H, 2, scale);
    const gB2 = new Array(2).fill(0);

    const dW1 = randomMatrix(2, H, scale);
    const dB1 = new Array(H).fill(0);
    const dW2 = Array.from({ length: H }, () => randn() * scale);
    let dB2 = 0;

    const gLossHistory: number[] = [];
    const dLossHistory: number[] = [];
    const epochSnapshots: number[][][] = [];
    const snapshotInterval = Math.max(1, Math.floor(epochs / 20));

    for (let epoch = 0; epoch < epochs; epoch++) {
      let dLossSum = 0;
      let gLossSum = 0;
      const batchSize = realData.length;

      // --- Train Discriminator ---
      for (let i = 0; i < batchSize; i++) {
        // Real sample → D should output 1
        const realSample = realData[i];
        const dReal = discriminatorForward(realSample, dW1, dB1, dW2, dB2);
        const dRealError = dReal.output - 1; // should be 1

        // Fake sample → D should output 0
        const noise = [randn(), randn()];
        const gOut = generatorForward(noise, gW1, gB1, gW2, gB2);
        const dFake = discriminatorForward(gOut.output, dW1, dB1, dW2, dB2);
        const dFakeError = dFake.output - 0; // should be 0

        dLossSum += -Math.log(dReal.output + 1e-10) - Math.log(1 - dFake.output + 1e-10);

        // Backprop for D (real)
        const dOutGradReal = dRealError * dReal.output * (1 - dReal.output);
        for (let h = 0; h < H; h++) {
          const grad = dOutGradReal * dReal.hidden[h];
          dW2[h] -= lr * Math.max(-clipVal, Math.min(clipVal, grad));
        }
        dB2 -= lr * Math.max(-clipVal, Math.min(clipVal, dOutGradReal));

        for (let h = 0; h < H; h++) {
          const dhGrad = dOutGradReal * dW2[h] * reluDeriv(dReal.hidden[h]);
          for (let j = 0; j < 2; j++) {
            dW1[j][h] -= lr * Math.max(-clipVal, Math.min(clipVal, dhGrad * realSample[j]));
          }
          dB1[h] -= lr * Math.max(-clipVal, Math.min(clipVal, dhGrad));
        }

        // Backprop for D (fake)
        const dOutGradFake = dFakeError * dFake.output * (1 - dFake.output);
        for (let h = 0; h < H; h++) {
          const grad = dOutGradFake * dFake.hidden[h];
          dW2[h] -= lr * Math.max(-clipVal, Math.min(clipVal, grad));
        }
        dB2 -= lr * Math.max(-clipVal, Math.min(clipVal, dOutGradFake));

        for (let h = 0; h < H; h++) {
          const dhGrad = dOutGradFake * dW2[h] * reluDeriv(dFake.hidden[h]);
          for (let j = 0; j < 2; j++) {
            dW1[j][h] -= lr * Math.max(-clipVal, Math.min(clipVal, dhGrad * gOut.output[j]));
          }
          dB1[h] -= lr * Math.max(-clipVal, Math.min(clipVal, dhGrad));
        }
      }

      // --- Train Generator ---
      for (let i = 0; i < batchSize; i++) {
        const noise = [randn(), randn()];
        const gOut = generatorForward(noise, gW1, gB1, gW2, gB2);
        const dFake = discriminatorForward(gOut.output, dW1, dB1, dW2, dB2);

        // G wants D to output 1 for its fakes
        const gError = dFake.output - 1;
        gLossSum += -Math.log(dFake.output + 1e-10);

        // Backprop through D then G
        const dOutGrad = gError * dFake.output * (1 - dFake.output);

        // Gradient of D's input (= G's output)
        const dInputGrad = new Array(2).fill(0);
        for (let j = 0; j < 2; j++) {
          for (let h = 0; h < H; h++) {
            dInputGrad[j] += dOutGrad * dW2[h] * reluDeriv(dFake.hidden[h]) * dW1[j][h];
          }
        }

        // Backprop into G's output layer
        for (let h = 0; h < H; h++) {
          for (let o = 0; o < 2; o++) {
            const grad = dInputGrad[o] * gOut.hidden[h];
            gW2[h][o] -= lr * Math.max(-clipVal, Math.min(clipVal, grad));
          }
        }
        for (let o = 0; o < 2; o++) {
          gB2[o] -= lr * Math.max(-clipVal, Math.min(clipVal, dInputGrad[o]));
        }

        // Backprop into G's hidden layer
        for (let h = 0; h < H; h++) {
          let ghGrad = 0;
          for (let o = 0; o < 2; o++) {
            ghGrad += dInputGrad[o] * gW2[h][o];
          }
          ghGrad *= reluDeriv(gOut.hidden[h]);

          for (let j = 0; j < 2; j++) {
            const grad = ghGrad * noise[j];
            gW1[j][h] -= lr * Math.max(-clipVal, Math.min(clipVal, grad));
          }
          gB1[h] -= lr * Math.max(-clipVal, Math.min(clipVal, ghGrad));
        }
      }

      const avgDLoss = dLossSum / batchSize;
      const avgGLoss = gLossSum / batchSize;
      dLossHistory.push(avgDLoss);
      gLossHistory.push(avgGLoss);

      // Snapshot generated samples periodically
      if (epoch % snapshotInterval === 0 || epoch === epochs - 1) {
        epochSnapshots.push(generateBatch(50, gW1, gB1, gW2, gB2));
      }

      onProgress?.(0.02 + (0.9 * (epoch + 1)) / epochs);

      // Yield to event loop periodically
      if (epoch % 50 === 0) {
        await new Promise((resolve) => setTimeout(resolve, 0));
      }
    }

    const model: GANModel = {
      gW1, gB1, gW2, gB2,
      dW1, dB1, dW2, dB2,
      hiddenSize: H,
      epochSnapshots,
      gLossHistory,
      dLossHistory,
    };

    const metrics = gan.evaluate(model, trainData, features, _target);
    const trainingTime = performance.now() - start;
    onProgress?.(1);

    return {
      model,
      metrics,
      trainingTime,
      history: { loss: gLossHistory, valLoss: dLossHistory },
    } as TrainResult;
  },

  predict(model, _input, _features) {
    const ganModel = model as GANModel;
    const samples = generateBatch(
      50,
      ganModel.gW1,
      ganModel.gB1,
      ganModel.gW2,
      ganModel.gB2
    );

    // Return generated samples as a JSON string
    return {
      value: JSON.stringify(samples.map(([x, y]) => ({
        x: Number(x.toFixed(2)),
        y: Number(y.toFixed(2)),
      }))),
    } as PredictionResult;
  },

  evaluate(model) {
    const ganModel = model as GANModel;
    const gLoss = ganModel.gLossHistory[ganModel.gLossHistory.length - 1] ?? 0;
    const dLoss = ganModel.dLossHistory[ganModel.dLossHistory.length - 1] ?? 0;

    return {
      generatorLoss: gLoss,
      discriminatorLoss: dLoss,
      numSamplesGenerated: ganModel.epochSnapshots.length > 0
        ? ganModel.epochSnapshots[ganModel.epochSnapshots.length - 1].length
        : 0,
    } as GenerativeMetrics;
  },
};
