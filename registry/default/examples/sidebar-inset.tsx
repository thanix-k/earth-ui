"use client";

import { CalendarDaysIcon, SettingsIcon, UsersIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/registry/default/ui/sidebar";

const settings = ["Business details", "Working hours", "Booking page", "Notifications"];

export default function SidebarInsetExample() {
  return (
    <SidebarProvider>
      <Sidebar variant="inset">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton render={<a href="/calendar" />}>
                    <CalendarDaysIcon />
                    <span>Calendar</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton render={<a href="/staff" />}>
                    <UsersIcon />
                    <span>Staff</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <SettingsIcon />
                    <span>Settings</span>
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    {settings.map((item) => (
                      <SidebarMenuSubItem key={item}>
                        <SidebarMenuSubButton href="#" isActive={item === "Working hours"}>
                          <span>{item}</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 px-4">
          <SidebarTrigger className="-ms-1" />
          <h1 className="text-heading-16 text-eds-primary">Working hours</h1>
        </header>
        <div className="flex-1 p-4 pt-0">
          <div className="h-full min-h-96 rounded-xl bg-eds-canvas-tertiary" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
