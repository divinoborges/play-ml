## Context

The Compare Algorithms feature consists of a page at `/[locale]/compare/` with two files, a nav button in the Header, and translation keys in both locale files. It is self-contained with no dependencies from other features.

## Goals / Non-Goals

**Goals:**
- Completely remove the Compare Algorithms feature and all traces of it

**Non-Goals:**
- Replacing it with another feature
- Archiving the code for potential re-use

## Decisions

### 1. Delete the compare directory entirely

**Decision**: Remove `app/[locale]/compare/` directory with both files rather than emptying them.

**Rationale**: Clean removal. No other code imports from these files.

### 2. Remove translation keys, not just the button

**Decision**: Remove both `common.compare` and the entire `comparison` namespace from both locale files.

**Rationale**: Dead code. Leaving unused translation keys adds confusion.

## Risks / Trade-offs

- **Low risk** — The compare feature is self-contained. No other components depend on it.
