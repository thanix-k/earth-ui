"use client";

import { Button } from "@/registry/default/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@/registry/default/ui/combobox";

const timeZones = [
  "London (GMT)",
  "New York (EST)",
  "Chicago (CST)",
  "Los Angeles (PST)",
  "Sydney (AEST)",
  "Chennai (IST)",
];

export default function ComboboxPopup() {
  return (
    <Combobox items={timeZones} defaultValue={timeZones[0]}>
      <ComboboxTrigger
        render={<Button variant="outline" className="w-56 justify-between font-normal" />}
      >
        <ComboboxValue />
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput
          showTrigger={false}
          placeholder="Search time zones"
          aria-label="Search time zones"
        />
        <ComboboxEmpty>No time zones found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
