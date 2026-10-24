# 0003 — Own component source; generate everything around it

Status: accepted (2026-10-24)

## Context

Release 1 is every shadcn Base UI component (`@base-ui/react`) re-skinned to
Earth. Two ways to author them:

- Layer an Earth style file over shadcn's upstream `cn-*` sources and run
  shadcn's `createStyleMap` / `transformStyle` (how shadcn builds nova, vega…).
- Own each component file, as animate-ui and coss do.

Per ADR-0002 the registry is the design system, and Earth will add its own
variants and EDS-only components. Tracking shadcn upstream buys little.

## Decision

- Each component is seeded once from shadcn's Base UI version, re-skinned to
  Earth, then owned here. No upstream tracking.
- Hand-written per component: the component, its demos, the docs page body,
  a small metadata file.
- Generated, never hand-edited: registry item JSON (npm deps inferred from
  imports), `registry.json`, `public/r/*`, docs preview index, install tabs,
  token CSS.
- CI fails on stale generated output, `shadcn registry validate` errors, type
  errors and lint.

## Consequences

- shadcn upstream fixes are not inherited; they are applied deliberately.
- Adding a component touches only its own folder; the rest is generated.
