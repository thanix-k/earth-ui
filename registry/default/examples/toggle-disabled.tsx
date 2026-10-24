import { Toggle } from "@/registry/default/ui/toggle";

export default function ToggleDisabled() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle disabled>Chip</Toggle>
      <Toggle disabled defaultPressed>
        Pressed
      </Toggle>
      <Toggle variant="outline" disabled>
        Outline
      </Toggle>
      <Toggle variant="outline" disabled defaultPressed>
        Pressed
      </Toggle>
    </div>
  );
}
