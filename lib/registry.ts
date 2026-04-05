export type AlgorithmCategory = "regression" | "classification" | "deepLearning";

export type AlgorithmType = "regression" | "classification";

export interface HyperparameterConfig {
  key: string;
  label: string;
  type: "slider" | "select";
  default: number | string;
  min?: number;
  max?: number;
  step?: number;
  options?: { value: string; label: string }[];
}

export interface AlgorithmConfig {
  slug: string;
  category: AlgorithmCategory;
  algorithmType: AlgorithmType;
  datasetPath: string;
  hyperparameters: HyperparameterConfig[];
  color: string;
}

export const algorithms: AlgorithmConfig[] = [
  {
    slug: "linear-regression",
    category: "regression",
    algorithmType: "regression",
    datasetPath: "/datasets/linear-regression.json",
    color: "#3B82F6",
    hyperparameters: [
      {
        key: "learningRate",
        label: "Learning Rate",
        type: "slider",
        default: 0.01,
        min: 0.001,
        max: 0.1,
        step: 0.001,
      },
      {
        key: "iterations",
        label: "Iterations",
        type: "slider",
        default: 1000,
        min: 100,
        max: 5000,
        step: 100,
      },
    ],
  },
  {
    slug: "logistic-regression",
    category: "classification",
    algorithmType: "classification",
    datasetPath: "/datasets/logistic-regression.json",
    color: "#10B981",
    hyperparameters: [
      {
        key: "learningRate",
        label: "Learning Rate",
        type: "slider",
        default: 0.01,
        min: 0.001,
        max: 0.1,
        step: 0.001,
      },
      {
        key: "iterations",
        label: "Iterations",
        type: "slider",
        default: 1000,
        min: 100,
        max: 5000,
        step: 100,
      },
    ],
  },
  {
    slug: "decision-tree",
    category: "classification",
    algorithmType: "classification",
    datasetPath: "/datasets/decision-tree.json",
    color: "#10B981",
    hyperparameters: [
      {
        key: "maxDepth",
        label: "Max Depth",
        type: "slider",
        default: 5,
        min: 1,
        max: 20,
        step: 1,
      },
      {
        key: "minNumSamples",
        label: "Min Samples per Leaf",
        type: "slider",
        default: 3,
        min: 1,
        max: 20,
        step: 1,
      },
    ],
  },
  {
    slug: "knn",
    category: "classification",
    algorithmType: "classification",
    datasetPath: "/datasets/knn.json",
    color: "#10B981",
    hyperparameters: [
      {
        key: "k",
        label: "K (Neighbors)",
        type: "slider",
        default: 5,
        min: 1,
        max: 20,
        step: 1,
      },
    ],
  },
  {
    slug: "svm",
    category: "classification",
    algorithmType: "classification",
    datasetPath: "/datasets/svm.json",
    color: "#10B981",
    hyperparameters: [
      {
        key: "C",
        label: "C (Regularization)",
        type: "slider",
        default: 1,
        min: 0.01,
        max: 100,
        step: 0.1,
      },
    ],
  },
  {
    slug: "random-forest",
    category: "classification",
    algorithmType: "classification",
    datasetPath: "/datasets/random-forest.json",
    color: "#10B981",
    hyperparameters: [
      {
        key: "nEstimators",
        label: "Number of Trees",
        type: "slider",
        default: 50,
        min: 10,
        max: 200,
        step: 10,
      },
      {
        key: "maxDepth",
        label: "Max Depth",
        type: "slider",
        default: 5,
        min: 1,
        max: 20,
        step: 1,
      },
    ],
  },
  {
    slug: "cnn",
    category: "deepLearning",
    algorithmType: "classification",
    datasetPath: "/datasets/cnn.json",
    color: "#8B5CF6",
    hyperparameters: [
      {
        key: "epochs",
        label: "Epochs",
        type: "slider",
        default: 10,
        min: 1,
        max: 30,
        step: 1,
      },
      {
        key: "batchSize",
        label: "Batch Size",
        type: "slider",
        default: 16,
        min: 4,
        max: 64,
        step: 4,
      },
      {
        key: "learningRate",
        label: "Learning Rate",
        type: "slider",
        default: 0.001,
        min: 0.0001,
        max: 0.01,
        step: 0.0001,
      },
    ],
  },
  {
    slug: "transformers",
    category: "deepLearning",
    algorithmType: "classification",
    datasetPath: "/datasets/transformers.json",
    color: "#8B5CF6",
    hyperparameters: [
      {
        key: "epochs",
        label: "Epochs",
        type: "slider",
        default: 5,
        min: 1,
        max: 20,
        step: 1,
      },
      {
        key: "learningRate",
        label: "Learning Rate",
        type: "slider",
        default: 0.001,
        min: 0.0001,
        max: 0.01,
        step: 0.0001,
      },
      {
        key: "numHeads",
        label: "Attention Heads",
        type: "slider",
        default: 2,
        min: 1,
        max: 4,
        step: 1,
      },
    ],
  },
];

export function getAlgorithm(slug: string): AlgorithmConfig | undefined {
  return algorithms.find((a) => a.slug === slug);
}

export function getAlgorithmsByCategory(
  category: AlgorithmCategory | "all",
): AlgorithmConfig[] {
  if (category === "all") return algorithms;
  return algorithms.filter((a) => a.category === category);
}
