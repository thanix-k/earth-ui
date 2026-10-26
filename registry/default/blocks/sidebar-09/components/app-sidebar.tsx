"use client";

import { ArchiveXIcon, ClockIcon, FileIcon, InboxIcon, SendIcon, Trash2Icon } from "lucide-react";
import * as React from "react";
import { NavUser } from "@/registry/default/blocks/sidebar-09/components/nav-user";
import { Label } from "@/registry/default/ui/label";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/registry/default/ui/sidebar";
import { Switch } from "@/registry/default/ui/switch";

// This is sample data
const data = {
  user: {
    name: "Riley Carter",
    email: "riley@anywhere.co",
    avatar: "/avatars/riley.jpg",
  },
  navMain: [
    {
      title: "Inbox",
      url: "#",
      icon: <InboxIcon />,
      isActive: true,
    },
    {
      title: "Drafts",
      url: "#",
      icon: <FileIcon />,
      isActive: false,
    },
    {
      title: "Sent",
      url: "#",
      icon: <SendIcon />,
      isActive: false,
    },
    {
      title: "Junk",
      url: "#",
      icon: <ArchiveXIcon />,
      isActive: false,
    },
    {
      title: "Trash",
      url: "#",
      icon: <Trash2Icon />,
      isActive: false,
    },
  ],
  mails: [
    {
      name: "William Smith",
      email: "williamsmith@example.com",
      subject: "New booking: Deep Tissue Massage",
      date: "09:34 AM",
      teaser:
        "A new booking came in for tomorrow at 10 AM.\nPlease confirm the room and therapist.",
    },
    {
      name: "Alice Smith",
      email: "alicesmith@example.com",
      subject: "Re: Rescheduled appointment",
      date: "Yesterday",
      teaser:
        "Thanks for moving my appointment. Thursday works great.\nCan you send the updated confirmation?",
    },
    {
      name: "Bob Johnson",
      email: "bobjohnson@example.com",
      subject: "Saturday staffing",
      date: "2 days ago",
      teaser:
        "Saturday is fully booked already.\nCan anyone pick up an extra shift at the front desk?",
    },
    {
      name: "Emily Davis",
      email: "emilydavis@example.com",
      subject: "Re: October invoice",
      date: "2 days ago",
      teaser:
        "I've reviewed the October invoice you sent over.\nCan we set up a quick call to go through the add-ons?",
    },
    {
      name: "Michael Wilson",
      email: "michaelwilson@example.com",
      subject: "Setmore Pro is live",
      date: "1 week ago",
      teaser:
        "Please join us for an all-hands this Friday at 3 PM.\nWe'll walk through the new Setmore Pro features.",
    },
    {
      name: "Sarah Brown",
      email: "sarahbrown@example.com",
      subject: "Re: Call script feedback",
      date: "1 week ago",
      teaser:
        "Thanks for the new AnswerConnect call script. I have a few thoughts.\nCould we go through my notes this week?",
    },
    {
      name: "David Lee",
      email: "davidlee@example.com",
      subject: "Idea: waitlist for cancellations",
      date: "1 week ago",
      teaser:
        "What if cancelled slots were offered to a waitlist automatically?\nDo you have time this week to talk it through?",
    },
    {
      name: "Olivia Wilson",
      email: "oliviawilson@example.com",
      subject: "Time off in December",
      date: "1 week ago",
      teaser:
        "Just a heads up that I'll be off for two weeks in December.\nI've already blocked my calendar in Setmore.",
    },
    {
      name: "James Martin",
      email: "jamesmartin@example.com",
      subject: "Re: Lister Place room booking",
      date: "1 week ago",
      teaser:
        "I've booked a Lister Place meeting room for the offsite.\nLet me know if you need anything else from my end.",
    },
    {
      name: "Sophia White",
      email: "sophiawhite@example.com",
      subject: "Team dinner",
      date: "1 week ago",
      teaser:
        "To celebrate a record month of bookings, I'd like to organize a team dinner.\nAre you free next Friday evening?",
    },
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Note: I'm using state to show active item.
  // IRL you should use the url/router.
  const [activeItem, setActiveItem] = React.useState(data.navMain[0]);
  const [mails, setMails] = React.useState(data.mails);
  const { setOpen } = useSidebar();
  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      {...props}
    >
      {/* This is the first sidebar */}
      {/* We disable collapsible and adjust width to icon. */}
      {/* This will make the sidebar appear as icons. */}
      <Sidebar collapsible="none" className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" className="md:h-8 md:p-0" render={<a href="#" />}>
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
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {data.navMain.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false,
                      }}
                      onClick={() => {
                        setActiveItem(item);
                        const mail = data.mails.sort(() => Math.random() - 0.5);
                        setMails(mail.slice(0, Math.max(5, Math.floor(Math.random() * 10) + 1)));
                        setOpen(true);
                      }}
                      isActive={activeItem?.title === item.title}
                      className="px-2.5 md:px-2"
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      </Sidebar>

      {/* This is the second sidebar */}
      {/* We disable collapsible and let it fill remaining space */}
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-base font-medium text-foreground">{activeItem?.title}</div>
            <Label className="flex items-center gap-2 text-sm">
              <span>Unreads</span>
              <Switch className="shadow-none" />
            </Label>
          </div>
          <SidebarInput placeholder="Type to search..." />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              {mails.map((mail) => (
                <a
                  href="#"
                  key={mail.email}
                  className="flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight whitespace-nowrap last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <div className="flex w-full items-center gap-2">
                    <span>{mail.name}</span> <span className="ml-auto text-xs">{mail.date}</span>
                  </div>
                  <span className="font-medium">{mail.subject}</span>
                  <span className="line-clamp-2 w-[260px] text-xs whitespace-break-spaces">
                    {mail.teaser}
                  </span>
                </a>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
}
