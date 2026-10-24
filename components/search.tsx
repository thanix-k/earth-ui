"use client";

import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/registry/default/ui/command";
import { Kbd } from "@/registry/default/ui/kbd";

export type SearchPage = { title: string; description?: string; url: string; group: string };

export function SearchTrigger({ pages }: { pages: SearchPage[] }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const groups = Object.groupBy(pages, (p) => p.group);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="w-40 justify-start text-eds-secondary sm:w-56"
        onClick={() => setOpen(true)}
      >
        <SearchIcon data-icon="inline-start" />
        Search docs
        <Kbd className="ms-auto">⌘K</Kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen} title="Search docs">
        <Command>
          <CommandInput placeholder="Search components and guides…" />
          <CommandList>
            <CommandEmpty>No results.</CommandEmpty>
            {Object.entries(groups).map(([group, items]) => (
              <CommandGroup key={group} heading={group}>
                {items?.map((page) => (
                  <CommandItem
                    key={page.url}
                    value={`${page.title} ${page.description ?? ""}`}
                    onSelect={() => {
                      setOpen(false);
                      router.push(page.url);
                    }}
                  >
                    {page.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
