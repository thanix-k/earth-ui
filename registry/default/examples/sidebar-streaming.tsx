import { CalendarDaysIcon, UsersIcon } from "lucide-react";
import { connection } from "next/server";
import { Suspense } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/registry/default/ui/sidebar";
import { Skeleton } from "@/registry/default/ui/skeleton";

const appointments = [
  { time: "9:00 AM", customer: "Priya Raghavan", service: "Consultation" },
  { time: "10:30 AM", customer: "Tom Okafor", service: "Follow-up" },
  { time: "1:15 PM", customer: "Ana Lima", service: "Haircut" },
];

// Stands in for a slow data read, so the list streams in after the shell.
async function Appointments() {
  await connection();
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return (
    <ul className="flex flex-col gap-2">
      {appointments.map((appointment) => (
        <li
          key={appointment.time}
          className="rounded-lg bg-eds-canvas-tertiary p-3 text-body-14 text-eds-primary"
        >
          {appointment.time} · {appointment.customer} · {appointment.service}
        </li>
      ))}
    </ul>
  );
}

export default function SidebarStreamingExample() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive render={<a href="#calendar" />}>
                    <CalendarDaysIcon />
                    <span>Calendar</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton render={<a href="#customers" />}>
                    <UsersIcon />
                    <span>Customers</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 px-4">
          <SidebarTrigger className="-ms-1" />
          <h1 className="text-heading-16 text-eds-primary">Today</h1>
        </header>
        <div className="flex-1 p-4 pt-0">
          <Suspense fallback={<Skeleton className="h-40 w-full" />}>
            <Appointments />
          </Suspense>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
