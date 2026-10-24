"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/registry/default/ui/combobox";

const locations = ["Brighton", "London", "Manchester"];

export default function ComboboxDisabled() {
  return (
    <Combobox items={locations} defaultValue={locations[0]} disabled>
      <ComboboxInput className="w-64" aria-label="Location" disabled />
      <ComboboxContent>
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
