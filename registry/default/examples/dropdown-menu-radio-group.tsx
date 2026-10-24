"use client";

import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/registry/default/ui/dropdown-menu";

export default function DropdownMenuRadioGroupDemo() {
  const [view, setView] = useState("week");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>Calendar view</DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuGroup>
          <DropdownMenuLabel>View</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={view} onValueChange={setView}>
            <DropdownMenuRadioItem value="day">Day</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="week">Week</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="month">Month</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
