import { ArrowUpRightIcon } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsToc } from "@/components/docs-toc";
import { source } from "@/lib/source";
import { mdxComponents } from "@/mdx-components";
import { Button } from "@/registry/default/ui/button";

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const page = source.getPage((await props.params).slug);
  if (!page) notFound();
  return { title: page.data.title, description: page.data.description };
}

export default async function DocsPage(props: { params: Promise<{ slug?: string[] }> }) {
  const page = source.getPage((await props.params).slug);
  if (!page) notFound();
  const { title, description, links, toc, body: MDX } = page.data;

  return (
    <div className="flex min-w-0 gap-10 py-6 lg:py-8">
      <article className="min-w-0 flex-1 rounded-2xl border border-eds-tertiary bg-eds-canvas px-4 py-8 sm:px-8 lg:px-12 lg:py-10">
        <div className="mx-auto max-w-3xl">
          <header className="flex flex-col gap-2">
            <h1 className="text-heading-32 text-eds-primary">{title}</h1>
            {description && <p className="text-body-16 text-eds-secondary">{description}</p>}
            {(links?.doc || links?.api) && (
              <div className="flex flex-wrap gap-2 pt-3">
                {links.doc && (
                  <Button
                    variant="outline"
                    size="sm"
                    nativeButton={false}
                    render={<a href={links.doc} target="_blank" rel="noreferrer" />}
                  >
                    Docs
                    <ArrowUpRightIcon data-icon="inline-end" />
                  </Button>
                )}
                {links.api && (
                  <Button
                    variant="outline"
                    size="sm"
                    nativeButton={false}
                    render={<a href={links.api} target="_blank" rel="noreferrer" />}
                  >
                    API reference
                    <ArrowUpRightIcon data-icon="inline-end" />
                  </Button>
                )}
              </div>
            )}
          </header>
          <div className="mt-8">
            <MDX components={mdxComponents} />
          </div>
        </div>
      </article>
      <aside className="sticky top-[calc(var(--header-height)+2rem)] hidden h-fit w-56 shrink-0 xl:block">
        {toc.length > 0 && <DocsToc toc={toc} />}
      </aside>
    </div>
  );
}
