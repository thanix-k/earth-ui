"use client";

import {
  BookOpenIcon,
  CalendarCheckIcon,
  CalendarDaysIcon,
  CalendarIcon,
  ClockIcon,
  HospitalIcon,
  MapPinIcon,
  PhoneCallIcon,
  Settings2Icon,
  StoreIcon,
} from "lucide-react";
import * as React from "react";
import { NavMain } from "@/registry/default/blocks/sidebar-07/components/nav-main";
import { NavProjects } from "@/registry/default/blocks/sidebar-07/components/nav-projects";
import { NavUser } from "@/registry/default/blocks/sidebar-07/components/nav-user";
import { TeamSwitcher } from "@/registry/default/blocks/sidebar-07/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/registry/default/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "Riley Carter",
    email: "riley@anywhere.co",
    avatar: "/avatars/riley.jpg",
  },
  teams: [
    {
      name: "Setmore",
      logo: <CalendarDaysIcon />,
      plan: "Premium",
    },
    {
      name: "AnswerConnect",
      logo: <PhoneCallIcon />,
      plan: "Pro",
    },
    {
      name: "YoCoBoard",
      logo: <ClockIcon />,
      plan: "Free",
    },
  ],
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
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
