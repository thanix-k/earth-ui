"use client";

import * as React from "react";
import { Calendar } from "@/registry/default/ui/calendar";

export default function CalendarDropdown() {
  const [date, setDate] = React.useState<Date | undefined>(new Date(1992, 4, 12));

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      defaultMonth={date}
      captionLayout="dropdown"
      startMonth={new Date(1930, 0)}
      endMonth={new Date(2026, 11)}
    />
  );
}
