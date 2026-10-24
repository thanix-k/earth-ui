"use client";

import * as React from "react";
import { Calendar } from "@/registry/default/ui/calendar";

export default function CalendarSmall() {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 10, 12));

  return (
    <Calendar
      mode="single"
      selected={date}
      defaultMonth={date}
      onSelect={setDate}
      className="text-body-12 [--cell-size:--spacing(8)] [--nav-size:--spacing(8)]"
    />
  );
}
