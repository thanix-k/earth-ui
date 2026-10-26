# 0005 — Blocks are mirrored from shadcn and kept in sync by CI

Status: accepted (2026-10-27)

## Context

Earth UI should build any kind of UI, not only Full Creative's booking and
calling products. shadcn ships page-level blocks (login, signup, sidebar,
dashboard), but they name their components by bare names (`button`, `card`).
Installed next to `@earth`, they resolve to shadcn's own components, not
Earth's.

shadcn adds, removes and redesigns blocks over time. A hand-made copy would
go stale. Earth's components are owned forks (ADR-0003), so they can also
drift from the component APIs that new blocks expect.

## Decision

- `scripts/sync-blocks.ts` mirrors every `registry:block` from shadcn's Base UI
  style (`base-nova`) into `registry/default/blocks/`, except the `preview*`
  showcase pages. It rewires imports to Earth's components, swaps shadcn's
  multi-library `IconPlaceholder` for lucide icons, and writes
  `registry/default/blocks/index.json`.
- shadcn's sample copy (Acme Inc, Next.js docs, personal notes) is swapped for
  Full Creative products from full.io/tools (Setmore, AnswerConnect,
  YoCoBoard…) via `scripts/blocks-content.ts`. Entries are exact upstream
  strings, and the sync reports any entry upstream no longer uses.
- Block files are generated. Fixes for upstream bugs live in the script's
  `PATCHES` list, and each patch fails the sync once upstream fixes the code.
  Blocks are exempt from the hand-written styling rules and from lint.
- A weekly workflow (`.github/workflows/sync-blocks.yml`) re-runs the sync and
  opens a PR when upstream changed. It runs `pnpm check` and `next build` on
  that PR. A failure means an Earth component has drifted from shadcn's API.
- `/blocks` shows every block with a preview and its install command.
- `/demo` stays an app-local showcase, Earth's version of shadcn's `/create`.
- Blocks are code-only: not drawn in the Figma library for now.

## Consequences

- Blocks are shadcn's layouts in Earth's components and tokens, not
  EDS-designed screens.
- Base UI has fewer blocks than Radix. Chart blocks exist only for Radix and
  are not mirrored.
- Blocks bring npm dependencies the docs app must install to render them
  (`@dnd-kit/*`, `@tanstack/react-table`, `zod`). A new one fails the
  weekly PR's checks until it is added.
- Blocks are the one place this repo tracks shadcn upstream. Components stay
  seeded once (ADR-0003).
