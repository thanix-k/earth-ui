# Earth UI

The Earth Design System as a [shadcn](https://ui.shadcn.com) registry: every
shadcn Base UI component, stock, with shadcn's variables set to Earth's
setmore-black values.

```bash
npx shadcn@latest init https://earthui.vercel.app/r/base.json
npx shadcn@latest add @earth-ui/button
```

Docs: https://earthui.vercel.app

## Development

```bash
pnpm install
pnpm dev          # builds the registry, then serves docs on :4000
pnpm check        # what CI runs
```

- `registry.json`: the registry, edited by hand. The `base` item holds Earth's
  colour and radius values.
- `registry/default/`: components, examples and lib. These files are hand-written.
- `content/docs/`: docs pages (Fumadocs MDX).
- `scripts/build-registry.ts`: generates `public/r/*` and `app/earth.css` from
  `registry.json`.

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to add a component,
[CONTEXT.md](CONTEXT.md) for vocabulary and [docs/adr](docs/adr) for decisions.

## License

MIT
