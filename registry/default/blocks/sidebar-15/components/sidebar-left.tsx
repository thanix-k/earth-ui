"use client";

import {
  BlocksIcon,
  CalendarIcon,
  ClockIcon,
  HomeIcon,
  InboxIcon,
  MessageCircleQuestionIcon,
  PhoneCallIcon,
  SearchIcon,
  Settings2Icon,
  SparklesIcon,
  Trash2Icon,
} from "lucide-react";
import type * as React from "react";
import { NavFavorites } from "@/registry/default/blocks/sidebar-15/components/nav-favorites";
import { NavMain } from "@/registry/default/blocks/sidebar-15/components/nav-main";
import { NavSecondary } from "@/registry/default/blocks/sidebar-15/components/nav-secondary";
import { NavWorkspaces } from "@/registry/default/blocks/sidebar-15/components/nav-workspaces";
import { TeamSwitcher } from "@/registry/default/blocks/sidebar-15/components/team-switcher";
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from "@/registry/default/ui/sidebar";

// This is sample data.
const data = {
  teams: [
    {
      name: "Setmore",
      logo: <ClockIcon />,
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
      title: "Search",
      url: "#",
      icon: <SearchIcon />,
    },
    {
      title: "Ask AI",
      url: "#",
      icon: <SparklesIcon />,
    },
    {
      title: "Home",
      url: "#",
      icon: <HomeIcon />,
      isActive: true,
    },
    {
      title: "Inbox",
      url: "#",
      icon: <InboxIcon />,
      badge: "10",
    },
  ],
  navSecondary: [
    {
      title: "Calendar",
      url: "#",
      icon: <CalendarIcon />,
    },
    {
      title: "Settings",
      url: "#",
      icon: <Settings2Icon />,
    },
    {
      title: "Templates",
      url: "#",
      icon: <BlocksIcon />,
    },
    {
      title: "Trash",
      url: "#",
      icon: <Trash2Icon />,
    },
    {
      title: "Help",
      url: "#",
      icon: <MessageCircleQuestionIcon />,
    },
  ],
  favorites: [
    {
      name: "Q4 Launch Plan",
      url: "#",
      emoji: "📊",
    },
    {
      name: "Front Desk Playbook",
      url: "#",
      emoji: "📞",
    },
    {
      name: "Holiday Hours",
      url: "#",
      emoji: "🗓️",
    },
    {
      name: "Customer Interviews",
      url: "#",
      emoji: "🎙️",
    },
    {
      name: "Brand Guidelines",
      url: "#",
      emoji: "🎨",
    },
    {
      name: "Support Macros",
      url: "#",
      emoji: "💬",
    },
    {
      name: "Office Moves",
      url: "#",
      emoji: "🏢",
    },
    {
      name: "Revenue Dashboard",
      url: "#",
      emoji: "📈",
    },
    {
      name: "Competitor Notes",
      url: "#",
      emoji: "🔍",
    },
    {
      name: "Team OKRs",
      url: "#",
      emoji: "✅",
    },
  ],
  workspaces: [
    {
      name: "Setmore",
      emoji: "🏢",
      pages: [
        {
          name: "Release Notes",
          url: "#",
          emoji: "📝",
        },
        {
          name: "Booking Page Redesign",
          url: "#",
          emoji: "🖥️",
        },
        {
          name: "Mobile App Roadmap",
          url: "#",
          emoji: "📱",
        },
      ],
    },
    {
      name: "AnswerConnect",
      emoji: "💼",
      pages: [
        {
          name: "Call Scripts",
          url: "#",
          emoji: "🎯",
        },
        {
          name: "Receptionist Training",
          url: "#",
          emoji: "🎧",
        },
        {
          name: "Client Onboarding",
          url: "#",
          emoji: "🤝",
        },
      ],
    },
    {
      name: "YoCoBoard",
      emoji: "⏱️",
      pages: [
        {
          name: "Timesheet Policies",
          url: "#",
          emoji: "📋",
        },
        {
          name: "Payroll Exports",
          url: "#",
          emoji: "💵",
        },
        {
          name: "Shift Templates",
          url: "#",
          emoji: "🔁",
        },
      ],
    },
    {
      name: "AdaptiveU",
      emoji: "🎓",
      pages: [
        {
          name: "Course Catalog",
          url: "#",
          emoji: "📈",
        },
        {
          name: "Quiz Bank",
          url: "#",
          emoji: "❓",
        },
        {
          name: "Learning Paths",
          url: "#",
          emoji: "🛤️",
        },
      ],
    },
    {
      name: "Lister Place",
      emoji: "🏛️",
      pages: [
        {
          name: "Room Bookings",
          url: "#",
          emoji: "🚪",
        },
        {
          name: "Event Calendar",
          url: "#",
          emoji: "📅",
        },
        {
          name: "Member Directory",
          url: "#",
          emoji: "👥",
        },
      ],
    },
  ],
};

export function SidebarLeft({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavFavorites favorites={data.favorites} />
        <NavWorkspaces workspaces={data.workspaces} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
