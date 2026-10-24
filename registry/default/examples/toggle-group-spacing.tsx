import { ToggleGroup, ToggleGroupItem } from "@/registry/default/ui/toggle-group";

export default function ToggleGroupSpacing() {
  return (
    <ToggleGroup variant="outline" spacing={0} defaultValue={["list"]} aria-label="Layout">
      <ToggleGroupItem value="list">List</ToggleGroupItem>
      <ToggleGroupItem value="calendar">Calendar</ToggleGroupItem>
      <ToggleGroupItem value="map">Map</ToggleGroupItem>
    </ToggleGroup>
  );
}
