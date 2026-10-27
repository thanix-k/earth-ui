// Turns the DTCG token files in tokens/ into the CSS that the @earth/base
// registry item installs. See docs/adr/0001 for the naming scheme.
import { readFileSync } from "node:fs";

type Mode = "light" | "dark";
type Dtcg = { [key: string]: Dtcg | unknown };
type Shadow = {
  offsetX: string;
  offsetY: string;
  blur: string;
  spread: string;
  color: string;
  inset: boolean;
};
type TextStyle = {
  fontSize: string;
  fontWeight: number;
  lineHeight: string;
  letterSpacing: string;
};

const read = (file: string) =>
  JSON.parse(readFileSync(new URL(`../tokens/${file}`, import.meta.url), "utf8")) as Dtcg;

const brand = read("setmore-black.json");
const global = read("global.json");
const typography = brand.typography as Dtcg;

/** Flattens a DTCG group into `{ "a-b-c": $value }`, skipping `$` metadata. */
function flatten(group: Dtcg, prefix = ""): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, node] of Object.entries(group)) {
    if (key.startsWith("$")) continue;
    const name = prefix ? `${prefix}-${key}` : key;
    if (node && typeof node === "object" && "$value" in node) {
      out[name] = (node as { $value: unknown }).$value;
    } else {
      Object.assign(out, flatten(node as Dtcg, name));
    }
  }
  return out;
}

const shadowCss = (layers: Shadow[]) =>
  layers
    .map((s) =>
      [s.inset && "inset", s.offsetX, s.offsetY, s.blur, s.spread, s.color]
        .filter(Boolean)
        .join(" "),
    )
    .join(", ");

const color = (mode: Mode) => (brand.color as Dtcg)[mode] as Dtcg;

// Logos and brand symbols are not part of the registry.
const EXCLUDED_CATEGORIES = new Set(["symbol"]);

/** Every EDS colour + shadow token for one mode, as `--eds-<category>-<key>`. */
function edsVars(mode: Mode) {
  const vars: Record<string, string> = {};
  for (const [category, group] of Object.entries(color(mode))) {
    if (category.startsWith("$") || EXCLUDED_CATEGORIES.has(category)) continue;
    for (const [key, value] of Object.entries(flatten(group as Dtcg))) {
      vars[`--eds-${category}-${key}`] =
        category === "shadow" ? shadowCss(value as Shadow[]) : String(value);
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
    const [, category, ...rest] = name.slice(2).split("-");
    const key = rest.join("-");
    for (const themeKey of (NAMESPACES[category] ?? anyProperty(category))(key)) {
      theme[themeKey] = `var(${name})`;
    }
  }

  for (const kind of ["heading", "body"] as const) {
    for (const [size, style] of Object.entries(flatten(typography[kind] as Dtcg))) {
      const s = style as TextStyle;
      const base = `--text-${kind}-${size}`;
      theme[base] = s.fontSize;
      theme[`${base}--line-height`] = s.lineHeight;
      theme[`${base}--letter-spacing`] = s.letterSpacing;
      theme[`${base}--font-weight`] = String(s.fontWeight);
    }
  }
  for (const [name, weight] of Object.entries(flatten(typography.fontWeight as Dtcg))) {
    theme[`--font-weight-eds-${name}`] = String(weight);
  }

  // EDS radius scale (4/6/8/12/16) on shadcn's names. Spacing, sizing,
  // breakpoints and durations already match Tailwind's defaults.
  const radius = flatten(global.radius as Dtcg);
  Object.assign(theme, {
    "--radius-sm": radius["4px"],
    "--radius-md": radius["6px"],
    "--radius-lg": radius["8px"],
    "--radius-xl": radius["12px"],
    "--radius-2xl": radius["16px"],
  });
  // Brand's button corner, a key of the global radius scale.
  const buttonRadius = (brand.config as Dtcg).buttonRadius as { $value: string };
  theme["--radius-button"] =
    buttonRadius.$value === "full" ? "calc(infinity * 1px)" : String(radius[buttonRadius.$value]);

  for (const [name, curve] of Object.entries(flatten((global.animation as Dtcg).easing as Dtcg))) {
    theme[`--ease-eds-${name}`] = `cubic-bezier(${(curve as number[]).join(", ")})`;
  }
  return theme;
}

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
      const value = eds[`--eds-${path.replace(".", "-")}`];
      if (!value) throw new Error(`Alias ${name} → ${path}: no such token`);
      return [name, value];
    }),
  );
}

/** Theme keys tailwind-merge must know about (see registry/default/lib/utils.ts). */
export function mergeKeys() {
  const sizes = (kind: string) =>
    Object.keys(flatten(typography[kind] as Dtcg)).map((s) => `${kind}-${s}`);
  const named = (group: Dtcg) => Object.keys(flatten(group)).map((k) => `eds-${k}`);
  return {
    text: [...sizes("body"), ...sizes("heading")],
    shadow: named(color("light").shadow as Dtcg),
    fontWeight: named(typography.fontWeight as Dtcg),
    ease: named((global.animation as Dtcg).easing as Dtcg),
    radius: ["button"],
  };
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
    fontFamily: `'Inter Variable', ${flatten(typography.fontFamily as Dtcg).fallback}`,
    cssVars: {
      theme: unprefixed(themeVars()),
      light: shadcnVars("light"),
      dark: shadcnVars("dark"),
    },
    css: {
      '@import "tw-animate-css"': {},
      // shadcn's Base UI styles rely on its variants (data-horizontal, …).
      '@import "shadcn/tailwind.css"': {},
      ":root": edsVars("light"),
      ".dark": edsVars("dark"),
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
