"use client";

import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/registry/default/ui/dropdown-menu";

export default function DropdownMenuCheckboxes() {
  const [confirmed, setConfirmed] = useState(true);
  const [pending, setPending] = useState(true);
  const [cancelled, setCancelled] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>Status</DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Show bookings</DropdownMenuLabel>
          <DropdownMenuCheckboxItem checked={confirmed} onCheckedChange={setConfirmed}>
            Confirmed
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={pending} onCheckedChange={setPending}>
            Pending
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={cancelled} onCheckedChange={setCancelled}>
            Cancelled
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem disabled>No-shows</DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
