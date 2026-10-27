"use client";

import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as React from "react";
import type { DateRange } from "react-day-picker";
import { Button } from "@/registry/default/ui/button";
import { Calendar } from "@/registry/default/ui/calendar";
import { Field, FieldLabel } from "@/registry/default/ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/default/ui/popover";

export default function DatePickerRange() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2026, 0, 20),
    to: addDays(new Date(2026, 0, 20), 20),
  });

  return (
    <Field className="mx-auto w-60">
      <FieldLabel htmlFor="date-picker-range">Date range</FieldLabel>
      <Popover>
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              id="date-picker-range"
              className="justify-start px-2.5 font-normal"
            />
          }
        >
          <CalendarIcon data-icon="inline-start" />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
              </>
            ) : (
              format(date.from, "LLL dd, y")
            )
          ) : (
            <span>Pick a date</span>
          )}
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            {...(date?.from ? { defaultMonth: date.from } : {})}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </Field>
  );
}
