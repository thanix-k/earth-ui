# 0006 — Stock shadcn components; Earth only through shadcn's variables

Status: accepted (2026-11-04). Supersedes ADR-0001 and the re-skin in ADR-0003.

## Context

Components were re-skinned with `eds-` utilities (`bg-eds-accent-hover`,
`text-body-14`, `focus-ring`, …), and ~200 EDS tokens were shipped as CSS
variables and Tailwind theme keys. That diverged every component from shadcn,
made third-party shadcn code look different from ours, and needed a custom
`cn` to merge the extra classes.

## Decision

- `registry/default/ui/*` and `hooks/*` are shadcn's `base-maia` source,
  unchanged apart from import paths and lucide icons.
- No `eds-` variables, utilities, type scale, shadows, easings or focus-ring
  utility are shipped. `cn` is stock.
- `@earth-ui/base` sets shadcn's own variables (`--background`, `--primary`,
  `--muted`, `--ring`, `--chart-*`, `--sidebar-*`, `--radius`) to EDS
  setmore-black values, light and dark, hard-coded in its `cssVars` in
  `registry.json`, which is edited by hand. The separate `theme` item is gone.

## Consequences

- Earth's look is only colour, radius and font. Every radius tier is
  `var(--radius)` (8px). The base CSS sets `--radius: 9999px` on `.group/button`,
  the class `buttonVariants` adds, so everything styled as a button is a pill
  (including triggers rendered as a Button, whose `data-slot` is the trigger's)
  without a component edit. Calendar's cells (today, range ends) get the same
  pill through `--cell-radius` on `.group/calendar`, unlayered so it beats the
  calendar's own utility. EDS hover/pressed tiers,
  type scale, shadows and its focus ring are not reproduced.
- Components can be refreshed from shadcn without merging styles.
