# Listing in the shadcn registry directory

How to get `@earth-ui` into the shadcn directory (ui.shadcn.com/docs/directory), so
`npx shadcn add @earth-ui/<item>` works without `init` first.

## Before you open the PR

1. This repo's `main` is deployed and these return 200 with JSON:
   - https://earthui.vercel.app/r/registry.json
   - https://earthui.vercel.app/r/theme.json
   - https://earthui.vercel.app/r/button.json
2. A fresh project installs a component without `init`:
   `npx shadcn@latest add https://earthui.vercel.app/r/button.json`, and the
   button renders with the Earth fill and focus ring.
3. Sign your commits. shadcn-ui/ui blocks unsigned commits and closes the PR
   after 14 days. Editing `directory.json` in GitHub's web editor signs it for you.

## The PR

1. Fork shadcn-ui/ui and add the entry below to `apps/v4/registry/directory.json`.
   Change nothing else.
2. Run `pnpm validate:registries`.
3. Open the PR with the body below. The maintainer may close it and add the
   entry to a combined PR instead. That means it was accepted.

### Entry

```json
{
  "name": "@earth-ui",
  "homepage": "https://earthui.vercel.app",
  "url": "https://earthui.vercel.app/r/{name}.json",
  "description": "Earth Design System for shadcn: 55 Base UI components and 27 blocks on Earth tokens, light and dark. Stock shadcn classes are aliased, so any shadcn code renders as Earth.",
  "logo": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='var(--foreground)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='10'/><path d='M12 2a15 15 0 0 0 0 20a15 15 0 0 0 0-20M2.5 9h19M2.5 15h19'/></svg>"
}
```

`author` is optional. Add it if you want a name shown.

### PR body

```md
Adds `@earth-ui`, the Earth Design System as a shadcn registry: every shadcn
Base UI component re-skinned with Earth tokens, plus shadcn's Base UI blocks.

- Homepage: https://earthui.vercel.app
- Registry index: https://earthui.vercel.app/r/registry.json
- Example item: https://earthui.vercel.app/r/button.json
- Source: https://github.com/thanix-k/earth-ui (MIT)
- Items: 277 (55 components, 27 blocks, examples, theme, font)

- [x] Open source and publicly accessible
- [x] Flat registry: `/r/registry.json` and `/r/<item>.json`
- [x] No `content` in `registry.json` items
- [x] `pnpm validate:registries` passes
- [x] `npx shadcn add @earth-ui/button` works in a fresh project without `init`
- [x] Logo uses `var(--foreground)`
```
