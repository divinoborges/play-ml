import dynamic from "next/dynamic";
import type { ComponentType } from "react";

const visualizations: Record<string, ComponentType> = {
  "linear-regression": dynamic(
    () => import("./LinearRegressionViz"),
    { ssr: false },
  ),
  "logistic-regression": dynamic(
    () => import("./LogisticRegressionViz"),
    { ssr: false },
  ),
  "decision-tree": dynamic(
    () => import("./DecisionTreeViz"),
    { ssr: false },
  ),
  knn: dynamic(
    () => import("./KNNViz"),
    { ssr: false },
  ),
  svm: dynamic(
    () => import("./SVMViz"),
    { ssr: false },
  ),
  "random-forest": dynamic(
    () => import("./RandomForestViz"),
    { ssr: false },
  ),
  cnn: dynamic(
    () => import("./CNNViz"),
    { ssr: false },
  ),
  transformers: dynamic(
    () => import("./TransformersViz"),
    { ssr: false },
  ),
  kmeans: dynamic(
    () => import("./KMeansViz"),
    { ssr: false },
  ),
  rnn: dynamic(
    () => import("./RNNViz"),
    { ssr: false },
  ),
  gan: dynamic(
    () => import("./GANViz"),
    { ssr: false },
  ),
};

export function getVisualization(slug: string): ComponentType | undefined {
  return visualizations[slug];
}
