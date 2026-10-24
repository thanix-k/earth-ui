import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";

const zones = [
  { label: "London (GMT)", value: "london" },
  { label: "New York (EST)", value: "new-york" },
];

export default function SelectDisabled() {
  return (
    <div className="flex flex-col gap-4">
      <Select items={zones} defaultValue="london" disabled>
        <SelectTrigger className="w-56" aria-label="Time zone">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {zones.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select items={zones}>
        <SelectTrigger className="w-56" aria-label="Time zone">
          <SelectValue placeholder="Time zone" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="london">London (GMT)</SelectItem>
          <SelectItem value="new-york" disabled>
            New York (EST)
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
