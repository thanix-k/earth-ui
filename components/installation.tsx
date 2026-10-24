import { CodeBlock } from "@/components/code-block";
import { getRegistryItem, toConsumerPath, toConsumerSource } from "@/lib/registry";
import { site } from "@/lib/site";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/default/ui/tabs";

const RUNNERS = {
  pnpm: "pnpm dlx",
  npm: "npx",
  yarn: "yarn dlx",
  bun: "bunx --bun",
} as const;

const INSTALLERS = { pnpm: "pnpm add", npm: "npm install", yarn: "yarn add", bun: "bun add" };

export function PackageManagerTabs({ command }: { command: (pm: keyof typeof RUNNERS) => string }) {
  const managers = Object.keys(RUNNERS) as (keyof typeof RUNNERS)[];
  return (
    <Tabs defaultValue="pnpm" className="gap-2">
      <TabsList variant="line">
        {managers.map((pm) => (
          <TabsTrigger key={pm} value={pm}>
            {pm}
          </TabsTrigger>
        ))}
      </TabsList>
      {managers.map((pm) => (
        <TabsContent key={pm} value={pm}>
          <CodeBlock code={command(pm)} lang="bash" />
        </TabsContent>
      ))}
    </Tabs>
  );
}

/** CLI + manual install steps, generated from the built registry item. */
export function Installation({ name }: { name: string }) {
  const item = getRegistryItem(name);
  const deps = item.dependencies ?? [];
  const registryDeps = item.registryDependencies ?? [];
  return (
    <Tabs defaultValue="cli" className="not-prose my-6 gap-3">
      <TabsList>
        <TabsTrigger value="cli">CLI</TabsTrigger>
        <TabsTrigger value="manual">Manual</TabsTrigger>
      </TabsList>
      <TabsContent value="cli">
        <PackageManagerTabs
          command={(pm) => `${RUNNERS[pm]} shadcn@latest add ${site.namespace}/${name}`}
        />
      </TabsContent>
      <TabsContent value="manual">
        <ol className="flex flex-col gap-6 text-body-14 text-eds-primary">
          {deps.length > 0 && (
            <li className="flex flex-col gap-2">
              <p>Install the dependencies:</p>
              <PackageManagerTabs command={(pm) => `${INSTALLERS[pm]} ${deps.join(" ")}`} />
            </li>
          )}
          {registryDeps.length > 0 && (
            <li className="flex flex-col gap-2">
              <p>Add the components it builds on:</p>
              <PackageManagerTabs
                command={(pm) => `${RUNNERS[pm]} shadcn@latest add ${registryDeps.join(" ")}`}
              />
            </li>
          )}
          {item.files.map((file) => (
            <li key={file.path} className="flex flex-col gap-2">
              <p>
                Copy into <code>{toConsumerPath(file.path)}</code>:
              </p>
              <CodeBlock code={toConsumerSource(file.content)} className="max-h-96 overflow-auto" />
            </li>
          ))}
        </ol>
      </TabsContent>
    </Tabs>
  );
}

/** `<ShadcnCommand args="init {base}" />` — `{base}` is this registry's base item URL. */
export function ShadcnCommand({ args }: { args: string }) {
  const resolved = args.replaceAll("{base}", `${site.url}/r/base.json`);
  return (
    <div className="not-prose my-6">
      <PackageManagerTabs command={(pm) => `${RUNNERS[pm]} shadcn@latest ${resolved}`} />
    </div>
  );
}
