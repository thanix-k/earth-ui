# Components are generated with the Preset only and never edited

To keep maintenance near zero we rely entirely on shadcn: every Component is whatever `shadcn add --all --overwrite` produces under preset `bIkeymG` (`--template vite --rtl --pointer`). The DS team may change the Preset and Theme only (CODEOWNERS). The Upstream sync overwrites any hand edit to a Component, and CI fails if Components differ from a fresh generation. Fixes go upstream to shadcn.

## Consequences

- No custom variants or components in this package. If a real need appears, it goes in a separate package, never in Components.
