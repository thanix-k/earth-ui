import { NativeSelect, NativeSelectOption } from "@/registry/default/ui/native-select";

export default function NativeSelectDemo() {
  return (
    <NativeSelect defaultValue="" aria-label="Duration">
      <NativeSelectOption value="" disabled>
        Select duration
      </NativeSelectOption>
      <NativeSelectOption value="15">15 minutes</NativeSelectOption>
      <NativeSelectOption value="30">30 minutes</NativeSelectOption>
      <NativeSelectOption value="45">45 minutes</NativeSelectOption>
      <NativeSelectOption value="60">1 hour</NativeSelectOption>
    </NativeSelect>
  );
}
