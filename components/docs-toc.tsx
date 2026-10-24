"use client";

import type { TOCItemType } from "fumadocs-core/toc";
import { AnchorProvider, useActiveAnchor } from "fumadocs-core/toc";
import { cn } from "@/registry/default/lib/utils";

function Items({ toc }: { toc: TOCItemType[] }) {
  const active = useActiveAnchor();
  return (
    <ul className="flex flex-col border-s border-eds-tertiary">
      {toc.map((item) => {
        const id = item.url.slice(1);
        return (
          <li key={item.url}>
            <a
              href={item.url}
              className={cn(
                "-ms-px block border-s border-transparent py-1 text-body-12 text-eds-secondary transition-colors duration-300 hover:text-eds-primary",
                item.depth > 2 ? "ps-6" : "ps-3",
                active === id && "border-eds-accent font-medium text-eds-primary",
              )}
            >
              {item.title}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export function DocsToc({ toc }: { toc: TOCItemType[] }) {
  return (
    <AnchorProvider toc={toc} single>
      <div className="flex flex-col gap-2">
        <p className="text-body-12 font-medium text-eds-primary">On this page</p>
        <Items toc={toc} />
      </div>
    </AnchorProvider>
  );
}
