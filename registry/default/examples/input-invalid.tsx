import { Input } from "@/registry/default/ui/input";
import { Label } from "@/registry/default/ui/label";

export default function InputInvalid() {
  return (
    <div className="grid w-full max-w-xs gap-1">
      <Label htmlFor="phone">Phone</Label>
      <Input id="phone" defaultValue="12" aria-invalid />
    </div>
  );
}
