"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/registry/default/ui/combobox";
import { Field, FieldError, FieldLabel } from "@/registry/default/ui/field";

const services = ["Haircut", "Colour", "Manicure", "Pedicure"];

export default function ComboboxInvalid() {
  return (
    <Field className="w-64" data-invalid>
      <FieldLabel htmlFor="combobox-service">Service</FieldLabel>
      <Combobox items={services}>
        <ComboboxInput id="combobox-service" placeholder="Select a service" aria-invalid />
        <ComboboxContent>
          <ComboboxEmpty>No services found.</ComboboxEmpty>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <FieldError>Choose a service to book.</FieldError>
    </Field>
  );
}
