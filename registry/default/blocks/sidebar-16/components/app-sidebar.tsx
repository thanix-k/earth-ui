"use client";

import {
  BookOpenIcon,
  CalendarCheckIcon,
  CalendarIcon,
  ClockIcon,
  HospitalIcon,
  LifeBuoyIcon,
  MapPinIcon,
  SendIcon,
  Settings2Icon,
  StoreIcon,
} from "lucide-react";
import * as React from "react";
import { NavMain } from "@/registry/default/blocks/sidebar-16/components/nav-main";
import { NavProjects } from "@/registry/default/blocks/sidebar-16/components/nav-projects";
import { NavSecondary } from "@/registry/default/blocks/sidebar-16/components/nav-secondary";
import { NavUser } from "@/registry/default/blocks/sidebar-16/components/nav-user";
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
      title: "Calendar",
      url: "#",
      icon: <CalendarIcon />,
      isActive: true,
      items: [
        {
          title: "Today",
          url: "#",
        },
        {
          title: "This Week",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Bookings",
      url: "#",
      icon: <CalendarCheckIcon />,
      items: [
        {
          title: "Upcoming",
          url: "#",
        },
        {
          title: "Past",
          url: "#",
        },
        {
          title: "Cancelled",
          url: "#",
        },
      ],
    },
    {
      title: "Help Center",
      url: "#",
      icon: <BookOpenIcon />,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Booking Page",
          url: "#",
        },
        {
          title: "Video Guides",
          url: "#",
        },
        {
          title: "What's New",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: <Settings2Icon />,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Integrations",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: <LifeBuoyIcon />,
    },
    {
      title: "Feedback",
      url: "#",
      icon: <SendIcon />,
    },
  ],
  projects: [
    {
      name: "Downtown Studio",
      url: "#",
      icon: <StoreIcon />,
    },
    {
      name: "Riverside Clinic",
      url: "#",
      icon: <HospitalIcon />,
    },
    {
      name: "Westside Studio",
      url: "#",
      icon: <MapPinIcon />,
    },
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="top-(--header-height) h-[calc(100svh-var(--header-height))]!" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<a href="#" />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <ClockIcon className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Setmore</span>
                <span className="truncate text-xs">Premium</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
