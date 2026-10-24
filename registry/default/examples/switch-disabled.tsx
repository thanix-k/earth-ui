import { Label } from "@/registry/default/ui/label";
import { Switch } from "@/registry/default/ui/switch";

export default function SwitchDisabled() {
  return (
    <div className="flex flex-col gap-4">
      <Label>
        <Switch disabled />
        Take payments (connect Stripe first)
      </Label>
      <Label>
        <Switch disabled defaultChecked />
        Email confirmations (required)
      </Label>
    </div>
  );
}
