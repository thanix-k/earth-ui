"use client";

import * as React from "react";
import { Calendar } from "@/registry/default/ui/calendar";

export default function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 10, 12));

  return <Calendar mode="single" selected={date} onSelect={setDate} defaultMonth={date} />;
}
