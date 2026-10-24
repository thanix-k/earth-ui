import { Field, FieldContent, FieldDescription, FieldLabel } from "@/registry/default/ui/field";
import { Switch } from "@/registry/default/ui/switch";

export default function FieldSwitch() {
  return (
    <Field orientation="horizontal" className="max-w-sm">
      <FieldContent>
        <FieldLabel htmlFor="waitlist">Waitlist</FieldLabel>
        <FieldDescription>Offer freed-up slots to customers on the waitlist.</FieldDescription>
      </FieldContent>
      <Switch id="waitlist" defaultChecked />
    </Field>
  );
}
