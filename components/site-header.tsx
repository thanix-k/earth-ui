import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { SearchTrigger } from "@/components/search";
import { site } from "@/lib/site";
import { source } from "@/lib/source";
import { Button } from "@/registry/default/ui/button";

function GitHubIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.6.2 2.8.1 3.2.8.8 1.3 1.9 1.3 3.1 0 4.6-2.8 5.6-5.5 5.9.5.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
    </svg>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 h-(--header-height) border-b border-eds-tertiary bg-eds-canvas/90 backdrop-blur supports-backdrop-filter:bg-eds-canvas/80">
      <div className="container-wrapper flex h-full items-center gap-6">
        <Link href="/" className="flex items-center gap-2 text-heading-16">
          <span className="size-5 rounded-full bg-eds-accent" aria-hidden="true" />
          {site.name}
        </Link>
        <nav className="hidden items-center gap-1 sm:flex">
          <Button variant="ghost" size="sm" nativeButton={false} render={<Link href="/docs" />}>
            Docs
          </Button>
          <Button
            variant="ghost"
            size="sm"
            nativeButton={false}
            render={<Link href="/docs/components/button" />}
          >
            Components
          </Button>
        </nav>
        <div className="ms-auto flex items-center gap-1">
          <SearchTrigger
            pages={source.getPages().map((page) => ({
              title: page.data.title,
              description: page.data.description,
              url: page.url,
              group: page.slugs[0] === "components" ? "Components" : "Overview",
            }))}
          />
          <Button
            variant="ghost"
            size="icon"
            aria-label="GitHub repository"
            nativeButton={false}
            render={<a href={site.repo} target="_blank" rel="noreferrer" />}
          >
            <GitHubIcon />
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
