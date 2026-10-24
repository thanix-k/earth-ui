"use client";

import type * as PageTree from "fumadocs-core/page-tree";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { cn } from "@/registry/default/lib/utils";

type Group = { name: ReactNode; pages: PageTree.Item[] };

/** Splits the flat tree at separators: "Overview", "Components", … */
function groups(nodes: PageTree.Node[]) {
  const result: Group[] = [];
  for (const node of nodes) {
    if (node.type === "separator") result.push({ name: node.name, pages: [] });
    else if (node.type === "page") result.at(-1)?.pages.push(node);
    else if (node.type === "folder") {
      result.push({
        name: node.name,
        pages: node.children.filter((c): c is PageTree.Item => c.type === "page"),
      });
    }
  }
  // Filename order puts "alert-dialog" before "alert"; readers expect titles A–Z.
  for (const group of result) {
    if (group.name === "Components") {
      group.pages.sort((a, b) => String(a.name).localeCompare(String(b.name)));
    }
  }
  return result;
}

export function DocsSidebar({ tree }: { tree: PageTree.Root }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Docs" className="flex flex-col gap-6 py-8 pe-4">
      {groups(tree.children).map((group, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: groups are static and ordered
        <div key={i} className="flex flex-col gap-1">
          <p className="px-3 pb-1 text-body-12 font-medium text-eds-primary">{group.name}</p>
          {group.pages.map((page) => {
            const active = page.url === pathname;
            return (
              <Link
                key={page.url}
                href={page.url}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-lg px-3 py-1 text-body-14 text-eds-secondary transition-colors duration-300 ease-[ease] hover:bg-eds-neutral-hover hover:text-eds-primary focus-visible:focus-ring",
                  active && "bg-eds-neutral-secondary font-medium text-eds-primary",
                )}
              >
                {page.name}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
