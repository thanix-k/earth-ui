import { NativeSelect, NativeSelectOption } from "@/registry/default/ui/native-select";

export default function NativeSelectDisabled() {
  return (
    <NativeSelect disabled defaultValue="utc" aria-label="Time zone">
      <NativeSelectOption value="utc">UTC</NativeSelectOption>
      <NativeSelectOption value="est">Eastern Time</NativeSelectOption>
    </NativeSelect>
  );
}
