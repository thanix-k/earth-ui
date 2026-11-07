# One source, two Install modes

Consumers can either own the code (shadcn registry, `shadcn add @earthui/button`) or depend on it (npm, `eds-ui/button`). Both are built from the single `packages/ui` source, never two copies, so they cannot drift. The docs have a global npm / registry toggle that rewrites only the install command and import paths of the same Example source.
