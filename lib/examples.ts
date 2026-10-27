import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";

const dir = path.join(process.cwd(), "registry/default/examples");
const blocksIndex = path.join(process.cwd(), "registry/default/blocks/index.json");

export type Block = { name: string; title: string; description: string; categories: string[] };

/** Blocks mirrored from shadcn by scripts/sync-blocks.ts. */
export const blocks = (): Block[] =>
  existsSync(blocksIndex) ? JSON.parse(readFileSync(blocksIndex, "utf8")) : [];

export const exampleNames = () => [
  ...readdirSync(dir)
    .filter((f) => f.endsWith(".tsx"))
    .map((f) => f.replace(/\.tsx$/, "")),
  ...blocks().map((b) => b.name),
];

export async function loadExample(name: string) {
  if (!/^[a-z0-9-]+$/.test(name)) return null;
  if (existsSync(path.join(dir, `${name}.tsx`))) {
    const mod: { default: ComponentType } = await import(`@/registry/default/examples/${name}.tsx`);
    return mod.default;
  }
  if (blocks().some((b) => b.name === name)) {
    const mod: { default: ComponentType } = await import(
      `@/registry/default/blocks/${name}/page.tsx`
    );
    return mod.default;
  }
  return null;
}
