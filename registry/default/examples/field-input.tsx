import { Field, FieldDescription, FieldLabel } from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";

export default function FieldInput() {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="booking-url">Booking page URL</FieldLabel>
      <FieldDescription>Letters, numbers and dashes only.</FieldDescription>
      <Input id="booking-url" placeholder="glow-salon" />
    </Field>
  );
}
