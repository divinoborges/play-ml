declare module "react-katex" {
  import type { FC } from "react";
  interface MathProps {
    math: string;
    errorColor?: string;
    renderError?: (error: Error) => React.ReactNode;
  }
  export const BlockMath: FC<MathProps>;
  export const InlineMath: FC<MathProps>;
}

declare module "ml-regression" {
  export class MultivariateLinearRegression {
    constructor(X: number[][], Y: number[][]);
    predict(X: number[][]): number[][];
    weights: number[][];
  }
  export class SimpleLinearRegression {
    constructor(X: number[], Y: number[]);
    predict(x: number): number;
    slope: number;
    intercept: number;
  }
}

declare module "ml-cart" {
  export class DecisionTreeClassifier {
    constructor(options?: { maxDepth?: number; minNumSamples?: number });
    train(X: number[][], Y: (string | number)[]): void;
    predict(X: number[][]): (string | number)[];
  }
  export class DecisionTreeRegression {
    constructor(options?: { maxDepth?: number; minNumSamples?: number });
    train(X: number[][], Y: number[]): void;
    predict(X: number[][]): number[];
  }
}

declare module "ml-knn" {
  export default class KNN {
    constructor(X: number[][], Y: number[], options?: { k?: number });
    predict(X: number[][]): number[];
  }
}

declare module "ml-logistic-regression" {
  import { Matrix } from "ml-matrix";
  export default class LogisticRegression {
    constructor(options?: { numSteps?: number; learningRate?: number });
    train(X: Matrix, Y: Matrix): void;
    predict(X: Matrix): number[];
  }
}

declare module "ml-svm" {
  export default class SVM {
    constructor(options?: { C?: number; quiet?: boolean });
    train(X: number[][], Y: number[]): void;
    predict(X: number[][]): number[];
  }
}

declare module "ml-random-forest" {
  export class RandomForestClassifier {
    constructor(options?: {
      nEstimators?: number;
      maxFeatures?: number;
      seed?: number;
    });
    train(X: number[][], Y: number[]): void;
    predict(X: number[][]): number[];
  }
  export class RandomForestRegression {
    constructor(options?: {
      nEstimators?: number;
      maxFeatures?: number;
      seed?: number;
    });
    train(X: number[][], Y: number[]): void;
    predict(X: number[][]): number[];
  }
}
