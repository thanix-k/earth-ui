"use client";

import {
  CalendarCheckIcon,
  ChartBarIcon,
  CircleHelpIcon,
  CommandIcon,
  FileAudioIcon,
  FileChartColumnIcon,
  FileIcon,
  FileTextIcon,
  LayoutDashboardIcon,
  MapPinIcon,
  PhoneIcon,
  SearchIcon,
  Settings2Icon,
  UsersIcon,
} from "lucide-react";
import type * as React from "react";
import { NavDocuments } from "@/registry/default/blocks/dashboard-01/components/nav-documents";
import { NavMain } from "@/registry/default/blocks/dashboard-01/components/nav-main";
import { NavSecondary } from "@/registry/default/blocks/dashboard-01/components/nav-secondary";
import { NavUser } from "@/registry/default/blocks/dashboard-01/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/registry/default/ui/sidebar";

const data = {
  user: {
    name: "Riley Carter",
    email: "riley@anywhere.co",
    avatar: "/avatars/riley.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Bookings",
      url: "#",
      icon: <CalendarCheckIcon />,
    },
    {
      title: "Analytics",
      url: "#",
      icon: <ChartBarIcon />,
    },
    {
      title: "Locations",
      url: "#",
      icon: <MapPinIcon />,
    },
    {
      title: "Team",
      url: "#",
      icon: <UsersIcon />,
    },
  ],
  navClouds: [
    {
      title: "Calls",
      icon: <PhoneIcon />,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Leads",
      icon: <FileTextIcon />,
      url: "#",
      items: [
        {
          title: "Active",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Messages",
      icon: <FileTextIcon />,
      url: "#",
      items: [
        {
          title: "Active",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: <Settings2Icon />,
    },
    {
      title: "Get Help",
      url: "#",
      icon: <CircleHelpIcon />,
    },
    {
      title: "Search",
      url: "#",
      icon: <SearchIcon />,
    },
  ],
  documents: [
    {
      name: "Call Recordings",
      url: "#",
      icon: <FileAudioIcon />,
    },
    {
      name: "Reports",
      url: "#",
      icon: <FileChartColumnIcon />,
    },
    {
      name: "Booking Page",
      url: "#",
      icon: <FileIcon />,
    },
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              render={<a href="#top" />}
            >
              <CommandIcon className="size-5!" />
              <span className="text-base font-semibold">Setmore</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
