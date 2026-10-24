import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";

const views = [
  { label: "Day", value: "day" },
  { label: "Week", value: "week" },
  { label: "Month", value: "month" },
];

export default function SelectSizes() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Select items={views} defaultValue="week">
        <SelectTrigger size="sm" className="w-32" aria-label="Calendar view">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {views.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select items={views} defaultValue="week">
        <SelectTrigger className="w-32" aria-label="Calendar view">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {views.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
