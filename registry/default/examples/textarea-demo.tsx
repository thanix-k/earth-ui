import { Textarea } from "@/registry/default/ui/textarea";

export default function TextareaDemo() {
  return (
    <Textarea
      className="max-w-xs"
      placeholder="Add a note for your customer"
      aria-label="Booking note"
    />
  );
}
