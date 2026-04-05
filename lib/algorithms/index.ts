import type { AlgorithmModule } from "./types";
import { linearRegression } from "./linear-regression";
import { logisticRegression } from "./logistic-regression";
import { decisionTree } from "./decision-tree";
import { knn } from "./knn";
import { svm } from "./svm";
import { randomForest } from "./random-forest";
import { cnn } from "./cnn";
import { transformers } from "./transformers";

const modules: Record<string, AlgorithmModule> = {
  "linear-regression": linearRegression,
  "logistic-regression": logisticRegression,
  "decision-tree": decisionTree,
  knn: knn,
  svm: svm,
  "random-forest": randomForest,
  cnn: cnn,
  transformers: transformers,
};

export function getAlgorithmModule(
  slug: string,
): AlgorithmModule | undefined {
  return modules[slug];
}

export type { AlgorithmModule, TrainResult, PredictionResult } from "./types";
