import type { ReactNode } from "react";
import { DocsSidebar } from "@/components/docs-sidebar";
import { source } from "@/lib/source";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container-wrapper grid flex-1 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-6">
      <aside className="sticky top-(--header-height) hidden h-[calc(100svh-var(--header-height))] overflow-y-auto lg:block">
        <DocsSidebar tree={source.pageTree} />
      </aside>
      {children}
    </div>
  );
}
