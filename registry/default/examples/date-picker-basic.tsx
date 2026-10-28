"use client";

import { format } from "date-fns";
import * as React from "react";
import { Button } from "@/registry/default/ui/button";
import { Calendar } from "@/registry/default/ui/calendar";
import { Field, FieldLabel } from "@/registry/default/ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/default/ui/popover";

export default function DatePickerBasic() {
  const [date, setDate] = React.useState<Date>();

  return (
    <Field className="mx-auto w-44">
      <FieldLabel htmlFor="date-picker-basic">Date</FieldLabel>
      <Popover>
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              id="date-picker-basic"
              className="justify-start font-normal"
            />
          }
        >
          {date ? format(date, "PPP") : <span>Pick a date</span>}
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
    </Field>
  );
}
