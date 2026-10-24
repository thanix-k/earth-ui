"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/registry/default/ui/combobox";

const staff = ["Alex Morgan", "Jordan Lee", "Priya Shah", "Sam Patel", "Taylor Kim"];

export default function ComboboxClear() {
  return (
    <Combobox items={staff} defaultValue={staff[2]}>
      <ComboboxInput className="w-64" placeholder="Select staff" aria-label="Staff" showClear />
      <ComboboxContent>
        <ComboboxEmpty>No staff found.</ComboboxEmpty>
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
