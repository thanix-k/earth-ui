"use client";

import dayGridPlugin from "@fullcalendar/react/daygrid";
import { XIcon } from "lucide-react";
import { EventCalendarViews } from "@/registry/default/ui/event-calendar-views";

const colour = (name: "blue" | "purple" | "gold") => ({
  color: `var(--eds-palette-${name}-background-active)`,
  contrastColor: `var(--eds-palette-${name}-text-active)`,
});

const events = [
  {
    title: "Team standup",
    start: "2026-11-09T09:00:00",
    end: "2026-11-09T09:30:00",
    ...colour("blue"),
  },
  {
    title: "Haircut: Dana",
    start: "2026-11-10T10:00:00",
    end: "2026-11-10T11:00:00",
    ...colour("purple"),
  },
  {
    title: "Consultation",
    start: "2026-11-10T11:30:00",
    end: "2026-11-10T12:30:00",
    ...colour("gold"),
  },
  {
    title: "Staff training",
    start: "2026-11-12T09:00:00",
    end: "2026-11-12T12:00:00",
    ...colour("blue"),
  },
  {
    title: "Supplier call",
    start: "2026-11-12T14:00:00",
    end: "2026-11-12T14:30:00",
    ...colour("gold"),
  },
  {
    title: "Massage: Sam",
    start: "2026-11-13T16:00:00",
    end: "2026-11-13T17:00:00",
    ...colour("purple"),
  },
];

export default function EventCalendarViewsDemo() {
  return (
    <EventCalendarViews
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      initialDate="2026-11-12"
      height={560}
      events={events}
      popoverCloseContent={() => <XIcon className="size-4" />}
    />
  );
}
