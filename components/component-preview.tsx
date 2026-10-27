import { readFileSync } from "node:fs";
import path from "node:path";
import { Suspense } from "react";
import { CodeBlock } from "@/components/code-block";
import { IframePreview } from "@/components/iframe-preview";
import { loadExample } from "@/lib/examples";
import { toConsumerSource } from "@/lib/registry";
import { cn } from "@/registry/default/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/default/ui/tabs";

export async function ComponentPreview({
  name,
  className,
  iframe = false,
}: {
  name: string;
  className?: string;
  /** Render in an iframe, for examples with fixed/full-page layout. */
  iframe?: boolean;
}) {
  const Example = await loadExample(name);
  if (!Example) throw new Error(`ComponentPreview: no example "${name}"`);
  const source = readFileSync(
    path.join(process.cwd(), "registry/default/examples", `${name}.tsx`),
    "utf8",
  );
  return (
    <Tabs defaultValue="preview" className="not-prose my-6 gap-3">
      <TabsList variant="line">
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">
        {iframe ? (
          <IframePreview name={name} />
        ) : (
          <div
            className={cn(
              "flex min-h-72 items-center justify-center rounded-xl border border-eds-tertiary bg-eds-canvas p-10",
              className,
            )}
          >
            <Suspense>
              <Example />
            </Suspense>
          </div>
        )}
      </TabsContent>
      <TabsContent value="code">
        <CodeBlock code={toConsumerSource(source)} />
      </TabsContent>
    </Tabs>
  );
}
