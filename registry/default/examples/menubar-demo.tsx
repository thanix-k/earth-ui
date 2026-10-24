"use client";

import { useState } from "react";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/registry/default/ui/menubar";

export default function MenubarDemo() {
  const [showCancelled, setShowCancelled] = useState(false);
  const [showWeekends, setShowWeekends] = useState(true);
  const [view, setView] = useState("week");

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Booking</MenubarTrigger>
        <MenubarContent>
          <MenubarGroup>
            <MenubarItem>
              New appointment <MenubarShortcut>N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              New class <MenubarShortcut>C</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>Duplicate</MenubarItem>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Share booking page</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Copy link</MenubarItem>
              <MenubarItem>Email</MenubarItem>
              <MenubarItem>QR code</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>Print day sheet</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem checked={showWeekends} onCheckedChange={setShowWeekends}>
            Show weekends
          </MenubarCheckboxItem>
          <MenubarCheckboxItem checked={showCancelled} onCheckedChange={setShowCancelled}>
            Show cancelled
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarLabel inset>Calendar</MenubarLabel>
            <MenubarRadioGroup value={view} onValueChange={setView}>
              <MenubarRadioItem value="day">Day</MenubarRadioItem>
              <MenubarRadioItem value="week">Week</MenubarRadioItem>
              <MenubarRadioItem value="month">Month</MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Staff</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Jordan Lee</MenubarItem>
          <MenubarItem>Maya Patel</MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>Manage staff</MenubarItem>
          <MenubarItem variant="destructive" inset>
            Remove staff
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
