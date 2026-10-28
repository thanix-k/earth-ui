// Mirrors shadcn's Base UI blocks into registry/default/blocks/, rewired to
// Earth's components. Run by hand or by .github/workflows/sync-blocks.yml.
// Everything it writes is generated: re-run instead of editing. ADR-0005.
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import ts from "typescript";
import { z } from "zod";
import { CONTENT, DATA } from "./blocks-content.ts";

const UPSTREAM = "https://ui.shadcn.com/r/styles/base-nova";
// shadcn's own /create showcase pages, not blocks for apps.
const SKIP = /^preview/;

const root = path.resolve(import.meta.dirname, "..");
const rel = (...p: string[]) => path.join(root, ...p);
const OUT = "registry/default/blocks";

const upstreamIndex = z.object({
  items: z.array(z.object({ name: z.string(), type: z.string() })),
});
const upstreamItem = z.object({
  name: z.string(),
  type: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  categories: z.array(z.string()).optional(),
  files: z.array(
    z.object({
      path: z.string(),
      type: z.string(),
      target: z.string().optional(),
      content: z.string(),
    }),
  ),
});

async function get<T>(url: string, schema: z.ZodType<T>): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url}: ${res.status}`);
  return schema.parse(await res.json());
}

/** `<IconPlaceholder lucide="BotIcon" tabler=… />` → `<BotIcon />` (Earth ships lucide only). */
function lucideIcons(file: string, source: string) {
  const sf = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const edits: { start: number; end: number; text: string }[] = [];
  const icons = new Set<string>();
  const visit = (node: ts.Node) => {
    if (ts.isJsxSelfClosingElement(node) && node.tagName.getText() === "IconPlaceholder") {
      const attrs = node.attributes.properties;
      const lucide = attrs.find((a) => ts.isJsxAttribute(a) && a.name.getText() === "lucide");
      const icon =
        lucide && ts.isJsxAttribute(lucide) && lucide.initializer?.getText().slice(1, -1);
      if (!icon) throw new Error(`${file}: IconPlaceholder without a lucide icon`);
      icons.add(icon);
      const rest = attrs.filter(
        (a) =>
          !ts.isJsxAttribute(a) ||
          !["lucide", "tabler", "hugeicons", "phosphor", "remixicon"].includes(a.name.getText()),
      );
      edits.push({
        start: node.getStart(),
        end: node.getEnd(),
        text: `<${[icon, ...rest.map((a) => a.getText())].join(" ")} />`,
      });
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  let out = source;
  for (const { start, end, text } of edits.reverse()) {
    out = out.slice(0, start) + text + out.slice(end);
  }
  out = out.replace(
    /import \{ IconPlaceholder \} from "@\/app\/\(create\)\/components\/icon-placeholder"\n/,
    icons.size ? `import { ${[...icons].sort().join(", ")} } from "lucide-react"\n` : "",
  );
  if (out.includes("IconPlaceholder")) throw new Error(`${file}: unhandled IconPlaceholder`);
  return out;
}

const used = new Set<string>();
const norm = (s: string) => s.replace(/\s+/g, " ").trim();
const content = new Map(Object.entries(CONTENT).map(([k, v]) => [norm(k), { key: k, value: v }]));

/** Same for JSON data files, matched per field: `{ type: "Narrative" }`. */
const earthData = (json: string) =>
  JSON.stringify(
    JSON.parse(json, (field, v) => {
      const value = typeof v === "string" ? DATA[field]?.[v] : undefined;
      if (value === undefined) return v;
      used.add(`${field}: ${v}`);
      return value;
    }),
    null,
    2,
  );

/** Swaps shadcn's sample copy for Earth's (scripts/blocks-content.ts). */
function earthContent(file: string, source: string) {
  const sf = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const edits: { start: number; end: number; text: string }[] = [];
  const visit = (node: ts.Node) => {
    const text = ts.isJsxText(node)
      ? node.getText()
      : (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) &&
          !ts.isImportDeclaration(node.parent)
        ? node.text
        : undefined;
    const hit = text && content.get(norm(text));
    if (hit) {
      used.add(hit.key);
      const raw = node.getText();
      edits.push({
        start: node.getStart(),
        end: node.getEnd(),
        // JSX text keeps its surrounding whitespace; literals are re-quoted.
        text: ts.isJsxText(node) ? raw.replace(raw.trim(), hit.value) : JSON.stringify(hit.value),
      });
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  let out = source;
  for (const { start, end, text } of edits.reverse()) {
    out = out.slice(0, start) + text + out.slice(end);
  }
  return out;
}

// Upstream bugs, fixed here until shadcn fixes them. A patch that no longer
// applies fails the sync, so delete it then.
const PATCHES: { file: string; find: string; replace: string; why: string }[] = [
  {
    file: "registry/base-nova/blocks/dashboard-01/components/chart-area-interactive.tsx",
    find: "return new Date(value)",
    replace: "return new Date(String(value))",
    why: "recharts 3 types labelFormatter's value as ReactNode",
  },
  ...["sidebar-01", "sidebar-02"].map((block) => ({
    file: `registry/base-nova/blocks/${block}/components/app-sidebar.tsx`,
    find: "defaultVersion={data.versions[0]}",
    replace: 'defaultVersion={data.versions[0] ?? ""}',
    why: "noUncheckedIndexedAccess types the first version as possibly undefined",
  })),
  {
    file: "registry/base-nova/blocks/sidebar-10/components/nav-actions.tsx",
    find: `{data.map((group, index) => (
                <SidebarGroup key={index}`,
    replace: `{data.map((group) => (
                <SidebarGroup key={group[0]?.label}`,
    why: "noArrayIndexKey: a group's first label is unique",
  },
  {
    file: "registry/base-nova/blocks/sidebar-10/components/nav-actions.tsx",
    find: `{group.map((item, index) => (
                        <SidebarMenuItem key={index}>`,
    replace: `{group.map((item) => (
                        <SidebarMenuItem key={item.label}>`,
    why: "noArrayIndexKey: labels are unique",
  },
  {
    file: "registry/base-nova/blocks/sidebar-11/components/app-sidebar.tsx",
    find: `{data.changes.map((item, index) => (
                <SidebarMenuItem key={index}>`,
    replace: `{data.changes.map((item) => (
                <SidebarMenuItem key={item.file}>`,
    why: "noArrayIndexKey: file paths are unique",
  },
  {
    file: "registry/base-nova/blocks/sidebar-11/components/app-sidebar.tsx",
    find: `{data.tree.map((item, index) => (
                <Tree key={index} item={item} />`,
    replace: `{data.tree.map((item) => (
                <Tree key={String(item)} item={item} />`,
    why: "noArrayIndexKey: sibling paths are unique",
  },
  {
    file: "registry/base-nova/blocks/sidebar-11/components/app-sidebar.tsx",
    find: `{items.map((subItem, index) => (
              <Tree key={index} item={subItem} />`,
    replace: `{items.map((subItem) => (
              <Tree key={String(subItem)} item={subItem} />`,
    why: "noArrayIndexKey: sibling paths are unique",
  },
];

/**
 * Upstream patterns that fail the lint rules consumers run (Biome's
 * recommended set), rewritten without changing behaviour.
 */
const lintClean = (source: string) =>
  source
    // `#top` scrolls to the top of the page exactly as `#` does (HTML spec).
    .replaceAll('href="#"', 'href="#top"')
    // Brand logos sit beside their visible or sr-only label.
    .replace(/<svg(?![^>]*aria-hidden)/g, '<svg aria-hidden="true"')
    .replaceAll('alt="Image"', 'alt=""')
    // SidebarProvider's `style` accepts custom properties.
    .replace(/\s+as React\.CSSProperties/g, "")
    // Placeholder tiles keyed by an id rather than the array index.
    .replace(
      /Array\.from\(\{\s*length:\s*(\d+),?\s*\}\)\.map\(\(_, (\w+)\) => \(\s*<div\s+key=\{\2\}/g,
      (_, length, index) =>
        `Array.from({ length: ${length} }, (_, ${index}) => \`placeholder-\${${index}}\`).map((id) => (<div key={id}`,
    );

function rewrite(file: string, source: string) {
  let out = lucideIcons(file, earthContent(file, source))
    .replaceAll("@/registry/base-nova/", "@/registry/default/")
    .replaceAll('from "cn"', 'from "@/registry/default/lib/utils"');
  for (const p of PATCHES.filter((p) => p.file === file)) {
    if (!out.includes(p.find)) throw new Error(`${file}: patch no longer applies (${p.why})`);
    out = out.replace(p.find, p.replace);
  }
  return lintClean(out);
}

/** Earth items a file imports that Earth doesn't ship. */
function missing(source: string) {
  const specs = [...source.matchAll(/from "(@\/[^"]+)"/g)].flatMap((m) => m[1] ?? []);
  return specs.filter((spec) => {
    if (spec.startsWith("@/registry/default/blocks/")) return false;
    if (!/^@\/registry\/default\/(ui|hooks|lib)\//.test(spec)) return true;
    const base = rel(spec.slice(2));
    return !existsSync(`${base}.tsx`) && !existsSync(`${base}.ts`);
  });
}

const index = await get(`${UPSTREAM}/registry.json`, upstreamIndex);
const names = index.items
  .filter((i) => i.type === "registry:block" && !SKIP.test(i.name))
  .map((i) => i.name);

rmSync(rel(OUT), { recursive: true, force: true });
const manifest = [];
const skipped: string[] = [];
for (const name of names) {
  const item = await get(`${UPSTREAM}/${name}.json`, upstreamItem);
  const files = item.files.map((f) => ({
    ...f,
    path: f.path.replace("registry/base-nova/", "registry/default/"),
    content: f.path.endsWith(".json") ? earthData(f.content) : rewrite(f.path, f.content),
  }));
  const gaps = [...new Set(files.flatMap((f) => missing(f.content)))];
  if (gaps.length) {
    skipped.push(`${name}: needs ${gaps.join(", ")}`);
    continue;
  }
  for (const f of files) {
    mkdirSync(path.dirname(rel(f.path)), { recursive: true });
    writeFileSync(rel(f.path), f.content);
  }
  manifest.push({
    name,
    title: item.title,
    description: item.description,
    categories: item.categories,
    files: files.map(({ path, type, target }) => ({ path, type, ...(target && { target }) })),
  });
}
writeFileSync(rel(OUT, "index.json"), `${JSON.stringify(manifest, null, 2)}\n`);
execFileSync(rel("node_modules/.bin/biome"), ["check", "--write", OUT], { stdio: "inherit" });

console.log(`✓ ${manifest.length} blocks from ${UPSTREAM}`);
if (skipped.length)
  console.log(`Skipped (Earth lacks what they import):\n  ${skipped.join("\n  ")}`);
const unused = [
  ...Object.keys(CONTENT).filter((k) => !used.has(k)),
  ...Object.entries(DATA)
    .flatMap(([field, map]) => Object.keys(map).map((v) => `${field}: ${v}`))
    .filter((k) => !used.has(k)),
];
if (unused.length)
  console.log(`Unused in blocks-content.ts (upstream copy changed):\n  ${unused.join("\n  ")}`);
