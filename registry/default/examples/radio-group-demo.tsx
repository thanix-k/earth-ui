import { Label } from "@/registry/default/ui/label";
import { RadioGroup, RadioGroupItem } from "@/registry/default/ui/radio-group";

export default function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="24h" aria-label="Send reminder" className="w-fit">
      <Label>
        <RadioGroupItem value="1h" />1 hour before
      </Label>
      <Label>
        <RadioGroupItem value="24h" />
        24 hours before
      </Label>
      <Label>
        <RadioGroupItem value="48h" />
        48 hours before
      </Label>
    </RadioGroup>
  );
}
