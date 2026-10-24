import { Button } from "@/registry/default/ui/button";
import { Checkbox } from "@/registry/default/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";
import { NativeSelect, NativeSelectOption } from "@/registry/default/ui/native-select";
import { Textarea } from "@/registry/default/ui/textarea";

export default function FieldDemo() {
  return (
    <form className="w-full max-w-md">
      <FieldGroup>
        <FieldSet>
          <FieldLegend>New service</FieldLegend>
          <FieldDescription>Customers see this on your booking page.</FieldDescription>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="service-name">Service name</FieldLabel>
              <Input id="service-name" placeholder="Haircut and blow-dry" required />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="service-duration">Duration</FieldLabel>
                <NativeSelect id="service-duration" defaultValue="45" className="w-full">
                  <NativeSelectOption value="30">30 minutes</NativeSelectOption>
                  <NativeSelectOption value="45">45 minutes</NativeSelectOption>
                  <NativeSelectOption value="60">1 hour</NativeSelectOption>
                </NativeSelect>
              </Field>
              <Field>
                <FieldLabel htmlFor="service-price">Price</FieldLabel>
                <Input id="service-price" placeholder="$45.00" />
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="service-description">Description</FieldLabel>
              <Textarea id="service-description" placeholder="What's included" />
            </Field>
          </FieldGroup>
        </FieldSet>
        <FieldSeparator />
        <FieldSet>
          <FieldLegend>Booking</FieldLegend>
          <FieldGroup>
            <Field orientation="horizontal">
              <Checkbox id="service-online" defaultChecked />
              <FieldLabel htmlFor="service-online">Customers can book this online</FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>
        <Field orientation="horizontal">
          <Button type="submit">Save service</Button>
          <Button variant="outline" type="button">
            Cancel
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
