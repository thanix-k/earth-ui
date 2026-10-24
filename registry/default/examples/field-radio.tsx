import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/registry/default/ui/field";
import { RadioGroup, RadioGroupItem } from "@/registry/default/ui/radio-group";

export default function FieldRadio() {
  return (
    <FieldSet className="max-w-sm">
      <FieldLegend variant="label">Payment</FieldLegend>
      <FieldDescription>When customers pay for their booking.</FieldDescription>
      <RadioGroup defaultValue="deposit">
        <Field orientation="horizontal">
          <RadioGroupItem value="full" id="payment-full" />
          <FieldLabel htmlFor="payment-full">Pay in full when booking</FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="deposit" id="payment-deposit" />
          <FieldLabel htmlFor="payment-deposit">Pay a 20% deposit</FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="later" id="payment-later" />
          <FieldLabel htmlFor="payment-later">Pay at the appointment</FieldLabel>
        </Field>
      </RadioGroup>
    </FieldSet>
  );
}
