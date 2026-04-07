## Why

The Linear Regression algorithm's "See the Code" section currently shows a from-scratch numpy implementation with manual gradient descent. Users expect to see idiomatic scikit-learn code, which is the industry-standard library for this task and what they would actually use in practice.

## What Changes

- Replace the Linear Regression code snippet in `lib/code-content.ts` with a scikit-learn-based implementation using `sklearn.linear_model.LinearRegression`
- The new code should demonstrate: importing from sklearn, fitting the model, making predictions, and evaluating with R² score

## Capabilities

### New Capabilities

_(none)_

### Modified Capabilities

_(none — this is a content-only change to an existing code snippet, no spec-level behavior changes)_

## Impact

- **Code**: `lib/code-content.ts` — the `"linear-regression"` entry in the `codeContent` record
- **Dependencies**: No new runtime dependencies (code snippets are display-only, not executed)
- **APIs**: No API changes
