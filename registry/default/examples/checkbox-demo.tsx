import { Checkbox } from "@/registry/default/ui/checkbox";
import { Label } from "@/registry/default/ui/label";

export default function CheckboxDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Label>
        <Checkbox defaultChecked />
        Send booking confirmations
      </Label>
      <Label>
        <Checkbox />
        Send reminders
      </Label>
      <Label>
        <Checkbox indeterminate />
        Some staff selected
      </Label>
      <Label>
        <Checkbox disabled defaultChecked />
        Managed by your admin
      </Label>
    </div>
  );
}
