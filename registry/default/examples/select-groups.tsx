import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";

const hair = [
  { label: "Haircut", value: "haircut" },
  { label: "Colour", value: "colour" },
  { label: "Blow-dry", value: "blow-dry" },
];
const nails = [
  { label: "Manicure", value: "manicure" },
  { label: "Pedicure", value: "pedicure" },
];

export default function SelectGroups() {
  return (
    <Select items={[...hair, ...nails]}>
      <SelectTrigger className="w-56" aria-label="Service">
        <SelectValue placeholder="Select a service" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Hair</SelectLabel>
          {hair.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Nails</SelectLabel>
          {nails.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
