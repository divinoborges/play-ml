const codeContent: Record<string, string> = {
  "linear-regression": `import numpy as np

class LinearRegression:
    def __init__(self, learning_rate=0.01, iterations=1000):
        self.lr = learning_rate
        self.iterations = iterations
        self.weights = None
        self.bias = None

    def fit(self, X, y):
        n_samples, n_features = X.shape
        self.weights = np.zeros(n_features)
        self.bias = 0

        for _ in range(self.iterations):
            y_pred = X @ self.weights + self.bias

            dw = (1 / n_samples) * (X.T @ (y_pred - y))
            db = (1 / n_samples) * np.sum(y_pred - y)

            self.weights -= self.lr * dw
            self.bias -= self.lr * db

    def predict(self, X):
        return X @ self.weights + self.bias

    def r2_score(self, X, y):
        y_pred = self.predict(X)
        ss_res = np.sum((y - y_pred) ** 2)
        ss_tot = np.sum((y - np.mean(y)) ** 2)
        return 1 - (ss_res / ss_tot)`,

  "logistic-regression": `import numpy as np

class LogisticRegression:
    def __init__(self, learning_rate=0.01, iterations=1000):
        self.lr = learning_rate
        self.iterations = iterations
        self.weights = None
        self.bias = None

    def sigmoid(self, z):
        return 1 / (1 + np.exp(-np.clip(z, -500, 500)))

    def fit(self, X, y):
        n_samples, n_features = X.shape
        self.weights = np.zeros(n_features)
        self.bias = 0

        for _ in range(self.iterations):
            z = X @ self.weights + self.bias
            y_pred = self.sigmoid(z)

            dw = (1 / n_samples) * (X.T @ (y_pred - y))
            db = (1 / n_samples) * np.sum(y_pred - y)

            self.weights -= self.lr * dw
            self.bias -= self.lr * db

    def predict(self, X, threshold=0.5):
        z = X @ self.weights + self.bias
        probabilities = self.sigmoid(z)
        return (probabilities >= threshold).astype(int)

    def predict_proba(self, X):
        z = X @ self.weights + self.bias
        return self.sigmoid(z)`,

  "decision-tree": `import numpy as np

class DecisionTree:
    def __init__(self, max_depth=5, min_samples=3):
        self.max_depth = max_depth
        self.min_samples = min_samples
        self.tree = None

    def gini(self, y):
        classes, counts = np.unique(y, return_counts=True)
        probs = counts / len(y)
        return 1 - np.sum(probs ** 2)

    def best_split(self, X, y):
        best_gain, best_feat, best_thresh = -1, None, None
        parent_gini = self.gini(y)

        for feat in range(X.shape[1]):
            thresholds = np.unique(X[:, feat])
            for thresh in thresholds:
                left = y[X[:, feat] <= thresh]
                right = y[X[:, feat] > thresh]
                if len(left) == 0 or len(right) == 0:
                    continue
                gain = parent_gini - (
                    len(left) / len(y) * self.gini(left)
                    + len(right) / len(y) * self.gini(right)
                )
                if gain > best_gain:
                    best_gain = gain
                    best_feat = feat
                    best_thresh = thresh

        return best_feat, best_thresh

    def build_tree(self, X, y, depth=0):
        if depth >= self.max_depth or len(y) < self.min_samples or len(np.unique(y)) == 1:
            values, counts = np.unique(y, return_counts=True)
            return values[np.argmax(counts)]

        feat, thresh = self.best_split(X, y)
        if feat is None:
            values, counts = np.unique(y, return_counts=True)
            return values[np.argmax(counts)]

        left_mask = X[:, feat] <= thresh
        return {
            "feature": feat, "threshold": thresh,
            "left": self.build_tree(X[left_mask], y[left_mask], depth + 1),
            "right": self.build_tree(X[~left_mask], y[~left_mask], depth + 1),
        }

    def fit(self, X, y):
        self.tree = self.build_tree(X, y)

    def predict_one(self, x, node):
        if not isinstance(node, dict):
            return node
        if x[node["feature"]] <= node["threshold"]:
            return self.predict_one(x, node["left"])
        return self.predict_one(x, node["right"])

    def predict(self, X):
        return np.array([self.predict_one(x, self.tree) for x in X])`,

  knn: `import numpy as np
from collections import Counter

class KNN:
    def __init__(self, k=5):
        self.k = k
        self.X_train = None
        self.y_train = None

    def fit(self, X, y):
        self.X_train = X
        self.y_train = y

    def euclidean_distance(self, a, b):
        return np.sqrt(np.sum((a - b) ** 2))

    def predict_one(self, x):
        distances = [self.euclidean_distance(x, x_train)
                     for x_train in self.X_train]
        k_indices = np.argsort(distances)[:self.k]
        k_labels = self.y_train[k_indices]
        most_common = Counter(k_labels).most_common(1)
        return most_common[0][0]

    def predict(self, X):
        return np.array([self.predict_one(x) for x in X])`,

  svm: `import numpy as np

class SVM:
    def __init__(self, C=1.0, learning_rate=0.001, iterations=1000):
        self.C = C
        self.lr = learning_rate
        self.iterations = iterations
        self.weights = None
        self.bias = None

    def fit(self, X, y):
        n_samples, n_features = X.shape
        y_ = np.where(y <= 0, -1, 1)  # labels must be -1 or 1

        self.weights = np.zeros(n_features)
        self.bias = 0

        for _ in range(self.iterations):
            for i in range(n_samples):
                condition = y_[i] * (X[i] @ self.weights + self.bias) >= 1
                if condition:
                    self.weights -= self.lr * (2 * self.weights)
                else:
                    self.weights -= self.lr * (
                        2 * self.weights - self.C * y_[i] * X[i]
                    )
                    self.bias -= self.lr * (-self.C * y_[i])

    def predict(self, X):
        output = X @ self.weights + self.bias
        return np.sign(output)`,

  "random-forest": `import numpy as np
from collections import Counter

class DecisionTree:
    def __init__(self, max_depth=5):
        self.max_depth = max_depth
        self.tree = None

    def gini(self, y):
        classes, counts = np.unique(y, return_counts=True)
        return 1 - np.sum((counts / len(y)) ** 2)

    def best_split(self, X, y, feature_indices):
        best_gain, best_feat, best_thresh = -1, None, None
        parent_gini = self.gini(y)
        for feat in feature_indices:
            for thresh in np.unique(X[:, feat]):
                left = y[X[:, feat] <= thresh]
                right = y[X[:, feat] > thresh]
                if len(left) == 0 or len(right) == 0:
                    continue
                gain = parent_gini - (
                    len(left) / len(y) * self.gini(left)
                    + len(right) / len(y) * self.gini(right)
                )
                if gain > best_gain:
                    best_gain, best_feat, best_thresh = gain, feat, thresh
        return best_feat, best_thresh

    def build(self, X, y, depth=0):
        if depth >= self.max_depth or len(np.unique(y)) == 1:
            vals, cnts = np.unique(y, return_counts=True)
            return vals[np.argmax(cnts)]
        n_feats = int(np.sqrt(X.shape[1]))
        feat_idx = np.random.choice(X.shape[1], n_feats, replace=False)
        feat, thresh = self.best_split(X, y, feat_idx)
        if feat is None:
            vals, cnts = np.unique(y, return_counts=True)
            return vals[np.argmax(cnts)]
        mask = X[:, feat] <= thresh
        return {
            "f": feat, "t": thresh,
            "l": self.build(X[mask], y[mask], depth + 1),
            "r": self.build(X[~mask], y[~mask], depth + 1),
        }

    def fit(self, X, y):
        self.tree = self.build(X, y)

    def predict_one(self, x, node=None):
        node = node or self.tree
        if not isinstance(node, dict):
            return node
        if x[node["f"]] <= node["t"]:
            return self.predict_one(x, node["l"])
        return self.predict_one(x, node["r"])


class RandomForest:
    def __init__(self, n_estimators=50, max_depth=5):
        self.n_estimators = n_estimators
        self.max_depth = max_depth
        self.trees = []

    def fit(self, X, y):
        self.trees = []
        n = len(X)
        for _ in range(self.n_estimators):
            indices = np.random.choice(n, n, replace=True)
            tree = DecisionTree(max_depth=self.max_depth)
            tree.fit(X[indices], y[indices])
            self.trees.append(tree)

    def predict(self, X):
        predictions = np.array([
            [tree.predict_one(x) for tree in self.trees]
            for x in X
        ])
        return np.array([
            Counter(row).most_common(1)[0][0]
            for row in predictions
        ])`,

  cnn: `import numpy as np

class Conv2D:
    def __init__(self, n_filters, kernel_size=3):
        self.n_filters = n_filters
        self.k = kernel_size
        self.filters = np.random.randn(n_filters, kernel_size, kernel_size) * 0.1

    def forward(self, input):
        h, w = input.shape
        out_h, out_w = h - self.k + 1, w - self.k + 1
        output = np.zeros((self.n_filters, out_h, out_w))
        for f in range(self.n_filters):
            for i in range(out_h):
                for j in range(out_w):
                    region = input[i:i+self.k, j:j+self.k]
                    output[f, i, j] = np.sum(region * self.filters[f])
        return output


class MaxPool2D:
    def __init__(self, size=2):
        self.size = size

    def forward(self, input):
        n_filters, h, w = input.shape
        out_h, out_w = h // self.size, w // self.size
        output = np.zeros((n_filters, out_h, out_w))
        for f in range(n_filters):
            for i in range(out_h):
                for j in range(out_w):
                    region = input[f,
                        i*self.size:(i+1)*self.size,
                        j*self.size:(j+1)*self.size
                    ]
                    output[f, i, j] = np.max(region)
        return output


def relu(x):
    return np.maximum(0, x)


def softmax(x):
    exp = np.exp(x - np.max(x))
    return exp / np.sum(exp)


class SimpleCNN:
    def __init__(self):
        self.conv = Conv2D(n_filters=8, kernel_size=3)
        self.pool = MaxPool2D(size=2)

    def forward(self, image):
        # image: 28x28 grayscale
        out = self.conv.forward(image)  # (8, 26, 26)
        out = relu(out)                 # (8, 26, 26)
        out = self.pool.forward(out)    # (8, 13, 13)
        flat = out.flatten()            # (1352,)
        logits = flat[:10]              # simplified output layer
        return softmax(logits)`,

  transformers: `import numpy as np

def softmax(x, axis=-1):
    exp = np.exp(x - np.max(x, axis=axis, keepdims=True))
    return exp / np.sum(exp, axis=axis, keepdims=True)


def positional_encoding(seq_len, d_model):
    pos = np.arange(seq_len)[:, np.newaxis]
    i = np.arange(d_model)[np.newaxis, :]
    angles = pos / (10000 ** (2 * (i // 2) / d_model))
    pe = np.zeros((seq_len, d_model))
    pe[:, 0::2] = np.sin(angles[:, 0::2])
    pe[:, 1::2] = np.cos(angles[:, 1::2])
    return pe


def scaled_dot_product_attention(Q, K, V):
    d_k = Q.shape[-1]
    scores = (Q @ K.T) / np.sqrt(d_k)
    weights = softmax(scores)
    return weights @ V


class MultiHeadAttention:
    def __init__(self, d_model, num_heads):
        self.num_heads = num_heads
        self.d_k = d_model // num_heads
        self.W_q = np.random.randn(d_model, d_model) * 0.1
        self.W_k = np.random.randn(d_model, d_model) * 0.1
        self.W_v = np.random.randn(d_model, d_model) * 0.1
        self.W_o = np.random.randn(d_model, d_model) * 0.1

    def forward(self, X):
        Q = X @ self.W_q
        K = X @ self.W_k
        V = X @ self.W_v

        heads = []
        for h in range(self.num_heads):
            start = h * self.d_k
            end = start + self.d_k
            head = scaled_dot_product_attention(
                Q[:, start:end],
                K[:, start:end],
                V[:, start:end],
            )
            heads.append(head)

        concat = np.concatenate(heads, axis=-1)
        return concat @ self.W_o


class TransformerBlock:
    def __init__(self, d_model, num_heads):
        self.attention = MultiHeadAttention(d_model, num_heads)
        self.W1 = np.random.randn(d_model, d_model * 4) * 0.1
        self.W2 = np.random.randn(d_model * 4, d_model) * 0.1

    def forward(self, X):
        # Multi-head attention + residual
        attn_out = self.attention.forward(X)
        X = X + attn_out

        # Feed-forward + residual
        ff_out = np.maximum(0, X @ self.W1) @ self.W2
        return X + ff_out`,
};

export function getCodeContent(slug: string): string | null {
  return codeContent[slug] ?? null;
}
