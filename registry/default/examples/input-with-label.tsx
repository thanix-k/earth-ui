import { Input } from "@/registry/default/ui/input";
import { Label } from "@/registry/default/ui/label";

export default function InputWithLabel() {
  return (
    <div className="grid w-full max-w-xs gap-1">
      <Label htmlFor="business-name">Business name</Label>
      <Input id="business-name" placeholder="Glow Salon" />
    </div>
  );
}
