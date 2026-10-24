"use client";

import { BanIcon, CalendarPlusIcon, ClipboardPasteIcon, UsersIcon } from "lucide-react";
import { useState } from "react";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/registry/default/ui/context-menu";

export default function ContextMenuDemo() {
  const [showWeekends, setShowWeekends] = useState(true);
  const [slot, setSlot] = useState("30");

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-40 w-72 items-center justify-center rounded-lg border border-dashed border-eds-secondary text-body-14 text-eds-secondary lg:text-body-12">
        Right-click 10:00 am
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuGroup>
          <ContextMenuItem>
            <CalendarPlusIcon />
            New appointment
            <ContextMenuShortcut>N</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            <BanIcon />
            Block time
            <ContextMenuShortcut>B</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem disabled>
            <ClipboardPasteIcon />
            Paste appointment
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>
              <UsersIcon />
              Assign to
            </ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-40">
              <ContextMenuItem>Jordan Lee</ContextMenuItem>
              <ContextMenuItem>Maya Patel</ContextMenuItem>
              <ContextMenuItem>Sam Rivera</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked={showWeekends} onCheckedChange={setShowWeekends}>
          Show weekends
        </ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuLabel>Slot length</ContextMenuLabel>
          <ContextMenuRadioGroup value={slot} onValueChange={setSlot}>
            <ContextMenuRadioItem value="15">15 minutes</ContextMenuRadioItem>
            <ContextMenuRadioItem value="30">30 minutes</ContextMenuRadioItem>
            <ContextMenuRadioItem value="60">1 hour</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}
