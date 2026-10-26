// Builds everything derived from tokens/ and registry/default/:
//   registry/default/lib/utils.ts  (cn, taught Earth's theme keys)
//   app/earth.css                   (what @earth/base installs, for the docs app)
//   registry.json → public/r/*      (via `shadcn build`, then validated)
// Nothing it writes is edited by hand. ADR-0003.
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import ts from "typescript";
import { site } from "../lib/site.ts";
import { baseStyle, mergeKeys } from "./tokens.ts";

const root = path.resolve(import.meta.dirname, "..");
const rel = (...p: string[]) => path.join(root, ...p);
const NS = site.namespace;

type CssTree = { [key: string]: string | CssTree };
type Item = {
  name: string;
  type: string;
  title?: string;
  description?: string;
  extends?: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files?: { path: string; type: string }[];
  [key: string]: unknown;
};

// ── Shipped lib: cn ──────────────────────────────────────────────────────────

function writeUtils() {
  const keys = mergeKeys();
  const list = (values: string[]) => JSON.stringify(values);
  writeFileSync(
    rel("registry/default/lib/utils.ts"),
    `import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Earth's theme keys, so cn() keeps \`text-body-14\` next to \`text-eds-secondary\`
// instead of reading both as text colours.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ${list(keys.text)},
      shadow: ${list(keys.shadow)},
      "font-weight": ${list(keys.fontWeight)},
      ease: ${list(keys.ease)},
      radius: ${list(keys.radius)},
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`,
  );
}

// ── Items discovered from the file system ────────────────────────────────────

const KINDS = [
  { dir: "ui", type: "registry:ui" },
  { dir: "lib", type: "registry:lib" },
  { dir: "hooks", type: "registry:hook" },
  { dir: "examples", type: "registry:example" },
] as const;

// Provided by the consumer's app, never installed by an item.
const PEERS = new Set(["react", "react-dom", "next"]);

/** npm + registry dependencies, read from the file's import specifiers. */
function dependenciesOf(file: string) {
  const source = readFileSync(rel(file), "utf8");
  const npm = new Set<string>();
  const registry = new Set<string>();
  for (const { fileName: spec } of ts.preProcessFile(source).importedFiles) {
    // A block's own files, shipped in the same item.
    if (spec.startsWith("@/registry/default/blocks/") || spec.startsWith("./")) {
      if (!file.startsWith("registry/default/blocks/"))
        throw new Error(`${file}: imports "${spec}"`);
    } else if (spec.startsWith("@/registry/default/")) {
      registry.add(`${NS}/${path.basename(spec)}`);
    } else if (spec.startsWith(".") || spec.startsWith("@/")) {
      throw new Error(`${file}: import "${spec}" must go through @/registry/default/…`);
    } else {
      const parts = spec.split("/");
      const pkg = spec.startsWith("@") ? parts.slice(0, 2).join("/") : parts[0];
      if (!PEERS.has(pkg)) npm.add(pkg);
    }
  }
  return { dependencies: [...npm].sort(), registryDependencies: [...registry].sort() };
}

/** title + description from the component's docs page frontmatter. */
function frontmatter(name: string) {
  const page = rel("content/docs/components", `${name}.mdx`);
  if (!existsSync(page)) return {};
  const head = readFileSync(page, "utf8").match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "";
  const field = (key: string) => head.match(new RegExp(`^${key}:\\s*(.+)$`, "m"))?.[1].trim();
  return { title: field("title"), description: field("description") };
}

const titleCase = (name: string) =>
  name.replace(/(^|-)(\w)/g, (_, dash, c) => (dash ? " " : "") + c.toUpperCase());

function discover(): Item[] {
  const items: Item[] = [];
  for (const { dir, type } of KINDS) {
    const folder = rel("registry/default", dir);
    if (!existsSync(folder)) continue;
    for (const file of readdirSync(folder).sort()) {
      if (!/\.tsx?$/.test(file)) continue;
      const name = file.replace(/\.tsx?$/, "");
      const filePath = `registry/default/${dir}/${file}`;
      const meta = type === "registry:ui" ? frontmatter(name) : {};
      if (type === "registry:ui" && !meta.description) {
        throw new Error(`${filePath}: add content/docs/components/${name}.mdx with a description`);
      }
      items.push({
        name,
        type,
        title: meta.title ?? titleCase(name),
        ...(meta.description && { description: meta.description }),
        ...dependenciesOf(filePath),
        files: [{ path: filePath, type }],
      });
    }
  }
  return items;
}

// ── Blocks: mirrored from shadcn by scripts/sync-blocks.ts ───────────────────

function blocks(): Item[] {
  const index = rel("registry/default/blocks/index.json");
  if (!existsSync(index)) return [];
  const manifest: Item[] = JSON.parse(readFileSync(index, "utf8"));
  return manifest.map((block) => {
    const npm = new Set<string>();
    const registry = new Set<string>();
    for (const { path: file } of block.files ?? []) {
      if (!/\.tsx?$/.test(file)) continue;
      const deps = dependenciesOf(file);
      for (const d of deps.dependencies) npm.add(d);
      for (const d of deps.registryDependencies) registry.add(d);
    }
    return {
      ...block,
      type: "registry:block",
      dependencies: [...npm].sort(),
      registryDependencies: [...registry].sort(),
    };
  });
}

// ── Base + font items ────────────────────────────────────────────────────────

function baseItems(): Item[] {
  const style = baseStyle();
  return [
    {
      name: "base",
      type: "registry:base",
      title: "Earth base",
      description:
        "Earth (setmore-black) tokens, shadcn aliases, focus ring and the Inter font. Install first.",
      extends: "none",
      config: {
        style: "earth",
        iconLibrary: "lucide",
        tailwind: { baseColor: "neutral" },
        registries: { [NS]: `${site.url}/r/{name}.json` },
      },
      dependencies: [
        "@base-ui/react",
        "class-variance-authority",
        "lucide-react",
        "shadcn",
        "tw-animate-css",
      ],
      registryDependencies: [`${NS}/utils`, `${NS}/font-inter`],
      cssVars: style.cssVars,
      css: style.css,
    },
    {
      name: "font-inter",
      type: "registry:font",
      title: "Inter",
      description: "Earth's typeface.",
      font: {
        family: style.fontFamily,
        provider: "google",
        import: "Inter",
        variable: "--font-sans",
        subsets: ["latin"],
        dependency: "@fontsource-variable/inter",
      },
    },
  ];
}

// ── Docs CSS: the same CSS a consumer gets from `shadcn init @earth/base` ─────

function toCss(tree: CssTree, indent = ""): string {
  return Object.entries(tree)
    .map(([key, value]) => {
      if (typeof value === "string") return `${indent}${key}: ${value};`;
      if (key.startsWith("@") && Object.keys(value).length === 0) return `${indent}${key};`;
      return `${indent}${key} {\n${toCss(value, `${indent}  `)}\n${indent}}`;
    })
    .join("\n");
}

function writeDocsCss() {
  const { cssVars, css } = baseStyle();
  const vars = (v: Record<string, string>) =>
    Object.fromEntries(Object.entries(v).map(([k, value]) => [`--${k}`, value]));
  const aliases = Object.fromEntries(
    Object.keys(cssVars.light).map((k) => [`--color-${k}`, `var(--${k})`]),
  );
  const tree: CssTree = {
    '@import "tailwindcss"': {},
    "@custom-variant dark (&:is(.dark *))": {},
    ...css,
    ":root": { ...vars(cssVars.light), ...css[":root"] },
    ".dark": { ...vars(cssVars.dark), ...css[".dark"] },
    "@theme inline": {
      "--font-sans": "var(--font-inter)",
      ...vars(cssVars.theme),
      ...aliases,
    },
  };
  writeFileSync(
    rel("app/earth.css"),
    `/* Generated by scripts/build-registry.ts from tokens/. Do not edit. */\n${toCss(tree)}\n`,
  );
}

// ── registry.json + shadcn build ─────────────────────────────────────────────

const bin = (name: string, ...args: string[]) =>
  execFileSync(rel("node_modules/.bin", name), args, { cwd: root, stdio: "inherit" });
const shadcn = (...args: string[]) => bin("shadcn", ...args);

writeUtils();
bin("biome", "format", "--write", "registry/default/lib/utils.ts");
writeDocsCss();

const items = [...baseItems(), ...discover(), ...blocks()];
writeFileSync(
  rel("registry.json"),
  `${JSON.stringify(
    {
      $schema: "https://ui.shadcn.com/schema/registry.json",
      name: "earth",
      homepage: site.url,
      items,
    },
    null,
    2,
  )}\n`,
);

shadcn("build", "registry.json", "--output", "public/r");
shadcn("registry", "validate", "registry.json");
console.log(`✓ ${items.length} items → public/r`);
