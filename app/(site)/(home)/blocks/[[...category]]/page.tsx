import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IframePreview } from "@/components/iframe-preview";
import { PackageManagerTabs, RUNNERS } from "@/components/installation";
import { blocks } from "@/lib/examples";
import { site } from "@/lib/site";

// A block's category is its name without the number: sidebar-07 → sidebar.
const categoryOf = (name: string) => name.replace(/-\d+$/, "");
const groups = Object.groupBy(blocks(), (b) => categoryOf(b.name));
// Most blocks first: sidebar, login, signup, dashboard.
const categories = Object.keys(groups).sort(
  (a, b) => (groups[b]?.length ?? 0) - (groups[a]?.length ?? 0),
);
const titleCase = (s: string) => s[0].toUpperCase() + s.slice(1);

type Props = { params: Promise<{ category?: string[] }> };

async function resolve(params: Props["params"]) {
  const [category, ...rest] = (await params).category ?? [];
  if (rest.length || (category && !groups[category])) notFound();
  return category;
}

export const generateStaticParams = () => [
  { category: [] },
  ...categories.map((c) => ({ category: [c] })),
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await resolve(params);
  return {
    title: category ? `${titleCase(category)} blocks` : "Blocks",
    description: "shadcn's blocks, built on Earth UI components. Install one and own the source.",
  };
}

export default async function BlocksPage({ params }: Props) {
  const category = await resolve(params);
  const shown = category ? (groups[category] ?? []) : blocks();
  const tabs = [
    { label: "All", href: "/blocks", count: blocks().length, active: !category },
    ...categories.map((c) => ({
      label: titleCase(c),
      href: `/blocks/${c}`,
      count: groups[c]?.length ?? 0,
      active: c === category,
    })),
  ];

  return (
    <div className="container-wrapper flex flex-col gap-8 py-12">
      <header className="flex max-w-2xl flex-col gap-2">
        <h1 className="text-3xl font-semibold text-foreground">Blocks</h1>
        <p className="text-base text-muted-foreground">
          shadcn&apos;s blocks, built on Earth UI components. Kept in sync with shadcn by a weekly
          job.
        </p>
      </header>
      <nav
        aria-label="Block categories"
        // Same surface as the site header it sticks under.
        className="sticky top-14 z-10 -mx-4 flex gap-1 overflow-x-auto border-b bg-fd-background/80 px-4 py-2 backdrop-blur-sm lg:-mx-8 lg:px-8"
      >
        {tabs.map((tab) => (
          // A full load so each category opens at the top, not at the old scroll position.
          <a
            key={tab.href}
            href={tab.href}
            aria-current={tab.active ? "page" : undefined}
            className="flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors duration-300 ease-[ease] hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 aria-[current=page]:bg-primary aria-[current=page]:text-primary-foreground"
          >
            {tab.label}
            <span className="text-xs opacity-70">{tab.count}</span>
          </a>
        ))}
      </nav>
      <div className="flex flex-col gap-12">
        {shown.map((block) => (
          <article key={block.name} id={block.name} className="flex scroll-mt-32 flex-col gap-3">
            <div className="flex flex-col gap-0.5">
              <h2 className="text-base font-semibold text-foreground">
                <a href={`#${block.name}`} className="hover:underline">
                  {block.title}
                </a>
              </h2>
              <p className="text-sm text-muted-foreground">{block.description}</p>
            </div>
            <PackageManagerTabs
              command={(pm) => `${RUNNERS[pm]} shadcn@latest add ${site.namespace}/${block.name}`}
            />
            <IframePreview name={block.name} />
          </article>
        ))}
      </div>
    </div>
  );
}
