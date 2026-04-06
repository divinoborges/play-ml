import type { AlgorithmModule, TrainResult, PredictionResult } from "./types";
import type { ClusteringMetrics } from "@/components/shared/MetricsPanel";

interface KMeansModel {
  centroids: number[][];
  assignments: number[];
  k: number;
  features: string[];
  iterationHistory: number[][][]; // centroids at each iteration
}

function euclideanDistance(a: number[], b: number[]): number {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += (a[i] - b[i]) ** 2;
  }
  return Math.sqrt(sum);
}

function assignClusters(data: number[][], centroids: number[][]): number[] {
  return data.map((point) => {
    let minDist = Infinity;
    let minIdx = 0;
    for (let c = 0; c < centroids.length; c++) {
      const dist = euclideanDistance(point, centroids[c]);
      if (dist < minDist) {
        minDist = dist;
        minIdx = c;
      }
    }
    return minIdx;
  });
}

function updateCentroids(
  data: number[][],
  assignments: number[],
  k: number,
  dims: number
): number[][] {
  const sums = Array.from({ length: k }, () => new Array(dims).fill(0));
  const counts = new Array(k).fill(0);

  for (let i = 0; i < data.length; i++) {
    const cluster = assignments[i];
    counts[cluster]++;
    for (let d = 0; d < dims; d++) {
      sums[cluster][d] += data[i][d];
    }
  }

  return sums.map((sum, c) =>
    sum.map((v) => (counts[c] > 0 ? v / counts[c] : v))
  );
}

function computeInertia(
  data: number[][],
  assignments: number[],
  centroids: number[][]
): number {
  let inertia = 0;
  for (let i = 0; i < data.length; i++) {
    const centroid = centroids[assignments[i]];
    for (let d = 0; d < data[i].length; d++) {
      inertia += (data[i][d] - centroid[d]) ** 2;
    }
  }
  return inertia;
}

function computeSilhouetteScore(
  data: number[][],
  assignments: number[],
  k: number
): number {
  if (k <= 1 || data.length <= k) return 0;

  let totalSilhouette = 0;

  for (let i = 0; i < data.length; i++) {
    const ownCluster = assignments[i];

    // a(i) = mean distance to points in same cluster
    let aSum = 0;
    let aCount = 0;
    for (let j = 0; j < data.length; j++) {
      if (j !== i && assignments[j] === ownCluster) {
        aSum += euclideanDistance(data[i], data[j]);
        aCount++;
      }
    }
    const a = aCount > 0 ? aSum / aCount : 0;

    // b(i) = min mean distance to points in any other cluster
    let b = Infinity;
    for (let c = 0; c < k; c++) {
      if (c === ownCluster) continue;
      let bSum = 0;
      let bCount = 0;
      for (let j = 0; j < data.length; j++) {
        if (assignments[j] === c) {
          bSum += euclideanDistance(data[i], data[j]);
          bCount++;
        }
      }
      if (bCount > 0) {
        b = Math.min(b, bSum / bCount);
      }
    }

    if (b === Infinity) b = 0;
    const s = Math.max(a, b) === 0 ? 0 : (b - a) / Math.max(a, b);
    totalSilhouette += s;
  }

  return totalSilhouette / data.length;
}

export const kmeans: AlgorithmModule = {
  async train(trainData, features, _target, hyperparameters, onProgress) {
    const start = performance.now();
    onProgress?.(0.05);

    const k = Number(hyperparameters.k ?? 3);
    const maxIterations = Number(hyperparameters.maxIterations ?? 100);

    // Extract numeric data
    const data: number[][] = trainData.map((row) =>
      features.map((f) => Number(row[f]))
    );

    const dims = features.length;

    // Initialize centroids using random data points
    const indices = new Set<number>();
    while (indices.size < k) {
      indices.add(Math.floor(Math.random() * data.length));
    }
    let centroids = Array.from(indices).map((i) => [...data[i]]);

    const iterationHistory: number[][][] = [centroids.map((c) => [...c])];
    let assignments = assignClusters(data, centroids);

    onProgress?.(0.1);

    for (let iter = 0; iter < maxIterations; iter++) {
      const newCentroids = updateCentroids(data, assignments, k, dims);
      const newAssignments = assignClusters(data, newCentroids);

      // Check convergence
      let maxShift = 0;
      for (let c = 0; c < k; c++) {
        maxShift = Math.max(
          maxShift,
          euclideanDistance(centroids[c], newCentroids[c])
        );
      }

      centroids = newCentroids;
      assignments = newAssignments;
      iterationHistory.push(centroids.map((c) => [...c]));

      onProgress?.(0.1 + (0.8 * (iter + 1)) / maxIterations);

      if (maxShift < 0.001) break;

      // Yield to event loop periodically
      if (iter % 10 === 0) {
        await new Promise((resolve) => setTimeout(resolve, 0));
      }
    }

    const model: KMeansModel = {
      centroids,
      assignments,
      k,
      features,
      iterationHistory,
    };

    const metrics = kmeans.evaluate(model, trainData, features, _target);
    const trainingTime = performance.now() - start;
    onProgress?.(1);

    return { model, metrics, trainingTime } as TrainResult;
  },

  predict(model, input, features) {
    const kModel = model as KMeansModel;
    const point = features.map((f) => Number(input[f]));

    let minDist = Infinity;
    let minIdx = 0;
    for (let c = 0; c < kModel.centroids.length; c++) {
      const dist = euclideanDistance(point, kModel.centroids[c]);
      if (dist < minDist) {
        minDist = dist;
        minIdx = c;
      }
    }

    return {
      value: `Cluster ${minIdx}`,
      probabilities: undefined,
    } as PredictionResult;
  },

  evaluate(model, testData, features) {
    const kModel = model as KMeansModel;
    const data = testData.map((row) =>
      features.map((f) => Number(row[f]))
    );
    const assignments = assignClusters(data, kModel.centroids);
    const inertia = computeInertia(data, assignments, kModel.centroids);
    const silhouetteScore = computeSilhouetteScore(data, assignments, kModel.k);

    return {
      inertia,
      silhouetteScore,
      numClusters: kModel.k,
    } as ClusteringMetrics;
  },
};
