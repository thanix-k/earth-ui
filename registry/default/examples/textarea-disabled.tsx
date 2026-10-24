import { Textarea } from "@/registry/default/ui/textarea";

export default function TextareaDisabled() {
  return (
    <Textarea
      className="max-w-xs"
      disabled
      placeholder="Add a note for your customer"
      aria-label="Booking note"
    />
  );
}
