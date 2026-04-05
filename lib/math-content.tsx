"use client";

import type { ReactNode } from "react";
import { BlockMath, InlineMath } from "@/components/shared/Math";

function MathBlock({ label, formula, note }: { label: string; formula: string; note: string }) {
  return (
    <div>
      <p className="font-heading text-xs font-bold uppercase mb-2">{label}</p>
      <div className="bg-sand-light rounded-xl border-2 border-black/10 px-4 py-3 overflow-x-auto">
        <BlockMath math={formula} />
      </div>
      <p className="mt-1.5 text-xs text-black/50">{note}</p>
    </div>
  );
}

const mathContent: Record<string, ReactNode> = {
  "linear-regression": (
    <div className="space-y-6">
      <MathBlock
        label="Hypothesis"
        formula="\hat{y} = w_0 + w_1 x_1 + w_2 x_2 + \cdots + w_n x_n"
        note="Where w₀ is the bias (intercept), wᵢ are the learned weights, and xᵢ are the input features."
      />
      <MathBlock
        label="Cost Function (Mean Squared Error)"
        formula="J(\mathbf{w}) = \frac{1}{m} \sum_{i=1}^{m} (\hat{y}_i - y_i)^2"
        note="Average of squared differences between predictions ŷ and actual values y, over m training samples."
      />
      <MathBlock
        label="Gradient Descent Update"
        formula="w_j := w_j - \alpha \cdot \frac{\partial J}{\partial w_j}"
        note="α is the learning rate. Weights are updated iteratively in the direction that reduces the cost J."
      />
      <MathBlock
        label="R² — Coefficient of Determination"
        formula="R^2 = 1 - \frac{SS_{res}}{SS_{tot}} = 1 - \frac{\sum (y_i - \hat{y}_i)^2}{\sum (y_i - \bar{y})^2}"
        note="R²=1 means perfect fit. R²=0 means the model predicts no better than the mean."
      />
    </div>
  ),

  "logistic-regression": (
    <div className="space-y-6">
      <MathBlock
        label="Sigmoid Function"
        formula="\sigma(z) = \frac{1}{1 + e^{-z}}"
        note="Maps any real number z to a probability between 0 and 1."
      />
      <MathBlock
        label="Hypothesis"
        formula="P(y=1 \mid \mathbf{x}) = \sigma(w_0 + w_1 x_1 + \cdots + w_n x_n)"
        note="The probability of belonging to class 1, given input features x and learned weights w."
      />
      <MathBlock
        label="Cost Function (Binary Cross-Entropy)"
        formula="J(\mathbf{w}) = -\frac{1}{m} \sum_{i=1}^{m} \left[ y_i \log(\hat{y}_i) + (1 - y_i) \log(1 - \hat{y}_i) \right]"
        note="Penalizes confident wrong predictions heavily. Minimized during training."
      />
      <MathBlock
        label="Decision Rule"
        formula="\hat{y} = \begin{cases} 1 & \text{if } \sigma(z) \geq \text{threshold} \\ 0 & \text{otherwise} \end{cases}"
        note="Default threshold = 0.5. Adjusting it trades off precision vs. recall."
      />
    </div>
  ),

  "decision-tree": (
    <div className="space-y-6">
      <MathBlock
        label="Gini Impurity"
        formula="Gini(S) = 1 - \sum_{i=1}^{C} p_i^2"
        note="Where pᵢ is the proportion of class i in set S. Gini = 0 means a perfectly pure node (one class only)."
      />
      <MathBlock
        label="Entropy"
        formula="H(S) = - \sum_{i=1}^{C} p_i \log_2(p_i)"
        note="Measures the disorder or uncertainty in a set. H = 0 for a pure node."
      />
      <MathBlock
        label="Information Gain"
        formula="IG(S, A) = H(S) - \sum_{v \in \text{values}(A)} \frac{|S_v|}{|S|} \cdot H(S_v)"
        note="The reduction in entropy after splitting set S on attribute A. The tree picks the split that maximizes IG."
      />
      <MathBlock
        label="Split Criterion"
        formula="\text{Best split} = \underset{A, \, t}{\arg\max} \; IG(S, A, t)"
        note="At each node, search all features A and thresholds t to find the split that maximizes information gain (or minimizes Gini)."
      />
    </div>
  ),

  knn: (
    <div className="space-y-6">
      <MathBlock
        label="Euclidean Distance"
        formula="d(\mathbf{a}, \mathbf{b}) = \sqrt{\sum_{i=1}^{n} (a_i - b_i)^2}"
        note="Straight-line distance between two points in n-dimensional feature space."
      />
      <MathBlock
        label="Manhattan Distance"
        formula="d(\mathbf{a}, \mathbf{b}) = \sum_{i=1}^{n} |a_i - b_i|"
        note="Sum of absolute differences along each dimension. Better for grid-like or high-dimensional data."
      />
      <MathBlock
        label="Classification Rule"
        formula="\hat{y} = \text{mode}(y_1, y_2, \ldots, y_K)"
        note="Find the K nearest neighbors by distance. Predict the most frequent class among them (majority vote)."
      />
      <MathBlock
        label="Weighted KNN (optional)"
        formula="\hat{y} = \underset{c}{\arg\max} \sum_{i=1}^{K} \frac{1}{d(\mathbf{x}, \mathbf{x}_i)} \cdot \mathbb{1}(y_i = c)"
        note="Closer neighbors get more weight. Reduces the impact of distant, less relevant neighbors."
      />
    </div>
  ),

  svm: (
    <div className="space-y-6">
      <MathBlock
        label="Decision Boundary (Hyperplane)"
        formula="\mathbf{w} \cdot \mathbf{x} + b = 0"
        note="The hyperplane that separates two classes, defined by normal vector w and bias b."
      />
      <MathBlock
        label="Margin"
        formula="\text{margin} = \frac{2}{\|\mathbf{w}\|}"
        note="Distance between the hyperplane and the nearest data points (support vectors). SVM maximizes this."
      />
      <MathBlock
        label="Optimization (Soft Margin)"
        formula="\min_{\mathbf{w}, b} \; \frac{1}{2}\|\mathbf{w}\|^2 + C \sum_{i=1}^{m} \xi_i"
        note="Minimize ‖w‖² (maximize margin) while allowing slack variables ξᵢ for misclassifications. C controls the trade-off."
      />
      <MathBlock
        label="Subject To"
        formula="y_i(\mathbf{w} \cdot \mathbf{x}_i + b) \geq 1 - \xi_i, \quad \xi_i \geq 0"
        note="Each sample must be on the correct side of the margin (within slack ξᵢ). Support vectors lie exactly on the margin."
      />
    </div>
  ),

  "random-forest": (
    <div className="space-y-6">
      <MathBlock
        label="Bagging (Bootstrap Aggregating)"
        formula="D_t \sim \text{Bootstrap}(D), \quad t = 1, \ldots, T"
        note="Each of T trees trains on a random bootstrap sample (with replacement) drawn from the original dataset D."
      />
      <MathBlock
        label="Feature Subsampling"
        formula="\text{At each split: select } \lceil\sqrt{p}\rceil \text{ random features from } p \text{ total}"
        note="Decorrelates the trees — even if one feature is very strong, not all trees will use it at every split."
      />
      <MathBlock
        label="Ensemble Prediction (Classification)"
        formula="\hat{y} = \text{mode}\big(T_1(\mathbf{x}),\; T_2(\mathbf{x}),\; \ldots,\; T_n(\mathbf{x})\big)"
        note="Each tree Tᵢ votes for a class. The final prediction is the majority vote across all n trees."
      />
      <MathBlock
        label="Variance Reduction"
        formula="\text{Var}(\bar{T}) = \frac{\sigma^2}{n} \quad \text{(if trees are independent)}"
        note="More trees → lower variance. In practice trees are correlated, but feature subsampling reduces this correlation."
      />
    </div>
  ),

  cnn: (
    <div className="space-y-6">
      <MathBlock
        label="2D Convolution"
        formula="(I * K)(i,j) = \sum_{m} \sum_{n} I(i+m,\; j+n) \cdot K(m, n)"
        note="Slide kernel K over input image I. At each position, compute the element-wise product and sum. Produces a feature map."
      />
      <MathBlock
        label="ReLU Activation"
        formula="f(x) = \max(0, x)"
        note="Applied after each convolution layer. Introduces non-linearity — keeps positive values, zeros out negatives."
      />
      <MathBlock
        label="Max Pooling"
        formula="\text{Pool}(R) = \max_{(i,j) \in R} \, a_{i,j}"
        note="Reduces spatial dimensions (e.g. 2×2 pooling halves width and height). Retains the strongest activation in each region."
      />
      <MathBlock
        label="Softmax Output Layer"
        formula="P(\text{class} = k) = \frac{e^{z_k}}{\sum_{j=1}^{C} e^{z_j}}"
        note="Converts raw scores (logits) zₖ into probabilities that sum to 1 across C classes."
      />
    </div>
  ),

  transformers: (
    <div className="space-y-6">
      <MathBlock
        label="Scaled Dot-Product Attention"
        formula="\text{Attention}(Q, K, V) = \text{softmax}\!\left(\frac{QK^\top}{\sqrt{d_k}}\right) V"
        note="Q = queries, K = keys, V = values. Each token attends to all others. Division by √dₖ prevents extreme softmax values."
      />
      <MathBlock
        label="Multi-Head Attention"
        formula="\text{MultiHead}(Q,K,V) = \text{Concat}(\text{head}_1, \ldots, \text{head}_h) \, W^O"
        note="h parallel attention heads, each learning different relationship patterns. headᵢ = Attention(QWᵢQ, KWᵢK, VWᵢV)."
      />
      <MathBlock
        label="Positional Encoding"
        formula="\begin{aligned} PE_{(pos, 2i)} &= \sin\!\left(\frac{pos}{10000^{2i/d}}\right) \\ PE_{(pos, 2i+1)} &= \cos\!\left(\frac{pos}{10000^{2i/d}}\right) \end{aligned}"
        note="Added to token embeddings so the model knows word order. Sine and cosine at different frequencies encode each position uniquely."
      />
      <MathBlock
        label="Feed-Forward Network"
        formula="\text{FFN}(x) = \max(0,\; xW_1 + b_1)\, W_2 + b_2"
        note="Applied to each token independently after attention. Two linear layers with ReLU activation in between."
      />
    </div>
  ),
};

export function getMathContent(slug: string): ReactNode | null {
  return mathContent[slug] ?? null;
}
