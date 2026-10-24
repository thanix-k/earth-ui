import { Field, FieldError, FieldLabel } from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";

export default function FieldInvalid() {
  return (
    <Field className="max-w-xs" data-invalid>
      <FieldLabel htmlFor="customer-email">Customer email</FieldLabel>
      <Input id="customer-email" defaultValue="jamie@" aria-invalid />
      <FieldError>Enter a valid email address.</FieldError>
    </Field>
  );
}
