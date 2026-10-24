import { Toggle } from "@/registry/default/ui/toggle";

export default function ToggleOutline() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle variant="outline">Walk-ins</Toggle>
      <Toggle variant="outline" defaultPressed>
        Online
      </Toggle>
    </div>
  );
}
