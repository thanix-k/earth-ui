// Turns the DTCG token files in tokens/ into the CSS that the @earth/base
// registry item installs. See docs/adr/0001 for the naming scheme.
import { readFileSync } from "node:fs";
import { z } from "zod";

type Mode = "light" | "dark";
const dtcg = z.record(z.string(), z.unknown());
type Dtcg = z.infer<typeof dtcg>;
const shadow = z.array(
  z.object({
    offsetX: z.string(),
    offsetY: z.string(),
    blur: z.string(),
    spread: z.string(),
    color: z.string(),
    inset: z.boolean(),
  }),
);
const textStyle = z.object({
  fontSize: z.string(),
  fontWeight: z.number(),
  lineHeight: z.string(),
  letterSpacing: z.string(),
});
const curve = z.array(z.number());

/** A token group, read from a parsed DTCG file. */
const group = (node: unknown): Dtcg => dtcg.parse(node);

const read = (file: string) =>
  group(JSON.parse(readFileSync(new URL(`../tokens/${file}`, import.meta.url), "utf8")));

const brand = read("setmore-black.json");
const global = read("global.json");
const typography = group(brand.typography);

/** Flattens a DTCG group into `{ "a-b-c": $value }`, skipping `$` metadata. */
function flatten(tokens: unknown, prefix = ""): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, node] of Object.entries(group(tokens))) {
    if (key.startsWith("$")) continue;
    const name = prefix ? `${prefix}-${key}` : key;
    if (node && typeof node === "object" && "$value" in node) {
      out[name] = node.$value;
    } else {
      Object.assign(out, flatten(node, name));
    }
  }
  return out;
}

const shadowCss = (layers: z.infer<typeof shadow>) =>
  layers
    .map((s) =>
      [s.inset && "inset", s.offsetX, s.offsetY, s.blur, s.spread, s.color]
        .filter(Boolean)
        .join(" "),
    )
    .join(", ");

const color = (mode: Mode) => group(group(brand.color)[mode]);

// Logos and brand symbols are not part of the registry.
const EXCLUDED_CATEGORIES = new Set(["symbol"]);

/** Every EDS colour + shadow token for one mode, as `--eds-<category>-<key>`. */
function edsVars(mode: Mode) {
  const vars: Record<string, string> = {};
  for (const [category, tokens] of Object.entries(color(mode))) {
    if (category.startsWith("$") || EXCLUDED_CATEGORIES.has(category)) continue;
    for (const [key, value] of Object.entries(flatten(tokens))) {
      vars[`--eds-${category}-${key}`] =
        category === "shadow" ? shadowCss(shadow.parse(value)) : String(value);
    }
  }
  return vars;
}

/**
 * Which Tailwind theme namespaces each EDS category feeds. Property-scoped
 * namespaces keep `text-eds-primary` and `bg-eds-accent` from meaning
 * anything outside their property (Tailwind resolves `--background-color-*`
 * before `--color-*` for `bg-*`, and so on).
 */
const NAMESPACES: Record<string, (key: string) => string[]> = {
  background: (k) => [`--background-color-eds-${k}`],
  text: (k) => [`--text-color-eds-${k}`],
  icon: (k) => [`--text-color-eds-icon-${k}`],
  border: (k) => [`--border-color-eds-${k}`, `--ring-color-eds-${k}`],
  shadow: (k) => [`--shadow-eds-${k}`],
};
const anyProperty = (category: string) => (k: string) => [`--color-eds-${category}-${k}`];

function themeVars() {
  const theme: Record<string, string> = {};
  for (const name of Object.keys(edsVars("light"))) {
    const [, category = "", ...rest] = name.slice(2).split("-");
    const key = rest.join("-");
    for (const themeKey of (NAMESPACES[category] ?? anyProperty(category))(key)) {
      theme[themeKey] = `var(${name})`;
    }
  }

  for (const kind of ["heading", "body"] as const) {
    for (const [size, style] of Object.entries(flatten(typography[kind]))) {
      const s = textStyle.parse(style);
      const base = `--text-${kind}-${size}`;
      theme[base] = s.fontSize;
      theme[`${base}--line-height`] = s.lineHeight;
      theme[`${base}--letter-spacing`] = s.letterSpacing;
      theme[`${base}--font-weight`] = String(s.fontWeight);
    }
  }
  for (const [name, weight] of Object.entries(flatten(typography.fontWeight))) {
    theme[`--font-weight-eds-${name}`] = String(weight);
  }

  // EDS radius scale (4/6/8/12/16) on shadcn's names. Spacing, sizing,
  // breakpoints and durations already match Tailwind's defaults.
  const radius = flatten(global.radius);
  Object.assign(theme, {
    "--radius-sm": radius["4px"],
    "--radius-md": radius["6px"],
    "--radius-lg": radius["8px"],
    "--radius-xl": radius["12px"],
    "--radius-2xl": radius["16px"],
  });

  for (const [name, points] of Object.entries(flatten(group(global.animation).easing))) {
    theme[`--ease-eds-${name}`] = `cubic-bezier(${curve.parse(points).join(", ")})`;
  }
  // App motion timings: `duration-eds-press`, `-popover`, `-panel` and the faster exits.
  for (const [name, ms] of Object.entries(flatten(group(global.animation).motion))) {
    theme[`--transition-duration-eds-${name}`] = String(ms);
  }

  // Compact 12/16 step. Set explicitly: badges and counters rely on the 16px line,
  // whereas `text-body-12` has a 20px line.
  theme["--text-xs"] = "0.75rem";
  theme["--text-xs--line-height"] = "1rem";
  return theme;
}

/**
 * Dark values for shadcn aliases that must differ from the EDS token they point
 * at, so the EDS tokens themselves stay as designed. Owner's contrast raises:
 * muted text 6.66:1 on the dark canvas (#949494 gave 5.74:1; 4.5:1 is needed on
 * fields in popovers), input border 3.31:1 (#3d3d3d gave 1.60:1; 3:1 is needed).
 */
const DARK_ALIAS_OVERRIDES: Record<string, string> = {
  "muted-foreground": "#a0a0a0",
  input: "#6c6c6c",
};

/** shadcn variable → EDS token path (`<category>.<key>`). ADR-0001. */
const SHADCN_ALIASES: Record<string, string> = {
  background: "background.canvas",
  foreground: "text.primary",
  card: "background.canvas",
  "card-foreground": "text.primary",
  popover: "background.menu",
  "popover-foreground": "text.primary",
  primary: "background.accent",
  "primary-foreground": "text.onPrimary",
  secondary: "background.neutral-secondary",
  "secondary-foreground": "text.primary",
  muted: "background.neutral-secondary",
  "muted-foreground": "text.secondary",
  accent: "background.neutral-hover",
  "accent-foreground": "text.primary",
  destructive: "background.critical",
  border: "border.secondary",
  input: "border.input",
  ring: "border.focus",
  "chart-1": "chart.accent-800",
  "chart-2": "chart.accent-600",
  "chart-3": "chart.accent-500",
  "chart-4": "chart.accent-400",
  "chart-5": "chart.accent-300",
  sidebar: "background.canvas-secondary",
  "sidebar-foreground": "text.primary",
  "sidebar-primary": "background.accent",
  "sidebar-primary-foreground": "text.onPrimary",
  "sidebar-accent": "background.neutral-hover",
  "sidebar-accent-foreground": "text.primary",
  "sidebar-border": "border.secondary",
  "sidebar-ring": "border.focus",
};

/**
 * Aliases are resolved to literal colours rather than `var(--eds-…)`:
 * `shadcn add` only maps a cssVar to `--color-*` when its value looks like a
 * colour, so a `var()` alias would silently produce no `bg-primary`.
 */
function shadcnVars(mode: Mode) {
  const eds = edsVars(mode);
  return Object.fromEntries(
    Object.entries(SHADCN_ALIASES).map(([name, path]) => {
      const override = mode === "dark" ? DARK_ALIAS_OVERRIDES[name] : undefined;
      if (override) return [name, override];
      const value = eds[`--eds-${path.replace(".", "-")}`];
      if (!value) throw new Error(`Alias ${name} → ${path}: no such token`);
      return [name, value];
    }),
  );
}

/** Theme keys tailwind-merge must know about (see registry/default/lib/utils.ts). */
export function mergeKeys() {
  const sizes = (kind: string) => Object.keys(flatten(typography[kind])).map((s) => `${kind}-${s}`);
  const named = (tokens: unknown) => Object.keys(flatten(tokens)).map((k) => `eds-${k}`);
  return {
    text: [...sizes("body"), ...sizes("heading")],
    shadow: named(color("light").shadow),
    fontWeight: named(typography.fontWeight),
    ease: named(group(global.animation).easing),
  };
}

/**
 * `color-scheme` makes native controls (date inputs, selects, scrollbars) follow
 * the mode. `--shadow-10` … `--shadow-40` are the raw elevation values, for CSS
 * that cannot use a `shadow-eds-*` class (FullCalendar, inline styles). Literals,
 * not `var(--eds-shadow-N)`, so they stay right under a nested `.dark`.
 */
function rawVars(mode: Mode) {
  const eds = edsVars(mode);
  const vars: Record<string, string> = { "color-scheme": mode };
  for (const n of [10, 20, 30, 40]) {
    const value = eds[`--eds-shadow-${n}`];
    if (!value) throw new Error(`No --eds-shadow-${n} token for ${mode}`);
    vars[`--shadow-${n}`] = value;
  }
  return vars;
}

const unprefixed = (vars: Record<string, string>) =>
  Object.fromEntries(Object.entries(vars).map(([k, v]) => [k.slice(2), v]));

/**
 * The @earth/base registry item's style fields, shaped for how `shadcn add`
 * applies them: `cssVars.theme` is written verbatim into `@theme inline` (the
 * `css` field cannot hold bare declarations inside an at-rule), and the raw EDS
 * variables go through `css` so shadcn does not mint a `--color-*` for each.
 */
export function baseStyle() {
  return {
    fontFamily: `'Inter Variable', ${flatten(typography.fontFamily).fallback}`,
    cssVars: {
      theme: unprefixed(themeVars()),
      light: shadcnVars("light"),
      dark: shadcnVars("dark"),
    },
    css: {
      '@import "tw-animate-css"': {},
      // shadcn's Base UI styles rely on its variants (data-horizontal, …).
      '@import "shadcn/tailwind.css"': {},
      ":root": { ...edsVars("light"), ...rawVars("light") },
      ".dark": { ...edsVars("dark"), ...rawVars("dark") },
      "@utility focus-ring": {
        // EDS focus ring: 1px gap in the canvas colour, then a 2px ring.
        // outline-hidden keeps a visible outline in forced-colors mode.
        "@apply outline-hidden ring-2 ring-ring ring-offset-1 ring-offset-background": {},
      },
      "@layer base": {
        "*": { "@apply border-border outline-ring": {} },
        body: { "@apply bg-background text-foreground font-sans": {} },
      },
    },
  };
}
