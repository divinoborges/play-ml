## Why

The "Compare Algorithms" feature is being removed from the application. The feature is no longer needed and removing it simplifies the app and reduces maintenance surface.

## What Changes

- **Remove Compare page** — Delete `app/[locale]/compare/` directory (page.tsx, ComparePageClient.tsx)
- **Remove Compare nav button** — Remove the "Compare Algorithms" button from `Header.tsx`
- **Remove Compare i18n keys** — Delete `common.compare` and the entire `comparison` object from both `messages/en.json` and `messages/pt-BR.json`

## Capabilities

### New Capabilities

_(none)_

### Modified Capabilities

_(none — this is a pure removal)_

## Impact

- **Deleted files**: `app/[locale]/compare/page.tsx`, `app/[locale]/compare/ComparePageClient.tsx`
- **Modified files**: `Header.tsx` (remove compare button), `messages/en.json`, `messages/pt-BR.json` (remove translation keys)
- **No breaking changes** to remaining functionality — the compare feature is self-contained
