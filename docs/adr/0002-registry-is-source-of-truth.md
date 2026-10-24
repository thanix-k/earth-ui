# 0002 — The registry is the source of truth; eds-core is a seed, not upstream

Status: accepted (2026-10-24)

## Context

The EDS packages in aw-frontend-monorepo (`eds-core`, `eds-brands`) are being
sunset. This registry replaces them for every consumer, including product
engineers who use eds-core today.

## Decision

- Tokens are authored in this repo as DTCG JSON (`tokens/`), seeded once from
  `@adaptavant/eds-brands@1.12.0` (`global.json`, `setmore-black.json`).
  There is no sync back to, or from, the monorepo.
- All CSS, registry items, and docs token pages are generated from that JSON.
- eds-core source, Storybook and earth.anywhere.co are reference material for
  visuals and behaviour while building — not an upstream to track.

## Consequences

- Token changes happen here, by editing DTCG JSON and rebuilding.
- DTCG stays the authored format so non-web platforms can still read it.
- Migration from eds-core (class names, component APIs) is a documented
  concern of this repo.
