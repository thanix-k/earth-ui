import Link from "next/link";
import { Suspense } from "react";
import { ShadcnCommand } from "@/components/installation";
import { loadExample } from "@/lib/examples";
import { site } from "@/lib/site";
import { Button } from "@/registry/default/ui/button";

// Live examples from the registry, so the showcase never drifts from the code.
const SHOWCASE = ["button-demo", "input-with-label", "checkbox-demo", "button-with-icon"];

export default async function HomePage() {
  const examples = await Promise.all(
    SHOWCASE.map(async (name) => ({ name, Example: await loadExample(name) })),
  );
  return (
    <div className="container-wrapper flex flex-col gap-16 py-16 lg:py-24">
      <section className="flex max-w-2xl flex-col gap-4">
        <p className="text-body-14 font-medium text-eds-secondary">Earth Design System</p>
        <h1 className="text-heading-32 text-eds-primary">{site.description}</h1>
        <p className="text-body-16 text-eds-secondary">
          Every shadcn component, styled with Earth's setmore-black tokens. Install with the shadcn
          CLI and own the code.
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          <Button size="lg" nativeButton={false} render={<Link href="/docs/get-started" />}>
            Get started
          </Button>
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            render={<Link href="/docs/components/button" />}
          >
            Browse components
          </Button>
        </div>
        <ShadcnCommand args="init {base}" />
      </section>
      <section className="grid gap-4 sm:grid-cols-2">
        {examples.map(({ name, Example }) =>
          Example ? (
            <div
              key={name}
              className="flex min-h-56 items-center justify-center rounded-2xl border border-eds-tertiary bg-eds-canvas p-8"
            >
              <Suspense>
                <Example />
              </Suspense>
            </div>
          ) : null,
        )}
      </section>
    </div>
  );
}
