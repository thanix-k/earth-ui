# Earth shadcn registry

A public shadcn registry (`@earth-ui`): stock shadcn on Base UI, with shadcn's
CSS variables set to the Earth Design System's setmore-black values. This repo is the source of truth
(ADR-0002): tokens are authored here as DTCG JSON, seeded once from
`@adaptavant/eds-brands@1.12.0`. eds-core is being sunset and is reference only.

## Language

**EDS token**:
A design token from `eds-brands/tokens/*.json` (DTCG). Not shipped as CSS or
utilities; only read to fill the shadcn aliases (ADR-0006).
_Avoid_: `eds-` classes or variables in registry or app code.

**shadcn alias**:
A stock shadcn CSS variable (`--primary`, `--accent`, `--ring`, …) whose value
is an EDS token's value. Exists so third-party shadcn code renders as Earth.
_Avoid_: assuming shadcn `accent` means EDS `accent` — they differ (ADR-0001).

**Component API**:
Stock shadcn / Base UI props and composition (`variant="outline"`, `size="sm"`).
EDS-only variants are added only where shadcn has no equivalent. eds-core
prop names (`accentPrimary`, `isDisabled`) are not accepted. A migration
guide is out of scope for release 1.
_Avoid_: EDS prop names in component source.

**Release 1**:
Every shadcn Base UI component, stock, on Earth's values. EDS-only components
(chip, tag, select-card, timepicker…) come later.

**Seed**:
The copy of a component from shadcn's Base UI source. Kept stock (ADR-0006).

**Generated output**:
Anything a script writes: `app/earth.css`, `public/r/*`, docs preview index,
install tabs. Never hand-edited. `registry.json` is not generated; it is edited by hand.

**Icons**:
lucide (shadcn's default `iconLibrary`). EDS icons are not shipped.

**Docs (release 1)**:
Information architecture follows coss.com/ui/docs. Overview: Introduction,
Get Started (incl. AI usage: shadcn MCP, v0, Lovable). Components: one page
each (preview, code, install tabs, examples).
No foundations pages, migration guide, particles or chat UI.

**Demo**:
The `/demo` showcase page: components composed into product moments from
Full Creative's consumer products (full.io/tools), one card per moment.
App-local code, not registry items; not customisable. Earth's version of
shadcn's `/create`.
_Avoid_: calling these blocks or templates.

**Block**:
A page-level registry item (`@earth-ui/login-03`, `@earth-ui/sidebar-07`) mirrored
from shadcn's Base UI blocks by `scripts/sync-blocks.ts` and kept current by a
weekly CI job (ADR-0005). Generated, never hand-edited. The one thing in this
repo that is synced by a script; components are copied stock.
_Avoid_: editing block files; calling `/demo` cards blocks.

**Figma library**:
The `EDS playground` Figma file, rebuilt from this repo (ADR-0004). Same
components, parts, props and tokens as the registry; Code Connect on each.
_Avoid_: treating Figma as the source; drawing components the registry lacks.

**Base brand**:
setmore-black. The only brand shipped. No brand switching. Ships both its
light and dark colour schemes (`:root` / `.dark`), both generated.
_Avoid_: theme, brand switcher; reading "no theming" as "no dark mode".
