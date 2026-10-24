import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";

const dir = path.join(process.cwd(), "registry/default/examples");

export const exampleNames = () =>
  readdirSync(dir)
    .filter((f) => f.endsWith(".tsx"))
    .map((f) => f.replace(/\.tsx$/, ""));

export async function loadExample(name: string) {
  if (!/^[a-z0-9-]+$/.test(name) || !existsSync(path.join(dir, `${name}.tsx`))) return null;
  const mod = await import(`@/registry/default/examples/${name}.tsx`);
  return mod.default as ComponentType;
}
