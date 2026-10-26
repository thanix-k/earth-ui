"use client";

import { parseDate } from "chrono-node";
import { CalendarIcon } from "lucide-react";
import * as React from "react";
import { Calendar } from "@/registry/default/ui/calendar";
import { Field, FieldLabel } from "@/registry/default/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/registry/default/ui/input-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/default/ui/popover";

// A fixed "today" keeps the example static. In your app, drop this argument
// so chrono-node parses relative to now.
const REFERENCE = new Date(2026, 10, 9);

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function DatePickerNaturalLanguage() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("In 2 days");
  const [date, setDate] = React.useState<Date | undefined>(
    parseDate(value, REFERENCE) || undefined,
  );

  return (
    <Field className="mx-auto max-w-xs">
      <FieldLabel htmlFor="date-picker-natural-language">Schedule date</FieldLabel>
      <InputGroup>
        <InputGroupInput
          id="date-picker-natural-language"
          value={value}
          placeholder="Tomorrow or next week"
          onChange={(e) => {
            setValue(e.target.value);
            const date = parseDate(e.target.value, REFERENCE);
            if (date) {
              setDate(date);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
        <InputGroupAddon align="inline-end">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              render={<InputGroupButton variant="ghost" size="icon-xs" aria-label="Select date" />}
            >
              <CalendarIcon />
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="end" sideOffset={8}>
              <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                defaultMonth={date}
                onSelect={(date) => {
                  setDate(date);
                  setValue(formatDate(date));
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </InputGroupAddon>
      </InputGroup>
      <div className="px-1 text-body-14 text-eds-secondary lg:text-body-12">
        Your post will be published on <span className="font-medium">{formatDate(date)}</span>.
      </div>
    </Field>
  );
}
