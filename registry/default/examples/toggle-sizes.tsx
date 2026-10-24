import { Toggle } from "@/registry/default/ui/toggle";

export default function ToggleSizes() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle size="sm" variant="outline">
        Small
      </Toggle>
      <Toggle variant="outline">Default</Toggle>
      <Toggle size="lg" variant="outline">
        Large
      </Toggle>
    </div>
  );
}
