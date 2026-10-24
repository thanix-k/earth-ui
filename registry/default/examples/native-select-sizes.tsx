import { NativeSelect, NativeSelectOption } from "@/registry/default/ui/native-select";

export default function NativeSelectSizes() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <NativeSelect size="sm" defaultValue="week" aria-label="Calendar view">
        <NativeSelectOption value="day">Day</NativeSelectOption>
        <NativeSelectOption value="week">Week</NativeSelectOption>
        <NativeSelectOption value="month">Month</NativeSelectOption>
      </NativeSelect>
      <NativeSelect defaultValue="week" aria-label="Calendar view">
        <NativeSelectOption value="day">Day</NativeSelectOption>
        <NativeSelectOption value="week">Week</NativeSelectOption>
        <NativeSelectOption value="month">Month</NativeSelectOption>
      </NativeSelect>
    </div>
  );
}
