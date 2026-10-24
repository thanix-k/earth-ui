import { Checkbox } from "@/registry/default/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/registry/default/ui/field";

export default function FieldCheckbox() {
  return (
    <FieldSet className="max-w-sm">
      <FieldLegend variant="label">Notifications</FieldLegend>
      <FieldGroup className="gap-3">
        <Field orientation="horizontal">
          <Checkbox id="notify-new" defaultChecked />
          <FieldContent>
            <FieldLabel htmlFor="notify-new">New bookings</FieldLabel>
            <FieldDescription>Email me when a customer books online.</FieldDescription>
          </FieldContent>
        </Field>
        <Field orientation="horizontal">
          <Checkbox id="notify-cancel" />
          <FieldContent>
            <FieldLabel htmlFor="notify-cancel">Cancellations</FieldLabel>
            <FieldDescription>Email me when a booking is cancelled.</FieldDescription>
          </FieldContent>
        </Field>
      </FieldGroup>
    </FieldSet>
  );
}
