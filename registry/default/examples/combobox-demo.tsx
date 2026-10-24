"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/registry/default/ui/combobox";

const services = [
  "Haircut",
  "Haircut and blow-dry",
  "Colour",
  "Highlights",
  "Beard trim",
  "Manicure",
  "Pedicure",
  "Deep tissue massage",
];

export default function ComboboxDemo() {
  return (
    <Combobox items={services}>
      <ComboboxInput className="w-64" placeholder="Select a service" aria-label="Service" />
      <ComboboxContent>
        <ComboboxEmpty>No services found.</ComboboxEmpty>
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
