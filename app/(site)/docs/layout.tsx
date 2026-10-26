import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import type { ReactNode } from "react";
import { SidebarHover } from "@/components/sidebar-hover";
import { DocsSiteHeader } from "@/components/site-header";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";

export default function Layout({ children }: { children: ReactNode }) {
  const base = baseOptions();
  return (
    <DocsLayout
      tree={source.pageTree}
      {...base}
      nav={{ ...base.nav, mode: "top" }}
      slots={{ header: DocsSiteHeader }}
    >
      <SidebarHover />
      {children}
    </DocsLayout>
  );
}
