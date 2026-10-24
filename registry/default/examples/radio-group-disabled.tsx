import { Label } from "@/registry/default/ui/label";
import { RadioGroup, RadioGroupItem } from "@/registry/default/ui/radio-group";

export default function RadioGroupDisabled() {
  return (
    <RadioGroup defaultValue="in-person" aria-label="Location" className="w-fit">
      <Label>
        <RadioGroupItem value="in-person" />
        In person
      </Label>
      <Label>
        <RadioGroupItem value="video" />
        Video call
      </Label>
      <Label>
        <RadioGroupItem value="phone" disabled />
        Phone call (not set up)
      </Label>
    </RadioGroup>
  );
}
