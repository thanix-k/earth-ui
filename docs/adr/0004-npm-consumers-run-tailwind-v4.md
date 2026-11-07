# npm Consumers must run Tailwind v4

The npm package ships compiled JS plus `tailwind.css` (Theme tokens and an `@source` line pointing at our dist), not precompiled CSS. This keeps npm and registry mode set up the same way, makes `className` overrides and copied Example code work, and avoids clashing resets with a Consumer's own Tailwind.

## Considered Options

- Precompiled CSS: works without Tailwind, but utility overrides break and it can collide with the Consumer's Tailwind.
- Both entries: twice the surface to test.
