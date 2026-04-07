## Context

The Linear Regression algorithm page's "See the Code" tab displays a from-scratch numpy implementation with manual gradient descent. While educational, it doesn't reflect how practitioners actually use linear regression — via scikit-learn. The code snippets are display-only strings stored in `lib/code-content.ts`.

## Goals / Non-Goals

**Goals:**
- Replace the linear regression code snippet with an idiomatic scikit-learn implementation
- Structure the code into three clear commented sections:
  1. `# Load Data` — load California Housing via `fetch_california_housing` and train/test split
  2. `# Build a Linear Regression Model` — model creation and fitting
  3. `# Predict using the Model` — predictions and R² evaluation

**Non-Goals:**
- Changing any other algorithm's code snippet
- Modifying the visualization or algorithm logic (only the display code changes)
- Adding scikit-learn as a project runtime dependency (snippets are display-only)

## Decisions

**Use `sklearn.linear_model.LinearRegression` directly**
- Rationale: This is the canonical scikit-learn approach. Alternatives like `sklearn.pipeline.Pipeline` or `sklearn.preprocessing` add complexity without clarity for a code showcase.
- The snippet should include `train_test_split` for data splitting and `r2_score` for evaluation, matching the current snippet's scope.

**Use `sklearn.datasets.fetch_california_housing` for data**
- Rationale: Using a real dataset from sklearn is more realistic than synthetic numpy data. California Housing is a classic regression dataset, well-suited for demonstrating linear regression.

## Risks / Trade-offs

- **[Snippet length]** → The sklearn version is shorter than the from-scratch version. This is acceptable — conciseness is a feature of using a library.
- **[Educational value]** → Showing sklearn hides the math. Acceptable trade-off since users explicitly requested sklearn code, and the math is covered in the "How it Works" tab.
