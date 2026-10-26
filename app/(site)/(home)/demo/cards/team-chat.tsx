"use client";

import { SendIcon, SmileIcon } from "lucide-react";
import * as React from "react";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/registry/default/ui/avatar";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/registry/default/ui/hover-card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/registry/default/ui/input-group";
import { Kbd } from "@/registry/default/ui/kbd";
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/default/ui/popover";
import { ScrollArea } from "@/registry/default/ui/scroll-area";

const people = {
  PN: { name: "Priya Nair", role: "Product lead · Chennai", status: "bg-eds-status-available" },
  CM: { name: "Callum McLeod", role: "Engineer · Edinburgh", status: "bg-eds-status-busy" },
  JW: { name: "Jess Walker", role: "Design · Portland", status: "bg-eds-status-away" },
};
type Who = keyof typeof people;

const seed: { from: Who; text: string }[] = [
  { from: "PN", text: "Morning! Standup moved to 10:15 today." },
  { from: "CM", text: "Works for me. Pushing the booking-page fix first." },
  { from: "JW", text: "New empty states are in Figma, link in the thread." },
  { from: "PN", text: "Lovely. Can we demo them Thursday?" },
  { from: "CM", text: "Yep, I'll wire them up tomorrow." },
];
const emoji = ["👍", "🎉", "👀", "🙏", "🔥", "✅"];

function Person({ who }: { who: Who }) {
  const p = people[who];
  return (
    <HoverCard>
      <HoverCardTrigger href="#team" className="text-heading-14 hover:underline lg:text-heading-12">
        {p.name}
      </HoverCardTrigger>
      <HoverCardContent className="flex items-center gap-3">
        <Avatar>
          <AvatarFallback>{who}</AvatarFallback>
          <AvatarBadge className={p.status} />
        </Avatar>
        <div>
          <p className="text-heading-14 lg:text-heading-12">{p.name}</p>
          <p className="text-eds-secondary">{p.role}</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export function TeamChatCard() {
  const [messages, setMessages] = React.useState(seed);
  const [draft, setDraft] = React.useState("");
  const send = () => {
    if (!draft.trim()) return;
    setMessages((m) => [...m, { from: "JW", text: draft }]);
    setDraft("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle># booking-squad</CardTitle>
        <CardDescription>Anywhere</CardDescription>
        <CardAction>
          <AvatarGroup>
            {(Object.keys(people) as Who[]).map((w) => (
              <Avatar key={w} size="sm">
                <AvatarFallback>{w}</AvatarFallback>
              </Avatar>
            ))}
            <AvatarGroupCount>+6</AvatarGroupCount>
          </AvatarGroup>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <ScrollArea className="h-56 rounded-lg border border-eds-tertiary">
          <div className="flex flex-col gap-3 p-3">
            {messages.map((m, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: append-only list
              <div key={i} className="flex gap-2">
                <Avatar size="sm">
                  <AvatarFallback>{m.from}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <Person who={m.from} />
                  <span className="text-eds-secondary">{m.text}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <InputGroup>
          <InputGroupInput
            placeholder="Message #booking-squad"
            aria-label="Message"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
          />
          <InputGroupAddon align="inline-end">
            <Popover>
              <PopoverTrigger render={<InputGroupButton size="icon-xs" aria-label="Emoji" />}>
                <SmileIcon />
              </PopoverTrigger>
              <PopoverContent className="flex w-auto gap-1 p-2">
                {emoji.map((e) => (
                  <button
                    key={e}
                    type="button"
                    className="rounded-md p-1 text-lg hover:bg-eds-neutral-hover"
                    onClick={() => setDraft((d) => d + e)}
                  >
                    {e}
                  </button>
                ))}
              </PopoverContent>
            </Popover>
            <InputGroupButton size="icon-xs" aria-label="Send" onClick={send}>
              <SendIcon />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <p className="text-body-12 text-eds-secondary">
          <Kbd>Enter</Kbd> to send
        </p>
      </CardContent>
    </Card>
  );
}
