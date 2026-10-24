import { Field, FieldDescription, FieldLabel } from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";

export default function FieldDisabled() {
  return (
    <Field className="max-w-xs" data-disabled>
      <FieldLabel htmlFor="business-id">Business ID</FieldLabel>
      <Input id="business-id" defaultValue="glow-salon-4821" disabled />
      <FieldDescription>Contact support to change your business ID.</FieldDescription>
    </Field>
  );
}
