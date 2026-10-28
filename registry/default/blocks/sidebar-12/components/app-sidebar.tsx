"use client";

import { PlusIcon } from "lucide-react";
import type * as React from "react";
import { Calendars } from "@/registry/default/blocks/sidebar-12/components/calendars";
import { DatePicker } from "@/registry/default/blocks/sidebar-12/components/date-picker";
import { NavUser } from "@/registry/default/blocks/sidebar-12/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/registry/default/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "Riley Carter",
    email: "riley@anywhere.co",
    avatar: "/avatars/riley.jpg",
  },
  calendars: [
    {
      name: "My Calendars",
      items: ["Personal", "Front Desk", "Team"],
    },
    {
      name: "Favorites",
      items: ["Holidays", "Staff Leave"],
    },
    {
      name: "Other",
      items: ["Westside Studio", "Reminders", "Follow-ups"],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <DatePicker />
        <SidebarSeparator className="mx-0" />
        <Calendars calendars={data.calendars} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <PlusIcon />
              <span>New Calendar</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
