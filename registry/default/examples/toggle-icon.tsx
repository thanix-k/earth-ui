import { BellIcon, EyeOffIcon } from "lucide-react";
import { Toggle } from "@/registry/default/ui/toggle";

export default function ToggleIcon() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle aria-label="Hide cancelled bookings">
        <EyeOffIcon />
      </Toggle>
      <Toggle variant="outline" aria-label="Notify me" defaultPressed>
        <BellIcon />
      </Toggle>
    </div>
  );
}
