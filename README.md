# Earth UI

The Earth Design System as a [shadcn](https://ui.shadcn.com) registry: every
shadcn Base UI component, styled with Earth's setmore-black tokens.

```bash
npx shadcn@latest init https://earthui.vercel.app/r/base.json
npx shadcn@latest add @earth/button
```

Docs: https://earthui.vercel.app

## Development

```bash
pnpm install
pnpm dev          # builds the registry, then serves docs on :4000
pnpm check        # what CI runs
```

- `tokens/`: DTCG design tokens. This is the source of truth for colour, type,
  radius and shadow.
- `registry/default/`: components, examples and lib. These files are hand-written.
- `content/docs/`: docs pages (Fumadocs MDX).
- `scripts/build-registry.ts`: generates everything else, namely `registry.json`,
  `public/r/*`, `app/earth.css` and `registry/default/lib/utils.ts`.

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to add a component,
[CONTEXT.md](CONTEXT.md) for vocabulary and [docs/adr](docs/adr) for decisions.

## License

MIT
