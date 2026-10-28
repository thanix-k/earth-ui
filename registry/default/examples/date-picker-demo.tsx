"use client";

import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@/registry/default/ui/button";
import { Calendar } from "@/registry/default/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/default/ui/popover";

export default function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            data-empty={!date}
            className="w-[212px] justify-between text-left font-normal data-[empty=true]:text-eds-secondary"
          />
        }
      >
        {date ? format(date, "PPP") : <span>Pick a date</span>}
        <ChevronDownIcon data-icon="inline-end" />
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          {...(date ? { defaultMonth: date } : {})}
        />
      </PopoverContent>
    </Popover>
  );
}
