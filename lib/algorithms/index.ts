import type { AlgorithmModule } from "./types";
import { linearRegression } from "./linear-regression";
import { logisticRegression } from "./logistic-regression";
import { decisionTree } from "./decision-tree";
import { knn } from "./knn";
import { svm } from "./svm";
import { randomForest } from "./random-forest";
import { cnn } from "./cnn";
import { transformers } from "./transformers";
import { kmeans } from "./kmeans";
import { rnn } from "./rnn";
import { gan } from "./gan";

const modules: Record<string, AlgorithmModule> = {
  "linear-regression": linearRegression,
  "logistic-regression": logisticRegression,
  "decision-tree": decisionTree,
  knn: knn,
  svm: svm,
  "random-forest": randomForest,
  cnn: cnn,
  transformers: transformers,
  kmeans: kmeans,
  rnn: rnn,
  gan: gan,
};

export function getAlgorithmModule(
  slug: string,
): AlgorithmModule | undefined {
  return modules[slug];
}

export type { AlgorithmModule, TrainResult, PredictionResult } from "./types";
