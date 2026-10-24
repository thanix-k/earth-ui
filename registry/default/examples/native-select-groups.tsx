import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/registry/default/ui/native-select";

export default function NativeSelectGroups() {
  return (
    <NativeSelect defaultValue="haircut" aria-label="Service">
      <NativeSelectOptGroup label="Hair">
        <NativeSelectOption value="haircut">Haircut</NativeSelectOption>
        <NativeSelectOption value="colour">Colour</NativeSelectOption>
        <NativeSelectOption value="blow-dry">Blow-dry</NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="Nails">
        <NativeSelectOption value="manicure">Manicure</NativeSelectOption>
        <NativeSelectOption value="pedicure">Pedicure</NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
  );
}
