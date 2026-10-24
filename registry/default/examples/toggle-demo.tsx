import { StarIcon } from "lucide-react";
import { Toggle } from "@/registry/default/ui/toggle";

export default function ToggleDemo() {
  return (
    <Toggle defaultPressed>
      <StarIcon data-icon="inline-start" />
      Favourite
    </Toggle>
  );
}
