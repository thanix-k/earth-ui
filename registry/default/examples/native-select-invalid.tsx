import { NativeSelect, NativeSelectOption } from "@/registry/default/ui/native-select";

export default function NativeSelectInvalid() {
  return (
    <NativeSelect defaultValue="" aria-label="Staff member" aria-invalid>
      <NativeSelectOption value="" disabled>
        Select staff
      </NativeSelectOption>
      <NativeSelectOption value="alex">Alex Morgan</NativeSelectOption>
      <NativeSelectOption value="sam">Sam Patel</NativeSelectOption>
    </NativeSelect>
  );
}
