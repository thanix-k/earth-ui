"use client";

import { InboxIcon, ZapIcon } from "lucide-react";
import * as React from "react";
import { cn } from "@/registry/default/lib/utils";
import { Badge } from "@/registry/default/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/registry/default/ui/command";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/default/ui/empty";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/registry/default/ui/resizable";

const chats = [
  { id: 1, name: "Visitor #4821", page: "/pricing", msg: "Do you offer annual billing?" },
  { id: 2, name: "Marta S.", page: "/checkout", msg: "Coupon code isn't working" },
  { id: 3, name: "Visitor #4830", page: "/features", msg: "Is there a Zapier integration?" },
];
const canned = [
  "Yes! Annual plans save 20%. Want me to send a link?",
  "Sorry about that, let me apply it manually for you.",
  "We do, here's the setup guide.",
  "Thanks for waiting, I'm checking with the team.",
];

export function InboxCard() {
  const [active, setActive] = React.useState<number | null>(1);
  const [replied, setReplied] = React.useState<Record<number, string>>({});
  const chat = chats.find((c) => c.id === active);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live chats</CardTitle>
        <CardDescription>ChatSupport</CardDescription>
      </CardHeader>
      <CardContent>
        <ResizablePanelGroup
          orientation="horizontal"
          className="h-80 rounded-lg border border-eds-tertiary"
        >
          <ResizablePanel defaultSize="38%" minSize="25%">
            <div className="flex flex-col">
              {chats.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActive(c.id === active ? null : c.id)}
                  className={cn(
                    "flex flex-col items-start gap-0.5 border-b border-eds-tertiary p-2 text-left hover:bg-eds-neutral-hover",
                    c.id === active && "bg-eds-neutral-pressed",
                  )}
                >
                  <span className="text-heading-14 lg:text-heading-12">{c.name}</span>
                  <span className="line-clamp-1 text-eds-secondary">
                    {replied[c.id] ? "You replied" : c.msg}
                  </span>
                </button>
              ))}
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize="62%" minSize="40%">
            {chat ? (
              <div className="flex h-full flex-col gap-2 p-2">
                <div className="flex items-center justify-between">
                  <span className="text-heading-14 lg:text-heading-12">{chat.name}</span>
                  <Badge variant="outline">{chat.page}</Badge>
                </div>
                <p className="rounded-lg bg-eds-neutral-hover p-2">{chat.msg}</p>
                {replied[chat.id] ? (
                  <p className="self-end rounded-lg bg-eds-accent p-2 text-eds-onPrimary">
                    {replied[chat.id]}
                  </p>
                ) : (
                  <Command className="mt-auto rounded-lg border border-eds-tertiary">
                    <CommandInput placeholder="Canned replies…" />
                    <CommandList className="max-h-28">
                      <CommandEmpty>No reply found.</CommandEmpty>
                      <CommandGroup>
                        {canned.map((r) => (
                          <CommandItem
                            key={r}
                            onSelect={() => setReplied((all) => ({ ...all, [chat.id]: r }))}
                          >
                            <ZapIcon />
                            <span className="line-clamp-1">{r}</span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                )}
              </div>
            ) : (
              <Empty className="h-full">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <InboxIcon />
                  </EmptyMedia>
                  <EmptyTitle>No chat selected</EmptyTitle>
                  <EmptyDescription>Pick a visitor to reply.</EmptyDescription>
                </EmptyHeader>
              </Empty>
            )}
          </ResizablePanel>
        </ResizablePanelGroup>
      </CardContent>
    </Card>
  );
}
