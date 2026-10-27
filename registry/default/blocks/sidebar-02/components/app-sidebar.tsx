"use client";

import { ChevronRightIcon } from "lucide-react";
import type * as React from "react";
import { SearchForm } from "@/registry/default/blocks/sidebar-02/components/search-form";
import { VersionSwitcher } from "@/registry/default/blocks/sidebar-02/components/version-switcher";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/default/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/registry/default/ui/sidebar";

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
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
        <VersionSwitcher versions={data.versions} defaultVersion={data.versions[0] ?? ""} />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {/* We create a collapsible SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <Collapsible
            key={item.title}
            title={item.title}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                render={<CollapsibleTrigger />}
              >
                {item.title}{" "}
                <ChevronRightIcon className="ml-auto transition-transform group-data-open/collapsible:rotate-90" />
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton isActive={item.isActive} render={<a href={item.url} />}>
                          {item.title}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
