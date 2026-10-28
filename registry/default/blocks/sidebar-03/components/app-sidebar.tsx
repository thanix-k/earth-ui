"use client";

import { CalendarDaysIcon } from "lucide-react";
import type * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/registry/default/ui/sidebar";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Create Your Account",
          url: "#",
        },
        {
          title: "Set Up Your Booking Page",
          url: "#",
        },
      ],
    },
    {
      title: "Manage Bookings",
      url: "#",
      items: [
        {
          title: "Services",
          url: "#",
        },
        {
          title: "Staff Availability",
          url: "#",
          isActive: true,
        },
        {
          title: "Appointments",
          url: "#",
        },
        {
          title: "Reminders",
          url: "#",
        },
        {
          title: "Payments",
          url: "#",
        },
        {
          title: "Integrations",
          url: "#",
        },
        {
          title: "Customer Records",
          url: "#",
        },
        {
          title: "Reviews",
          url: "#",
        },
        {
          title: "Team Accounts",
          url: "#",
        },
        {
          title: "Booking Widgets",
          url: "#",
        },
        {
          title: "Plans & Billing",
          url: "#",
        },
        {
          title: "Industry Templates",
          url: "#",
        },
      ],
    },
    {
      title: "Developers",
      url: "#",
      items: [
        {
          title: "REST API",
          url: "#",
        },
        {
          title: "Webhooks",
          url: "#",
        },
        {
          title: "OAuth Apps",
          url: "#",
        },
        {
          title: "Rate Limits",
          url: "#",
        },
        {
          title: "SDKs",
          url: "#",
        },
        {
          title: "Zapier",
          url: "#",
        },
      ],
    },
    {
      title: "Account & Security",
      url: "#",
      items: [
        {
          title: "Accessibility",
          url: "#",
        },
        {
          title: "Two-Factor Login",
          url: "#",
        },
        {
          title: "Data Export",
          url: "#",
        },
        {
          title: "Supported Browsers",
          url: "#",
        },
        {
          title: "Privacy & GDPR",
          url: "#",
        },
      ],
    },
    {
      title: "Community",
      url: "#",
      items: [
        {
          title: "Setmore Academy",
          url: "#",
        },
      ],
    },
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<a href="#top" />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <CalendarDaysIcon className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-medium">Help Center</span>
                <span className="">v1.0.0</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton render={<a href={item.url} className="font-medium" />}>
                  {item.title}
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton
                          isActive={item.isActive}
                          render={<a href={item.url} />}
                        >
                          {item.title}
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
