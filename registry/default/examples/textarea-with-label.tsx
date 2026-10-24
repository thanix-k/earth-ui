import { Label } from "@/registry/default/ui/label";
import { Textarea } from "@/registry/default/ui/textarea";

export default function TextareaWithLabel() {
  return (
    <div className="grid w-full max-w-xs gap-1">
      <Label htmlFor="service-description">Service description</Label>
      <Textarea
        id="service-description"
        placeholder="A 45-minute cut and blow-dry with one of our senior stylists."
      />
    </div>
  );
}
