## 1. Remove Compare Page

- [x] 1.1 Delete the `app/[locale]/compare/` directory (page.tsx and ComparePageClient.tsx)

## 2. Remove Navigation

- [x] 2.1 Remove the "Compare Algorithms" button and its `Link` from `Header.tsx`
- [x] 2.2 Remove `common.compare` key from `messages/en.json` and `messages/pt-BR.json`

## 3. Remove Translation Keys

- [x] 3.1 Remove the entire `comparison` object from `messages/en.json`
- [x] 3.2 Remove the entire `comparison` object from `messages/pt-BR.json`

## 4. Verification

- [x] 4.1 Type-check with `npx tsc --noEmit`
- [x] 4.2 Build with `npx next build`
