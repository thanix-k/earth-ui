import { ToggleGroup, ToggleGroupItem } from "@/registry/default/ui/toggle-group";

export default function ToggleGroupSizes() {
  return (
    <div className="flex flex-col items-center gap-4">
      <ToggleGroup size="sm" variant="outline" defaultValue={["30"]} aria-label="Slot length">
        <ToggleGroupItem value="15">15 min</ToggleGroupItem>
        <ToggleGroupItem value="30">30 min</ToggleGroupItem>
        <ToggleGroupItem value="60">60 min</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup variant="outline" defaultValue={["30"]} aria-label="Slot length">
        <ToggleGroupItem value="15">15 min</ToggleGroupItem>
        <ToggleGroupItem value="30">30 min</ToggleGroupItem>
        <ToggleGroupItem value="60">60 min</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
