import { Field, FieldError, FieldLabel } from "@/registry/default/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";

const reasons = [
  { label: "Customer request", value: "customer" },
  { label: "Staff unavailable", value: "staff" },
  { label: "Weather", value: "weather" },
];

export default function SelectInvalid() {
  return (
    <Field className="w-56" data-invalid>
      <FieldLabel htmlFor="cancellation-reason">Cancellation reason</FieldLabel>
      <Select items={reasons}>
        <SelectTrigger id="cancellation-reason" className="w-full" aria-invalid>
          <SelectValue placeholder="Select a reason" />
        </SelectTrigger>
        <SelectContent>
          {reasons.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FieldError>Choose a reason to cancel.</FieldError>
    </Field>
  );
}
