import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/layouts/notebook/page";
import { ArrowUpRightIcon } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { source } from "@/lib/source";
import { mdxComponents } from "@/mdx-components";
import { Button } from "@/registry/default/ui/button";

// Micro-interaction: press feedback on the button, arrow nudges toward its destination on hover.
const linkButtonClassName =
  "transition-[color,background-color,border-color,transform] active:scale-[0.97] motion-reduce:active:scale-100";
const linkArrowClassName =
  "transition-transform duration-300 ease-out group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover/button:translate-none";

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
              className={linkButtonClassName}
              render={<a href={links.doc} target="_blank" rel="noreferrer" />}
            >
              Docs
              <ArrowUpRightIcon data-icon="inline-end" className={linkArrowClassName} />
            </Button>
          )}
          {links.api && (
            <Button
              variant="outline"
              size="sm"
              nativeButton={false}
              className={linkButtonClassName}
              render={<a href={links.api} target="_blank" rel="noreferrer" />}
            >
              API reference
              <ArrowUpRightIcon data-icon="inline-end" className={linkArrowClassName} />
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
