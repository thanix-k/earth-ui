import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";

const staff = [
  { label: "Any available staff", value: "any" },
  { label: "Alex Morgan", value: "alex" },
  { label: "Priya Shah", value: "priya" },
  { label: "Sam Patel", value: "sam" },
  { label: "Jordan Lee", value: "jordan" },
];

export default function SelectDemo() {
  return (
    <Select items={staff} defaultValue="any">
      <SelectTrigger className="w-56" aria-label="Staff member">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {staff.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
