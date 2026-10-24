import { Label } from "@/registry/default/ui/label";
import { Switch } from "@/registry/default/ui/switch";

export default function SwitchSizes() {
  return (
    <div className="flex flex-col gap-4">
      <Label>
        <Switch size="sm" defaultChecked />
        Small
      </Label>
      <Label>
        <Switch defaultChecked />
        Default
      </Label>
    </div>
  );
}
