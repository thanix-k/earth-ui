import { ToggleGroup, ToggleGroupItem } from "@/registry/default/ui/toggle-group";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function ToggleGroupOutline() {
  return (
    <ToggleGroup
      variant="outline"
      multiple
      defaultValue={["Mon", "Tue", "Wed", "Thu", "Fri"]}
      aria-label="Working days"
      className="flex-wrap"
    >
      {days.map((day) => (
        <ToggleGroupItem key={day} value={day} className="min-w-12">
          {day}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
