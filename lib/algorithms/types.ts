import type { RegressionMetrics, ClassificationMetrics, TrainingHistory } from "@/components/shared/MetricsPanel";

export interface TrainResult {
  model: unknown;
  metrics: RegressionMetrics | ClassificationMetrics;
  trainingTime: number;
  history?: TrainingHistory;
}

export interface PredictionResult {
  value: number | string;
  probabilities?: Record<string, number>;
}

export interface AlgorithmModule {
  train(
    trainData: Record<string, number | string>[],
    features: string[],
    target: string,
    hyperparameters: Record<string, number | string>,
    onProgress?: (progress: number) => void,
  ): Promise<TrainResult>;

  predict(
    model: unknown,
    input: Record<string, number>,
    features: string[],
  ): PredictionResult;

  evaluate(
    model: unknown,
    testData: Record<string, number | string>[],
    features: string[],
    target: string,
  ): RegressionMetrics | ClassificationMetrics;
}
