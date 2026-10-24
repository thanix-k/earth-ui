"use client";

import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
} from "@/registry/default/ui/combobox";

const groups = [
  { value: "Hair", items: ["Haircut", "Colour", "Highlights", "Blow-dry"] },
  { value: "Nails", items: ["Manicure", "Pedicure", "Gel polish"] },
  { value: "Spa", items: ["Facial", "Deep tissue massage"] },
];

export default function ComboboxGroups() {
  return (
    <Combobox items={groups}>
      <ComboboxInput className="w-64" placeholder="Select a service" aria-label="Service" />
      <ComboboxContent>
        <ComboboxEmpty>No services found.</ComboboxEmpty>
        <ComboboxList>
          {(group: (typeof groups)[number], index: number) => (
            <ComboboxGroup key={group.value} items={group.items}>
              <ComboboxLabel>{group.value}</ComboboxLabel>
              <ComboboxCollection>
                {(item: string) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxCollection>
              {index < groups.length - 1 && <ComboboxSeparator />}
            </ComboboxGroup>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
