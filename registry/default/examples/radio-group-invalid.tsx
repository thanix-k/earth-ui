import { Label } from "@/registry/default/ui/label";
import { RadioGroup, RadioGroupItem } from "@/registry/default/ui/radio-group";

export default function RadioGroupInvalid() {
  return (
    <RadioGroup aria-label="Payment" className="w-fit">
      <Label>
        <RadioGroupItem value="online" aria-invalid />
        Pay online
      </Label>
      <Label>
        <RadioGroupItem value="in-store" aria-invalid />
        Pay in store
      </Label>
    </RadioGroup>
  );
}
