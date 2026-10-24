"use client";

import * as React from "react";
import { Calendar } from "@/registry/default/ui/calendar";

export default function CalendarDisabled() {
  const [date, setDate] = React.useState<Date | undefined>();

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      defaultMonth={new Date(2026, 10)}
      disabled={[{ before: new Date(2026, 10, 10) }, { dayOfWeek: [0, 6] }]}
    />
  );
}
