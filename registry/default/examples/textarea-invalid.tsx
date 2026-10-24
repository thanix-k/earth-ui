import { Label } from "@/registry/default/ui/label";
import { Textarea } from "@/registry/default/ui/textarea";

export default function TextareaInvalid() {
  return (
    <div className="grid w-full max-w-xs gap-1">
      <Label htmlFor="cancellation-reason">Cancellation reason</Label>
      <Textarea id="cancellation-reason" aria-invalid />
    </div>
  );
}
