import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/registry/default/ui/field";
import { RadioGroup, RadioGroupItem } from "@/registry/default/ui/radio-group";

export default function FieldChoiceCard() {
  return (
    <FieldSet className="w-full max-w-sm">
      <FieldLegend variant="label">Location</FieldLegend>
      <RadioGroup defaultValue="in-person">
        <FieldLabel htmlFor="location-in-person">
          <Field orientation="horizontal">
            <RadioGroupItem value="in-person" id="location-in-person" />
            <FieldContent>
              <FieldTitle>In person</FieldTitle>
              <FieldDescription>At 24 King Street, Brighton.</FieldDescription>
            </FieldContent>
          </Field>
        </FieldLabel>
        <FieldLabel htmlFor="location-video">
          <Field orientation="horizontal">
            <RadioGroupItem value="video" id="location-video" />
            <FieldContent>
              <FieldTitle>Video call</FieldTitle>
              <FieldDescription>A meeting link is sent with the confirmation.</FieldDescription>
            </FieldContent>
          </Field>
        </FieldLabel>
        <FieldLabel htmlFor="location-phone">
          <Field orientation="horizontal">
            <RadioGroupItem value="phone" id="location-phone" disabled />
            <FieldContent>
              <FieldTitle>Phone call</FieldTitle>
              <FieldDescription>Add a business phone number first.</FieldDescription>
            </FieldContent>
          </Field>
        </FieldLabel>
      </RadioGroup>
    </FieldSet>
  );
}
