# 0001 — shadcn owns unprefixed token names; EDS tokens live under `eds-`

Status: accepted (2026-10-24)

## Context

EDS (setmore-black) and shadcn use the same words with different meanings:

| Word        | EDS meaning                         | shadcn meaning            |
| ----------- | ----------------------------------- | ------------------------- |
| `accent`    | strong brand fill (`#111111`)       | subtle hover surface      |
| `primary`   | default text/icon/border colour     | primary action fill       |
| `secondary` | secondary text / bg tier            | secondary action fill     |
| `border`    | a namespace (`border-input-active`) | the single default border |

EDS colours are also property-scoped (`text-primary` ≠ `bg-primary`), and
Tailwind v4 reserves `--text-*` for font sizes.

Registry users are prototypers in v0 / Lovable / Claude and engineers outside
eds-core. Their tools emit stock shadcn classes (`bg-accent`, `text-muted-foreground`).

## Decision

- Stock shadcn variables (`--background`, `--primary`, `--accent`, `--ring`, …)
  are defined as aliases of EDS tokens, so any shadcn code renders as Earth.
- Every EDS token is also shipped, generated from DTCG JSON, under an `eds-`
  namespace, property-scoped like eds-core: `bg-eds-neutral-hover`,
  `text-eds-secondary`, `border-eds-input-active`, plus `text-body-*` /
  `text-heading-*` typography.
- Registry components use `eds-` classes where shadcn has no equivalent
  (hover / pressed / disabled tiers) to stay faithful to EDS.

## Consequences

- Class names differ from eds-core (`bg-eds-accent` vs `bg-accent`).
- The alias layer is a design judgement (which EDS token is shadcn's `muted`?)
  and must be reviewed visually, not just generated.
