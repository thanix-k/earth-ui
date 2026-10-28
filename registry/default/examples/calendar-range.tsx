"use client";

import * as React from "react";
import type { DateRange } from "react-day-picker";
import { Calendar } from "@/registry/default/ui/calendar";

export default function CalendarRange() {
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(2026, 10, 9),
    to: new Date(2026, 10, 15),
  });

  return (
    <Calendar
      mode="range"
      {...(range?.from ? { defaultMonth: range.from } : {})}
      selected={range}
      onSelect={setRange}
      numberOfMonths={2}
    />
  );
}
