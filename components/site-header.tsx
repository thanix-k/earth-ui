"use client";

import { SidebarTrigger } from "fumadocs-ui/layouts/notebook/slots/sidebar";
import { FullSearchTrigger, SearchTrigger } from "fumadocs-ui/layouts/shared/slots/search-trigger";
import { ThemeSwitch } from "fumadocs-ui/layouts/shared/slots/theme-switch";
import { PanelLeftIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { links } from "@/lib/layout.shared";
import { site } from "@/lib/site";
import { cn } from "@/registry/default/lib/utils";

// Same header on every page (coss.com/ui pattern): logo left, everything else right.
export function SiteHeader({
  docs,
  className,
  ...props
}: ComponentProps<"header"> & { docs?: boolean }) {
  const pathname = usePathname();
  return (
    <header
      {...props}
      className={cn(
        "sticky top-0 z-40 border-b bg-fd-background/80 backdrop-blur-sm",
        docs &&
          "[grid-area:header] top-(--fd-docs-row-1) layout:[--fd-header-height:--spacing(14)]",
        className,
      )}
    >
      <div className="mx-auto flex h-14 max-w-350 items-center gap-2 px-4 md:px-6">
        <Link href="/" className="me-auto font-semibold">
          {site.name}
        </Link>
        <nav className="flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.url}
              href={link.url}
              // Active for the whole top-level section, e.g. /docs/* for Components.
              data-active={pathname.startsWith(`/${link.url.split("/")[1]}`)}
              className="rounded-md px-2.5 py-1.5 text-fd-muted-foreground text-sm transition-colors hover:text-fd-foreground data-[active=true]:bg-fd-accent data-[active=true]:text-fd-accent-foreground"
            >
              {link.text}
            </Link>
          ))}
        </nav>
        <FullSearchTrigger hideIfDisabled className="w-40 rounded-full ps-2.5 max-md:hidden" />
        <SearchTrigger hideIfDisabled className="p-2 md:hidden" />
        <a
          href={site.repo}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="GitHub"
          className="rounded-md p-2 text-fd-muted-foreground transition-colors hover:text-fd-foreground max-sm:hidden"
        >
          <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="size-4">
            <title>GitHub</title>
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
        </a>
        <ThemeSwitch className="max-sm:hidden" />
        {docs && (
          <SidebarTrigger
            aria-label="Open sidebar"
            className="p-2 text-fd-muted-foreground md:hidden"
          >
            <PanelLeftIcon className="size-4" />
          </SidebarTrigger>
        )}
      </div>
    </header>
  );
}

// Slot components must be client references, so the docs variant gets its own export.
export function DocsSiteHeader(props: ComponentProps<"header">) {
  return <SiteHeader {...props} docs />;
}
