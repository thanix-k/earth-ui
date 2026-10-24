# Earth shadcn registry

A public shadcn registry (`@earth`) that re-skins shadcn on Base UI with the
Earth Design System's setmore-black tokens. This repo is the source of truth
(ADR-0002): tokens are authored here as DTCG JSON, seeded once from
`@adaptavant/eds-brands@1.12.0`. eds-core is being sunset and is reference only.

## Language

**EDS token**:
A design token from `eds-brands/tokens/*.json` (DTCG), exposed here under the
`eds-` namespace, property-scoped: `bg-eds-neutral-hover`, `text-eds-secondary`.
_Avoid_: calling these "theme" or "shadcn" tokens.

**shadcn alias**:
A stock shadcn CSS variable (`--primary`, `--accent`, `--ring`, …) whose value
is a reference to an EDS token. Exists so third-party shadcn code renders as Earth.
_Avoid_: assuming shadcn `accent` means EDS `accent` — they differ (ADR-0001).

**Component API**:
Stock shadcn / Base UI props and composition (`variant="outline"`, `size="sm"`).
EDS-only variants are added only where shadcn has no equivalent. eds-core
prop names (`accentPrimary`, `isDisabled`) are not accepted. A migration
guide is out of scope for release 1.
_Avoid_: EDS prop names in component source.

**Release 1**:
Every shadcn Base UI component, re-skinned to Earth. EDS-only components
(chip, tag, select-card, timepicker…) come later.

**Seed**:
The one-time starting copy of a component from shadcn's Base UI source.
After seeding, the file is owned here and never re-synced (ADR-0003).
_Avoid_: upstream, sync.

**Generated output**:
Anything a script writes: token CSS, registry item JSON, `registry.json`,
`public/r/*`, docs preview index, install tabs. Never hand-edited.

**Icons**:
lucide (shadcn's default `iconLibrary`). EDS icons are not shipped.

**Focus ring**:
EDS's ring, not shadcn's 3px translucent ring. Buttons, links and other
controls: 1px gap in the canvas colour plus a 2px `border-focus` ring
(`#111` light). Text inputs: no ring; the border becomes 2px `border-input-active`.

**Docs (release 1)**:
Information architecture follows coss.com/ui/docs. Overview: Introduction,
Get Started (incl. AI usage: shadcn MCP, v0, Lovable). Components: one page
each (preview, code, install tabs, examples).
No foundations pages, migration guide, particles or chat UI.

**Base brand**:
setmore-black. The only brand shipped. No brand switching. Ships both its
light and dark colour schemes (`:root` / `.dark`), both generated.
_Avoid_: theme, brand switcher; reading "no theming" as "no dark mode".
