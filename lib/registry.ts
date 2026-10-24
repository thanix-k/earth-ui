import { readFileSync } from "node:fs";
import path from "node:path";

type RegistryItem = {
  name: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: { path: string; content: string }[];
};

/** A built item from public/r — the exact JSON `shadcn add` downloads. */
export function getRegistryItem(name: string): RegistryItem {
  return JSON.parse(readFileSync(path.join(process.cwd(), "public/r", `${name}.json`), "utf8"));
}

/** Rewrites registry import paths to what a consumer sees after install. */
export function toConsumerSource(source: string) {
  return source
    .replaceAll("@/registry/default/lib/utils", "@/lib/utils")
    .replace(/@\/registry\/default\/(ui|hooks|lib)\//g, (_, dir) =>
      dir === "ui" ? "@/components/ui/" : `@/${dir}/`,
    );
}

/** registry/default/ui/button.tsx → components/ui/button.tsx */
export const toConsumerPath = (file: string) =>
  file.replace(/^registry\/default\/ui\//, "components/ui/").replace(/^registry\/default\//, "");
