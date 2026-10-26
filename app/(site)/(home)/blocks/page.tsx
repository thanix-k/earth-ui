import type { Metadata } from "next";
import { IframePreview } from "@/components/iframe-preview";
import { PackageManagerTabs, RUNNERS } from "@/components/installation";
import { blocks } from "@/lib/examples";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blocks",
  description: "shadcn's blocks, built on Earth UI components. Install one and own the source.",
};

// The first category is the group: authentication, sidebar, dashboard.
const groups = Object.entries(Object.groupBy(blocks(), (b) => b.categories[0]));

export default function BlocksPage() {
  return (
    <div className="container-wrapper flex flex-col gap-12 py-12">
      <header className="flex max-w-2xl flex-col gap-2">
        <h1 className="text-heading-32 text-eds-primary">Blocks</h1>
        <p className="text-body-16 text-eds-secondary">
          shadcn&apos;s blocks, built on Earth UI components. Kept in sync with shadcn by a weekly
          job.
        </p>
      </header>
      {groups.map(([group, items]) => (
        <section key={group} className="flex flex-col gap-10">
          <h2 className="text-heading-24 text-eds-primary capitalize">{group}</h2>
          {items?.map((block) => (
            <article key={block.name} id={block.name} className="flex scroll-mt-20 flex-col gap-3">
              <div className="flex flex-col gap-0.5">
                <h3 className="text-heading-16 text-eds-primary">{block.title}</h3>
                <p className="text-body-14 text-eds-secondary">{block.description}</p>
              </div>
              <PackageManagerTabs
                command={(pm) => `${RUNNERS[pm]} shadcn@latest add ${site.namespace}/${block.name}`}
              />
              <IframePreview name={block.name} />
            </article>
          ))}
        </section>
      ))}
    </div>
  );
}
