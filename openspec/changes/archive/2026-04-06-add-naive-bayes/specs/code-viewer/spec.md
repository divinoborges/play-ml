## ADDED Requirements

### Requirement: Python code content for Naive Bayes
`getCodeContent("naive-bayes")` SHALL return a non-empty Python snippet that uses `sklearn.naive_bayes.GaussianNB` to train and evaluate a classifier, consistent in style with the other algorithm snippets in `lib/code-content.ts`.

#### Scenario: Naive Bayes snippet available
- **WHEN** `getCodeContent("naive-bayes")` is called
- **THEN** it SHALL return a Python string importing `GaussianNB`, calling `.fit`, `.predict`, and printing an accuracy score
