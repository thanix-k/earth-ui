import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/layouts/notebook/page";
import { ArrowUpRightIcon } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
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

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
  const page = source.getPage((await props.params).slug);
  if (!page) notFound();
  const { title, description, links, toc, body: MDX } = page.data;

  return (
    <DocsPage
      toc={toc}
      tableOfContent={{ style: "clerk" }}
      tableOfContentPopover={{ style: "clerk" }}
    >
      <DocsTitle>{title}</DocsTitle>
      <DocsDescription>{description}</DocsDescription>
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
      <DocsBody>
        <MDX components={mdxComponents} />
      </DocsBody>
    </DocsPage>
  );
}
