# Earth UI

AnywhereWorks' design system: [shadcn/ui](https://ui.shadcn.com) with one Preset, shipped as the npm package `earthui` and as the `@earthui` shadcn registry (the registry namespace is separate from npm, so no npm org is needed). See [CONTEXT.md](CONTEXT.md) for vocabulary and [docs/adr](docs/adr) for decisions.

| Path | What |
| --- | --- |
| `packages/ui` | Generated Components, hooks, lib, Examples, `registry.json`. Never edit by hand. |
| `apps/docs` | Fumadocs site. Serves the registry at `/r/{name}.json` and `llms.txt`. |
| `scripts/sync-shadcn.mjs` | Upstream sync. Holds the Preset. |

```bash
pnpm install
pnpm dev            # docs at localhost:3000
pnpm build          # npm package + docs + registry
pnpm sync:shadcn    # regenerate from shadcn (CI runs this weekly)
```

Releases: run the **Release** workflow and pick patch, minor or major. Needs the `NPM_TOKEN` secret.
