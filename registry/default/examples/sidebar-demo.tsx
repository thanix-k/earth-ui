"use client";

import {
  CalendarDaysIcon,
  ChartColumnIcon,
  ChevronsUpDownIcon,
  ClipboardListIcon,
  ContactIcon,
  GlobeIcon,
  MessageSquareIcon,
  PlusIcon,
  SettingsIcon,
  StarIcon,
  UsersIcon,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/default/ui/breadcrumb";
import { Separator } from "@/registry/default/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/registry/default/ui/sidebar";

const schedule = [
  { title: "Calendar", url: "/calendar", icon: CalendarDaysIcon, isActive: true },
  { title: "Appointments", url: "/appointments", icon: ClipboardListIcon, badge: 12 },
  { title: "Customers", url: "/customers", icon: ContactIcon },
  { title: "Messages", url: "/messages", icon: MessageSquareIcon, badge: 3 },
];

const business = [
  { title: "Booking page", url: "/booking-page", icon: GlobeIcon },
  { title: "Staff", url: "/staff", icon: UsersIcon },
  { title: "Reviews", url: "/reviews", icon: StarIcon },
  { title: "Reports", url: "/reports", icon: ChartColumnIcon },
];

export default function SidebarDemo() {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" tooltip="Glow Salon">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-eds-accent text-body-14 font-semibold text-eds-onPrimary">
                  G
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate font-medium">Glow Salon</span>
                  <span className="truncate text-body-12 text-eds-secondary lg:text-body-10">
                    Premium plan
                  </span>
                </span>
                <ChevronsUpDownIcon className="ms-auto" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Schedule</SidebarGroupLabel>
            <SidebarGroupAction title="New appointment">
              <PlusIcon />
              <span className="sr-only">New appointment</span>
            </SidebarGroupAction>
            <SidebarGroupContent>
              <SidebarMenu>
                {schedule.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={item.isActive}
                      tooltip={item.title}
                      render={<a href={item.url} />}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                    {item.badge ? <SidebarMenuBadge>{item.badge}</SidebarMenuBadge> : null}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Business</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {business.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton tooltip={item.title} render={<a href={item.url} />}>
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Settings" render={<a href="/settings" />}>
                <SettingsIcon />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" tooltip="Maya Patel">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-eds-avatar text-body-12 font-medium text-eds-primary">
                  MP
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate font-medium">Maya Patel</span>
                  <span className="truncate text-body-12 text-eds-secondary lg:text-body-10">
                    maya@glowsalon.com
                  </span>
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-eds-tertiary px-4">
          <SidebarTrigger className="-ms-1" />
          <Separator orientation="vertical" className="me-2 h-4 self-center" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:inline-flex">
                <BreadcrumbLink href="#">Schedule</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Calendar</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="h-28 rounded-xl bg-eds-canvas-tertiary" />
            <div className="h-28 rounded-xl bg-eds-canvas-tertiary" />
            <div className="h-28 rounded-xl bg-eds-canvas-tertiary" />
          </div>
          <div className="min-h-96 flex-1 rounded-xl bg-eds-canvas-tertiary" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
